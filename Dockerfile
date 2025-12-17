# Stage 1: Build Frontend
FROM node:18-alpine as builder

WORKDIR /app

# Copy source code
COPY gemma /app/gemma

# --- Build Red Team: Prompt Injections ---
WORKDIR /app/gemma/red/prompt-injections
# Replace API calls to use the subpath
# Note: The codebase seems to use absolute paths /api/... we need to map them to /red/prompt-injections/api/...
RUN find src \( -name "*.js" -o -name "*.jsx" \) -type f -exec sed -i "s|'/api/|'/red/prompt-injections/api/|g" {} +
RUN find src \( -name "*.js" -o -name "*.jsx" \) -type f -exec sed -i 's|"/api/|"/red/prompt-injections/api/|g' {} +
RUN npm install && npm run build
# Set PUBLIC_URL for routing (usually handled by package.json homepage or env var)
# The original dockerfile passed PUBLIC_URL
RUN PUBLIC_URL=/red/prompt-injections npm run build

# --- Build Red Team: Data Poisoning 1 ---
WORKDIR /app/gemma/red/data-posioning/data-poisoning1/frontend
RUN find src \( -name "*.js" -o -name "*.jsx" \) -type f -exec sed -i "s|'/api/|'/red/data-poisoning/1/api/|g" {} +
RUN find src \( -name "*.js" -o -name "*.jsx" \) -type f -exec sed -i 's|"/api/|"/red/data-poisoning/1/api/|g' {} +
RUN npm install
RUN PUBLIC_URL=/red/data-poisoning/1 npm run build

# --- Build Red Team: Data Poisoning 2 ---
WORKDIR /app/gemma/red/data-posioning/data-poisoning2/frontend
RUN find src \( -name "*.js" -o -name "*.jsx" \) -type f -exec sed -i "s|'/api/|'/red/data-poisoning/2/api/|g" {} +
RUN find src \( -name "*.js" -o -name "*.jsx" \) -type f -exec sed -i 's|"/api/|"/red/data-poisoning/2/api/|g' {} +
RUN npm install
RUN PUBLIC_URL=/red/data-poisoning/2 npm run build


# Stage 2: Runtime
FROM python:3.11-slim

# Install system dependencies
# curl: for ollama installation and healthchecks
# nginx: web server
# supervisor: process manager
RUN apt-get update && apt-get install -y \
    curl \
    nginx \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Create non-root user
RUN useradd -m -s /bin/bash ctfuser

# Set working directory
WORKDIR /app

# Setup directories for Nginx non-root
RUN chown -R ctfuser:ctfuser /var/lib/nginx \
    && chown -R ctfuser:ctfuser /var/log/nginx \
    && chown -R ctfuser:ctfuser /etc/nginx/conf.d \
    && touch /run/nginx.pid && chown ctfuser:ctfuser /run/nginx.pid

# Copy Python dependencies
COPY requirements.txt /app/requirements.txt
# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY gemma /app/gemma
COPY dashboard /usr/share/nginx/html
COPY dataset.csv /usr/share/nginx/html/dataset.csv
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY scripts/entrypoint.sh /app/entrypoint.sh

# Copy built frontend assets
COPY --from=builder /app/gemma/red/prompt-injections/build /usr/share/nginx/html/red/prompt-injections
COPY --from=builder /app/gemma/red/data-posioning/data-poisoning1/frontend/build /usr/share/nginx/html/red/data-poisoning/1
COPY --from=builder /app/gemma/red/data-posioning/data-poisoning2/frontend/build /usr/share/nginx/html/red/data-poisoning/2

# Fix permissions
RUN chmod +x /app/entrypoint.sh && \
    chown -R ctfuser:ctfuser /app && \
    chown -R ctfuser:ctfuser /usr/share/nginx/html

# Environment variables
ENV OLLAMA_HOST=127.0.0.1:11434
ENV OLLAMA_MODELS=/home/ctfuser/.ollama/models

# User
USER ctfuser

# Expose port
EXPOSE 8080

# Entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]
