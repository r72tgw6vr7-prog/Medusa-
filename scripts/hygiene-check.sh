#!/bin/bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

echo "== Hygiene: circular deps (madge) =="
# Ensure TS/TSX are actually scanned
npx --yes madge --extensions ts,tsx --ts-config tsconfig.json --circular src/ || exit 1

echo "== Hygiene: dead exports (ts-prune) =="
# ts-prune is run via npx so no global install required
npx --yes ts-prune --no-npm || exit 1

echo "== Hygiene: folder depth (max 4 levels under src/) =="
# Fail if any directory is deeper than 4 levels under src/
DEPTH_HITS="$(find src/ -type d | awk -F/ 'NF>6' | head -1 || true)"
if [[ -n "$DEPTH_HITS" ]]; then
  echo "Folder depth violation (sample): $DEPTH_HITS" >&2
  exit 1
fi

echo "== Hygiene: eslint (0 warnings) =="
# Use repo's flat ESLint config
HYGIENE=1 npx --yes eslint --max-warnings 0 "src/**/*.{ts,tsx}" --config eslint.config.js || exit 1

echo "Hygiene: PASSED"
