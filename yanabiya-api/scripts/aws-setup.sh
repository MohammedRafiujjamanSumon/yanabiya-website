#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
#  Yanabiya Group — Full AWS Setup Script
#  Creates: S3 bucket · IAM role · App Runner service · Amplify app
#  Region : eu-west-1 (Ireland)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

AWS="$HOME/.local/bin/aws"
REGION="eu-west-1"
GITHUB_REPO="https://github.com/MohammedRafiujjamanSumon/yanabiya-website"
GITHUB_BRANCH="main"
BUCKET="yanabiya-uploads-prod"
APP_RUNNER_NAME="yanabiya-api"
AMPLIFY_APP_NAME="yanabiya-website"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()    { echo -e "${GREEN}[✓]${NC} $1"; }
warn()    { echo -e "${YELLOW}[!]${NC} $1"; }
section() { echo -e "\n${GREEN}━━━ $1 ━━━${NC}"; }

# ─── 1. Verify AWS CLI is configured ────────────────────────────────────────
section "Checking AWS credentials"
IDENTITY=$($AWS sts get-caller-identity --region $REGION 2>&1) || {
  echo -e "${RED}ERROR:${NC} AWS credentials not configured."
  echo "Run:  ~/.local/bin/aws configure"
  echo "Then re-run this script."
  exit 1
}
ACCOUNT_ID=$(echo "$IDENTITY" | python3 -c "import sys,json; print(json.load(sys.stdin)['Account'])")
info "Connected as account $ACCOUNT_ID in $REGION"

# ─── 2. Collect secrets (not logged) ────────────────────────────────────────
section "Collecting secrets"
read -rsp "MongoDB Atlas URI (mongodb+srv://...): " MONGO_URI; echo
read -rsp "Admin email password for yanabiya panel: " ADMIN_PASSWORD; echo
JWT_SECRET=$(python3 -c "import secrets; print(secrets.token_hex(32))")
info "JWT secret generated"

# ─── 3. Create S3 bucket ─────────────────────────────────────────────────────
section "Creating S3 bucket: $BUCKET"
if $AWS s3api head-bucket --bucket "$BUCKET" --region $REGION 2>/dev/null; then
  warn "Bucket already exists — skipping creation"
else
  $AWS s3api create-bucket \
    --bucket "$BUCKET" \
    --region "$REGION" \
    --create-bucket-configuration LocationConstraint="$REGION"
  info "Bucket created"
fi

# Block public access (uploads served via pre-signed URLs or direct S3 URL)
$AWS s3api put-public-access-block \
  --bucket "$BUCKET" \
  --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Set CORS so the frontend can upload directly
$AWS s3api put-bucket-cors --bucket "$BUCKET" --cors-configuration '{
  "CORSRules": [{
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET","PUT","POST","DELETE","HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }]
}'
info "CORS policy set"

# Make uploads/ prefix publicly readable
$AWS s3api put-bucket-policy --bucket "$BUCKET" --policy "{
  \"Version\": \"2012-10-17\",
  \"Statement\": [{
    \"Sid\": \"PublicReadUploads\",
    \"Effect\": \"Allow\",
    \"Principal\": \"*\",
    \"Action\": \"s3:GetObject\",
    \"Resource\": \"arn:aws:s3:::${BUCKET}/uploads/*\"
  }]
}"
info "Bucket policy set (uploads/ publicly readable)"

# ─── 4. Create IAM role for App Runner ───────────────────────────────────────
section "Creating IAM role: YanabiyaAppRunnerTaskRole"
ROLE_NAME="YanabiyaAppRunnerTaskRole"
if $AWS iam get-role --role-name "$ROLE_NAME" 2>/dev/null; then
  warn "Role already exists — skipping"
else
  $AWS iam create-role \
    --role-name "$ROLE_NAME" \
    --assume-role-policy-document '{
      "Version": "2012-10-17",
      "Statement": [{
        "Effect": "Allow",
        "Principal": {"Service": "tasks.apprunner.amazonaws.com"},
        "Action": "sts:AssumeRole"
      }]
    }' > /dev/null
  info "Role created"
