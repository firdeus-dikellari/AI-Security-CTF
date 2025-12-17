#!/bin/bash
set -e

# Start supervisord in the background
supervisord -c /etc/supervisor/conf.d/supervisord.conf &

# Wait for Ollama to start
echo "Waiting for Ollama..."
until curl -s http://127.0.0.1:11434/api/tags >/dev/null; do
    sleep 2
done

# Pull the model if not present (or simply try to pull to ensure it's there)
echo "Pulling gemma3:1b model..."
ollama pull gemma3:1b

echo "Services started. CTF is ready."

# Wait for any process to exit
wait -n
