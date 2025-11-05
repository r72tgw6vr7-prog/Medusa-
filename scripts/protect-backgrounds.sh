#!/bin/bash

# Protect background images from deletion
PROTECTED_BACKGROUNDS=(
  "public/assets/images/photos/backgrounds/tattoo-card-bg.webp"
  "public/assets/images/photos/backgrounds/piercing-card-bg.webp"
  "public/assets/images/photos/backgrounds/process-timeline-bg.webp"
)

echo "🔒 Verifying protected backgrounds..."
for bg in "${PROTECTED_BACKGROUNDS[@]}"; do
  if [ ! -f "$bg" ]; then
    echo "🚨 CRITICAL: Protected background missing: $bg"
    exit 1
  fi
done

echo "✅ All protected backgrounds verified"
