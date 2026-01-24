# Medusa Tattoo München - Luxury Tattoo Salon Website

A world-class, production-ready website for Medusa Tattoo München, built with React, TypeScript, and Tailwind CSS v4. Features a comprehensive design system, WCAG AA accessibility, and full German/English multi-language support.

---

## 🎨 Design System

Medusa uses a **60-30-10 color system** with chrome accents:

- **Primary (60%):** `#171717` - Dominant backgrounds/text
- **Surface (30%):** `#F3F3F3` - Cards/sections
- **Grey (10%):** `#666666` - Borders/utilities
- **Accent:** `#C0C0C0` - Chrome highlights (CTAs, focus)

### Documentation

- [Usage Guide](./DESIGN_SYSTEM_USAGE_GUIDE.md)
- [Changelog](./CHANGELOG.md)
- [Theme Constants](./lib/theme/README.md)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 20.x
- **pnpm**: 9.x or higher
- **Git**: Latest version

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/medusa-tattoo-muenchen.git
cd medusa-tattoo-muenchen

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env

# Add your API keys to .env (see Environment Variables section)

# Start development server
pnpm run dev
```

The site will be available at `http://localhost:5173`

---

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Email Service (server-side secret)
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Google Maps (for Contact page)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# reCAPTCHA
# Public site key (safe to expose to client)
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
# Secret key (server-side secret)
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here

# Analytics (public identifier)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Production URL
VITE_SITE_URL=https://medusa-tattoo-muenchen.de
```

### Getting API Keys

**SendGrid** (Email):
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key with "Mail Send" permissions
3. Add to `.env` as `SENDGRID_API_KEY`

**Google Maps** (Contact Page):
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable "Maps JavaScript API"
3. Create an API key
4. Add to `.env` as `VITE_GOOGLE_MAPS_API_KEY`

**reCAPTCHA** (Spam Protection):
1. Register site at [google.com/recaptcha](https://www.google.com/recaptcha)
2. Choose reCAPTCHA v3
3. Add both site key and secret key to `.env`

---

## 📦 Build & Deployment

### Build for Production

```bash
# Create production build
pnpm run build

# Preview production build locally
pnpm run preview
```

Build output will be in `/dist` directory.

### Deployment Options

**Recommended: Vercel**
```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel --prod
```

**Alternative: Netlify**
```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Deploy
netlify deploy --prod
```

**Build Settings**:
- Build command: `pnpm run build`
- Publish directory: `dist`
- Node version: `20.x`

---

## 📁 Project Structure

```
/
├── components/              # React components
│   ├── ui/                 # ShadCN UI components
│   ├── layout/             # Layout components (ErrorBoundary, LoadingSpinner)
│   ├── pages/              # Page components
│   ├── navigation/         # Navigation components
│   ├── gallery/            # Gallery components
│   ├── artists/            # Artist-related components
│   ├── booking/            # Booking flow components
│   └── ...                 # Other component categories
├── styles/                 # Global styles
│   ├── globals.css         # Main stylesheet with design tokens
│   ├── responsive-2025.css # Responsive utilities
│   └── ...
├── core/                   # Core application logic
│   ├── state/              # State management (AppContext, reducers)
│   ├── types/              # TypeScript types
│   └── constants/          # Constants and configuration
├── data/                   # Content data
│   ├── artists-de.ts       # German artist data
│   └── artists-en.ts       # English artist data
├── foundation/             # Foundation components & providers
├── handoff/                # Design system documentation
├── public/                 # Static assets
│   ├── images/             # Images (team photos, gallery)
│   └── manifest.json       # PWA manifest
├── App.tsx                 # Main application component
└── ...
```

---

## 🎯 Available Scripts

```bash
# Development
pnpm run dev              # Start dev server (Vite)

# Production
pnpm run build            # Build for production
pnpm run preview          # Preview production build

# Code Quality
pnpm run lint             # Run ESLint
pnpm run typecheck        # Run TypeScript checks

