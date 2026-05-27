#!/usr/bin/env bash
# Manual Amplify deploy — same flow as .github/workflows/deploy-amplify.yml,
# but runnable locally when GitHub Actions is unavailable or you want to
# preview an unpushed build.
#
# Usage:   ./scripts/deploy.sh
# Needs:   aws CLI logged in (default profile = yanabiya-admin)
#          npm + node available

set -euo pipefail

APP_ID="d5va1xe1a6sj1"
BRANCH="main"
REGION="eu-west-1"

cd "$(dirname "$0")/.."

echo "▶ Building site…"
npm run build

echo "▶ Zipping dist/ …"
rm -f amplify-deploy.zip
( cd dist && zip -qr ../amplify-deploy.zip . )
ls -lh amplify-deploy.zip

echo "▶ Cancelling any stale pending jobs…"
aws amplify list-jobs --app-id "$APP_ID" --branch-name "$BRANCH" --region "$REGION" \
  --max-results 10 --query 'jobSummaries[?status==`PENDING`].jobId' --output text \
  | tr '\t' '\n' \
  | while read -r jid; do
      [ -z "$jid" ] && continue
      echo "  cancel $jid"
      aws amplify stop-job --app-id "$APP_ID" --branch-name "$BRANCH" \
                           --job-id "$jid" --region "$REGION" >/dev/null
    done

echo "▶ Creating deployment slot…"
RESP=$(aws amplify create-deployment --app-id "$APP_ID" --branch-name "$BRANCH" --region "$REGION")
JOB_ID=$(echo "$RESP" | python3 -c "import sys,json;print(json.load(sys.stdin)['jobId'])")
URL=$(  echo "$RESP" | python3 -c "import sys,json;print(json.load(sys.stdin)['zipUploadUrl'])")
echo "  job $JOB_ID"

echo "▶ Uploading zip…"
curl -sS -X PUT -T amplify-deploy.zip -H "Content-Type: application/zip" "$URL" \
  -w "  HTTP %{http_code} in %{time_total}s\n"

echo "▶ Starting deployment…"
aws amplify start-deployment --app-id "$APP_ID" --branch-name "$BRANCH" \
                             --job-id "$JOB_ID" --region "$REGION" >/dev/null

echo "▶ Waiting for SUCCEED…"
for i in $(seq 1 60); do
  STATUS=$(aws amplify get-job --app-id "$APP_ID" --branch-name "$BRANCH" \
                              --job-id "$JOB_ID" --region "$REGION" \
                              --query 'job.summary.status' --output text)
  printf "  [%2d] %s\n" "$i" "$STATUS"
  case "$STATUS" in
    SUCCEED)            echo "✅ Deployed. https://main.${APP_ID}.amplifyapp.com/"; rm -f amplify-deploy.zip; exit 0 ;;
    FAILED|CANCELLED)   echo "❌ $STATUS"; exit 1 ;;
  esac
  sleep 10
done
echo "⏱ Timed out waiting for $JOB_ID"; exit 1
