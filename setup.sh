#!/bin/bash

# Pouranik Project Setup Script

echo "🚀 Setting up Pouranik Project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "❌ MongoDB is not installed. Please install MongoDB from https://www.mongodb.com/"
    exit 1
fi

echo "✅ MongoDB version: $(mongod --version | head -n1)"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Fix any security vulnerabilities
npm audit fix

cd ..

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found. Please copy backend/.env.example to backend/.env and configure it."
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  Frontend .env file not found. Please copy frontend/.env.example to frontend/.env and configure it."
fi

echo "✅ Project setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your environment variables in .env files"
echo "2. Get a Google Books API key from https://console.cloud.google.com/"
echo "3. Start MongoDB: mongod"
echo "4. Start backend: cd backend && npm start"
echo "5. Start frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3000"
