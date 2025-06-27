#!/bin/bash

echo "🚀 Starting Render build process..."

# Install dependencies (including devDependencies for build)
echo "📦 Installing dependencies..."
npm ci --include=dev

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "📊 Running database migrations..."
npx prisma migrate deploy

# Build the application
echo "🏗️ Building NestJS application..."
npx nest build

echo "✅ Build process completed!" 