#!/usr/bin/env bash
# Read-only AWS + live-server health check.
# Prints who you are, what EC2 instances exist, which ports are open, and
# whether the live site responds. Makes NO changes to any AWS resource.
#
# Usage:   ./scripts/check-aws.sh
# Needs:   aws CLI + valid credentials (env vars or ~/.aws/credentials)
#          python3 (for JSON parsing)
#
# Credentials are read from the environment / ~/.aws — this script never
# contains or prints secret keys.

set -uo pipefail

EC2_REGION="${EC2_REGION:-ap-southeast-1}"   # live server is in Singapore
AMPLIFY_REGION="${AMPLIFY_REGION:-eu-west-1}" # Amplify app d5va1xe1a6sj1
LIVE_HOST="${LIVE_HOST:-13.251.152.2}"

hr() { printf '\n════ %s ════\n' "$1"; }

# ── 0. Tooling ────────────────────────────────────────────────────────────
# Auto-install the AWS CLI if missing (pypi is reachable from the sandbox).
if ! command -v aws >/dev/null 2>&1; then
  echo "ℹ️  aws CLI not found — installing via pip…"
  if command -v pip3 >/dev/null 2>&1; then
    pip3 install --quiet awscli 2>/dev/null || true
  fi
fi
if ! command -v aws >/dev/null 2>&1; then
  echo "❌ Could not install the aws CLI automatically."
  echo "   Install it manually (pip3 install awscli) and re-run."
  exit 1
fi

# ── 1. Who am I? ──────────────────────────────────────────────────────────
hr "Identity (sts get-caller-identity)"
if ! aws sts get-caller-identity --output table; then
  echo
  echo "❌ Credentials are missing or invalid — nothing else will work."
  echo "   Set AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY (or ~/.aws/credentials)"
  echo "   for an IAM user in account 078716600451, then re-run."
  exit 1
fi

# ── 2. EC2 instances ──────────────────────────────────────────────────────
hr "EC2 instances in $EC2_REGION"
aws ec2 describe-instances --region "$EC2_REGION" \
  --query 'Reservations[].Instances[].{ID:InstanceId,State:State.Name,Type:InstanceType,PublicIP:PublicIpAddress,Name:Tags[?Key==`Name`]|[0].Value}' \
  --output table \
  || echo "⚠️  Could not list instances (permission or region issue)."

# ── 3. Security groups (open ports) ───────────────────────────────────────
hr "Security groups / inbound rules in $EC2_REGION"
aws ec2 describe-security-groups --region "$EC2_REGION" \
  --query 'SecurityGroups[].{Group:GroupName,ID:GroupId,Ingress:IpPermissions[].{Proto:IpProtocol,From:FromPort,To:ToPort,CIDR:IpRanges[].CidrIp|join(`,`,@)}}' \
  --output json \
  || echo "⚠️  Could not list security groups."

# ── 4. Amplify apps ───────────────────────────────────────────────────────
hr "Amplify apps in $AMPLIFY_REGION"
aws amplify list-apps --region "$AMPLIFY_REGION" \
  --query 'apps[].{Name:name,AppId:appId,Domain:defaultDomain,Repo:repository}' \
  --output table \
  || echo "⚠️  Could not list Amplify apps."

# ── 5. Live site reachability ─────────────────────────────────────────────
hr "Live site http://$LIVE_HOST"
if curl -sS -I --max-time 15 "http://$LIVE_HOST/" 2>&1 | head -20; then
  :
else
  echo "⚠️  Could not reach $LIVE_HOST — network egress may block it from"
  echo "    this sandbox even though AWS API calls succeed. Run from a host"
  echo "    that can reach the server directly if so."
fi

hr "Done"
