"""Benchmark OKF across chat models.

    python bench.py                          # compare the default candidates
    python bench.py --models qwen3.5:0.8b
    python bench.py --repeat 3               # steadier latency numbers

Reports retrieval accuracy, answer grounding, hallucination rate and latency,
so the model choice is made on data rather than on vibes. Latency on an M2 Pro
is optimistic relative to the 2 vCPU target VM — treat the ratio between models
as the transferable signal, not the absolute milliseconds.
"""

from __future__ import annotations

import argparse
import statistics
import time

from evalset import CASES, contains_term, looks_like_refusal, matches_pattern
from okf import OKFEngine, OllamaUnavailable
from okf.client import OllamaClient

# Only the shipped model by default. 0.8b was evaluated and rejected (see
# okf/config.py); it is no longer installed, so listing it here would just warn
# on every run. To compare candidates again:
#   ollama pull qwen3.5:0.8b
#   python bench.py --models qwen3.5:2b qwen3.5:0.8b --repeat 5
DEFAULT_MODELS = ["qwen3.5:2b"]


def _fmt(value: float) -> str:
    return f"{value / 1000:.2f}s"


def run_model(model: str, repeat: int) -> dict | None:
    client = OllamaClient(chat_model=model)
    try:
        client.ensure_model(model)
    except OllamaUnavailable as exc:
        print(f"  skipping {model}: {exc}")
        return None

    engine = OKFEngine(client=client)

    # Warm the model so the first case doesn't absorb load-from-disk time.
    try:
        engine.client.chat([{"role": "user", "content": "hi"}])
    except OllamaUnavailable as exc:
        print(f"  skipping {model}: {exc}")
        return None

    retrieval_ok = 0
    retrieval_total = 0
    grounded_ok = 0
    grounded_total = 0
    refusal_ok = 0
    refusal_total = 0
    hallucinations: list[str] = []
    latencies: list[float] = []

    for case in CASES:
        # Fresh thread per case: conversation history would otherwise leak
        # facts between cases and mask a retrieval failure.
        thread = f"bench-{abs(hash(case.query))}"

        hits = engine.retrieve(case.query, thread_id=thread)
        if case.expect_doc:
            retrieval_total += 1
            if hits and hits[0].chunk.doc_id == case.expect_doc:
                retrieval_ok += 1

        # Every repeat is scored, not just the last. Sampling makes grounding
        # failures intermittent — a model that fabricates a date one run in
        # three is not a model that passes.
        for _ in range(repeat):
            engine.reset(thread)
            start = time.perf_counter()
            answer = engine.ask(case.query, thread_id=thread)
            latencies.append((time.perf_counter() - start) * 1000)
            text = answer.text

            if case.expect_refusal:
                refusal_total += 1
                if looks_like_refusal(text):
                    refusal_ok += 1
                else:
                    hallucinations.append(f"[no refusal] {case.query} -> {text[:85]}")

            if case.must_include:
                grounded_total += 1
                missing = [
                    term for term in case.must_include if not contains_term(text, term)
                ]
                if not missing:
                    grounded_ok += 1
                else:
                    hallucinations.append(
                        f"[missing {missing}] {case.query} -> {text[:70]}"
                    )

            for term in case.must_not_include:
                if contains_term(text, term):
                    hallucinations.append(
                        f"[fabricated '{term}'] {case.query} -> {text[:70]}"
                    )

            for pattern in case.forbid_patterns:
                found = matches_pattern(text, pattern)
                if found:
                    hallucinations.append(
                        f"[fabricated /{pattern[:22]}../] {case.query} -> {text[:60]}"
                    )

    return {
        "model": model,
        "retrieval": (retrieval_ok, retrieval_total),
        "grounded": (grounded_ok, grounded_total),
        "refusal": (refusal_ok, refusal_total),
        "hallucinations": hallucinations,
        "mean_ms": statistics.mean(latencies),
        "p50_ms": statistics.median(latencies),
        "max_ms": max(latencies),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Benchmark OKF chat models")
    parser.add_argument("--models", nargs="+", default=DEFAULT_MODELS)
    parser.add_argument("--repeat", type=int, default=1)
    args = parser.parse_args()

    results = []
    for model in args.models:
        print(f"\n\033[1m=== {model} ===\033[0m")
        result = run_model(model, args.repeat)
        if not result:
            continue
        results.append(result)
        print(
            f"  retrieval top-1 {result['retrieval'][0]}/{result['retrieval'][1]}  "
            f"grounded {result['grounded'][0]}/{result['grounded'][1]}  "
            f"refused-when-absent {result['refusal'][0]}/{result['refusal'][1]}"
        )
        print(
            f"  latency mean {_fmt(result['mean_ms'])}  "
            f"p50 {_fmt(result['p50_ms'])}  max {_fmt(result['max_ms'])}"
        )
        for issue in result["hallucinations"]:
            print(f"    \033[31m! {issue}\033[0m")

    if len(results) > 1:
        print(f"\n\033[1m=== summary ===\033[0m")
        header = f"{'model':<16}{'retr':>8}{'ground':>8}{'refuse':>8}{'mean':>9}"
        print(header)
        for result in results:
            print(
                f"{result['model']:<16}"
                f"{result['retrieval'][0]}/{result['retrieval'][1]:>6}"
                f"{result['grounded'][0]}/{result['grounded'][1]:>6}"
                f"{result['refusal'][0]}/{result['refusal'][1]:>6}"
                f"{_fmt(result['mean_ms']):>9}"
            )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
