#!/bin/bash

# Winter Virtual Camp - Complete Application Startup Script

echo "🎓 Winter Virtual Camp - Starting Complete Application"
echo "=================================================="

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        return 0
    fi
}

# Function to wait for service to be ready
wait_for_service() {
    local host=$1
    local port=$2
    local service=$3
    local max_attempts=30
    local attempt=1

    echo "⏳ Waiting for $service to be ready..."
    
    while [ $attempt -le $max_attempts ]; do
        if nc -z $host $port 2>/dev/null; then
            echo "✅ $service is ready!"
            return 0
        fi
        
        echo "   Attempt $attempt/$max_attempts - $service not ready yet..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo "❌ $service failed to start within expected time"
    return 1
}

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if docker compose is available (try modern syntax first, then legacy)
DOCKER_COMPOSE_CMD=""
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
else
    echo "❌ Docker Compose is not available. Please install Docker Compose first."
    exit 1
fi

echo "✅ Using: $DOCKER_COMPOSE_CMD"

# Validate docker-compose.yml
echo ""
echo "🔍 Validating docker-compose.yml..."
if ! $DOCKER_COMPOSE_CMD config > /dev/null 2>&1; then
    echo "❌ docker-compose.yml validation failed. Please check the file format."
    echo "   Common issues:"
    echo "   - YAML uses tabs instead of spaces"
    echo "   - Incorrect indentation"
    echo "   - Missing quotes around values"
    echo ""
    echo "   Try running: $DOCKER_COMPOSE_CMD config"
    exit 1
fi
echo "✅ docker-compose.yml is valid"

echo ""
echo "🔍 Checking port availability..."

# Check required ports
ports_to_check=(5432 6379 9000 9001 5000 12000)
ports_in_use=()

for port in "${ports_to_check[@]}"; do
    if ! check_port $port; then
        ports_in_use+=($port)
    fi
done

if [ ${#ports_in_use[@]} -gt 0 ]; then
    echo ""
    echo "❌ The following ports are in use: ${ports_in_use[*]}"
    echo "   Please stop the services using these ports or change the configuration."
    echo ""
    echo "   Common commands to free ports:"
    echo "   - Stop existing containers: docker-compose down"
    echo "   - Kill processes: sudo lsof -ti:PORT | xargs kill -9"
    echo ""
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "🐳 Starting Docker services..."

# Start all services with docker compose
$DOCKER_COMPOSE_CMD up -d

echo ""
echo "⏳ Waiting for services to be ready..."

# Wait for each service to be ready
wait_for_service localhost 5432 "PostgreSQL"
wait_for_service localhost 6379 "Redis"
wait_for_service localhost 9000 "MinIO"

echo ""
echo "🗄️  Setting up database..."

# Wait a bit more for database to be fully ready
sleep 5

# Run database migrations and seeding
echo "📊 Running database migrations..."
$DOCKER_COMPOSE_CMD exec -T backend npm run db:migrate

echo "🌱 Seeding database with sample data..."
$DOCKER_COMPOSE_CMD exec -T backend npm run db:seed

echo ""
echo "⏳ Waiting for backend API to be ready..."
wait_for_service localhost 5000 "Backend API"

echo ""
echo "🎉 Application is ready!"
echo "=================================================="
echo ""
echo "🌐 Access URLs:"
echo "   Frontend:        http://localhost:12000"
echo "   Backend API:     http://localhost:5000"
echo "   API Health:      http://localhost:5000/api/health"
echo "   MinIO Console:   http://localhost:9001"
echo "   PostgreSQL:      localhost:5432"
echo "   Redis:           localhost:6379"
echo ""
echo "🔑 Demo Login Credentials:"
echo "   Admin:           admin@wintercamp.com / admin123"
echo "   Instructor:      sarah.mitchell@wintercamp.com / instructor123"
echo "   Student:         student@wintercamp.com / student123"
echo ""
echo "📚 Quick Commands:"
echo "   View logs:       docker-compose logs -f"
echo "   Stop services:   docker-compose down"
echo "   Restart:         docker-compose restart"
echo "   Backend shell:   docker-compose exec backend sh"
echo ""
echo "🚀 Happy coding!"

# Open browser (optional)
if command -v xdg-open &> /dev/null; then
    echo ""
    read -p "Open application in browser? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        xdg-open http://localhost:12000
    fi
elif command -v open &> /dev/null; then
    echo ""
    read -p "Open application in browser? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open http://localhost:12000
    fi
fi