fi

$AWS iam put-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-name "S3FullAccess" \
  --policy-document "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [{
      \"Effect\": \"Allow\",
      \"Action\": [
        \"s3:GetObject\",\"s3:PutObject\",\"s3:DeleteObject\",
        \"s3:ListBucket\",\"s3:GetBucketLocation\"
      ],
      \"Resource\": [
        \"arn:aws:s3:::${BUCKET}\",
        \"arn:aws:s3:::${BUCKET}/*\"
      ]
    }]
  }"
info "S3 policy attached to role"

TASK_ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}"

# ─── 5. Create App Runner GitHub connection ───────────────────────────────────
section "Creating App Runner GitHub connection"
EXISTING_CONN=$($AWS apprunner list-connections --region $REGION \
  --query "ConnectionSummaryList[?ConnectionName=='yanabiya-github'].ConnectionArn" \
  --output text 2>/dev/null || true)

if [ -n "$EXISTING_CONN" ] && [ "$EXISTING_CONN" != "None" ]; then
  CONNECTION_ARN="$EXISTING_CONN"
  warn "Connection already exists: $CONNECTION_ARN"
else
  CONN_OUT=$($AWS apprunner create-connection \
    --connection-name "yanabiya-github" \
    --provider-type GITHUB \
    --region "$REGION")
  CONNECTION_ARN=$(echo "$CONN_OUT" | python3 -c "import sys,json; print(json.load(sys.stdin)['Connection']['ConnectionArn'])")
  info "Connection created: $CONNECTION_ARN"
fi

# Check if connection needs authorization
CONN_STATUS=$($AWS apprunner describe-custom-domains --service-arn "$CONNECTION_ARN" 2>/dev/null || true)
CONN_INFO=$($AWS apprunner list-connections --region $REGION \
  --query "ConnectionSummaryList[?ConnectionArn=='${CONNECTION_ARN}'].Status" \
  --output text 2>/dev/null || true)

if [ "$CONN_INFO" = "PENDING_HANDSHAKE" ] || [ -z "$CONN_INFO" ]; then
  echo ""
  warn "ACTION REQUIRED: You must authorize GitHub access in AWS Console."
  warn "Open this URL in your browser:"
  echo ""
  echo "  https://${REGION}.console.aws.amazon.com/apprunner/home?region=${REGION}#/connections"
  echo ""
  echo "  → Find 'yanabiya-github' → Click 'Complete handshake' → Authorize with GitHub"
  echo ""
  read -rp "Press ENTER after you have authorized GitHub in the browser... "
fi
info "GitHub connection ready"

# ─── 6. Create App Runner service ─────────────────────────────────────────────
section "Creating App Runner service: $APP_RUNNER_NAME"
EXISTING_SVC=$($AWS apprunner list-services --region $REGION \
  --query "ServiceSummaryList[?ServiceName=='${APP_RUNNER_NAME}'].ServiceArn" \
  --output text 2>/dev/null || true)

if [ -n "$EXISTING_SVC" ] && [ "$EXISTING_SVC" != "None" ]; then
  SERVICE_ARN="$EXISTING_SVC"
  warn "App Runner service already exists: $SERVICE_ARN"
