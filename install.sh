#!/usr/bin/env bash
set -e

# Install docker if not present
if ! command -v docker >/dev/null 2>&1; then
  echo "Docker wird installiert..."
  sudo apt-get update
  sudo apt-get install -y docker.io
fi

# Install docker compose if not present
if ! docker compose version >/dev/null 2>&1 && ! command -v docker-compose >/dev/null 2>&1; then
  echo "Docker Compose wird installiert..."
  sudo apt-get install -y docker-compose
fi

# Create .env if missing
if [ ! -f .env ]; then
  cp .env.example .env
  echo ".env aus .env.example erstellt."
fi

# Replace default JWT secret
if grep -q '^JWT_SECRET=changeme' .env; then
  secret=$(openssl rand -hex 16)
  sed -i "s/^JWT_SECRET=.*/JWT_SECRET=${secret}/" .env
  echo "JWT_SECRET wurde auf zufälligen Wert gesetzt."
fi

mkdir -p data

# Start services
echo "Docker Compose wird gestartet..."
docker compose up -d --build

echo "Installation abgeschlossen."
