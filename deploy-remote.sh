#!/bin/bash

# Winter Virtual Camp - Remote Deployment Script
# Run this script locally to deploy to a remote Debian machine via SSH

set -e

# Configuration
REMOTE_USER=""
REMOTE_HOST=""
REMOTE_PORT="22"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Get remote connection details
if [ -z "$REMOTE_USER" ] || [ -z "$REMOTE_HOST" ]; then
    echo "🎓 Winter Virtual Camp - Remote Deployment"
    echo "=========================================="
    echo ""
    read -p "Enter remote username: " REMOTE_USER
    read -p "Enter remote host IP/hostname: " REMOTE_HOST
    read -p "Enter SSH port (default 22): " input_port
    REMOTE_PORT=${input_port:-22}
fi

REMOTE_CONNECTION="$REMOTE_USER@$REMOTE_HOST"

# Test SSH connection
print_info "Testing SSH connection to $REMOTE_CONNECTION..."
if ! ssh -p $REMOTE_PORT -o ConnectTimeout=10 -o BatchMode=yes $REMOTE_CONNECTION exit 2>/dev/null; then
    print_error "Cannot connect to $REMOTE_CONNECTION"
    print_info "Please ensure:"
    print_info "1. SSH is enabled on the remote machine"
    print_info "2. Your SSH key is added to the remote machine"
    print_info "3. The IP address and username are correct"
    exit 1
fi

print_status "SSH connection successful"

# Copy the remote setup script
print_info "Copying setup script to remote machine..."
scp -P $REMOTE_PORT remote-setup.sh $REMOTE_CONNECTION:~/

# Execute the setup script on remote machine
print_info "Executing setup on remote machine..."
ssh -p $REMOTE_PORT $REMOTE_CONNECTION 'bash ~/remote-setup.sh'

print_status "Remote deployment completed!"
echo ""
echo "🌐 Your application should now be accessible at:"
echo "   Frontend:        http://$REMOTE_HOST:12000"
echo "   Backend API:     http://$REMOTE_HOST:5000"
echo "   MinIO Console:   http://$REMOTE_HOST:9001"
echo ""
echo "🔑 Demo Login Credentials:"
echo "   Instructor:      instructor@demo.com / demo123"
echo "   Student:         student@demo.com / demo123"
echo "   Parent:          parent@demo.com / demo123"