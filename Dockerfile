# ─────────────────────────────────────────────────────────────────
# 🚌 KISKU TRAVELS — Dockerfile
# Multi-stage build: Vite frontend + Express backend
# ─────────────────────────────────────────────────────────────────

# ── Stage 1: Build the Vite frontend ──────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build-time Gemini API key (for Vite env injection)
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Copy package files first for better layer caching
COPY package*.json ./

# Install all dependencies (including devDeps needed for build)
RUN npm ci

# Copy source files
COPY . .

# Build the production Vite bundle → /app/dist
RUN npm run build

# ── Stage 2: Minimal production runtime ───────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy package files and install production deps only
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Copy backend entry point (Express server)
COPY --from=builder /app/server.js ./server.js 2>/dev/null || true

# ── Health check ──────────────────────────────────────────────────
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

# Expose the application port
EXPOSE 3000

# Start the Express server (serves both API + static Vite build)
CMD ["node", "server.js"]
