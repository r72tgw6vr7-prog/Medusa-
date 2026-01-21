# Design System Changelog

## v2.0.0 - January 17, 2026

### 🎨 BREAKING CHANGES: Color System Migration

**Removed:**
- Gold accent system (#D4AF37, #C19B26, #A8821A)
- All `brand-gold` Tailwind utilities
- Gold shadow tokens (`shadow-gold-glow-*`)

**Added:**
- Chrome accent system (#C0C0C0, #A8A8A8)
- New semantic tokens: `brand-accent`, `brand-accent-hover`
- Chrome shadow tokens (`shadow-chrome-glow-*`)
- AA-compliant grey (#666666, 4.52:1 contrast ratio)

**Updated:**
- Primary: #171717 (60% usage - dominant color)
- Surface: #F3F3F3 (30% usage - secondary)
- Grey: #666666 (10% usage - utility)
- Accent: #C0C0C0 (tactical highlights only)

### ♿ Accessibility
- All text combinations now pass WCAG AA (4.5:1+)
- Focus states use chrome with 40% opacity
- Improved contrast for muted text

### 📦 Files Modified
- `tailwind.config.mjs` - Brand palette, shadows, safelist
- `medusa-tattoo-seo/src/app/globals.css` - CSS variables
- `lib/theme/colors.ts` - TypeScript constants (new file)
- `DESIGN_SYSTEM_USAGE_GUIDE.md` - Complete rewrite

### 🔄 Migration Guide
See `DESIGN_SYSTEM_USAGE_GUIDE.md` for full migration instructions.
