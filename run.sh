#!/bin/bash

echo "🚀 Building frontend..."
cd frontend
pnpm install
pnpm run build

echo "🧹 Cleaning old static files..."
rm -rf ../backend/app/static
mkdir -p ../backend/app/static

echo "📁 Copying Next.js build output..."
# Copy the entire out directory
cp -r out/* ../backend/app/static/

# Ensure _next static assets are properly copied
if [ -d "out/_next" ]; then
    echo "📦 Copying _next static assets..."
    mkdir -p ../backend/app/static/_next
    cp -r out/_next/* ../backend/app/static/_next/
fi

echo "✅ Build completed successfully!"

echo "🔥 Setting up backend environment..."
cd ../backend
# Check if Pipenv is installed, install if missing
if ! command -v pipenv &> /dev/null; then
  echo "📦 Installing Pipenv..."
  pip install --user pipenv
  export PATH="$HOME/.local/bin:$PATH"  
fi

# Install dependencies from Pipfile
echo "📦 Installing Python dependencies from Pipfile..."
pipenv install

echo "🔥 Starting Flask server with Pipenv..."
pipenv run python run.py