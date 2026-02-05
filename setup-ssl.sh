#!/bin/bash

# SSL Setup Script for Merkwave
# This script sets up SSL certificates using Let's Encrypt (Certbot)

set -e

DOMAIN="merkwave.com"
WWW_DOMAIN="www.merkwave.com"
EMAIL="admin@merkwave.com"  # Change this to your email

echo "🔒 Setting up SSL for $DOMAIN..."

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    sudo apt-get update
    sudo apt-get install -y certbot python3-certbot-nginx
fi

# Stop the running container temporarily
echo "Stopping container for SSL setup..."
docker stop merkwave-app 2>/dev/null || true

# Get SSL certificates
echo "Obtaining SSL certificates..."
sudo certbot certonly --standalone \
    -d $DOMAIN \
    -d $WWW_DOMAIN \
    --non-interactive \
    --agree-tos \
    --email $EMAIL \
    --preferred-challenges http

echo "✓ SSL certificates obtained successfully!"

# Create SSL-enabled nginx configuration
cat > nginx-ssl.conf << 'EOF'
server {
    listen 80;
    server_name merkwave.com www.merkwave.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name merkwave.com www.merkwave.com;
    
    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/merkwave.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/merkwave.com/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Handle trailing slashes (Next.js static export with trailingSlash: true)
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache HTML files for shorter time
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }

    # Prevent access to hidden files
    location ~ /\. {
        deny all;
    }
}
EOF

echo "✓ SSL-enabled nginx configuration created!"
echo "Note: Update docker-compose.yml to mount SSL certificates"
echo "Restart your container with SSL support"
