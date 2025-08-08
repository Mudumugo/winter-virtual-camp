# Winter Virtual Camp - Proxmox Deployment Guide

This guide provides instructions for deploying the Winter Virtual Camp application on Proxmox VE using LXC containers or VMs.

## Prerequisites

- Proxmox VE 7.0 or later
- LXC container or VM with Ubuntu 20.04/22.04
- At least 2GB RAM and 20GB storage
- Internet connectivity for package downloads

## Quick Deployment

### Option 1: Automated Script Deployment

1. **Create a new LXC container or VM in Proxmox:**
   ```bash
   # For LXC container (recommended)
   pct create 100 local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst \
     --hostname winter-virtual-camp \
     --memory 2048 \
     --rootfs local-lvm:20 \
     --net0 name=eth0,bridge=vmbr0,ip=dhcp \
     --features nesting=1
   
   pct start 100
   pct enter 100
   ```

2. **Run the deployment script:**
   ```bash
   # Download and run the deployment script
   wget https://raw.githubusercontent.com/Mudumugo/winter-virtual-camp/devin/1754619796-backend-docker-setup/deploy-proxmox.sh
   chmod +x deploy-proxmox.sh
   
   # Basic deployment
   ./deploy-proxmox.sh
   
   # With SSL and custom domain
   ENABLE_SSL=true DOMAIN=your-domain.com ./deploy-proxmox.sh
   ```

### Option 2: Manual Deployment

1. **Update system and install Docker:**
   ```bash
   apt update && apt upgrade -y
   apt install -y curl wget git
   
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   
   # Install Docker Compose
   curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   chmod +x /usr/local/bin/docker-compose
   ```

2. **Clone and deploy the application:**
   ```bash
   cd /opt
   git clone -b devin/1754619796-backend-docker-setup https://github.com/Mudumugo/winter-virtual-camp.git
   cd winter-virtual-camp
   
   # Configure environment
   cp backend/.env.example backend/.env
   # Edit backend/.env with your settings
   
   # Start services
   docker-compose up -d
   
   # Run migrations and seed data
   docker-compose exec backend npm run db:migrate
   docker-compose exec backend npm run db:seed
   ```

## Configuration Options

### Environment Variables

Set these variables before running the deployment script:

```bash
export DOMAIN="your-domain.com"          # Your domain name
export ENABLE_SSL="true"                 # Enable SSL with Let's Encrypt
export CONTAINER_NAME="winter-camp"      # Container/service name
```

### Proxmox LXC Container Settings

For optimal performance, configure your LXC container with:

```bash
# Container configuration
cores: 2
memory: 2048
swap: 512
rootfs: 20GB
features: nesting=1,keyctl=1

# Network configuration
net0: name=eth0,bridge=vmbr0,ip=dhcp,type=veth
```

### Proxmox VM Settings

For VM deployment:

```bash
# VM specifications
cores: 2
memory: 2048MB
disk: 20GB
network: virtio,bridge=vmbr0
```

## Service Management

### Systemd Service

The deployment creates a systemd service for easy management:

```bash
# Start the application
systemctl start winter-virtual-camp

# Stop the application
systemctl stop winter-virtual-camp

# Enable auto-start on boot
systemctl enable winter-virtual-camp

# Check status
systemctl status winter-virtual-camp
```

### Docker Compose Commands

```bash
cd /opt/winter-virtual-camp

# View running services
docker-compose ps

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Update and rebuild
docker-compose pull
docker-compose up -d --build
```

## Network Configuration

### Port Mapping

The application uses these ports:

- **3000**: Frontend (Next.js)
- **5000**: Backend API (Express.js)
- **5432**: PostgreSQL Database
- **9000**: MinIO API
- **9001**: MinIO Console
- **80/443**: Nginx Reverse Proxy

### Firewall Rules

The deployment script configures UFW firewall:

```bash
# View firewall status
ufw status

# Allow additional ports if needed
ufw allow 8080/tcp
```

### Nginx Reverse Proxy

The deployment includes Nginx configuration for:

- Frontend serving on port 80/443
- API proxying to `/api/*`
- WebSocket support for real-time features
- MinIO console access at `/minio/*`

