#!/bin/bash

set -e

echo "🚀 Building Next.js frontend..."
cd frontend

# Install dependencies
pnpm install

# Build static export
pnpm run build

# Next.js static output folder
FRONTEND_OUT="out"
BACKEND_STATIC="../backend/app/static"

echo "🧹 Cleaning old static files..."
rm -rf $BACKEND_STATIC
mkdir -p $BACKEND_STATIC

echo "📁 Copying Next.js build output..."
cp -r $FRONTEND_OUT/* $BACKEND_STATIC/

# Ensure _next static assets are properly copied (redundant but safe)
if [ -d "$FRONTEND_OUT/_next" ]; then
    echo "📦 Copying _next static assets..."
    mkdir -p $BACKEND_STATIC/_next
    cp -r $FRONTEND_OUT/_next/* $BACKEND_STATIC/_next/
fi

echo "✅ Frontend build copied successfully!"

# Go back to backend
cd ../backend

# Check pipenv
if ! command -v pipenv &> /dev/null; then
  echo "📦 Installing pipenv..."
  pip install --user pipenv
  export PATH="$HOME/.local/bin:$PATH"
fi

echo "📦 Installing Python dependencies..."
pipenv install

echo "🔥 Starting Flask server..."
pipenv run python run.py