else
  SVC_OUT=$($AWS apprunner create-service \
    --service-name "$APP_RUNNER_NAME" \
    --region "$REGION" \
    --source-configuration "{
      \"AuthenticationConfiguration\": {
        \"ConnectionArn\": \"${CONNECTION_ARN}\"
      },
      \"AutoDeploymentsEnabled\": true,
      \"CodeRepository\": {
        \"RepositoryUrl\": \"${GITHUB_REPO}\",
        \"SourceCodeVersion\": {
          \"Type\": \"BRANCH\",
          \"Value\": \"${GITHUB_BRANCH}\"
        },
        \"CodeConfiguration\": {
          \"ConfigurationSource\": \"API\",
          \"CodeConfigurationValues\": {
            \"Runtime\": \"NODEJS_18\",
            \"BuildCommand\": \"cd yanabiya-api && npm install --production\",
            \"StartCommand\": \"node yanabiya-api/server.js\",
            \"Port\": \"4000\",
            \"RuntimeEnvironmentVariables\": {
              \"PORT\": \"4000\",
              \"NODE_ENV\": \"production\",
              \"MONGO_URI\": \"${MONGO_URI}\",
              \"JWT_SECRET\": \"${JWT_SECRET}\",
              \"JWT_EXPIRES_IN\": \"7d\",
              \"ADMIN_EMAIL\": \"admin@yanabiyagroup.com\",
              \"ADMIN_PASSWORD\": \"${ADMIN_PASSWORD}\",
              \"S3_BUCKET\": \"${BUCKET}\",
              \"AWS_REGION\": \"${REGION}\"
            }
          }
        }
      }
    }" \
    --instance-configuration "{
      \"Cpu\": \"0.25 vCPU\",
      \"Memory\": \"0.5 GB\",
      \"InstanceRoleArn\": \"${TASK_ROLE_ARN}\"
    }" \
    --health-check-configuration "{
      \"Protocol\": \"HTTP\",
      \"Path\": \"/api/health\",
      \"Interval\": 10,
      \"Timeout\": 5,
      \"HealthyThreshold\": 1,
      \"UnhealthyThreshold\": 5
    }")

  SERVICE_ARN=$(echo "$SVC_OUT" | python3 -c "import sys,json; print(json.load(sys.stdin)['Service']['ServiceArn'])")
  info "App Runner service created: $SERVICE_ARN"
fi

# ─── 7. Wait for App Runner URL ───────────────────────────────────────────────
section "Waiting for App Runner to deploy (this takes 3–5 minutes)"
echo "Polling every 30 seconds..."
for i in $(seq 1 20); do
  STATUS=$($AWS apprunner describe-service \
    --service-arn "$SERVICE_ARN" \
    --region "$REGION" \
    --query "Service.Status" --output text)
  API_URL=$($AWS apprunner describe-service \
    --service-arn "$SERVICE_ARN" \
    --region "$REGION" \
    --query "Service.ServiceUrl" --output text)
  echo "  [$i/20] Status: $STATUS"
  if [ "$STATUS" = "RUNNING" ]; then
    info "App Runner is live at: https://$API_URL"
    break
  fi
  sleep 30
done

if [ "$STATUS" != "RUNNING" ]; then
  warn "Service is still deploying. Check the console for status."
  API_URL=$($AWS apprunner describe-service \
    --service-arn "$SERVICE_ARN" \
    --region "$REGION" \
    --query "Service.ServiceUrl" --output text)
fi
FULL_API_URL="https://${API_URL}"

# Add FRONTEND_URL to App Runner once we have the Amplify URL
# (We'll update it after Amplify is created)

# ─── 8. Create Amplify app ────────────────────────────────────────────────────
section "Creating Amplify app: $AMPLIFY_APP_NAME"
EXISTING_AMPLIFY=$($AWS amplify list-apps --region $REGION \
  --query "apps[?name=='${AMPLIFY_APP_NAME}'].appId" \
  --output text 2>/dev/null || true)

if [ -n "$EXISTING_AMPLIFY" ] && [ "$EXISTING_AMPLIFY" != "None" ]; then
  AMPLIFY_APP_ID="$EXISTING_AMPLIFY"
  warn "Amplify app already exists: $AMPLIFY_APP_ID"
else
  AMPLIFY_OUT=$($AWS amplify create-app \
    --name "$AMPLIFY_APP_NAME" \
    --region "$REGION" \
    --repository "$GITHUB_REPO" \
    --platform WEB \
    --environment-variables "VITE_API_URL=${FULL_API_URL}" \
    --build-spec "$(cat <<'BUILDSPEC'
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
BUILDSPEC
)")
  AMPLIFY_APP_ID=$(echo "$AMPLIFY_OUT" | python3 -c "import sys,json; print(json.load(sys.stdin)['app']['appId'])")
  info "Amplify app created: $AMPLIFY_APP_ID"
