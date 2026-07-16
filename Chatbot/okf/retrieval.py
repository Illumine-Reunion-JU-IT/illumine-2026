"""Hybrid retrieval: BM25 (lexical) + embeddings (semantic), fused with RRF.

Deliberately dependency-light. BM25 is implemented here in pure Python rather
than pulled from a library, and embeddings go through Ollama instead of
sentence-transformers, so nothing in this path needs numpy or torch. That keeps
the install identical on ARM and x86 Ubuntu and avoids multi-GB wheels on a
2 vCPU box.

Retrieval is plain code, not an LLM tool call. That is the whole point: a 0.8B
model is not reliable at picking documents, but it does not have to be. It only
ever sees text that has already been selected for it.
"""

from __future__ import annotations

import json
import math
import re
from collections import Counter
from dataclasses import dataclass

from . import config
from .knowledge import Chunk, corpus_fingerprint

# --- Tokenisation -----------------------------------------------------------

_TOKEN_RE = re.compile(r"[a-z0-9]+")

# Small, hand-picked list. An aggressive stopword list would strip terms that
# actually matter in this corpus (e.g. "IT" is the department's name).
_STOPWORDS = frozenset(
    """
    a an the and or but if then than that this these those of for to in on at by
    with from as is are was were be been being do does did doing have has had
    having i you he she it we they me my your our their there here what which who
    whom how when where why can could should would will shall may might must
    about into over under again further once all any both each few more most
    other some such no nor not only own same so too very s t just
    """.split()
)


def _stem(token: str) -> str:
    """Crude suffix stripper. A real stemmer is not worth a dependency here."""
    for suffix in ("ing", "ies", "ed", "es", "s"):
        if len(token) > len(suffix) + 2 and token.endswith(suffix):
            if suffix == "ies":
                return token[: -len(suffix)] + "y"
            return token[: -len(suffix)]
    return token


def tokenize(text: str) -> list[str]:
    return [
        _stem(token)
        for token in _TOKEN_RE.findall(text.lower())
        if token not in _STOPWORDS and len(token) > 1
    ]


# --- BM25 -------------------------------------------------------------------


