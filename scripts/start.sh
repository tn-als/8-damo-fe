#!/bin/bash
set -e

echo "ApplicationStart: Starting containers..."
cd /home/ubuntu/app

# Pull latest images
sudo docker compose --env-file scripts/image.env pull

# Start services
sudo docker compose --env-file scripts/image.env up -d

# Wait for services to be healthy
echo "Waiting for services to be healthy..."
sleep 30

# Check container status
sudo docker compose ps