echo "🔥 Setting up backend environment..."
cd oracle

if ! command -v pipenv &> /dev/null; then
  echo "📦 Installing Pipenv..."
  pip install --user pipenv
  export PATH="$HOME/.local/bin:$PATH"  
fi

echo "📦 Installing Python dependencies from Pipfile..."
pipenv install

echo "🚀 Starting Flask server..."
pipenv run python run.py