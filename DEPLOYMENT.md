# Merkwave - Docker Deployment Guide

## 🚀 Deployment Status

The Next.js application has been successfully dockerized and is running in a container.

### Current Setup
- **Docker Image**: `merkwave:latest`
- **Container Name**: `merkwave-app`
- **Port Mapping**: Container port 80 → Host port 8080
- **Status**: ✅ Running and serving content

## 📋 Prerequisites

- Docker installed
- Domain access (merkwave.com)
- Server with public IP

## 🔧 Deployment Options

### Option 1: Quick Deploy (Current Setup)

The application is currently running on port 8080:

```bash
./deploy.sh
```

Test locally:
```bash
curl http://localhost:8080/
```

### Option 2: Deploy with Caddy (Recommended for Production)

Caddy provides automatic HTTPS with Let's Encrypt:

**Step 1**: Ensure the container is running
```bash
docker ps | grep merkwave-app
```

**Step 2**: Install and configure Caddy (requires root/sudo)
```bash
# Install Caddy
sudo apt update
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy

# Copy Caddyfile
sudo cp Caddyfile /etc/caddy/Caddyfile

# Reload Caddy
sudo caddy reload --config /etc/caddy/Caddyfile
```

**Step 3**: Update DNS to point to your server
- Login to your DNS provider (currently Cloudflare)
- Update A record for `merkwave.com` to point to: `46.224.186.76`
- Update A record for `www.merkwave.com` to point to: `46.224.186.76`
- Disable Cloudflare proxy (orange cloud) temporarily to get SSL certificate

**Step 4**: Wait for DNS propagation (5-30 minutes)

**Step 5**: Test the deployment
```bash
curl -I https://merkwave.com/
```

### Option 3: Deploy with Docker Compose

```bash
# Start with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 4: Keep Cloudflare Proxy (Recommended)

If you want to keep Cloudflare's CDN and DDoS protection:

1. Keep DNS pointing to Cloudflare IPs (orange cloud enabled)
2. Update Cloudflare Origin Server settings:
   - Set origin to `http://46.224.186.76:8080`
   - Or use Cloudflare Tunnel (Zero Trust)

## 📁 Files Created

- **Dockerfile**: Multi-stage build (Node builder + Nginx production)
- **docker-compose.yml**: Docker Compose configuration
- **.dockerignore**: Excludes unnecessary files from build
- **nginx.conf**: Nginx configuration for static files
- **deploy.sh**: Automated deployment script
- **Caddyfile**: Caddy reverse proxy configuration with auto-HTTPS
- **setup-caddy.sh**: Caddy installation script
- **setup-ssl.sh**: Manual SSL setup with Certbot (alternative)

## 🔍 Testing

### Local Testing
```bash
# Test on localhost
curl http://localhost:8080/

# Check container logs
docker logs merkwave-app

# Check container status
docker ps | grep merkwave-app
```

### Production Testing
```bash
# Test HTTP
curl -I http://merkwave.com/

# Test HTTPS (after Caddy setup)
curl -I https://merkwave.com/

# Check specific page
curl https://merkwave.com/ar/
```

## 🛠 Management Commands

### Container Management
```bash
# View running containers
docker ps

# View container logs
docker logs merkwave-app
docker logs -f merkwave-app  # Follow logs

# Stop container
docker stop merkwave-app

# Start container
docker start merkwave-app

# Restart container
docker restart merkwave-app

# Remove container
docker stop merkwave-app && docker rm merkwave-app
```

### Image Management
```bash
# List images
docker images

# Remove old images
docker image prune -f

# Rebuild image
docker build -t merkwave:latest .
```

### Quick Redeploy
```bash
# Rebuild and restart
./deploy.sh
```

## 🔐 SSL/HTTPS Setup

### With Caddy (Automatic)
- Caddy automatically obtains and renews SSL certificates
- No manual intervention required
- Certificates stored in `/data/caddy/`

### Manual SSL with Certbot
```bash
# Run the SSL setup script (requires sudo)
sudo ./setup-ssl.sh
```

## 📊 Monitoring

### View Logs
```bash
# Container logs
docker logs -f merkwave-app

# Nginx access logs (inside container)
docker exec merkwave-app tail -f /var/log/nginx/access.log

# Caddy logs (if using Caddy)
sudo tail -f /var/log/caddy/merkwave.log
```

### Check Health
```bash
# Check if container is running
docker ps | grep merkwave-app

# Check resource usage
docker stats merkwave-app

# Check disk usage
docker system df
```

## 🌐 DNS Configuration

**Current DNS** (via Cloudflare):
- merkwave.com → 104.21.96.130, 172.67.180.251
- www.merkwave.com → Same as above

**Your Server IP**: `46.224.186.76`

**To update DNS**:
1. Login to your Cloudflare dashboard
2. Go to DNS settings for merkwave.com
3. Update A records:
   - `@` (root) → `46.224.186.76`
   - `www` → `46.224.186.76`
4. Set Proxy status (orange cloud):
   - **Disabled** for direct connection and Let's Encrypt
   - **Enabled** for Cloudflare CDN/DDoS protection

## 🔄 Update Workflow

When you make changes to the app:

```bash
# 1. Make your changes
# 2. Rebuild and redeploy
./deploy.sh

# Or manually:
docker stop merkwave-app
docker rm merkwave-app
docker build -t merkwave:latest .
docker run -d --name merkwave-app -p 8080:80 --restart unless-stopped merkwave:latest
```

## 🐛 Troubleshooting

### Container won't start
```bash
# Check logs
docker logs merkwave-app

# Check if port is in use
lsof -i :8080
```

### Site not accessible
```bash
# Check if container is running
docker ps | grep merkwave-app

# Test locally
curl http://localhost:8080/

# Check DNS
nslookup merkwave.com

# Check if port is accessible
curl http://46.224.186.76:8080/
```

### SSL certificate issues
```bash
# Check Caddy logs
sudo journalctl -u caddy -f

# Validate Caddyfile
caddy validate --config /etc/caddy/Caddyfile

# Reload Caddy
sudo systemctl reload caddy
```

## 📝 Next Steps

1. **Update DNS**: Point merkwave.com to your server IP (46.224.186.76)
2. **Setup HTTPS**: Install Caddy for automatic HTTPS
3. **Test deployment**: Verify the site is accessible at https://merkwave.com
4. **Setup monitoring**: Configure alerts and monitoring
5. **Setup backups**: Implement backup strategy for content and configuration

## 🎉 Success Indicators

✅ Docker container running on port 8080
✅ Application serving correctly (tested locally)
✅ Nginx serving static Next.js export
✅ Deployment scripts created and tested

⏳ **Pending** (requires DNS/access):
- DNS pointing to server
- HTTPS certificate
- Public accessibility test

## 📞 Support

For issues or questions:
- Check container logs: `docker logs merkwave-app`
- Check this README
- Review deployment scripts

---

**Last Updated**: February 3, 2026
**Container**: merkwave-app running on port 8080
**Server IP**: 46.224.186.76