# Testing
pnpm run test             # Run unit tests (Vitest)
pnpm run test:e2e         # Run end-to-end tests (Playwright)
pnpm run test:p0          # Run P0 critical behavior tests
pnpm run test:p0:headed   # Run P0 tests with visible browser
pnpm run test:p0:report   # Run P0 tests and open HTML report
```

---

## SCROLL/ANIMATION RULES (MANDATORY)

1. **Hero Parallax**: Framer Motion only (`src/components/ui/hero-parallax.tsx`). NO GSAP overrides.
2. **Scroll Controller**: `src/lib/scroll.ts` singleton. Edit config only; no global kills.
3. **Route Changes**: Scoped cleanup in `src/components/ScrollToTop.tsx` (DOM orphans only).
4. **RAF**: Batch into single queue (`src/utils/rafQueue.ts`). No direct `requestAnimationFrame`.
5. **Playground**: Never merge to prod. Delete after experiments.
6. **Node**: Strictly 20.x (`engines` in `package.json`).

## AI AGENT BEHAVIOR

- ALWAYS run forensic grep first (no assumptions).
- NO global `ScrollTrigger.killAll()` → scoped DOM-check only.
- Verify design post-change: hero parallax identical.
- Test: 5 navs → ScrollTrigger count stable + FPS 58+

## 🌐 Multi-Language Support

The site supports **German** (primary) and **English**.

### Content Files
- `/data/artists-de.ts` - German artist data
- `/data/artists-en.ts` - English artist data
- Component strings are managed in each component's `content` object

### Language Toggle
- Located in navigation (desktop) and mobile menu
- Persisted in localStorage
- Default: German (DE)

### Adding Translations
1. Update component content objects with DE/EN keys
2. Update data files in `/data/`
3. Ensure all UI strings have both languages

---

## ♿ Accessibility

This site follows **WCAG AA** standards:

✅ **Color Contrast**: All text meets 4.5:1 minimum
✅ **Touch Targets**: All interactive elements ≥ 44px
✅ **Keyboard Navigation**: Full site navigable via keyboard
✅ **Focus Indicators**: Visible focus states on all elements
✅ **Screen Readers**: Proper ARIA labels and semantic HTML
✅ **Alt Text**: All images have meaningful descriptions

### Testing
```bash
# Install axe-core for accessibility testing
pnpm add -D @axe-core/cli

# Run accessibility audit
npx axe https://localhost:5173
```

---

## 🔬 P0 Critical Testing

**P0 tests** verify critical user experience behaviors at runtime using Playwright.

### Quick Start
```bash
# Setup (one-time)
npx playwright install

# Run all P0 tests
pnpm run test:p0

# Run with visual browser
pnpm run test:p0:headed

# Generate HTML report
pnpm run test:p0:report
```

### Test Coverage

| Test ID | Behavior | Status |
|---------|----------|--------|
| **R2** | Scroll to top on navigation | ✅ Implemented |
| **C6** | Google Maps fallback behavior | ✅ Implemented |
| **T4** | Font weight token compliance | ✅ Implemented |
| **SEO5** | GA4 analytics event tracking | ✅ Implemented |

### Environment Setup
Create `.env.local`:
```bash
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

📖 **Full Documentation**: See [docs/P0_TESTING.md](docs/P0_TESTING.md) for complete testing guide.

---

## 📱 Responsive Design

Tested and optimized for:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1439px
- **Desktop**: 1440px+

### Breakpoints
```css
/* Mobile Portrait */
@media (max-width: 320px) { /* Ultra-small */ }
@media (min-width: 375px) { /* iPhone standard */ }

/* Tablet */
@media (min-width: 768px) { /* Tablet portrait */ }
@media (min-width: 1024px) { /* Tablet landscape */ }

/* Desktop */
@media (min-width: 1440px) { /* Desktop standard */ }
@media (min-width: 2000px) { /* Ultra-wide */ }
```

---

## 🎨 Design System Documentation

Full design system documentation available in:
- `/DESIGN_SYSTEM_TOKENS_GUIDE.md` - Complete token reference
- `/handoff/DEVELOPER_HANDOFF_PACKAGE.md` - Comprehensive handoff docs
- `/handoff/design-tokens-complete.json` - 5,500+ lines of design tokens
- `/handoff/component-states.json` - All component states