class BM25:
    """Standard BM25-Okapi over an in-memory corpus."""

    def __init__(self, documents: list[list[str]], k1: float = 1.5, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.corpus_size = len(documents)
        self.doc_freqs = [Counter(doc) for doc in documents]
        self.doc_lens = [len(doc) for doc in documents]
        self.avg_doc_len = (
            sum(self.doc_lens) / self.corpus_size if self.corpus_size else 0.0
        )

        term_doc_count: Counter[str] = Counter()
        for doc in documents:
            term_doc_count.update(set(doc))

        # BM25+ style idf floor, so a term appearing in most documents cannot
        # go negative and subtract from an otherwise good match.
        self.idf = {
            term: max(
                math.log((self.corpus_size - count + 0.5) / (count + 0.5) + 1.0), 0.01
            )
            for term, count in term_doc_count.items()
        }

    def scores(self, query_tokens: list[str]) -> list[float]:
        results = [0.0] * self.corpus_size
        if not self.avg_doc_len:
            return results

        for index, freqs in enumerate(self.doc_freqs):
            length_norm = self.k1 * (
                1 - self.b + self.b * self.doc_lens[index] / self.avg_doc_len
            )
            score = 0.0
            for term in query_tokens:
                tf = freqs.get(term, 0)
                if tf:
                    score += self.idf.get(term, 0.0) * (tf * (self.k1 + 1)) / (
                        tf + length_norm
                    )
            results[index] = score

        return results


# --- Embeddings -------------------------------------------------------------


def _cosine(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(y * y for y in b))
    if not norm_a or not norm_b:
        return 0.0
    return dot / (norm_a * norm_b)


class EmbeddingIndex:
    """Semantic index backed by Ollama's embedding endpoint.

    Every failure mode here is non-fatal: if the embedding model is missing or
    the daemon is unreachable, the index reports itself unavailable and the
    retriever silently continues with BM25 alone.
    """

    def __init__(self, chunks: list[Chunk], client):
        self._client = client
        self.vectors: list[list[float]] = []
        self.available = False

        # The model name is part of the key, not just the corpus hash. Vectors
        # from different models live in different, incomparable spaces: reusing
        # one model's cache while embedding queries with another silently turns
        # retrieval into noise, with nothing in the logs to say so.
        model_tag = re.sub(r"[^a-z0-9._-]+", "-", client.embed_model.lower())
        cache_path = (
            config.CACHE_DIR
            / f"embeddings-{model_tag}-{corpus_fingerprint(chunks)}.json"
        )

        if cache_path.is_file():
            try:
                cached = json.loads(cache_path.read_text())
                if len(cached) == len(chunks) and all(cached):
                    self.vectors = cached
                    self.available = True
                    return
            except (OSError, json.JSONDecodeError, TypeError):
                pass  # Corrupt cache: fall through and recompute.

        try:
            self.vectors = [client.embed(chunk.embed_text) for chunk in chunks]
            self.available = True
        except Exception:
            self.available = False
            return

        try:
            config.CACHE_DIR.mkdir(parents=True, exist_ok=True)
            cache_path.write_text(json.dumps(self.vectors))
        except OSError:
            pass  # A read-only filesystem costs startup time, not correctness.

    def scores(self, query: str) -> list[float] | None:
        if not self.available:
            return None
        try:
            query_vector = self._client.embed(query, is_query=True)
        except Exception:
            return None
        return [_cosine(query_vector, vector) for vector in self.vectors]


# --- Fusion -----------------------------------------------------------------


@dataclass
class Hit:
    chunk: Chunk
    score: float
    bm25_rank: int | None = None
    embed_rank: int | None = None


def _ranks(scores: list[float], depth: int) -> dict[int, int]:
    """Map index -> 1-based rank, keeping only this retriever's top `depth`.

    Truncating here is what makes fusion discriminative. Zero/negative scores
    are treated as no match at all.
    """
    ordered = sorted(
        (i for i, s in enumerate(scores) if s > 0),
        key=lambda i: scores[i],
        reverse=True,
    )[:depth]
    return {index: rank for rank, index in enumerate(ordered, start=1)}


class Retriever:
    """Hybrid retriever over the knowledge corpus."""

    def __init__(self, chunks: list[Chunk], client=None):
        self.chunks = chunks
        self.bm25 = BM25([tokenize(chunk.keyword_text) for chunk in chunks])

        self.embeddings: EmbeddingIndex | None = None
        if config.USE_EMBEDDINGS and client is not None:
            index = EmbeddingIndex(chunks, client)
            self.embeddings = index if index.available else None

    @property
    def mode(self) -> str:
        return "hybrid (bm25 + embeddings)" if self.embeddings else "bm25 only"

    def search(self, query: str, top_k: int | None = None) -> list[Hit]:
        """Return the top chunks for a query, best first.

        Ranks are fused with Reciprocal Rank Fusion rather than by normalising
        and adding raw scores: BM25 scores and cosine similarities live on
        unrelated scales, and RRF only needs their orderings.
        """
        top_k = top_k or config.TOP_K
        query = query.strip()
        if not query:
            return []

        depth = max(config.CANDIDATE_DEPTH, top_k)
        bm25_ranks = _ranks(self.bm25.scores(tokenize(query)), depth)

        embed_ranks: dict[int, int] = {}
        if self.embeddings is not None:
            embed_scores = self.embeddings.scores(query)
            if embed_scores is not None:
                embed_ranks = _ranks(embed_scores, depth)

        fused: list[Hit] = []
        for index, chunk in enumerate(self.chunks):
            bm25_rank = bm25_ranks.get(index)
            embed_rank = embed_ranks.get(index)
            if bm25_rank is None and embed_rank is None:
                continue

            score = 0.0
            if bm25_rank is not None:
                score += 1.0 / (config.RRF_K + bm25_rank)
            if embed_rank is not None:
                score += 1.0 / (config.RRF_K + embed_rank)

            fused.append(
                Hit(
                    chunk=chunk,
                    score=score,
                    bm25_rank=bm25_rank,
                    embed_rank=embed_rank,
                )
            )

        if not fused:
            return []

        # Ties are common (RRF scores are quantised to 1/(K+rank)); break them
        # by lexical rank so ordering is deterministic across runs.
        fused.sort(
            key=lambda hit: (-hit.score, hit.bm25_rank or 10**6, hit.chunk.chunk_id)
        )
        return fused[:top_k]
