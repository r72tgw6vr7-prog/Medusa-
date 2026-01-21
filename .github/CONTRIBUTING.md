# Contributing to Medusa Tattoo München

## Design System Guidelines

### Color Usage

**Always use semantic tokens:**
```tsx
✅ GOOD
<button className="bg-brand-accent hover:bg-brand-accent-hover">

❌ BAD
<button className="bg-[#C0C0C0] hover:bg-[#A8A8A8]">
<button style={{ backgroundColor: '#C0C0C0' }}>
```

### Before Submitting

Run these checks:

```bash
# No hardcoded colors
pnpm run design-system:audit
# Should return 0 matches

# Tokens are used
pnpm run design-system:check-tokens
# Should return >50 matches

# No gold references
pnpm run design-system:check-gold
# Should return 0 matches
```

### Adding New Colors

Never add arbitrary colors. Use existing tokens.

If new semantic token needed, update tailwind.config.mjs first

Document in DESIGN_SYSTEM_USAGE_GUIDE.md

Check WCAG AA compliance (4.5:1 minimum)
