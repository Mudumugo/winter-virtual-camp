#!/bin/bash

# Winter Virtual Camp - Remote Debian Setup Script
# This script sets up the complete application on a Debian machine

set -e

echo "🎓 Winter Virtual Camp - Remote Debian Setup"
echo "============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons."
   print_info "Please run as a regular user. The script will use sudo when needed."
   exit 1
fi

# Update system packages
print_info "Updating system packages..."
sudo apt update

# Install required packages
print_info "Installing required packages..."
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git \
    netcat-openbsd

# Install Docker if not already installed
if ! command -v docker &> /dev/null; then
    print_info "Installing Docker..."
    
    # Add Docker's official GPG key
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    
    # Set up the repository
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Install Docker Engine
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    # Start and enable Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Add current user to docker group
    sudo usermod -aG docker $USER
    
    print_status "Docker installed successfully"
    print_warning "You may need to log out and back in for Docker group permissions to take effect"
else
    print_status "Docker is already installed"
fi

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    print_error "Docker Compose plugin is not available"
    exit 1
else
    print_status "Docker Compose is available"
fi

# Clone or update the repository
REPO_DIR="winter-virtual-camp"
if [ -d "$REPO_DIR" ]; then
    print_info "Repository already exists, updating..."
    cd $REPO_DIR
    git fetch origin
    git checkout feature/backend-implementation-docker-setup
    git pull origin feature/backend-implementation-docker-setup
else
    print_info "Cloning repository..."
    git clone https://github.com/Mudumugo/winter-virtual-camp.git
    cd $REPO_DIR
    git checkout feature/backend-implementation-docker-setup
fi

# Make scripts executable
chmod +x start.sh
chmod +x backend/dev.sh

# Check if ports are available
print_info "Checking port availability..."
PORTS=(5432 6379 9000 9001 5000 12000)
PORTS_IN_USE=()

for port in "${PORTS[@]}"; do
    if netstat -tuln | grep -q ":$port "; then
        PORTS_IN_USE+=($port)
    fi
done

if [ ${#PORTS_IN_USE[@]} -gt 0 ]; then
    print_warning "The following ports are in use: ${PORTS_IN_USE[*]}"
    print_info "You may need to stop services using these ports"
    echo ""
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create necessary directories
mkdir -p backend/logs backend/uploads

# Start the application
print_info "Starting Winter Virtual Camp application..."
./start.sh

print_status "Setup completed successfully!"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend:        http://$(hostname -I | awk '{print $1}'):12000"
echo "   Backend API:     http://$(hostname -I | awk '{print $1}'):5000"
echo "   MinIO Console:   http://$(hostname -I | awk '{print $1}'):9001"
echo ""
echo "🔑 Demo Login Credentials:"
echo "   Instructor:      instructor@demo.com / demo123"
echo "   Student:         student@demo.com / demo123"
echo "   Parent:          parent@demo.com / demo123"
echo ""
echo "📋 Useful Commands:"
echo "   View logs:       docker compose logs -f"
echo "   Stop services:   docker compose down"
echo "   Restart:         docker compose restart"
echo "   Status:          docker compose ps"