"""Interactive CLI for the OKF reunion chatbot.

    python main.py                 # chat
    python main.py --ask "..."     # one-shot
    python main.py --check         # verify environment, then exit

Programmatic use:

    from okf import OKFEngine
    engine = OKFEngine()
    print(engine.ask("How do I register?").text)
"""

from __future__ import annotations

import argparse
import sys

from okf import OKFEngine, OllamaUnavailable
from okf.client import OllamaClient


def _preflight(client: OllamaClient, need_embeddings: bool) -> None:
    """Fail loudly and early with an actionable message, not a stack trace."""
    client.ensure_model(client.chat_model)
    if need_embeddings:
        try:
            client.ensure_model(client.embed_model)
        except OllamaUnavailable as exc:
            print(f"warning: {exc}", file=sys.stderr)
            print(
                "         Continuing with keyword-only retrieval.\n",
                file=sys.stderr,
            )


def _print_sources(answer) -> None:
    if answer.sources:
        print(f"\n  \033[2msources: {', '.join(answer.sources)}\033[0m")


def main() -> int:
    parser = argparse.ArgumentParser(description="OKF — JU IT reunion chatbot")
    parser.add_argument("--ask", metavar="QUESTION", help="ask one question and exit")
    parser.add_argument("--model", help="override the chat model")
    parser.add_argument("--check", action="store_true", help="run preflight and exit")
    parser.add_argument(
        "--no-stream", action="store_true", help="wait for the full answer"
    )
    args = parser.parse_args()

    from okf import config

    client = OllamaClient(chat_model=args.model)

    try:
        _preflight(client, need_embeddings=config.USE_EMBEDDINGS)
        engine = OKFEngine(client=client)
    except OllamaUnavailable as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    except (FileNotFoundError, ValueError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1

    info = engine.describe()
    print(
        f"\033[1mOKF\033[0m — {info['chat_model']} · {info['retrieval_mode']} · "
        f"{info['documents']} docs / {info['chunks']} chunks"
    )

    if args.check:
        print("preflight ok")
        return 0

    if args.ask:
        answer = engine.ask(args.ask)
        print(f"\n{answer.text}")
        _print_sources(answer)
        return 0

    print("Ask about the reunion. Ctrl-C or 'exit' to quit.\n")

    while True:
        try:
            query = input("\033[1m>\033[0m ").strip()
        except (EOFError, KeyboardInterrupt):
            print()
            return 0

        if not query:
            continue
        if query.lower() in {"exit", "quit", ":q"}:
            return 0
        if query.lower() in {"reset", "clear"}:
            engine.reset()
            print("  (history cleared)\n")
            continue

        try:
            if args.no_stream:
                answer = engine.ask(query)
                print(f"\n{answer.text}")
                _print_sources(answer)
            else:
                print()
                for token in engine.stream(query):
                    print(token, end="", flush=True)
                print()
        except OllamaUnavailable as exc:
            print(f"error: {exc}", file=sys.stderr)
        print()


if __name__ == "__main__":
    raise SystemExit(main())
