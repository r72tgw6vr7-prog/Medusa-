#!/bin/bash
# save as: scripts/emergency-gold-cleanup.sh

echo "🚨 EMERGENCY GOLD CLEANUP - Client Blocking Issues Only"

# TIER 1: Fix visual gold references (5 min)
echo "1/3: Replacing CSS variable gold references..."
find src components -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.jsx" -o -name "*.js" \) \
  -exec sed -i '' -e 's/var(--brand-gold)/var(--brand-accent)/g' \
                  -e 's/var(--antique-gold)/var(--brand-accent)/g' \
                  -e 's/var(--color-brand-gold)/var(--brand-accent)/g' \
                  -e 's/var(--brand-gold-hover)/var(--brand-accent)/g' \
                  -e 's/var(--color-brand-gold-hover)/var(--brand-accent)/g' \
                  -e 's/var(--color-brand-gold-dark)/var(--brand-accent)/g' \
                  -e 's/var(--brand-gold-rgb)/var(--brand-accent-rgb)/g' \
                  -e 's/var(--color-brand-gold-rgb)/var(--brand-accent-rgb)/g' \
                  -e 's/var(--shadow-gold-sm)/var(--shadow-chrome-sm)/g' \
                  -e 's/var(--shadow-gold-md)/var(--shadow-chrome-md)/g' \
                  -e 's/var(--shadow-gold-lg)/var(--shadow-chrome-lg)/g' {} +

# TIER 1: Fix Tailwind gold classes (3 min)
echo "2/3: Replacing Tailwind gold classes..."
find src components -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) \
  -exec sed -i '' -e 's/bg-brand-gold/bg-brand-accent/g' \
                  -e 's/text-brand-gold/text-brand-accent/g' \
                  -e 's/border-brand-gold/border-brand-accent/g' \
                  -e 's/ring-gold/ring-accent/g' \
                  -e 's/shadow-gold-glow/shadow-chrome-glow/g' {} +

# TIER 1: Fix RGB gold (212, 175, 55) (2 min)
echo "3/3: Replacing gold RGB values..."
find src components -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.jsx" -o -name "*.js" \) \
  -exec sed -i '' -e 's/rgb(212, 175, 55/rgb(192, 192, 192/g' -e 's/rgba(212, 175, 55/rgba(192, 192, 192/g' {} +

echo "✅ Emergency cleanup complete!"
echo ""
echo "📊 Verification:"
echo "   Gold CSS vars: $(rg 'var\(--.*gold' src/ components/ 2>/dev/null | wc -l | xargs)"
echo "   Gold classes: $(rg 'bg-brand-gold|text-brand-gold|border-brand-gold' src/ components/ 2>/dev/null | wc -l | xargs)"
echo "   Gold RGB: $(rg '212.*175.*55' src/ components/ 2>/dev/null | wc -l | xargs)"
echo ""
echo "🚀 Ready to build: pnpm run build"
