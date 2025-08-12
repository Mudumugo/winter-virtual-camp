#!/bin/bash

# Development startup script for Winter Virtual Camp Backend

echo "🚀 Starting Winter Virtual Camp Backend Development Environment"

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p logs uploads

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if database is running
echo "🔍 Checking database connection..."
if ! nc -z localhost 5432; then
    echo "⚠️  PostgreSQL is not running on localhost:5432"
    echo "   Please start PostgreSQL or use Docker:"
    echo "   docker-compose up -d db"
fi

# Check if Redis is running (optional)
if ! nc -z localhost 6379; then
    echo "⚠️  Redis is not running on localhost:6379 (optional)"
    echo "   You can start Redis with: docker-compose up -d redis"
fi

# Check if MinIO is running
if ! nc -z localhost 9000; then
    echo "⚠️  MinIO is not running on localhost:9000"
    echo "   Please start MinIO with: docker-compose up -d minio"
fi

echo ""
echo "🔧 Available commands:"
echo "   npm run dev          - Start development server with hot reload"
echo "   npm run build        - Build for production"
echo "   npm run start        - Start production server"
echo "   npm run db:migrate   - Run database migrations"
echo "   npm run db:seed      - Seed database with sample data"
echo ""

# Start development server
echo "🚀 Starting development server..."
npm run dev