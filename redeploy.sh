#!/bin/bash
# Merkwave Full Redeploy + Cloudflare Tunnel Setup
# Run this script to bring everything up fresh with new tunnel URLs

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
info()    { echo -e "${BLUE}[i]${NC} $1"; }
success() { echo -e "${GREEN}[✓]${NC} $1"; }

echo ""
echo "========================================"
echo "     Merkwave Redeploy + Cloudflare"
echo "========================================"
echo ""

# Kill old Merkwave tunnels
info "Stopping existing Merkwave tunnels..."
pkill -f "cloudflared tunnel --url http://localhost:8080" 2>/dev/null || true
pkill -f "cloudflared tunnel --url http://localhost:3003" 2>/dev/null || true
pkill -f "cloudflared tunnel --url http://localhost:5070" 2>/dev/null || true
sleep 2

# Step 1: Start API quick tunnel to capture URL
info "Starting API tunnel to capture URL..."
cloudflared tunnel --url http://localhost:5070 > /tmp/mw-api-tunnel.log 2>&1 &
API_URL=""
for i in $(seq 1 20); do
    sleep 1
    API_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/mw-api-tunnel.log | head -1)
    [[ -n "$API_URL" ]] && break
done
[[ -z "$API_URL" ]] && { echo "ERROR: Could not get API tunnel URL"; exit 1; }
success "API URL: $API_URL"

# Step 2: Update .env with new API URL
info "Updating .env with new API URL..."
OLD_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' .env | head -1)
if [[ -n "$OLD_URL" && "$OLD_URL" != "$API_URL" ]]; then
    sed -i "s|$OLD_URL|$API_URL|g" .env
    success "Updated URL in .env: $OLD_URL → $API_URL"
    REBUILD=true
else
    warn "URL unchanged, skipping rebuild"
    REBUILD=false
fi

# Step 3: Stop existing containers
info "Stopping existing containers..."
docker compose down --remove-orphans 2>&1 | grep -v "^$" || true

# Step 4: Rebuild if API URL changed
if [[ "$REBUILD" == "true" ]]; then
    info "Rebuilding dashboard with new API URL..."
    docker compose build --no-cache dashboard
    info "Rebuilding frontend with new API URL..."
    docker compose build --no-cache frontend
    success "Frontend images rebuilt"
fi

# Step 5: Start all containers
info "Starting all containers..."
docker compose up -d
sleep 8
docker compose ps

# Step 6: Start frontend and dashboard tunnels
info "Starting frontend and dashboard tunnels..."
cloudflared tunnel --url http://localhost:8080 > /tmp/mw-frontend-tunnel.log 2>&1 &
cloudflared tunnel --url http://localhost:3003 > /tmp/mw-dashboard-tunnel.log 2>&1 &

FRONTEND_URL=""
DASHBOARD_URL=""
for i in $(seq 1 20); do
    sleep 1
    [[ -z "$FRONTEND_URL" ]]  && FRONTEND_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/mw-frontend-tunnel.log | head -1)
    [[ -z "$DASHBOARD_URL" ]] && DASHBOARD_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/mw-dashboard-tunnel.log | head -1)
    [[ -n "$FRONTEND_URL" && -n "$DASHBOARD_URL" ]] && break
done

# Save URLs
cat > LIVE_URLS.txt << URLEOF
Merkwave Live URLs (Last Updated: $(date '+%Y-%m-%d %H:%M'))
================================================

Website (Frontend):   ${FRONTEND_URL:-NOT AVAILABLE}
Dashboard (Admin):    ${DASHBOARD_URL:-NOT AVAILABLE}
API Backend:          $API_URL

Dashboard Login:
  Username: admin
  Password: 1?BMP"1vv?7

Note: Cloudflare quick tunnel URLs change every restart.
Run ./redeploy.sh to get new URLs after each restart.
URLEOF

echo ""
echo "========================================"
success "Merkwave is LIVE!"
echo "========================================"
echo ""
echo -e "  ${GREEN}Website:${NC}    ${FRONTEND_URL:-NOT AVAILABLE}"
echo -e "  ${GREEN}Dashboard:${NC}  ${DASHBOARD_URL:-NOT AVAILABLE}"
echo -e "  ${GREEN}API:${NC}        $API_URL"
echo ""
echo -e "  ${YELLOW}Dashboard Login:${NC}"
echo -e '    Username: admin'
echo -e '    Password: 1?BMP"1vv?7'
echo ""
echo "URLs saved to LIVE_URLS.txt"
echo ""
