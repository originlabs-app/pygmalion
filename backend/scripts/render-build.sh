#!/bin/bash

echo "🚀 Starting Render build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "📊 Running database migrations..."
npx prisma migrate deploy

# Build the application
echo "🏗️ Building NestJS application..."
npm run build

echo "✅ Build process completed!" 