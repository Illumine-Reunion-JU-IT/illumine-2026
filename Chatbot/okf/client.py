"""Thin Ollama client.

Uses the official `ollama` package directly rather than going through
LangChain/LangGraph. With retrieval handled in plain code, the graph machinery
in the previous implementation had nothing left to orchestrate — this is one
chat call and one embed call, and the direct client keeps the dependency
footprint (and cold-start time) small on a 2 vCPU VM.
"""

from __future__ import annotations

from typing import Iterator

from ollama import Client, ResponseError

from . import config


class OllamaUnavailable(RuntimeError):
    """The daemon is unreachable or the requested model is not installed."""


class OllamaClient:
    def __init__(
        self,
        host: str | None = None,
        chat_model: str | None = None,
        embed_model: str | None = None,
    ):
        self.host = host or config.OLLAMA_HOST
        self.chat_model = chat_model or config.CHAT_MODEL
        self.embed_model = embed_model or config.EMBED_MODEL
        self._client = Client(host=self.host, timeout=config.REQUEST_TIMEOUT)

    # --- Options ------------------------------------------------------------

    def _chat_options(self) -> dict:
        return {
            "temperature": config.TEMPERATURE,
            "num_ctx": config.NUM_CTX,
            "num_predict": config.NUM_PREDICT,
            "num_thread": config.NUM_THREAD,
        }

    # --- Health -------------------------------------------------------------

    def installed_models(self) -> list[str]:
        try:
            response = self._client.list()
        except Exception as exc:
            raise OllamaUnavailable(
                f"Cannot reach Ollama at {self.host}. Is `ollama serve` running?"
            ) from exc

        names: list[str] = []
        for model in response.get("models", []):
            name = model.get("model") or model.get("name")
            if name:
                names.append(name)
        return names

    def ensure_model(self, model: str) -> None:
        installed = self.installed_models()
        # Ollama reports bare names as `name:latest`; compare both forms.
        candidates = {model, f"{model}:latest", model.removesuffix(":latest")}
        if not candidates & set(installed):
            raise OllamaUnavailable(
                f"Model '{model}' is not installed.\n"
                f"Run:  ollama pull {model}\n"
                f"Installed: {', '.join(installed) or '(none)'}"
            )

    # --- Inference ----------------------------------------------------------

    def chat(self, messages: list[dict]) -> str:
        try:
            response = self._client.chat(
                model=self.chat_model,
                messages=messages,
                options=self._chat_options(),
                keep_alive=config.KEEP_ALIVE,
                think=False,
            )
        except ResponseError as exc:
            raise OllamaUnavailable(f"Ollama error: {exc}") from exc
        return (response.get("message", {}) or {}).get("content", "").strip()

    def stream_chat(self, messages: list[dict]) -> Iterator[str]:
        try:
            stream = self._client.chat(
                model=self.chat_model,
                messages=messages,
                options=self._chat_options(),
                keep_alive=config.KEEP_ALIVE,
                think=False,
                stream=True,
            )
            for part in stream:
                token = (part.get("message", {}) or {}).get("content", "")
                if token:
                    yield token
        except ResponseError as exc:
            raise OllamaUnavailable(f"Ollama error: {exc}") from exc

    def embed(self, text: str, is_query: bool = False) -> list[float]:
        """Embed text. Set `is_query` for the search side, not the corpus side.

        Qwen3 embedding models are asymmetric: queries are meant to carry a
        task instruction while documents are embedded bare. Embedding both
        sides identically measurably degrades retrieval.
        """
        if is_query:
            text = f"{config.EMBED_QUERY_INSTRUCTION}\nQuery: {text}"

        response = self._client.embeddings(
            model=self.embed_model,
            prompt=text,
            options={
                "num_thread": config.NUM_THREAD,
                # Sized independently of the chat window — see config for the
                # measured RAM this saves.
                "num_ctx": config.EMBED_NUM_CTX,
            },
            keep_alive=config.KEEP_ALIVE,
        )
        vector = response.get("embedding")
        if not vector:
            raise OllamaUnavailable(f"Empty embedding from '{self.embed_model}'")
        return list(vector)
