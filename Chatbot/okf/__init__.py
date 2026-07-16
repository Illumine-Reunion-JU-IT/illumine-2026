"""OKF — the Illumine / JU IT 25th Reunion knowledge chatbot."""

from .client import OllamaClient, OllamaUnavailable
from .engine import Answer, OKFEngine
from .knowledge import Chunk, load_chunks
from .retrieval import Hit, Retriever

__all__ = [
    "Answer",
    "Chunk",
    "Hit",
    "OKFEngine",
    "OllamaClient",
    "OllamaUnavailable",
    "Retriever",
    "load_chunks",
]
