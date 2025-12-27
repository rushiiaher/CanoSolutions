#!/bin/bash

# CanoSolutions Deployment Script
echo "🚀 Starting CanoSolutions deployment..."

# Navigate to project directory
cd /var/www/canosolutions

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build the project
echo "🔨 Building project..."
pnpm build

# Restart PM2 process
echo "🔄 Restarting application..."
pm2 restart canosolutions

# Show status
echo "✅ Deployment complete!"
pm2 status
pm2 logs canosolutions --lines 10