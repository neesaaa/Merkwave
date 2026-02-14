FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build arg for API URL (baked into client JS at build time)
ARG NEXT_PUBLIC_API_BASE_URL=http://localhost:5070
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Build static export (output: "export" → generates /app/out)
RUN npm run build

# --- Production stage: serve static files with Nginx ---
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy static export
COPY --from=builder /app/out /usr/share/nginx/html

# Copy nginx config
COPY docker-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
