#!/bin/bash


set -e

echo "🚀 Winter Virtual Camp - Proxmox Deployment Script"
echo "=================================================="

CONTAINER_NAME="winter-virtual-camp"
REPO_URL="https://github.com/Mudumugo/winter-virtual-camp.git"
BRANCH="devin/1754619796-backend-docker-setup"
APP_DIR="/opt/winter-virtual-camp"
DOMAIN="${DOMAIN:-winter-camp.local}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

if [[ $EUID -ne 0 ]]; then
   log_error "This script must be run as root"
   exit 1
fi

log_info "Updating system packages..."
apt update && apt upgrade -y

log_info "Installing required packages..."
apt install -y \
    curl \
    wget \
    git \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    ufw \
    nginx \
    certbot \
    python3-certbot-nginx

log_info "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    apt update
    apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    systemctl start docker
    systemctl enable docker
    
    log_success "Docker installed successfully"
else
    log_info "Docker is already installed"
fi

log_info "Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    log_success "Docker Compose installed successfully"
else
    log_info "Docker Compose is already installed"
fi

log_info "Creating application directory..."
mkdir -p $APP_DIR
cd $APP_DIR

log_info "Cloning winter-virtual-camp repository..."
if [ -d ".git" ]; then
    log_info "Repository already exists, pulling latest changes..."
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
else
    git clone -b $BRANCH $REPO_URL .
fi

log_info "Creating environment configuration..."
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    
    SESSION_SECRET=$(openssl rand -hex 32)
    MINIO_ACCESS_KEY=$(openssl rand -hex 16)
    MINIO_SECRET_KEY=$(openssl rand -hex 32)
    
    sed -i "s/your-session-secret-here/$SESSION_SECRET/" backend/.env
    sed -i "s/minioadmin/$MINIO_ACCESS_KEY/" backend/.env
    sed -i "s/minioadmin123/$MINIO_SECRET_KEY/" backend/.env
    
    log_success "Environment file created with secure secrets"
fi

log_info "Configuring firewall..."
ufw --force enable
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3000/tcp  # Frontend
ufw allow 5000/tcp  # Backend API
ufw allow 9000/tcp  # MinIO Console
ufw reload

log_info "Creating systemd service..."
cat > /etc/systemd/system/winter-virtual-camp.service << EOF
[Unit]
Description=Winter Virtual Camp Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$APP_DIR
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable winter-virtual-camp.service

log_info "Configuring Nginx reverse proxy..."
cat > /etc/nginx/sites-available/winter-virtual-camp << EOF
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /socket.io/ {
        proxy_pass http://127.0.0.1:5000/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /minio/ {
        proxy_pass http://127.0.0.1:9001/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/winter-virtual-camp /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl reload nginx

log_info "Building and starting the application..."
docker-compose build
docker-compose up -d

log_info "Waiting for services to start..."
sleep 30

log_info "Running database migrations and seeding..."
docker-compose exec -T backend npm run db:migrate
docker-compose exec -T backend npm run db:seed

log_info "Checking service status..."
docker-compose ps

log_info "Testing API endpoints..."
if curl -f http://127.0.0.1:5000/api/camps > /dev/null 2>&1; then
    log_success "Backend API is responding"
else
    log_warning "Backend API is not responding yet"
fi

if curl -f http://127.0.0.1:3000 > /dev/null 2>&1; then
    log_success "Frontend is responding"
else
    log_warning "Frontend is not responding yet"
fi

log_info "Creating backup script..."
cat > /usr/local/bin/winter-camp-backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/winter-virtual-camp"
DATE=$(date +%Y%m%d_%H%M%S)
APP_DIR="/opt/winter-virtual-camp"

mkdir -p $BACKUP_DIR

docker-compose -f $APP_DIR/docker-compose.yml exec -T db pg_dump -U user techtutor > $BACKUP_DIR/database_$DATE.sql

docker-compose -f $APP_DIR/docker-compose.yml exec -T minio tar czf - /data > $BACKUP_DIR/minio_data_$DATE.tar.gz

tar czf $BACKUP_DIR/app_files_$DATE.tar.gz -C $APP_DIR .

find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /usr/local/bin/winter-camp-backup.sh

echo "0 2 * * * root /usr/local/bin/winter-camp-backup.sh" > /etc/cron.d/winter-camp-backup

log_info "Creating update script..."
cat > /usr/local/bin/winter-camp-update.sh << 'EOF'
#!/bin/bash
APP_DIR="/opt/winter-virtual-camp"
BRANCH="devin/1754619796-backend-docker-setup"

cd $APP_DIR

echo "Pulling latest changes..."
git fetch origin
git checkout $BRANCH
git pull origin $BRANCH

echo "Rebuilding and restarting services..."
docker-compose build
docker-compose up -d

echo "Running database migrations..."
docker-compose exec -T backend npm run db:migrate

echo "Update completed!"
EOF

chmod +x /usr/local/bin/winter-camp-update.sh

if [ "$ENABLE_SSL" = "true" ]; then
    log_info "Setting up SSL certificate..."
    certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo "======================================"
echo ""
echo "📋 Service Information:"
echo "  • Application Directory: $APP_DIR"
echo "  • Domain: $DOMAIN"
echo "  • Frontend: http://$DOMAIN"
echo "  • Backend API: http://$DOMAIN/api"
echo "  • MinIO Console: http://$DOMAIN/minio"
echo ""
echo "🔧 Management Commands:"
echo "  • Start services: systemctl start winter-virtual-camp"
echo "  • Stop services: systemctl stop winter-virtual-camp"
echo "  • View logs: docker-compose -f $APP_DIR/docker-compose.yml logs -f"
echo "  • Update app: /usr/local/bin/winter-camp-update.sh"
echo "  • Backup data: /usr/local/bin/winter-camp-backup.sh"
echo ""
echo "🧪 Demo Login Credentials:"
echo "  • Admin: Use demo login API with role 'admin'"
echo "  • Instructor: Use demo login API with role 'instructor'"
echo "  • Student: Use demo login API with role 'student'"
echo ""
echo "📚 API Documentation: $APP_DIR/backend/API_DOCUMENTATION.md"
echo ""
echo "🔒 Security Notes:"
echo "  • Firewall configured for ports 80, 443, 3000, 5000, 9000"
echo "  • Random secrets generated for session and MinIO"
echo "  • Daily backups scheduled at 2 AM"
echo ""

if [ "$ENABLE_SSL" = "true" ]; then
    echo "🔐 SSL Certificate: Enabled"
    echo "  • HTTPS: https://$DOMAIN"
else
    echo "🔐 SSL Certificate: Not enabled"
    echo "  • To enable SSL: ENABLE_SSL=true DOMAIN=your-domain.com ./deploy-proxmox.sh"
fi

echo ""
log_success "Winter Virtual Camp is now running on Proxmox!"
