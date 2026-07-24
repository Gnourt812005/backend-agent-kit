#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
SRC_DIR="$ROOT_DIR/src"

echo "==> [validate-boundaries] Checking Domain layer dependency boundaries..."

if [ ! -d "$SRC_DIR/domain" ]; then
  echo "    No src/domain directory found, skipping boundary check."
  exit 0
fi

# Domain must not import NestJS, Mongoose, Express, Fastify, or outer layers
VIOLATIONS=$(grep -rnE "from ['\"](@nestjs|mongoose|express|fastify|\.\./\.\./infrastructure|\.\./\.\./api|\.\./\.\./applications)" "$SRC_DIR/domain" || true)

if [ -n "$VIOLATIONS" ]; then
  echo "❌ CRITICAL BOUNDARY VIOLATION: Domain layer imports infrastructure/framework packages!"
  echo "$VIOLATIONS"
  exit 1
else
  echo "✅ Domain layer boundaries clean."
fi
