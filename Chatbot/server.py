"""FastAPI server for the OKF chatbot.

    uvicorn server:app --host 0.0.0.0 --port 8000

Endpoints:
    GET  /health          liveness + config, for the VM's healthcheck
    POST /chat            {"message": "...", "thread_id": "..."} -> answer JSON
    POST /chat/stream     same, streamed as newline-delimited JSON
    POST /reset           clear a thread's history

The engine is built once at startup: loading the corpus and embedding it per
request would dominate latency on 2 vCPU.
"""

from __future__ import annotations

import json
import os
from contextlib import asynccontextmanager
from typing import Iterator

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from okf import OKFEngine, OllamaUnavailable
from okf import config

_state: dict = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Build eagerly so a misconfigured VM fails at boot — where systemd will
    # report it — rather than on a visitor's first question.
    _state["engine"] = OKFEngine()
    yield
    _state.clear()


app = FastAPI(title="OKF — JU IT Reunion Chatbot", lifespan=lifespan)

# The Next.js site is served from a different origin. Defaults are dev-only;
# set OKF_CORS_ORIGINS to the real origin(s) in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in os.environ.get(
            "OKF_CORS_ORIGINS", "http://localhost:3000"
        ).split(",")
        if origin.strip()
    ],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


def _engine() -> OKFEngine:
    engine = _state.get("engine")
    if engine is None:
        raise HTTPException(status_code=503, detail="engine not ready")
    return engine


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    thread_id: str = Field(default="default", max_length=128)


class ThreadRequest(BaseModel):
    thread_id: str = Field(default="default", max_length=128)


class Source(BaseModel):
    title: str
    path: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]


@app.get("/health")
def health() -> dict:
    engine = _state.get("engine")
    if engine is None:
        raise HTTPException(status_code=503, detail="engine not ready")
    return {"status": "ok", **engine.describe()}


def _sources(answer) -> list[Source]:
    seen: dict[str, str] = {}
    for hit in answer.hits:
        seen.setdefault(hit.chunk.path, hit.chunk.title)
    return [Source(title=title, path=path) for path, title in seen.items()]


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    try:
        answer = _engine().ask(request.message, thread_id=request.thread_id)
    except OllamaUnavailable as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    return ChatResponse(answer=answer.text, sources=_sources(answer))


@app.post("/chat/stream")
def chat_stream(request: ChatRequest) -> StreamingResponse:
    engine = _engine()

    def generate() -> Iterator[str]:
        # Sources are resolved before generation so the UI can render them
        # immediately, rather than waiting out the whole completion.
        try:
            hits = engine.retrieve(request.message, thread_id=request.thread_id)
            payload = [
                {"title": hit.chunk.title, "path": hit.chunk.path} for hit in hits
            ]
            yield json.dumps({"type": "sources", "sources": payload}) + "\n"

            for token in engine.stream(request.message, thread_id=request.thread_id):
                yield json.dumps({"type": "token", "text": token}) + "\n"

            yield json.dumps({"type": "done"}) + "\n"
        except OllamaUnavailable as exc:
            yield json.dumps({"type": "error", "error": str(exc)}) + "\n"

    return StreamingResponse(
        generate(),
        media_type="application/x-ndjson",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@app.post("/reset")
def reset(request: ThreadRequest) -> dict:
    _engine().reset(request.thread_id)
    return {"status": "ok"}