## SSL Configuration

### Automatic SSL with Let's Encrypt

```bash
# Deploy with SSL enabled
ENABLE_SSL=true DOMAIN=your-domain.com ./deploy-proxmox.sh
```

### Manual SSL Configuration

```bash
# Install certbot
apt install certbot python3-certbot-nginx

# Obtain certificate
certbot --nginx -d your-domain.com

# Auto-renewal
systemctl enable certbot.timer
```

## Backup and Maintenance

### Automated Backups

The deployment creates a backup script at `/usr/local/bin/winter-camp-backup.sh`:

```bash
# Manual backup
/usr/local/bin/winter-camp-backup.sh

# Backups are stored in /opt/backups/winter-virtual-camp/
ls -la /opt/backups/winter-virtual-camp/
```

### Database Backup

```bash
# Manual database backup
docker-compose exec db pg_dump -U user techtutor > backup.sql

# Restore database
docker-compose exec -T db psql -U user techtutor < backup.sql
```

### Application Updates

```bash
# Use the update script
/usr/local/bin/winter-camp-update.sh

# Or manually
cd /opt/winter-virtual-camp
git pull origin devin/1754619796-backend-docker-setup
docker-compose up -d --build
docker-compose exec backend npm run db:migrate
```

## Monitoring and Logs

### Application Logs

```bash
# View all service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### System Monitoring

```bash
# Check resource usage
docker stats

# Check disk usage
df -h
du -sh /opt/winter-virtual-camp

# Check memory usage
free -h
```

## Troubleshooting

### Common Issues

1. **Services not starting:**
   ```bash
   # Check Docker status
   systemctl status docker
   
   # Check container logs
   docker-compose logs
   ```

2. **Database connection issues:**
   ```bash
   # Check database container
   docker-compose exec db psql -U user -d techtutor -c "SELECT version();"
   ```

3. **Port conflicts:**
   ```bash
   # Check port usage
   netstat -tulpn | grep :3000
   netstat -tulpn | grep :5000
   ```

4. **Permission issues:**
   ```bash
   # Fix file permissions
   chown -R root:root /opt/winter-virtual-camp
   chmod +x /opt/winter-virtual-camp/deploy-proxmox.sh
   ```

### Performance Optimization

1. **Increase container resources:**
   ```bash
   # For LXC containers
   pct set 100 -memory 4096 -cores 4
   ```

2. **Enable container nesting:**
   ```bash
   # Required for Docker in LXC
   pct set 100 -features nesting=1,keyctl=1
   ```

3. **Optimize Docker:**
   ```bash
   # Clean up unused images
   docker system prune -a
   
   # Limit log size
   echo '{"log-driver":"json-file","log-opts":{"max-size":"10m","max-file":"3"}}' > /etc/docker/daemon.json
   systemctl restart docker
   ```

## Security Considerations

### Firewall Configuration

```bash
# Basic firewall setup
ufw enable
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp

# Restrict database access
ufw deny 5432/tcp
```

### Container Security

```bash
# Run containers as non-root user
# Update docker-compose.yml to include user directives

# Regular security updates
apt update && apt upgrade -y
docker-compose pull
```

### Access Control

- Change default passwords in `.env` file
- Use strong session secrets
- Enable SSL/TLS for production
- Implement proper authentication

## Production Deployment Checklist

- [ ] SSL certificate configured
- [ ] Firewall rules applied
- [ ] Backup system configured
- [ ] Monitoring setup
- [ ] Log rotation configured
- [ ] Security updates scheduled
- [ ] Domain DNS configured
- [ ] Load balancer setup (if needed)
- [ ] Database backups tested
- [ ] Disaster recovery plan

## Support and Documentation

- **Application Documentation**: `/opt/winter-virtual-camp/backend/API_DOCUMENTATION.md`
- **Docker Compose File**: `/opt/winter-virtual-camp/docker-compose.yml`
- **Environment Configuration**: `/opt/winter-virtual-camp/backend/.env`
- **Nginx Configuration**: `/etc/nginx/sites-available/winter-virtual-camp`
- **Systemd Service**: `/etc/systemd/system/winter-virtual-camp.service`

For additional support, refer to the project repository and documentation.
