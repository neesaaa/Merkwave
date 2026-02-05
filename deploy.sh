#!/bin/bash

# Merkwave Deployment Script
# This script deploys the Merkwave Next.js app to production

set -e

echo "🚀 Starting Merkwave deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="merkwave"
CONTAINER_NAME="merkwave-app"
PORT=8080
SSL_PORT=8443

# Stop and remove existing container if running
echo -e "${YELLOW}Stopping existing container if any...${NC}"
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Build the Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build -t $IMAGE_NAME:latest .

# Run the container
echo -e "${YELLOW}Starting new container...${NC}"
docker run -d \
  --name $CONTAINER_NAME \
  -p $PORT:80 \
  --restart unless-stopped \
  $IMAGE_NAME:latest

# Check if container is running
if docker ps | grep -q $CONTAINER_NAME; then
  echo -e "${GREEN}✓ Deployment successful!${NC}"
  echo -e "${GREEN}✓ Container $CONTAINER_NAME is running${NC}"
  echo -e "${GREEN}✓ Access your app at: http://merkwave.com${NC}"
else
  echo -e "${YELLOW}⚠ Warning: Container might not be running properly${NC}"
  echo "Check logs with: docker logs $CONTAINER_NAME"
  exit 1
fi

# Show container status
echo -e "\n${YELLOW}Container status:${NC}"
docker ps | grep $CONTAINER_NAME

# Clean up old images
echo -e "\n${YELLOW}Cleaning up old images...${NC}"
docker image prune -f

echo -e "\n${GREEN}✓ Deployment completed successfully!${NC}"
