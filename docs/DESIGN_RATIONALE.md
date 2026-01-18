# Design System Rationale

> **Last Updated:** 19 January 2026  
> **Purpose:** Document architectural decisions to prevent future drift

---

## Architecture

### Main App (Vite - Dark Theme)

**Single Source of Truth:** `src/styles/design-system.css`

- Deep black backgrounds (`#0a0a0a`)
- Chrome silver accents (`#C0C0C0`)
- Luxury dark aesthetic for brand experience
- Motion system: smooth transitions, prefers-reduced-motion support
- 578 lines of CSS custom properties covering:
  - Colors (brand, surface, text, accent)
  - Spacing (8px grid system)
  - Typography (fluid clamp() scales)
  - Shadows (neutral + chrome glow variants)
  - Focus rings (accessibility)
  - Motion (transitions, animations)

**How Tokens Flow:**
```
design-system.css → index.css (@config) → Tailwind v4 → Components
```

### SEO App (Next.js - Light Theme)

**Independent Design System:** `medusa-tattoo-seo/src/app/globals.css`

- Light gray backgrounds (`#F3F3F3`)
- Dark text on light (AAA contrast)
- Optimized for SEO/Core Web Vitals
- **Completely separate from main app** (no token sync)

---

## Why Separate Themes?

### Main App = Brand Experience

| Purpose | Value |
|---------|-------|
| Dark luxury aesthetic | Immersive gallery-style presentation |
| Chrome metallic accents | Premium feel, jewelry-like highlights |
| Deep black (`#0a0a0a`) | Maximum contrast for chrome (12.5:1) |
| Target audience | Engaged users browsing portfolio |

### SEO App = Search Optimization

| Purpose | Value |
|---------|-------|
| Light accessible theme | WCAG AAA compliance (21:1 text contrast) |
| Faster paint times | Better Core Web Vitals (LCP, FCP) |
| Lower bounce rates | Easier to read for wider audiences |
| Lower battery drain | Better mobile performance |
| Target audience | First-time visitors from Google |

---

## Color Strategy (Main App)

### Background Hierarchy

```css
/* Universal page background */
--luxury-bg-dark: #0a0a0a;           /* Deep black */

/* Component surfaces (cards, modals) */
--luxury-bg-dark-elevated: #1a1a1c;  /* Charcoal - creates depth */

/* Hover states */
--luxury-bg-dark-hover: #252528;     /* Lighter charcoal */
```

**Why deep black (`#0a0a0a`) not `#171717` or `#222222`?**
1. Matches Gallery page aesthetic (user preference from January 2026)
2. Provides maximum contrast for chrome accents (12.5:1 ratio)
3. Subtle elevation hierarchy via charcoal surfaces
4. Consistent with luxury brand positioning (Apple-like depth)

### Accent System

```css
/* Primary accent - USE ON DARK BACKGROUNDS ONLY */
--luxury-accent-chrome: #C0C0C0;     /* 12.5:1 contrast on #0a0a0a */

/* For light backgrounds */
--luxury-accent-chrome-safe: #767676; /* 4.54:1 contrast on #F3F3F3 */
```

**Why chrome (`#C0C0C0`) not gold (`#D4AF37`)?**
- Gold deprecated in January 2026 migration
- Chrome provides cleaner, more modern aesthetic
- Better accessibility (higher contrast ratios)
- Aligns with metallic/jewelry brand positioning

---

## Motion System

### Easing Vocabulary

| Token | Use Case |
|-------|----------|
| `ease-in-out-quad` | Standard UI interactions |
| `ease-out-cubic` | Exit animations, element removal |
| `ease-in-out-back` | Playful hover states (slight overshoot) |

### Duration Scale

| Duration | Value | Use Case |
|----------|-------|----------|
| Fast | 150ms | Micro-interactions (button presses) |
| Base | 250ms | Standard transitions (hover states) |
| Slow | 350ms | Dramatic reveals (modals, galleries) |

### Accessibility

All motion respects `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## CRITICAL: DO NOT SYNC THEMES

The two projects have **different optimization goals**:

| Main App | SEO App |
|----------|---------|
| Visual impact | Accessibility |
| Brand identity | Performance |
| Dark luxury | Light readable |
| Engaged users | Google traffic |

**Syncing themes would:**
- ❌ Hurt SEO scores (dark themes paint slower)
- ❌ Lower accessibility scores (white-on-black harder to read)
- ❌ Increase mobile bounce rates
- ❌ Reduce organic traffic

---

## Maintenance

### Editing Main App Tokens

1. Edit `src/styles/design-system.css` only
2. Run `npm run dev` at root
3. **DO NOT** touch `medusa-tattoo-seo/`

### Editing SEO App

1. Edit `medusa-tattoo-seo/src/app/globals.css`
2. Run `cd medusa-tattoo-seo && npm run dev`
3. **DO NOT** import root `design-system.css`

### DO NOT

- ❌ Create new root JSON token files
- ❌ Sync colors between projects
- ❌ Import main app CSS into SEO project
- ❌ Change SEO project's light theme
- ❌ Hardcode colors in components (use semantic tokens)
- ❌ Override motion tokens (respect the vocabulary)

---

## Token Consolidation History

**19 January 2026:** Consolidated 3 token sources → 1

| File | Status | Reason |
|------|--------|--------|
| `design-system.css` | ✅ KEPT | Feature-complete (motion, shadows, gradients) |
| `design-tokens.tokens.json` | ❌ DELETED | Empty file, no actual values |
| `design-tokens/figma-design-tokens.json` | ❌ DELETED | Deprecated gold refs, not imported |

**Why CSS over JSON?**
- Tailwind v4 natively reads CSS custom properties via `@config`
- No build step needed for token synchronization
- CSS is the runtime format anyway
- Single file to maintain vs. multiple formats

---

## Decision Log

| Date | Decision | Rationale | Author |
|------|----------|-----------|--------|
| Jan 2026 | Chrome replaces gold accent | Modern aesthetic, better contrast | Design review |
| Jan 2026 | Deep black (`#0a0a0a`) as universal bg | Gallery page preference, maximum chrome contrast | User feedback |
| Jan 2026 | Separate SEO app theme | SEO optimization requires light mode for Core Web Vitals | SEO analysis |
| Jan 2026 | Consolidate to CSS-only tokens | Tailwind v4 compatibility, reduced maintenance | Tech debt cleanup |
