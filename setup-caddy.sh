#!/bin/bash

# Install and configure Caddy for Merkwave
# Caddy provides automatic HTTPS and reverse proxy

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Installing Caddy server...${NC}"

# Check if Caddy is already installed
if command -v caddy &> /dev/null; then
    echo "Caddy is already installed"
else
    # Install Caddy
    echo "Installing Caddy..."
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
    apt update
    apt install -y caddy
fi

# Create log directory
mkdir -p /var/log/caddy
chown caddy:caddy /var/log/caddy

# Copy Caddyfile to Caddy config directory
echo -e "${YELLOW}Setting up Caddy configuration...${NC}"
cp Caddyfile /etc/caddy/Caddyfile

# Validate Caddy configuration
echo -e "${YELLOW}Validating Caddy configuration...${NC}"
caddy validate --config /etc/caddy/Caddyfile

# Reload Caddy
echo -e "${YELLOW}Reloading Caddy...${NC}"
systemctl reload caddy

# Enable Caddy to start on boot
systemctl enable caddy

echo -e "${GREEN}✓ Caddy setup completed!${NC}"
echo -e "${GREEN}✓ Your site should be accessible at: https://merkwave.com${NC}"
echo -e "${GREEN}✓ Caddy will automatically obtain and renew SSL certificates${NC}"

# Show Caddy status
systemctl status caddy --no-pager