fi

# Create main branch
$AWS amplify create-branch \
  --app-id "$AMPLIFY_APP_ID" \
  --branch-name "$GITHUB_BRANCH" \
  --region "$REGION" \
  --enable-auto-build \
  --environment-variables "VITE_API_URL=${FULL_API_URL}" 2>/dev/null || \
  warn "Branch already exists or error — continuing"

# Start first deployment
AMPLIFY_DOMAIN=$($AWS amplify get-app \
  --app-id "$AMPLIFY_APP_ID" \
  --region "$REGION" \
  --query "app.defaultDomain" --output text)
AMPLIFY_URL="https://${GITHUB_BRANCH}.${AMPLIFY_DOMAIN}"
info "Amplify URL: $AMPLIFY_URL"

# Trigger first build
$AWS amplify start-job \
  --app-id "$AMPLIFY_APP_ID" \
  --branch-name "$GITHUB_BRANCH" \
  --job-type RELEASE \
  --region "$REGION" > /dev/null
info "First Amplify build triggered"

# ─── 9. Update App Runner with FRONTEND_URL ───────────────────────────────────
section "Updating App Runner with FRONTEND_URL"
$AWS apprunner update-service \
  --service-arn "$SERVICE_ARN" \
  --region "$REGION" \
  --source-configuration "{
    \"AuthenticationConfiguration\": {
      \"ConnectionArn\": \"${CONNECTION_ARN}\"
    },
    \"AutoDeploymentsEnabled\": true,
    \"CodeRepository\": {
      \"RepositoryUrl\": \"${GITHUB_REPO}\",
      \"SourceCodeVersion\": {\"Type\": \"BRANCH\", \"Value\": \"${GITHUB_BRANCH}\"},
      \"CodeConfiguration\": {
        \"ConfigurationSource\": \"API\",
        \"CodeConfigurationValues\": {
          \"Runtime\": \"NODEJS_18\",
          \"BuildCommand\": \"cd yanabiya-api && npm install --production\",
          \"StartCommand\": \"node yanabiya-api/server.js\",
          \"Port\": \"4000\",
          \"RuntimeEnvironmentVariables\": {
            \"PORT\": \"4000\",
            \"NODE_ENV\": \"production\",
            \"MONGO_URI\": \"${MONGO_URI}\",
            \"JWT_SECRET\": \"${JWT_SECRET}\",
            \"JWT_EXPIRES_IN\": \"7d\",
            \"ADMIN_EMAIL\": \"admin@yanabiyagroup.com\",
            \"ADMIN_PASSWORD\": \"${ADMIN_PASSWORD}\",
            \"S3_BUCKET\": \"${BUCKET}\",
            \"AWS_REGION\": \"${REGION}\",
            \"FRONTEND_URL\": \"${AMPLIFY_URL}\"
          }
        }
      }
    }
  }" > /dev/null
info "App Runner updated with FRONTEND_URL"

# ─── 10. Seed the database ────────────────────────────────────────────────────
section "Seeding admin credentials in MongoDB"
cd "$(dirname "$0")/../"
MONGO_URI="$MONGO_URI" \
ADMIN_EMAIL="admin@yanabiyagroup.com" \
ADMIN_PASSWORD="$ADMIN_PASSWORD" \
node src/seed.js && info "Seed complete" || warn "Seed failed — run manually: cd yanabiya-api && node src/seed.js"

# ─── Done ─────────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  Yanabiya AWS Setup Complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "  API (App Runner):  $FULL_API_URL"
echo "  Frontend (Amplify): $AMPLIFY_URL"
echo "  S3 Bucket:          $BUCKET (eu-west-1)"
echo "  Admin login:        $AMPLIFY_URL/admin/login"
echo "  Admin email:        admin@yanabiyagroup.com"
echo ""
echo "  Next: Set your custom domain yanabiyagroup.com in Amplify console"
echo "        Amplify → $AMPLIFY_APP_NAME → Domain management"
echo ""
