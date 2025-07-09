#!/usr/bin/env bash
set -e

# Detect package manager
if command -v apt-get >/dev/null 2>&1; then
  UPDATE_CMD="sudo apt-get update"
  INSTALL_CMD="sudo apt-get install -y"
  DOCKER_PKG="docker.io"
elif command -v yum >/dev/null 2>&1; then
  UPDATE_CMD="sudo yum makecache"
  INSTALL_CMD="sudo yum install -y"
  DOCKER_PKG="docker"
else
  echo "Weder apt-get noch yum gefunden. Bitte installieren Sie Docker und Docker Compose manuell." >&2
  exit 1
fi

# Install docker if not present
if ! command -v docker >/dev/null 2>&1; then
  echo "Docker wird installiert..."
  eval "$UPDATE_CMD"
  eval "$INSTALL_CMD $DOCKER_PKG"
fi

# Install docker compose if not present
if ! docker compose version >/dev/null 2>&1 && ! command -v docker-compose >/dev/null 2>&1; then
  echo "Docker Compose wird installiert..."
  eval "$INSTALL_CMD docker-compose"
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
