# Merkwave Deployment - Quick Reference

## 🚀 Deployment Summary

**Status**: ✅ **DEPLOYED AND RUNNING**

- **Application**: Next.js 15 (Static Export)
- **Container**: merkwave-app
- **Local Port**: http://localhost:8080
- **Server IP**: 46.224.186.76
- **Domain**: merkwave.com (currently pointing to old server)

## ⚡ Quick Commands

### Deploy/Update
```bash
./deploy.sh
```

### Health Check
```bash
./health-check.sh
```

### View Logs
```bash
docker logs -f merkwave-app
```

### Restart
```bash
docker restart merkwave-app
```

## 📋 Current Status

✅ **Completed:**
- Docker image built successfully
- Container running on port 8080
- Static Next.js site compiled and served
- Nginx configured with caching and compression
- Health checks passing
- Deployment scripts created

⏳ **Pending (requires your action):**
- Update DNS to point to 46.224.186.76
- Install Caddy for HTTPS (requires sudo/root)
- Test on production domain

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage Docker build |
| `docker-compose.yml` | Docker Compose config |
| `nginx.conf` | Nginx web server config |
| `Caddyfile` | Caddy reverse proxy config |
| `deploy.sh` | Automated deployment |
| `health-check.sh` | Health monitoring |
| `DEPLOYMENT.md` | Full documentation |

## 🌐 DNS Update Instructions

**Current DNS** (via Cloudflare):
- Points to: 104.21.96.130, 172.67.180.251 (old server)

**To update:**
1. Login to Cloudflare dashboard
2. DNS → merkwave.com
3. Edit A record for `@`: 46.224.186.76
4. Edit A record for `www`: 46.224.186.76
5. Save and wait for propagation (5-30 min)

## 🔐 HTTPS Setup

**Option 1: Caddy (Recommended)**
```bash
# Requires sudo/root access
sudo ./setup-caddy.sh
```

**Option 2: Keep Cloudflare**
- Keep DNS proxied through Cloudflare (orange cloud)
- Update origin in Cloudflare to: http://46.224.186.76:8080
- Or use Cloudflare Tunnel

## 🧪 Testing

**Local test:**
```bash
curl http://localhost:8080/
```

**After DNS update:**
```bash
curl http://merkwave.com/
curl https://merkwave.com/
```

## 📊 Monitoring

```bash
# Container status
docker ps | grep merkwave

# Resource usage
docker stats merkwave-app

# Recent logs
docker logs --tail 50 merkwave-app
```

## 🔄 Update Workflow

```bash
# Make changes to code
# Then:
./deploy.sh
```

## ⚠️ Important Notes

- Container uses port 8080 (not 80) due to permissions
- Use Caddy or Cloudflare for SSL/HTTPS
- DNS currently points to old Hostinger server
- Old site title: "Merkwave Marketing Agency"
- New site title: "Merkwave "

## 📞 Troubleshooting

**Container not starting?**
```bash
docker logs merkwave-app
```

**Site not accessible?**
```bash
./health-check.sh
```

**Need to rebuild?**
```bash
./deploy.sh
```

---

**Deployed**: February 3, 2026
**Container ID**: 3e35cd1e9f01
**Memory Usage**: ~5MB
**Uptime**: See `docker ps`
