"""Loads the Knowledge/*.md corpus and splits it into retrievable chunks.

The corpus is small (~15 files) and hand-written, so the frontmatter is trusted
as high-signal metadata: `title`, `aliases` and `tags` are weighted more heavily
than body prose during retrieval.
"""

from __future__ import annotations

import hashlib
import re
import warnings
from dataclasses import dataclass, field
from pathlib import Path

import frontmatter

from . import config


@dataclass
class Chunk:
    """One retrievable unit: a whole document, or one `##` section of it."""

    doc_id: str
    title: str
    heading: str
    text: str
    path: str
    aliases: list[str] = field(default_factory=list)
    tags: list[str] = field(default_factory=list)

    @property
    def chunk_id(self) -> str:
        return f"{self.doc_id}#{self.heading}" if self.heading else self.doc_id

    @property
    def keyword_text(self) -> str:
        """Lexical view of the chunk.

        Title/aliases/tags are repeated so BM25 weights them above body prose
        without needing a separate field-scoring model.
        """
        boost = " ".join([self.title] * 3 + self.aliases * 3 + self.tags * 2)
        return f"{boost} {self.heading} {self.text}"

    @property
    def embed_text(self) -> str:
        """Semantic view. Natural prose, no artificial repetition."""
        header = self.title
        if self.heading:
            header = f"{self.title} — {self.heading}"
        return f"{header}\n\n{self.text}"

    def as_context(self) -> str:
        """Rendered form injected into the prompt.

        The source path is deliberately omitted: the model parrots whatever
        looks like a citation, and users would see server-side filenames. The
        path travels on the Answer object instead, where the caller can render
        it as a real link.
        """
        label = self.title
        if self.heading:
            label = f"{self.title} › {self.heading}"
        return f"## {label}\n{self.text}"


def _as_list(value) -> list[str]:
    """Frontmatter lists are hand-authored; accept both YAML list and CSV."""
    if value is None:
        return []
    if isinstance(value, str):
        return [part.strip() for part in value.split(",") if part.strip()]
    if isinstance(value, (list, tuple)):
        return [str(item).strip() for item in value if str(item).strip()]
    return [str(value)]


# Splits on `##`/`###` headings while keeping the heading text itself.
_HEADING_RE = re.compile(r"^(#{2,3})\s+(.+?)\s*$", re.MULTILINE)

# Internal cross-references, e.g. [Event Schedule](./schedule.md). The model
# copies these verbatim into answers, so a user ends up staring at a dead link
# to a file that only exists on the server. Keep the label, drop the target.
_INTERNAL_LINK_RE = re.compile(r"\[([^\]]+)\]\(\s*(?!https?://)[^)]*?\.md[^)]*\)")

# Bare relative paths that survive the above, e.g. "see ./contact.md".
_BARE_MD_PATH_RE = re.compile(r"(?<![\w/])\.{0,2}/?[\w-]+\.md\b")


def _strip_internal_links(text: str) -> str:
    """Remove server-side paths while preserving real outbound URLs."""
    text = _INTERNAL_LINK_RE.sub(r"\1", text)
    return _BARE_MD_PATH_RE.sub("", text)

# Below this, a document is kept whole: splitting tiny files produces chunks
# with too little context to be useful on their own.
_MIN_SPLIT_CHARS = 900


def _split_sections(body: str) -> list[tuple[str, str]]:
    """Split markdown into (heading, text). Returns [("", body)] if not split."""
    matches = list(_HEADING_RE.finditer(body))
    if not matches or len(body) < _MIN_SPLIT_CHARS:
        return [("", body.strip())]

    sections: list[tuple[str, str]] = []

    preamble = body[: matches[0].start()].strip()
    if preamble:
        sections.append(("", preamble))

    for i, match in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(body)
        text = body[match.end() : end].strip()
        if text:
            sections.append((match.group(2).strip(), text))

    return sections or [("", body.strip())]


# Navigation documents (tables of contents) are excluded from retrieval. They
# name-drop every topic in the corpus, so they rank highly for almost any query
# while containing no answers — they crowd out the document that does. Opt a
# file out explicitly with `retrieval: false`, or implicitly via `type: index`.
_NON_RETRIEVABLE_TYPES = frozenset({"index"})


def _is_retrievable(metadata: dict) -> bool:
    if metadata.get("retrieval") is False:
        return False
    return str(metadata.get("type", "")).strip().lower() not in _NON_RETRIEVABLE_TYPES


def load_chunks(knowledge_dir: Path | None = None) -> list[Chunk]:
    """Load and chunk every retrievable markdown file under `knowledge_dir`."""
    directory = Path(knowledge_dir or config.KNOWLEDGE_DIR)

    if not directory.is_dir():
        raise FileNotFoundError(
            f"Knowledge directory not found: {directory}\n"
            "Set OKF_KNOWLEDGE_DIR, or check the folder name's capitalisation "
            "(Linux is case-sensitive; macOS is not)."
        )

    chunks: list[Chunk] = []

    for path in sorted(directory.rglob("*.md")):
        post = frontmatter.load(path)
        body = (post.content or "").strip()
        if not body or not _is_retrievable(post.metadata):
            continue

        body = _strip_internal_links(body)

        doc_id = path.stem
        title = str(post.metadata.get("title") or doc_id.replace("_", " ").title())
        aliases = _as_list(post.metadata.get("aliases"))
        tags = _as_list(post.metadata.get("tags"))
        rel_path = path.relative_to(directory).as_posix()

        for heading, text in _split_sections(body):
            chunks.append(
                Chunk(
                    doc_id=doc_id,
                    title=title,
                    heading=heading,
                    text=text,
                    path=rel_path,
                    aliases=aliases,
                    tags=tags,
                )
            )

    if not chunks:
        raise ValueError(f"No markdown documents found in {directory}")

    _warn_on_oversized(chunks)

    return chunks


# ~4 chars per token for English prose. Only used to spot a chunk heading for
# trouble, so a rough estimate is fine.
_CHARS_PER_TOKEN = 4


def _warn_on_oversized(chunks: list[Chunk]) -> None:
    """Warn about chunks approaching the embedding window.

    Ollama truncates an over-long input silently, which would quietly corrupt
    that chunk's vector and degrade retrieval with nothing in the logs to
    explain it. Better to say so at startup.
    """
    budget = config.EMBED_NUM_CTX
    for chunk in chunks:
        estimated = len(chunk.embed_text) // _CHARS_PER_TOKEN
        if estimated > budget * 0.8:
            warnings.warn(
                f"Chunk '{chunk.chunk_id}' is ~{estimated} tokens, close to or "
                f"over OKF_EMBED_NUM_CTX={budget}. Ollama truncates silently, "
                f"which corrupts this chunk's embedding. Split the document "
                f"with '##' headings, or raise OKF_EMBED_NUM_CTX (costs RAM).",
                stacklevel=2,
            )


def corpus_fingerprint(chunks: list[Chunk]) -> str:
    """Content hash of the corpus. Invalidates the embedding cache on edit."""
    digest = hashlib.sha256()
    for chunk in chunks:
        digest.update(chunk.chunk_id.encode())
        digest.update(chunk.embed_text.encode())
    return digest.hexdigest()[:16]
