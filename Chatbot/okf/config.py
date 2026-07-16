"""Central configuration for the OKF chatbot.

Every tunable is env-overridable so the Ubuntu VM can be configured without a
code change. Defaults are chosen for the target box: 2 vCPU / 8 GB, CPU-only.
"""

from __future__ import annotations

import os
from pathlib import Path


def _env_str(name: str, default: str) -> str:
    return os.environ.get(name, default).strip() or default


def _env_int(name: str, default: int) -> int:
    try:
        return int(os.environ.get(name, default))
    except (TypeError, ValueError):
        return default


def _env_float(name: str, default: float) -> float:
    try:
        return float(os.environ.get(name, default))
    except (TypeError, ValueError):
        return default


def _env_bool(name: str, default: bool) -> bool:
    raw = os.environ.get(name)
    if raw is None:
        return default
    return raw.strip().lower() in {"1", "true", "yes", "on"}


# --- Paths ------------------------------------------------------------------
# Resolved from this file, NOT the process working directory. The VM's systemd
# unit and a local `python main.py` must resolve the same folder, and the name
# is case-exact because ext4 is case-sensitive while macOS APFS is not.
PACKAGE_DIR = Path(__file__).resolve().parent
CHATBOT_DIR = PACKAGE_DIR.parent
KNOWLEDGE_DIR = Path(_env_str("OKF_KNOWLEDGE_DIR", str(CHATBOT_DIR / "Knowledge")))
CACHE_DIR = Path(_env_str("OKF_CACHE_DIR", str(CHATBOT_DIR / ".cache")))


# --- Ollama -----------------------------------------------------------------
OLLAMA_HOST = _env_str("OLLAMA_HOST", "http://localhost:11434")

# qwen3.5:2b, not 0.8b. Measured on this corpus with `python bench.py`:
#
#   model         retrieval  grounded  refused-when-absent  mean latency
#   qwen3.5:0.8b       8/8     20/21                21/21         1.08s
#   qwen3.5:2b         8/8     21/21                21/21         1.63s
#
# The scores hide the actual problem. Asked "Can I bring my family to the
# dinner?" — which the knowledge base does not answer — 0.8b replied "No, you
# cannot", "No, you cannot", then "Yes, you can" across three runs, each
# stated with full confidence. It invents a policy and is not even consistent
# about which one. It also contradicted a document in its own prompt, telling
# current students they were "not eligible to attend" when registration.md
# says they must register to attend.
#
# 2b was clean on every case, for ~1.5x the latency. Set
# OKF_CHAT_MODEL=qwen3.5:0.8b to trade that back, but re-run bench.py first.
#
# Those latencies are GPU numbers: Ollama offloads to Metal on Apple hardware
# regardless of NUM_THREAD, so they do NOT describe a CPU-only VM. Measured
# CPU-only with the real prompt: 8.8s at 2 threads, 6.6s at 4, vs ~1.6s on GPU,
# with prompt processing (not generation) the dominant cost. Check `ollama ps`
# for "100% GPU" vs "100% CPU" before trusting any benchmark number.
CHAT_MODEL = _env_str("OKF_CHAT_MODEL", "qwen3.5:2b")
EMBED_MODEL = _env_str("OKF_EMBED_MODEL", "qwen3-embedding:0.6b")

# Qwen3 embedding models are asymmetric and expect an instruction on the query
# side only. Harmless for symmetric models, which ignore the extra tokens.
EMBED_QUERY_INSTRUCTION = _env_str(
    "OKF_EMBED_QUERY_INSTRUCTION",
    "Instruct: Given a question about the JU IT reunion, retrieve the "
    "knowledge base passage that answers it",
)

# Semantic retrieval is a strict upgrade when it works, but it costs a second
# resident model (~1.2 GB). Disable to run BM25-only on a constrained box.
USE_EMBEDDINGS = _env_bool("OKF_USE_EMBEDDINGS", True)

# 2 vCPU: leave headroom for the web layer. Ollama defaults to all cores, which
# starves the API process under concurrent load.
NUM_THREAD = _env_int("OKF_NUM_THREAD", 2)

# Keep models resident. Cold-loading a 1 GB model per request dominates latency.
KEEP_ALIVE = _env_str("OKF_KEEP_ALIVE", "30m")

TEMPERATURE = _env_float("OKF_TEMPERATURE", 0.2)
NUM_CTX = _env_int("OKF_NUM_CTX", 4096)

# The embedding model gets its own, much smaller window. It only ever sees one
# chunk at a time (~160 tokens today), but Ollama sizes its buffer from num_ctx
# and defaults it to the same 4096 as the chat model. Measured resident cost:
#
#    num_ctx=4096 -> 2.2 GB      num_ctx=1024 -> 1.3 GB
#    num_ctx=2048 -> 2.0 GB      num_ctx= 512 -> 979 MB
#
# 1024 keeps ~6x headroom over the longest chunk and returns ~0.9 GB. Do not
# set it below the longest chunk: an over-long input is truncated silently, and
# retrieval degrades with nothing in the logs. load_chunks() warns if any chunk
# gets close.
EMBED_NUM_CTX = _env_int("OKF_EMBED_NUM_CTX", 1024)
NUM_PREDICT = _env_int("OKF_NUM_PREDICT", 512)
REQUEST_TIMEOUT = _env_float("OKF_REQUEST_TIMEOUT", 120.0)


# --- Retrieval --------------------------------------------------------------
TOP_K = _env_int("OKF_TOP_K", 4)
RRF_K = _env_int("OKF_RRF_K", 60)  # Standard RRF damping constant.

# How deep each retriever's candidate list runs before fusion. RRF must be
# fused over per-retriever top-N lists, not the whole corpus: cosine similarity
# is nonzero for every chunk, so the embedding side would otherwise rank all N
# documents and nothing would ever be excluded from context.
CANDIDATE_DEPTH = _env_int("OKF_CANDIDATE_DEPTH", max(TOP_K * 2, 8))

# Conversation turns fed back into the retrieval query, so "what time?" after
# "tell me about day 1" still retrieves the schedule.
HISTORY_TURNS_FOR_RETRIEVAL = _env_int("OKF_HISTORY_TURNS", 2)
MAX_HISTORY_MESSAGES = _env_int("OKF_MAX_HISTORY", 8)
