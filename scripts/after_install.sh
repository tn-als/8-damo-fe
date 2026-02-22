#!/bin/bash
set -e

echo "AfterInstall: Setting up environment..."

# Create .env file if not exists
if [ ! -f "/home/ubuntu/app/.env" ]; then
    echo "Creating .env file..."
    # Copy from backup if exists
    if [ -f "/home/ubuntu/app_backup/.env" ]; then
        sudo cp /home/ubuntu/app_backup/.env /home/ubuntu/app/.env
    fi
fi

# Set proper permissions
sudo chown -R ubuntu:ubuntu /home/ubuntu/app
sudo chmod +x /home/ubuntu/app/scripts/*.sh