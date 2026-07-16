# OKF — JU IT 25th Reunion Chatbot

A grounded question-answering bot for the Jadavpur University Department of
Information Technology 25th Biannual Reunion (Silver Jubilee). It answers only
from the markdown knowledge base in `Knowledge/`, runs entirely on CPU via
[Ollama](https://ollama.com), and targets a 2 vCPU / 8 GB Ubuntu VM on either
ARM or x86.

## How it works

```
question ──► hybrid retrieval ──► prompt with context ──► answer
             (deterministic)        (qwen3.5:2b)
```

Retrieval is **plain Python, not an LLM tool call**. That is the central design
decision. A small model asked to choose a document is unreliable; a small model
handed the right document and told to summarise it is dependable. The model
never picks documents and never emits a tool call.

Retrieval fuses two signals with Reciprocal Rank Fusion:

- **BM25** (`okf/retrieval.py`) — lexical, hand-rolled, no dependencies.
- **Embeddings** (`qwen3-embedding:0.6b` via Ollama) — semantic, so "how much
  does it cost" finds a document that only says "fee".

RRF is used instead of normalising and adding scores because BM25 scores and
cosine similarities live on unrelated scales; only their orderings are
comparable.

There is no PyTorch, no numpy and no sentence-transformers anywhere in the
dependency tree. Everything is pure Python or ships universal wheels, so
`pip install` behaves identically on ARM and x86, and nothing multi-GB gets
downloaded onto a small VM.

## Layout

| Path | Purpose |
|---|---|
| `okf/config.py` | All tunables, every one env-overridable |
| `okf/knowledge.py` | Loads and chunks `Knowledge/*.md` |
| `okf/retrieval.py` | BM25 + embeddings + RRF |
| `okf/client.py` | Ollama chat/embed wrapper |
| `okf/engine.py` | The RAG pipeline and system prompt |
| `main.py` | Interactive CLI |
| `server.py` | FastAPI service |
| `bench.py` / `evalset.py` | Model benchmark and golden eval set |

## Local setup (macOS or Linux)

```bash
brew install ollama && ollama serve      # Linux: curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen3.5:2b
ollama pull qwen3-embedding:0.6b

cd Chatbot
python3 -m venv .venv && ./.venv/bin/pip install -r requirements.txt

./.venv/bin/python main.py --check       # verify the environment
./.venv/bin/python main.py               # chat
```

## Serving

```bash
./.venv/bin/uvicorn server:app --host 0.0.0.0 --port 8000
```

| Endpoint | Purpose |
|---|---|
| `GET /health` | Liveness and active config |
| `POST /chat` | `{"message": "...", "thread_id": "..."}` → answer + sources |
| `POST /chat/stream` | Same, streamed as newline-delimited JSON |
| `POST /reset` | Clear a thread's history |

`/chat/stream` emits a `sources` event before generation starts, so the UI can
render citations without waiting out the completion — worth doing, because CPU
inference is slow enough that time-to-first-token is what users feel.

## Model choice

`qwen3.5:2b` is the default, chosen on measurements from `python bench.py`
(3 runs per case, `num_thread=2` to match the target vCPU count):

| model | retrieval | grounded | refused-when-absent | mean latency |
|---|---|---|---|---|
| `qwen3.5:0.8b` | 8/8 | 20/21 | 21/21 | 1.08s |
| `qwen3.5:2b` | 8/8 | **21/21** | **21/21** | 1.63s |

The scores understate the gap. Asked *"Can I bring my family to the dinner?"* —
which the knowledge base does not answer — `0.8b` replied **"No, you cannot"**,
**"No, you cannot"**, then **"Yes, you can"** across three runs, each with total
confidence. It invents a policy and is not consistent about which one. It also
told current students they were "not eligible to attend" while
`registration.md`, sitting in its own prompt, says they must register to attend.

`2b` was clean on every case, for ~1.5x the latency.

**Caveat on those latencies: they are GPU numbers.** Ollama offloaded to Metal
on the machine they were measured on, despite `num_thread=2` being set — see
"CPU is 12x slower than GPU" above. The **ratio** between the two models holds;
the absolute figures only apply if you deploy with a GPU.

To reconsider, run `python bench.py --repeat 3` **on the VM itself**, and check
`ollama ps` to confirm whether it says `100% GPU` or `100% CPU` before believing
any number it prints.

## Evaluating changes

```bash
./.venv/bin/python bench.py --repeat 3            # all candidate models
./.venv/bin/python bench.py --models qwen3.5:2b   # just the default
```

`evalset.py` holds the golden cases. Roughly half assert **refusals** — the
questions the knowledge base cannot answer (an exact date, a fee in rupees, a
phone number, whether guests are allowed). Those matter more than the happy
path: an alumnus who is told the wrong thing books a flight or brings a guest
who is turned away. **Add a case whenever you add a document**, especially for
what the new document does *not* say.

## Adding knowledge

Drop a markdown file in `Knowledge/` with frontmatter:

```markdown
---
title: Travel and Accommodation
description: Getting to campus, and where to stay.
aliases: [hotels, lodging, how to reach]
tags: [travel, accommodation]
---
# Travel and Accommodation
...
```

- `title`, `aliases` and `tags` are weighted ~3x above body text in BM25, so
  aliases are the cheapest way to fix a question that retrieves the wrong doc.
- `type: index` or `retrieval: false` excludes a file from retrieval. Use it for
  any table of contents or navigation page you add: the corpus originally had an
  `index.md` that linked to every other document, and because it name-dropped
  every topic it ranked first for almost every question while containing no
  answers, crowding out the document that did. It has since been deleted, but
  the exclusion remains for the next one.
- Relative links like `[Schedule](./schedule.md)` are stripped automatically.
  Without that, the model copies them into answers and users get dead links to
  server-side paths. Absolute `https://` links are preserved.
- Documents over ~900 characters are split by `##` heading.
- The embedding cache in `.cache/` is keyed by corpus content hash and rebuilds
  itself on edit. No need to clear it.

## Deploying to Ubuntu (2 vCPU / 8 GB, ARM or x86)

```bash
curl -fsSL https://ollama.com/install.sh | sh     # detects arm64/amd64
sudo apt install -y python3-venv

cd /opt/illumine/Chatbot
python3 -m venv .venv && ./.venv/bin/pip install -r requirements.txt
ollama pull qwen3.5:2b && ollama pull qwen3-embedding:0.6b
./.venv/bin/python main.py --check
```

Then install the units in `deploy/` (see `deploy/README.md`).

### Resource requirements (measured, not estimated)

| | Resident |
|---|---|
| `qwen3.5:2b` | 2.4 GB on GPU / 2.9 GB on CPU |
| `qwen3-embedding:0.6b` | 1.3 GB (at `OKF_EMBED_NUM_CTX=1024`) |
| Python + FastAPI | ~0.05 GB |
| **Total** | **~3.7–4.3 GB** |

8 GB is comfortable; 4 GB is not enough. If memory gets tight, set
`OKF_USE_EMBEDDINGS=0` to drop the embedding model entirely and fall back to
BM25-only — retrieval degrades but keeps working.

**On a GPU VM you need ~4 GB of VRAM — 6–8 GB is plenty.** Do not overbuy.
2 vCPU is fine, because the GPU does the work.

### CPU is 12x slower than GPU — plan accordingly

This is the single most important operational fact here, and it is easy to
measure wrong. Ollama on an Apple machine silently offloads to the Metal GPU
(`ollama ps` shows `100% GPU`), so a benchmark run on a Mac reports GPU speed no
matter what `num_thread` is set to. Forcing CPU-only (`num_gpu=0`) with the real
prompt:

| threads | prompt (952 tok) | answer (57 tok) | total |
|---|---|---|---|
| 2 | 6.30s | 2.28s | **8.78s** |
| 4 | 4.34s | 2.02s | **6.60s** |
| 8 | 3.37s | 2.10s | **5.76s** |

versus **~1.6s on GPU**. Two things follow:

- **Prompt processing dominates**, not generation. Extra vCPUs mostly buy faster
  prompt eval, with sharp diminishing returns past 4.
- These are M2 Pro cores. A cloud vCPU is slower, so CPU-only on 2 vCPU is
  realistically 12–20s per answer. Workable only with streaming; unpleasant for
  a public site. **4 vCPU minimum if there is no GPU.**

### Configuration

Every value in `okf/config.py` is env-overridable. The ones that matter on a VM:

| Variable | Default | Notes |
|---|---|---|
| `OKF_CHAT_MODEL` | `qwen3.5:2b` | Re-run `bench.py` before changing |
| `OKF_EMBED_MODEL` | `qwen3-embedding:0.6b` | |
| `OKF_USE_EMBEDDINGS` | `1` | `0` = BM25-only, saves ~0.7 GB |
| `OKF_NUM_THREAD` | `2` | Match vCPUs; Ollama otherwise grabs every core and starves the web process |
| `OKF_KEEP_ALIVE` | `30m` | Keep the model resident; cold-loading dominates latency |
| `OKF_TOP_K` | `4` | Chunks per answer |
| `OKF_CORS_ORIGINS` | `http://localhost:3000` | **Set to the real site origin in production** |

## Known limitations

- **Grounding is very good, not guaranteed.** `2b` passed every case on repeated
  runs, but one benchmark run flagged a possible fabricated date on *"What is
  the exact date of the reunion?"* that did not reproduce in 16 further attempts
  (~5% or rarer). Sampling means rare fabrications are always possible, so a
  single clean `bench.py` run is weaker evidence than it looks — use
  `--repeat 5` or more when evaluating a change, and do not describe this bot to
  alumni as authoritative for dates, fees or policies.
- **Sources are currently uninformative.** With 4 documents and `TOP_K=4`,
  every answer cites all 4. This resolves itself as `Knowledge/` grows toward
  15 files; until then treat the source list as decorative.
- **Latency is unmeasured on the real target.** All numbers come from an M2 Pro,
  and the headline ones are GPU-accelerated (Metal) even though `num_thread=2`
  was set — `num_thread` is close to irrelevant when Ollama offloads to a GPU.
  Re-run `bench.py` on the VM, and check `ollama ps` for `100% GPU` vs
  `100% CPU`, before promising anyone a response time.
- **No auth or rate limiting.** Anyone who can reach the port can spend your
  CPU. Put it behind the Next.js app or a reverse proxy with rate limiting
  before exposing it publicly.
- **History is in-process memory.** It dies on restart and does not survive
  more than one worker. Do not run uvicorn with `--workers > 1` without moving
  history to a shared store.