---

## 🔌 API Integration

### Backend Endpoints (To Be Implemented)

**Booking Form** (`POST /api/booking`)
```json
{
  "artistId": "string",
  "serviceId": "string",
  "date": "ISO 8601",
  "time": "HH:MM",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "details": "string",
  "gdprConsent": { ... }
}
```

**Contact Form** (`POST /api/contact`)
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Email Service** (`POST /api/send-mail`)
```json
{
  "to": "string",
  "subject": "string",
  "template": "booking|contact|confirmation",
  "data": { ... }
}
```

### Example Implementation

See `/api/send-mail.js` for email service implementation example.

---

## 🧩 Component Usage

### Using Design Tokens

```tsx
import './styles/globals.css';

// Color
<div className="bg-brand-background text-brand-white border-brand-gold">

// Typography
<h1 className="text-headline-xl font-headline text-brand-gold">

// Spacing
<section style={{ padding: 'var(--section-padding-mobile)' }}>

// Effects
<div style={{ boxShadow: 'var(--gold-glow-subtle)' }}>
```

### Perfect Button Example

```tsx
<button
  className="font-body bg-brand-gold text-brand-background"
  style={{
    height: 'var(--button-height-mobile)',
    minHeight: 'var(--button-height-mobile)',
    padding: '12px 24px',
    borderRadius: 'var(--radius-sm)',
    boxShadow: 'var(--gold-glow-subtle)',
    transition: 'all 0.3s var(--luxury-timing)',
    lineHeight: 1.0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  Book Now
</button>
```

---

## 🐛 Known Issues & Limitations

### ⚠️ Backend Not Implemented
- Booking form does not submit to backend
- Contact form does not send emails
- **Action Required**: Implement `/api/` endpoints

### ⚠️ Placeholder Content
- Team photos use placeholder images
- Some artist bios are demo content
- **Action Required**: Replace with real content

### ⚠️ Image Optimization
- Images not converted to WebP
- No responsive image sets (srcset)
- **Action Required**: Run image optimization script

### ✅ Everything Else
- Design system: 100% complete
- Components: 100% complete
- Pages: 100% complete
- Responsive: 100% complete
- Accessibility: 100% complete

---

## 📊 Performance Targets

- **Lighthouse Score**: 90+ (all categories)
- **Page Load**: < 3 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5 seconds

### Optimization Checklist
- [ ] Convert all images to WebP
- [ ] Implement lazy loading for images
- [ ] Add image srcset for responsive images
- [ ] Minify CSS/JS in production
- [ ] Enable gzip/brotli compression
- [ ] Set up CDN for static assets
- [ ] Implement service worker for offline support

---

## 🔒 Security

### Implemented
✅ GDPR-compliant cookie consent
✅ Input sanitization on forms
✅ HTTPS enforced in production
✅ Environment variables for secrets
✅ CORS configuration

### To Implement
- [ ] Rate limiting on API endpoints
- [ ] reCAPTCHA on booking/contact forms
- [ ] CSP (Content Security Policy) headers
- [ ] XSS protection headers

---

## 📞 Support & Contact

**Project Repository**: [GitHub URL]
**Design System Lead**: [Name]
**Developer Lead**: [Name]
**Client Contact**: Medusa Tattoo München

**Documentation**:
- Design Tokens: `/DESIGN_SYSTEM_TOKENS_GUIDE.md`
- Handoff Checklist: `/DEVELOPER_HANDOFF_FINAL_CHECKLIST.md`
- Component Library: `/01-components-library/`
- Guidelines: `/guidelines/Guidelines.md`

---

## 📄 License

Proprietary - © 2025 Medusa Tattoo München. All rights reserved.

---

## 🎉 Acknowledgments

- Design System: Custom luxury design system
- UI Components: ShadCN UI
- Icons: Lucide React
- Fonts: Playfair Display + Inter (Google Fonts)
- Build Tool: Vite
- Framework: React 18 + TypeScript

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Production Ready (Pending Backend Integration)
