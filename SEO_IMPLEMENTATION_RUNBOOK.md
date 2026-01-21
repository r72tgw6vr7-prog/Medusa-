# SEO Implementation Runbook
**Medusa Tattoo München - Brand Consistency & Technical SEO**

**Last Updated:** January 15, 2026  
**Status:** ✅ Brand consistency fixes complete

---

## 🎯 Overview

This document tracks all SEO and brand consistency changes made to ensure **Medusa Tattoo München** has a unified, professional online presence with world-class white-hat SEO.

---

## ✅ COMPLETED: Brand Consistency Fixes

### 1. Canonical Domain Enforcement

**Decision:** `https://www.muenchen-tattoo-studio.de` is the ONLY canonical domain.

**Files Updated:**
- ✅ `src/components/Meta.tsx` - BASE_URL fallback + fixed missing `locale` prop
- ✅ `index.html` - Canonical link + all JSON-LD schema URLs
- ✅ `public/robots.txt` - Sitemap URL (already correct)
- ✅ `public/sitemap.xml` - All `<loc>` entries (already correct)
- ✅ `vercel.json` - Redirect targets (already correct)
- ✅ `.env.example` - VITE_SITE_URL

**Verification:**
```bash
# Check canonical tag in browser DevTools
curl -s https://www.muenchen-tattoo-studio.de/ | grep canonical

# Verify sitemap
curl https://www.muenchen-tattoo-studio.de/sitemap.xml

# Verify robots.txt
curl https://www.muenchen-tattoo-studio.de/robots.txt
```

---

### 2. Email Address Standardization

**Decision:** All emails use `@medusa-tattoo.de` domain.

**Primary Contact:** `info@medusa-tattoo.de`

**Files Updated:**
- ✅ `src/pages/ImpressumPage.tsx` - Replaced `Medusa@in-tattoo.de`, `oliver@in-tattoo.de`
- ✅ `src/pages/DatenschutzPage.tsx` - Replaced `Medusa@in-tattoo.de`, `oliver@in-tattoo.de`, `stargate@in-tattoo.de`
- ✅ `src/data/footer.json` - Replaced `medusa@in-tattoo.de`
- ✅ `src/config/site.ts` - Replaced `medusa@in-tattoo.de`
- ✅ `src/components/pages/Footer.tsx` - Already correct (`info@medusa-tattoo.de`)
- ✅ `src/pages/ContactPage.tsx` - Already correct (`info@medusa-tattoo.de`)
- ✅ `index.html` - Already correct (`info@medusa-tattoo.de`)

**Verification:**
```bash
# Search for any remaining wrong-domain emails
grep -r "in-tattoo.de" src/ --include="*.tsx" --include="*.ts" --include="*.json"
# Should return: no results
```

---

### 3. Social Media URLs

**Facebook:** `https://www.facebook.com/MedusaTattooPiercingMuenchen`  
**Instagram:** `https://instagram.com/medusa_tattoo_munich`

**Files Updated:**
- ✅ `index.html` - Fixed Facebook URL in JSON-LD schema
- ✅ `.env.example` - Fixed VITE_FACEBOOK_URL
- ✅ `src/components/pages/Footer.tsx` - Already correct

**Verification:**
```bash
# Verify Facebook link in schema
curl -s https://www.muenchen-tattoo-studio.de/ | grep -o 'facebook.com/[^"]*'
```

---

### 4. Website Domain in Legal Pages

**Files Updated:**
- ✅ `src/pages/ImpressumPage.tsx` - Changed `www.medusa-tattoo.de` → `www.muenchen-tattoo-studio.de`

---

## 📋 NEXT STEPS: Technical SEO Implementation

### Phase 1: On-Page SEO (Priority: High)

**Goal:** Ensure every key page has unique, optimized meta tags and exactly one H1.

**Key Pages to Audit:**
- `/` (Home)
- `/services`
- `/artists`
- `/gallery`
- `/booking`
- `/contact`
- `/faq`
- `/aftercare`

**For Each Page:**
1. **Title Tag** (50-60 chars)
   - Format: `[Service/Page] in München | Medusa Tattoo`
   - Include primary keyword + city
   - Example: `Tattoo Studio München Marienplatz | Medusa Tattoo`

