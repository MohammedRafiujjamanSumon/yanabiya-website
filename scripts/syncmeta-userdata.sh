#!/bin/bash
# SyncMeta EC2 user-data — recreation-proof boot script.
#
# Drop this into your PC deploy script as the instance user-data (replacing the
# old one) so a fresh instance comes up FULLY configured: updated app image,
# crawler (web/browser), shared network, swap. Both images live in ECR:
#   syncmeta:latest   — the app (merged: your PC build + chat-UI/Groq updates)
#   syncmeta:crawler  — Playwright crawler powering "With web" / "Browser"
#
# Keep your existing /etc/syncmeta.env block (API keys) where marked below.
set -xe
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y docker.io awscli wget
systemctl enable --now docker

# SSM agent so the box stays manageable in-place
(wget -q https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/debian_amd64/amazon-ssm-agent.deb -O /tmp/ssm.deb \
  && dpkg -i /tmp/ssm.deb && systemctl enable --now amazon-ssm-agent) || snap start amazon-ssm-agent || true

# Swap — required: 1GB RAM is too tight for Chromium + Node together
if ! swapon --show | grep -q .; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

mkdir -p /opt/syncmeta/data && chmod 777 /opt/syncmeta/data

ECR_HOST=078716600451.dkr.ecr.ap-southeast-1.amazonaws.com
ECR=$ECR_HOST/syncmeta
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin $ECR_HOST

# ── /etc/syncmeta.env ─────────────────────────────────────────────────────────
# >>> PASTE YOUR EXISTING ENV BLOCK HERE (API keys etc.) — then keep the line
# below, which wires the app to the crawler container:
grep -q '^CRAWLER_URL=' /etc/syncmeta.env || echo 'CRAWLER_URL=http://crawler:8000' >> /etc/syncmeta.env
# ──────────────────────────────────────────────────────────────────────────────

# Shared network so the app reaches the crawler by name
docker network create syncnet 2>/dev/null || true

# Crawler (web search + in-app browser)
docker pull $ECR:crawler
docker rm -f crawler 2>/dev/null || true
docker run -d --name crawler --restart always --network syncnet \
  -e RENDER_WORKERS=1 $ECR:crawler

# App
docker pull $ECR:latest
docker rm -f syncmeta 2>/dev/null || true
docker run -d --name syncmeta --restart always --network syncnet \
  -p 80:8080 -v /opt/syncmeta/data:/app/server/.data \
  --env-file /etc/syncmeta.env $ECR:latest
