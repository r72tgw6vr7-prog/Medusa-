# Medusa Tattoo München - Complete Developer Handoff Package

**Version:** 1.0.0  
**Date:** November 11, 2025  
**Status:** Production Ready ✅

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Design System](#design-system)
4. [Container & Layout Standards](#container--layout-standards)
5. [Component Library](#component-library)
6. [Implementation Guide](#implementation-guide)
7. [Quality Assurance](#quality-assurance)
8. [Deployment](#deployment)
9. [Maintenance & Support](#maintenance--support)

---

## 🎯 Project Overview

### Brand Identity

**Medusa Tattoo München** is a luxury tattoo and piercing studio in Munich, Germany. The website reflects premium craftsmanship, artistic excellence, and professional service.

### Brand Colors (Magenta Theme)

```css
--brand-primary: #4e2a3f;      /* Deep Magenta */
--brand-secondary: #442538;    /* Darker Magenta */
--brand-accent: #c9a9bd;       /* Light Magenta */
--brand-hover: #5d3249;        /* Hover Magenta */
--deep-black: #000000;         /* Backgrounds */
--base-white: #FFFFFF;         /* Text & Content */
--chrome-silver: #C0C0C0;      /* Accents & Borders */
```

### Typography

- **Headlines:** Playfair Display (serif) - Elegant, luxury feel
- **Body Text:** Inter (sans-serif) - Clean, readable
- **Spacing:** 8px grid system (8, 16, 24, 32, 48, 64, 80px)

---

## 🛠️ Technical Stack

### Core Technologies

```json
{
  "framework": "React 18.3.1",
  "buildTool": "Vite 5.4.11",
  "styling": "Tailwind CSS 3.4.15 + CSS Modules",
  "routing": "React Router DOM 6.28.0",
  "language": "TypeScript 5.6.3",
  "icons": "Lucide React 0.468.0"
}
```

### Development Tools

- **Package Manager:** npm
- **Linting:** ESLint
- **Formatting:** Prettier
- **Type Checking:** TypeScript strict mode
- **Security:** Snyk integration

---

## 🎨 Design System

### Design Token Architecture

The project uses a **hybrid approach**:

1. **CSS Variables** (source of truth) → `src/styles/design-system.css`
2. **Tailwind Config** (mapped to CSS vars) → `tailwind.config.mjs`
3. **TypeScript Tokens** (type-safe access) → `src/tokens/`

### Color System

```typescript
// Usage in components
className="bg-brand-primary text-base-white"
className="hover:bg-brand-hover hover:shadow-gold-glow"
className="border-brand-accent/30"
```

### Spacing Scale (8px Grid)

```typescript
// Tailwind utilities
space-2  → 8px
space-4  → 16px
space-6  → 24px
space-8  → 32px
space-12 → 48px
space-16 → 64px
space-20 → 80px
```

### Shadow System

```css
/* Magenta brand glows */
shadow-gold-glow-subtle  → 0 0 10px rgba(125, 49, 93, 0.2)
shadow-gold-glow         → 0 0 20px rgba(125, 49, 93, 0.3)
shadow-gold-glow-strong  → 0 0 30px rgba(125, 49, 93, 0.4)
```

---

## 📐 Container & Layout Standards

### Container Width Specifications

**Standard:** 1440px maximum width (desktop)

```css
/* CSS Variable */
--container-default: 1440px;
--container-narrow: 1024px;

/* Tailwind Classes */
w-container        → 1440px
w-container-narrow → 1024px
w-container-sm     → 768px
```

### Responsive Breakpoints

```typescript
sm:  640px  // Mobile landscape
md:  768px  // Tablet
lg:  1024px // Desktop
xl:  1280px // Wide desktop
```

### Container Usage

```tsx
// Standard page container
<div className="w-full max-w-container mx-auto px-4 md:px-8 lg:px-12">
  {/* Content */}
</div>

// Using CSS class
<div className="container">
  {/* Auto-applies max-width, centering, and responsive padding */}
</div>

// Narrow container (for text-heavy content)
<div className="container-narrow">
  {/* 1024px max-width */}
</div>
```

---

## 🧩 Component Library

### Button Components

#### Primary CTA Button

```tsx
<button className="
  h-button px-6 rounded-lg
  bg-brand-primary text-base-white
  font-semibold
  shadow-gold-glow
  hover:bg-brand-hover hover:shadow-gold-glow-strong
  hover:-translate-y-0.5
  transition-all duration-300
  focus:outline-2 focus:outline-brand-primary
  min-h-[48px]
">
  Book Appointment
</button>
```

#### Secondary Button

```tsx
<button className="
  h-button px-6 rounded-lg
  bg-transparent border-2 border-brand-accent
  text-brand-accent
  hover:bg-brand-accent/10 hover:border-brand-hover
  transition-all duration-300
  focus:outline-2 focus:outline-brand-accent
">
  Learn More
</button>
```

### Card Components

#### Service Card

```tsx
<div className="
  bg-brand-background/80 backdrop-blur-sm
  border border-brand-accent/15
  rounded-xl p-6
  hover:border-brand-accent/40
  hover:shadow-gold-glow
  transition-all duration-300
">
  <h3 className="font-playfair text-2xl text-base-white mb-4">
    Service Title
  </h3>
  <p className="text-white/80 mb-6">
    Service description
  </p>
  <button className="...">Book Now</button>
</div>
```

#### Artist Card

```tsx
<div className="group relative overflow-hidden rounded-xl">
  <img 
    src="artist-photo.webp"
    alt="Artist Name - Tattoo Artist"
    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/40 to-transparent">
    <div className="absolute bottom-0 p-6">
      <h3 className="font-playfair text-2xl text-base-white mb-2">
        Artist Name
      </h3>
      <p className="text-brand-accent">Specialization</p>
    </div>
  </div>
</div>
```

### Form Components

#### Input Field

```tsx
<input
  type="text"
  className="
    w-full h-input px-4 rounded-lg
    bg-brand-background/50
    border border-brand-accent/20
    text-base-white placeholder:text-white/40
    focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40
    transition-all duration-200
  "
  placeholder="Your name"
/>
```

#### Textarea

```tsx
<textarea
  rows={4}
  className="
    w-full px-4 py-3 rounded-lg
    bg-brand-background/50
    border border-brand-accent/20
    text-base-white placeholder:text-white/40
    focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40
    transition-all duration-200
    resize-none
  "
  placeholder="Your message"
/>
```

---

## 📖 Implementation Guide

### Step 1: Environment Setup

```bash
# Clone repository
git clone <repository-url>
cd Stargate

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Step 2: Understanding the Architecture

```
src/
├── components/          # Reusable UI components
│   ├── atoms/          # Basic building blocks
│   ├── molecules/      # Composite components
│   └── organisms/      # Complex components
├── pages/              # Route-level components
├── sections/           # Page sections
├── styles/             # Global styles & design system
│   ├── design-system.css    # CSS variables (source of truth)
│   ├── responsive-layout.css # Container & layout utilities
│   └── globals.css          # Base styles
├── tokens/             # TypeScript design tokens
└── utils/              # Helper functions
```

### Step 3: Creating a New Page

```tsx
// src/pages/NewPage.tsx
import { PageHeader } from '@/components/molecules/PageHeader';
import { Section } from '@/components/layouts/Section';

export const NewPage = () => {
  return (
    <>
      <PageHeader
        title="Page Title"
        subtitle="Page description"
      />
      
      <Section className="py-16 md:py-24">
        <div className="container">
          {/* Page content */}
        </div>
      </Section>
    </>
  );
};
```

### Step 4: Adding Routes

```tsx
// src/App.tsx or routing config
import { NewPage } from './pages/NewPage';

// Add to routes
{
  path: '/new-page',
  element: <NewPage />
}
```

### Step 5: Styling Best Practices

```tsx
// ✅ GOOD: Use Tailwind utilities + design tokens
<div className="bg-brand-primary text-base-white p-6 rounded-lg">

// ✅ GOOD: Use CSS variables for custom values
<div style={{ backgroundColor: 'var(--brand-primary)' }}>

// ❌ AVOID: Hardcoded colors
<div style={{ backgroundColor: '#4e2a3f' }}>

// ❌ AVOID: Arbitrary values when token exists
<div className="bg-[#4e2a3f]">
```

---

## ✅ Quality Assurance

### Pre-Launch Checklist

#### Design Compliance

- [ ] Only brand colors used (magenta palette)
- [ ] Only Playfair Display + Inter fonts
- [ ] 8px grid spacing followed
- [ ] Magenta glow effects (no drop shadows)
- [ ] Container max-width: 1440px

#### Accessibility (WCAG AA)

- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Touch targets ≥ 48px
- [ ] Keyboard navigation works
- [ ] Focus indicators visible (2px magenta outline)
- [ ] ARIA labels on interactive elements
- [ ] Alt text on all images
- [ ] Screen reader tested

#### Responsive Design

- [ ] Mobile (320px - 640px) ✓
- [ ] Tablet (768px - 1024px) ✓
- [ ] Desktop (1024px - 1440px) ✓
- [ ] Wide (1440px+) ✓
- [ ] No horizontal scroll
- [ ] Touch-friendly on mobile

#### Performance

- [ ] Images optimized (WebP + JPEG fallback)
- [ ] Lazy loading implemented
- [ ] Lighthouse performance ≥ 85
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s

#### Security

- [ ] Snyk scan passed (no critical vulnerabilities)
- [ ] Dependencies up to date
- [ ] No exposed API keys
- [ ] HTTPS enforced
- [ ] CSP headers configured

### Testing Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build

# Security scan (requires Snyk CLI)
snyk test
```

---

## 🚀 Deployment

### Build Process

```bash
# Production build
npm run build

# Output directory: dist/
# Contains optimized HTML, CSS, JS, and assets
```

### Deployment Platforms

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify

```bash
# Build command: npm run build
# Publish directory: dist
```

#### Environment Variables

```env
# .env.production
VITE_API_URL=https://api.medusa-tattoo.de
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

---

## 🔧 Maintenance & Support

### Regular Updates

- **Dependencies:** Update monthly (check for security patches)
- **Content:** Update gallery images quarterly
- **Performance:** Monitor with Lighthouse monthly

### Common Tasks

#### Adding Gallery Images

```tsx
// src/data/galleryImages.ts
export const galleryImages = [
  {
    src: '/assets/gallery/tattoos/new-image.webp',
    alt: 'Description of tattoo work',
    artist: 'Artist Name',
    category: 'tattoos',
    style: 'blackwork'
  }
];
```

#### Updating Artist Information

```tsx
// src/data/artists.ts
export const artists = [
  {
    name: 'Artist Name',
    role: 'Tattoo Artist',
    specialization: 'Realism, Portraits',
    image: '/assets/team/artist-name.webp',
    bio: 'Artist biography...'
  }
];
```

### Support Contacts

- **Technical Issues:** [developer-email]
- **Content Updates:** [content-manager-email]
- **Design Questions:** Refer to this handoff package

---

## 📚 Additional Resources

### Documentation Files

- `README.md` - Quick start guide
- `design-tokens-complete.json` - Complete token reference
- `component-states.json` - Component specifications
- `asset-manifest.json` - Asset requirements
- `VISUAL_STYLE_GUIDE.md` - Visual reference guide

### External Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com/)
- [Vite Docs](https://vitejs.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🎯 Success Criteria

A successful implementation achieves:

✅ **100% Brand Compliance** - Only approved colors, fonts, spacing  
✅ **WCAG AA Accessibility** - Lighthouse score ≥ 90  
✅ **Performance** - Page load < 3s, LCP < 2.5s  
✅ **Responsive** - Perfect layout 320px - 2000px  
✅ **Security** - No critical vulnerabilities  

---

**Build luxury. Build with precision. Build with Medusa.**

---

*For questions or clarifications, refer to the comprehensive documentation in this handoff package or contact the development team.*
