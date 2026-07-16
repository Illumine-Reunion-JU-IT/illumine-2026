# Deploying OKF on the Ubuntu VM

Target: 2 vCPU / 8 GB, Ubuntu, ARM or x86. Nothing here is architecture-specific
— the Ollama installer detects arm64 vs amd64, and the Python dependencies are
pure Python or universal wheels.

## 1. Install

```bash
curl -fsSL https://ollama.com/install.sh | sh
sudo apt install -y python3-venv

sudo useradd --system --create-home --home-dir /opt/illumine okf
sudo -u okf git clone <repo> /opt/illumine
cd /opt/illumine/Chatbot

sudo -u okf python3 -m venv .venv
sudo -u okf ./.venv/bin/pip install -r requirements.txt
sudo -u okf ollama pull qwen3.5:2b
sudo -u okf ollama pull qwen3-embedding:0.6b
```

## 2. Verify before wiring up systemd

```bash
sudo -u okf ./.venv/bin/python main.py --check
sudo -u okf ./.venv/bin/python bench.py --repeat 3 --models qwen3.5:2b
```

Run the benchmark **on the VM**. The numbers in the top-level README come from
an M2 Pro and are optimistic; this tells you the real latency, and whether the
model is still grounded on the hardware you are shipping.

## 3. Install the service

```bash
sudo cp deploy/okf.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now okf.service
sudo systemctl status okf.service
curl -s localhost:8000/health
```

## 4. Expose it

The unit binds `127.0.0.1` deliberately — the service has **no auth and no rate
limiting**, so anyone who can reach the port can spend your two vCPUs. Put it
behind the Next.js app or a reverse proxy that terminates TLS and rate-limits.

Nginx, if the site is not proxying it itself:

```nginx
location /api/chat/ {
    limit_req zone=okf burst=5 nodelay;
    proxy_pass http://127.0.0.1:8000/;
    proxy_buffering off;          # required: /chat/stream is streamed
    proxy_read_timeout 120s;      # CPU inference is slow
}
```

`proxy_buffering off` is not optional. With buffering on, nginx holds the
streamed response until it completes, and the streaming endpoint behaves exactly
like the blocking one.

## Operating notes

- **First request after a restart is slow.** The model loads from disk on the
  first call. `OKF_KEEP_ALIVE=30m` keeps it resident; on a quiet site it will
  still cold-start after idle periods. A cron'd `curl localhost:8000/health` is
  not enough — health does not touch the model. Send a real question if you want
  it warm.
- **Adding knowledge requires a restart.** The corpus is loaded once at startup.
  `sudo systemctl restart okf` after editing `Knowledge/`.
- **The embedding cache rebuilds on corpus change.** It is keyed by content
  hash, so the first startup after an edit is slower while it re-embeds.
- **Memory:** ~3.6 GB resident of 8 GB. If it ever gets tight, set
  `OKF_USE_EMBEDDINGS=0` to drop the embedding model (~0.7 GB) and fall back to
  BM25-only.
- **Logs:** `journalctl -u okf -f`.