2. **Meta Description** (120-155 chars)
   - Include: service, location, USP, CTA
   - Natural language, not keyword stuffing
   - Example: `Premium Tattoo Studio am Marienplatz München ✓ Custom Tattoos ✓ Piercing ✓ Erfahrene Artists ► Jetzt Termin buchen!`

3. **H1 Tag** (exactly ONE per page)
   - Match primary search intent
   - Include location keyword naturally
   - Example: `Tattoo Studio München – Custom Tattoos & Piercing am Marienplatz`

**Implementation:**
- Check `src/App.tsx` for existing `<LocalizedMeta>` components
- Verify each page has unique title/description
- Audit H1 tags in each page component

---

### Phase 2: Structured Data (Priority: High)

**Goal:** Implement clean, valid JSON-LD for all business entities.

**Already Implemented (in `index.html`):**
- ✅ TattooParlor schema with full NAP
- ✅ FAQPage schema
- ✅ BreadcrumbList schema
- ✅ AggregateRating (4.8/5, 127 reviews)

**To Add:**
1. **Service Schema** (per service page)
   ```json
   {
     "@type": "Service",
     "name": "Custom Tattoo Design",
     "description": "...",
     "provider": { "@id": "https://www.muenchen-tattoo-studio.de/#organization" },
     "areaServed": "München"
   }
   ```

2. **Event Schema** (if hosting events/workshops)

