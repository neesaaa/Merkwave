#!/bin/bash

# Health Check Script for Merkwave Deployment
# Tests local container and production site

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔍 Merkwave Health Check"
echo "========================"
echo ""

# Check if Docker is running
echo -n "Checking Docker... "
if docker info > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗ Docker is not running${NC}"
    exit 1
fi

# Check if container is running
echo -n "Checking container (merkwave-app)... "
if docker ps | grep -q merkwave-app; then
    echo -e "${GREEN}✓ Running${NC}"
else
    echo -e "${RED}✗ Not running${NC}"
    echo "Start with: ./deploy.sh"
    exit 1
fi

# Check localhost
echo -n "Testing localhost:8080... "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/ | grep -q "200"; then
    echo -e "${GREEN}✓ HTTP 200${NC}"
else
    echo -e "${RED}✗ Failed${NC}"
    exit 1
fi

# Check if site returns HTML
echo -n "Checking HTML content... "
if curl -s http://localhost:8080/ | grep -q "Merkwave"; then
    echo -e "${GREEN}✓ Content OK${NC}"
else
    echo -e "${RED}✗ Content missing${NC}"
    exit 1
fi

# Get container stats
echo ""
echo "Container Stats:"
docker stats --no-stream merkwave-app | tail -n 1

# Check container uptime
echo ""
echo "Container Info:"
docker ps --filter "name=merkwave-app" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Test production domain
echo ""
echo "Production Domain Check:"
echo -n "Testing merkwave.com... "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://merkwave.com/ 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ HTTP $HTTP_CODE${NC}"
else
    echo -e "${YELLOW}⚠ HTTP $HTTP_CODE (might be pointing to old server)${NC}"
fi

# DNS check
echo ""
echo "DNS Check:"
echo "Current DNS IPs for merkwave.com:"
dig +short merkwave.com A | while read ip; do
    echo "  - $ip"
done

echo ""
echo "Your server IP:"
hostname -I | awk '{print "  - " $1}'

echo ""
echo -e "${GREEN}✅ Local deployment is healthy!${NC}"
echo ""
echo "Next steps:"
echo "1. Update DNS A record to point to your server IP"
echo "2. Install Caddy for HTTPS: sudo ./setup-caddy.sh (requires root)"
echo "3. Test production: curl https://merkwave.com/"
