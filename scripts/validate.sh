#!/bin/bash
set -e

echo "ValidateService: Checking application health..."
cd /home/ubuntu/app

# Check if containers are running
if ! sudo docker compose ps | grep -q "Up"; then
    echo "ERROR: Containers are not running properly"
    exit 1
fi

# Wait a bit more for full startup
sleep 10

# Check application health endpoint (adjust URL as needed)
# You can add curl health check here
# curl -f http://localhost:3000/health || exit 1

echo "ValidateService: Application is running successfully"