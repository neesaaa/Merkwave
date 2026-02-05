# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files from frontend/merkwave
COPY frontend/merkwave/package*.json ./

# Install dependencies
RUN npm install

# Copy source code from frontend/merkwave
COPY frontend/merkwave/ .

# Build the Next.js app
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built static files from builder
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