**Validation:**
- Test all schema in [Google Rich Results Test](https://search.google.com/test/rich-results)
- Ensure no errors or warnings

---

### Phase 3: Core Web Vitals (Priority: Medium)

**Goal:** Achieve "Good" scores on mobile for LCP, CLS, INP.

**Actions:**
1. **Images**
   - Convert to WebP/AVIF
   - Add `width` and `height` attributes (prevent CLS)
   - Use `loading="lazy"` for off-screen images
   - Optimize hero images (< 200KB)

2. **JavaScript**
   - Defer non-critical scripts
   - Code-split large bundles
   - Remove unused dependencies

3. **CSS**
   - Inline critical CSS
   - Defer non-critical stylesheets

**Tools:**
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

### Phase 4: Local SEO (Priority: High)

**Goal:** Dominate "tattoo münchen" and "near me" searches.

**NAP Consistency:**
- ✅ Name: Medusa Tattoo München
- ✅ Address: Altheimer Eck 11, 80331 München
- ✅ Phone: +49 (0) 89 269 313

**Google Business Profile:**
1. Verify NAP matches website exactly
2. Add all services (tattoo, piercing, cover-ups, etc.)
3. Set correct categories:
   - Primary: Tattoo Shop
   - Secondary: Piercing Shop, Beauty Salon
4. Upload high-quality photos (min 10)
5. Add booking URL: `https://www.muenchen-tattoo-studio.de/booking`
6. Post weekly updates (new work, promotions, events)

**Citations (Top Priority):**
- Google Business Profile
- Apple Maps
- Bing Places
- Yelp
- TripAdvisor / TheFork (if offering restaurant services)
- Local directories (München-specific)

**Local Content:**
- Add "Tattoo Studio München" naturally in copy
- Mention nearby landmarks (Marienplatz, Altheimer Eck)
- Create location-specific FAQ entries

---

### Phase 5: Content & Internal Linking (Priority: Medium)

**Keyword Mapping:**

| Page | Primary Keyword | Secondary Keywords |
|------|----------------|-------------------|
| Home | tattoo münchen | tattoo studio münchen, tätowierer münchen |
| Services | tattoo preise münchen | custom tattoo, cover up tattoo |
| Artists | tattoo künstler münchen | tattoo artist munich |
| Gallery | tattoo galerie münchen | tattoo portfolio |
| Booking | tattoo termin münchen | tattoo appointment |
| FAQ | tattoo faq münchen | tattoo pflege, tattoo kosten |

**Internal Linking Strategy:**
- From home → services, artists, booking (descriptive anchors)
- From services → individual service pages (if created)
- From artists → booking
- From FAQ → aftercare, booking
- Use keyword-rich anchor text (not "click here")

---

### Phase 6: Monitoring & Maintenance (Priority: Medium)

**Tools to Set Up:**
1. **Google Search Console**
   - Submit sitemap: `https://www.muenchen-tattoo-studio.de/sitemap.xml`
   - Monitor indexing status
   - Check for crawl errors
   - Track search performance

2. **Google Analytics 4**
   - Set up conversion tracking (booking form submissions)
   - Track phone clicks
   - Monitor bounce rate by page

3. **Core Web Vitals Monitoring**
   - Use PageSpeed Insights weekly
   - Set up Lighthouse CI in deployment pipeline

**Monthly Tasks:**
- Review GSC for new keyword opportunities
- Update sitemap if new pages added
- Check for broken links
- Monitor competitor rankings

---

## 🧪 Verification Checklist

### Manual Tests

**Canonical & Redirects:**
```bash
# Test non-www → www redirect (if applicable)
curl -I http://muenchen-tattoo-studio.de/

# Verify canonical tag
curl -s https://www.muenchen-tattoo-studio.de/ | grep -i canonical

# Check sitemap accessibility
curl -I https://www.muenchen-tattoo-studio.de/sitemap.xml

# Check robots.txt
curl https://www.muenchen-tattoo-studio.de/robots.txt
```

**Schema Validation:**
1. Open [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Enter: `https://www.muenchen-tattoo-studio.de/`
3. Verify:
   - TattooParlor schema: ✅ Valid
   - FAQPage schema: ✅ Valid
   - BreadcrumbList schema: ✅ Valid
   - No errors or warnings

**Meta Tags (DevTools):**
1. Open homepage in browser
2. Right-click → Inspect → `<head>`
3. Verify:
   - `<link rel="canonical">` present
   - `<meta name="description">` unique per page
   - `<meta property="og:*">` tags present
   - `<script type="application/ld+json">` present

**Mobile Usability:**
1. Open [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
2. Enter: `https://www.muenchen-tattoo-studio.de/`
3. Verify: ✅ Page is mobile-friendly

---

## 📊 Success Metrics

**Technical SEO KPIs:**
- ✅ 100% pages have unique title/description
- ✅ 100% pages have exactly one H1
- ✅ All images have alt text
- ✅ Core Web Vitals: "Good" on mobile
- ✅ Zero crawl errors in GSC

**Local SEO KPIs:**
- Google Business Profile: 100% complete
- NAP consistency: 100% across all citations
- Reviews: 4.8+ average rating
- Local pack ranking: Top 3 for "tattoo münchen"

**Traffic KPIs (3-month targets):**
- Organic traffic: +50%
- Booking form submissions: +30%
- Phone calls from website: +25%
- Average session duration: > 2 minutes

---

## 🚨 Critical Rules

### White-Hat Only
**FORBIDDEN:**
- Hidden text (display:none, 0px fonts, same color as background)
- Keyword stuffing
- Cloaking or doorway pages
- Spammy link schemes
- Fake reviews

**ALLOWED:**
- Natural keyword usage in visible content
- Legitimate directory submissions
- Genuine customer reviews
- Quality content marketing
- Proper schema markup

### No Layout Changes
**This runbook covers SEO/config/meta ONLY.**
- ❌ Do NOT change CSS, spacing, colors, animations
- ❌ Do NOT modify component structure or layout
- ✅ Only change: meta tags, schema, robots/sitemap, redirects, text content (when needed)

---

## 📞 Support & Resources

**Documentation:**
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Web.dev (Core Web Vitals)](https://web.dev/vitals/)

**Tools:**
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

## 📝 Change Log

**2026-01-15:**
- ✅ Fixed canonical domain to `www.muenchen-tattoo-studio.de` across all files
- ✅ Standardized all emails to `@medusa-tattoo.de` domain
- ✅ Updated Facebook URL to correct page
- ✅ Fixed website domain in Impressum
- ✅ Fixed missing `locale` prop in Meta component
- ✅ Created this runbook

**Next Session:**
- [ ] Audit on-page SEO (titles, descriptions, H1s)
- [ ] Add Service schema to key pages
- [ ] Optimize images for Core Web Vitals
- [ ] Set up Google Search Console
