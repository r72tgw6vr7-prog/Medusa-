#!/bin/bash
# CSS CLEANUP SCRIPT
# Removes duplicate and unused CSS files
# Run from project root: bash cleanup-css-duplicates.sh

echo "🧹 Starting CSS cleanup..."
echo ""

# Step 1: Delete duplicate token files
echo "Step 1: Removing duplicate token files..."
rm -f src/styles/variables.css
rm -f src/styles/system.css
rm -f src/styles/utility-tokens.css
echo "✅ Deleted: variables.css, system.css, utility-tokens.css"
echo ""

# Step 2: Delete duplicate layout files
echo "Step 2: Removing duplicate layout files..."
rm -f src/styles/responsive-layout.css
rm -f src/styles/responsive-breakpoints.css
rm -f src/styles/spacing-system.css
rm -f src/styles/pixel-perfect-responsive.css
echo "✅ Deleted: responsive-layout.css, responsive-breakpoints.css, spacing-system.css, pixel-perfect-responsive.css"
echo ""

# Step 3: Delete duplicate base/reset files
echo "Step 3: Removing duplicate base/reset files..."
rm -f src/styles/globals.css
rm -f src/styles/accessibility.css
rm -f src/styles/focus-states.css
rm -f src/styles/placeholders.css
echo "✅ Deleted: globals.css, accessibility.css, focus-states.css, placeholders.css"
echo ""

# Step 4: Delete duplicate typography files
echo "Step 4: Removing duplicate typography files..."
rm -f src/styles/typography-standardization.css
echo "✅ Deleted: typography-standardization.css"
echo ""

# Step 5: Delete miscellaneous/orphaned files
echo "Step 5: Removing miscellaneous files..."
rm -f src/styles/styles.css
rm -f src/styles/TrustBadgesBar.module.css.d.ts
rm -f src/styles/google-map.css
rm -f src/styles/motion-containers.css
rm -f src/styles/page-title-spacing.css
rm -f src/styles/page-title.css
echo "✅ Deleted: styles.css, motion-containers.css, page-title files, etc."
echo ""

echo "🎉 CLEANUP COMPLETE!"
echo ""
echo "Remaining files in src/styles/:"
ls -1 src/styles/ | wc -l
echo ""
echo "Next steps:"
echo "1. Run: npm run dev"
echo "2. Test homepage at http://localhost:5173"
echo "3. If everything works, commit changes"
echo ""
