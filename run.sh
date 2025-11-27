#!/bin/bash

echo "🔥 Setting up backend environment..."

# Go into the oracle folder
if [ -d "oracle" ]; then
  cd oracle
else
  echo "⚠️ Warning: 'oracle' folder not found. Continuing in current directory."
fi

# Install pipenv if not installed
if ! command -v pipenv &> /dev/null; then
  echo "📦 Installing Pipenv..."
  pip install --user pipenv
  export PATH="$HOME/.local/bin:$PATH"
fi

echo "📦 Installing Python dependencies from Pipfile..."
pipenv install

echo "🚀 Starting Flask server..."
pipenv run python run.py
