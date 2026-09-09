# Multi-stage Dockerfile for Vendure Storefront (TanStack Start)
# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate route tree and build
RUN npm run generate && npm run build

# Stage 2: Production
FROM node:22-alpine AS production

WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /usr/src/app/.output ./.output
COPY --from=builder /usr/src/app/public ./public

# Set environment
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Start the storefront
CMD ["node", ".output/server/index.mjs"]
