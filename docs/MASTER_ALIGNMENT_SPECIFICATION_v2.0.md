# MASTER ALIGNMENT SPECIFICATION v2.0
## Medusa Tattoo München - Single Source of Truth

**Document Version**: 2.0  
**Last Updated**: December 2024  
**Status**: PRODUCTION READY  
**Authority Level**: FINAL - ALL OTHER DOCS SUPERSEDED  

---

## EXECUTIVE SUMMARY

This Master Alignment Document establishes the definitive specifications for the Medusa Tattoo München website, superseding all previous documentation inconsistencies. Every aspect of design, development, and implementation must follow these exact specifications.

**CRITICAL**: This document is the ONLY source of truth. Any conflicts with other documentation files are resolved here.

---

## 🎯 STANDARDIZATION RESOLUTIONS

### 1. BREAKPOINT STANDARDIZATION - FINAL SPECIFICATION

**OFFICIAL BREAKPOINT SYSTEM** (supersedes all previous definitions):

```css
/* EXACT BREAKPOINT VALUES - DO NOT MODIFY */
Mobile:     320px - 767px   (Primary: 375px)
Tablet:     768px - 1199px  (Primary: 1024px) 
Desktop:    1200px+         (Primary: 1440px)

/* CSS MEDIA QUERIES - COPY EXACTLY */
@media (max-width: 767px)     { /* Mobile Only */ }
@media (min-width: 768px)     { /* Tablet+ */ }
@media (min-width: 1200px)    { /* Desktop+ */ }

/* TESTING BREAKPOINTS - MANDATORY */
320px:  iPhone SE (minimum mobile)
375px:  iPhone 12 (standard mobile)
768px:  iPad Portrait (tablet entry)
1024px: iPad Landscape (standard tablet)
1200px: Desktop entry point
1440px: Standard desktop
```

**MIGRATION GUIDE**: Update all existing components to use these exact breakpoints. Remove any references to 640px, 1280px, or other off-brand breakpoints.

### 2. BOOKING FLOW CLARIFICATION - CANONICAL DEFINITION

**OFFICIAL 8-STEP BOOKING FLOW** (final specification):

```
Step 0: Age Verification Gate (18+ legal requirement)
Step 1: Artist Selection (with availability preview)
Step 2: Service Selection (with pricing calculator)
Step 3: Date & Time Selection (calendar integration)
Step 4: Personal Details (contact information)
Step 5: GDPR Consent (granular permissions)
Step 6: Appointment Summary (final review)
Step 7: Confirmation & Aftercare (PDF delivery)
```

**COMPONENT IMPLEMENTATION**:
- `BookingFlow.tsx` - Main orchestrator component
- Progress indicator shows 8 steps total
- Each step has validation rules
- Back/Forward navigation enabled
- Auto-save on step completion

**INTEGRATION POINTS**:
- Age verification blocks access if under 18
- GDPR consent required for data processing
- WhatsApp integration at every step
- Aftercare PDF auto-generated

### 3. TYPOGRAPHY ENHANCEMENT - GERMAN MARKET OPTIMIZATION

**GERMAN-SPECIFIC TYPOGRAPHY RULES**:

```css
/* German Character Support - Enhanced Line Heights */
.german-text {
  line-height: 1.5 !important; /* +0.1 for umlauts */
  letter-spacing: 0.01em !important; /* Improved readability */
}

/* German Headlines - Playfair Display Adjustments */
.german-headline {
  line-height: 1.2 !important; /* +0.1 for ä, ö, ü, ß */
  word-spacing: 0.02em !important;
}

/* German Body Text - Inter Adjustments */
.german-body {
  line-height: 1.5 !important;
  font-feature-settings: "kern" 1, "liga" 1 !important;
}

/* Bilingual Content Containers */
.bilingual-container {
  /* Ensure consistent spacing between DE/EN content */
  gap: 1.5rem !important;
}

.language-specific {
  /* Hide inactive language */
  display: none;
}

.language-specific.active {
  /* Show active language */
  display: block;
}
```

**BILINGUAL COMPONENT VARIANTS**:
- All text components must support DE/EN switching
- Date formats: DE (DD.MM.YYYY) vs EN (MM/DD/YYYY)
- Currency: Always EUR with German formatting (1.234,56 €)
- Phone numbers: German format (+49 xxx xxx xxxx)

### 4. PERFORMANCE STANDARDS UNIFICATION

**CORE WEB VITALS - MANDATORY TARGETS**:

```yaml
Largest Contentful Paint (LCP):     < 2.5 seconds
First Input Delay (FID):           < 100 milliseconds  
Cumulative Layout Shift (CLS):     < 0.1
First Contentful Paint (FCP):      < 1.8 seconds
Time to Interactive (TTI):         < 3.8 seconds

# Performance Budgets
JavaScript Bundle:     < 150KB (gzipped)
CSS Bundle:           < 50KB (gzipped)
Images (per page):    < 1MB total
WebP Format:          Required for all images
Font Loading:         < 100ms FOUT
```

**ANIMATION PERFORMANCE**:
- All animations: 60fps target
- GPU acceleration: transform/opacity only
- Animation duration: 300ms standard, 600ms luxury
- Reduced motion: Respect user preferences

---

## 🗺️ COMPONENT-IA MAPPING MATRIX

### URL PATTERN → COMPONENT MAPPING

| URL Pattern | Primary Component | Supporting Components |
|-------------|------------------|----------------------|
| `/` | `App.tsx` → `HomepageHero` | `TrustSignalsWithSEO`, `ServiceMindMap`, `OurArtists` |
| `/services` | `ServicesPage.tsx` | `ServiceHighlights`, `StyleSelectionCards` |
| `/services/tattoos/[style-slug]` | `ServiceStyleTemplate.tsx` | Dynamic service content |
| `/kuenstler` | `ArtistsPage.tsx` | `OurArtists`, `ArtistGrid` |
| `/kuenstler/[artist-slug]` | `ArtistProfile.tsx` | Artist details, portfolio |
| `/arbeiten` | `GalleryPage.tsx` | `RecentWorkGallery`, Filter system |
| `/arbeiten/stil/[style-slug]` | `StyleGallery.tsx` | Filtered portfolio view |
| `/booking` | `BookingFlow.tsx` | 8-step booking process |
| `/aftercare` | `AftercarePage.tsx` | Care instructions, touch-ups |
| `/contact` | `ContactPage.tsx` | Contact form, map, hours |
| `/faq` | `FAQPage.tsx` | Multilingual FAQ system |
| `/impressum` | `ImpressumPage.tsx` | German legal requirements |
| `/datenschutz` | `DatenschutzPage.tsx` | GDPR privacy policy |

### DYNAMIC ROUTING SPECIFICATIONS

**Service Style Template** (`/services/tattoos/[style-slug]`):
```typescript
// URL Examples
/services/tattoos/traditional
/services/tattoos/realistic
/services/tattoos/geometric
/services/tattoos/minimalist

// Component Props
interface ServiceStyleProps {
  styleSlug: string;
  styleName: string;
  description: string; // 2000+ words
  priceRange: string;
  portfolioImages: Image[];
  artistSpecialists: Artist[];
  bookingCTA: boolean;
}
```

**Artist Profile** (`/kuenstler/[artist-slug]`):
```typescript
// URL Examples  
/kuenstler/sarah-chen
/kuenstler/marcus-wolf
/kuenstler/elena-rossi

// Component Props
interface ArtistProfileProps {
  artistSlug: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  portfolio: Image[];
  availability: BookingSlot[];
  hourlyRate: number;
}
```

### SEO OPTIMIZATION MAPPING

| Route | Meta Title | Meta Description | Schema Type |
|-------|------------|-----------------|-------------|
| `/` | "Medusa Tattoo München - Luxury Tattoo Studio" | "Premium tattoo studio in Munich. Expert artists, custom designs, hygiene certified." | LocalBusiness + TattooParlor |
| `/services` | "Tattoo Services - Medusa München" | "Professional tattoo services: Traditional, Realistic, Geometric. Book consultation." | Service |
| `/kuenstler` | "Expert Tattoo Artists - Medusa München" | "Meet our certified tattoo artists. 25+ years combined experience." | Person |
| `/booking` | "Book Appointment - Medusa Tattoo München" | "Schedule your tattoo appointment online. Fast, secure booking system." | ReservationService |

---

## 🎨 GERMAN MARKET ADAPTATIONS

### CULTURAL LOCALIZATION

**German Luxury Standards**:
- Formal "Sie" address for all customer communications
- Quality certificates prominently displayed
- Hygiene standards exceed EU requirements
- Artistic craftsmanship emphasized over speed

**German Legal Compliance**:
```typescript
// Mandatory German Elements
const germanLegalElements = {
  impressum: {
    businessName: "Medusa Tattoo München GmbH",
    address: "Maximilianstraße 42, 80539 München",
    registrationNumber: "HRB 234567",
    vatNumber: "DE123456789",
    responsible: "Sarah Chen, Geschäftsführerin"
  },
  datenschutz: {
    gdprCompliant: true,
    dataController: "Medusa Tattoo München GmbH",
    dpoContact: "datenschutz@medusa-tattoo.de",
    retentionPeriod: "36 months",
    legalBasis: "Art. 6 Abs. 1 lit. b DSGVO"
  },
  ageVerification: {
    minimumAge: 18,
    requiredDocuments: ["Personalausweis", "Reisepass"],
    parentalConsent: false // Not allowed for tattoos in Germany
  }
};
```

**German Typography Specifications**:
```css
/* German Text Optimization */
.german-optimized {
  font-feature-settings: 
    "kern" 1,           /* Kerning for German characters */
    "liga" 1,           /* Ligatures for ß, etc. */
    "calt" 1,           /* Contextual alternates */
    "ss01" 1;           /* Stylistic set for German */
}

/* German Hyphenation */
.german-text {
  hyphens: auto;
  hyphenate-limit-chars: 6 3 3;
  lang: de;
}

/* German Quotation Marks */
.german-quotes::before { content: "„"; }
.german-quotes::after { content: """; }
```

---

## ⚖️ LEGAL COMPONENT SPECIFICATIONS

### 1. COOKIE CONSENT BANNER

**Design Specifications**:
```typescript
const cookieConsentSpec = {
  background: "#222222", // Brand background
  borderTop: "2px solid #D4AF37", // Gold accent
  position: "fixed",
  bottom: 0,
  zIndex: 9999,
  
  acceptButton: {
    background: "#D4AF37", // Gold CTA
    color: "#222222",
    hoverGlow: "0 0 20px rgba(212, 175, 55, 0.4)",
    minHeight: "44px"
  },
  
  manageButton: {
    background: "transparent",
    color: "#C0C0C0", // Chrome
    border: "1px solid #C0C0C0",
    minHeight: "44px"
  }
};
```

**Content Requirements**:
- German/English bilingual
- GDPR Article 13 compliant
- Clear granular consent options
- Easy withdrawal mechanism

### 2. AGE VERIFICATION GATE

**Component Specification**:
```typescript
interface AgeVerificationProps {
  minimumAge: 18;
  blocksAccess: true;
  requiresReconfirmation: false;
  design: {
    background: "linear-gradient(145deg, #222222, #2a2a2a)",
    glassmorphic: true,
    goldAccents: true,
    luxuryAnimation: true
  };
}
```

### 3. GDPR DISCLOSURE COMPONENT

**Data Processing Transparency**:
```typescript
const gdprDisclosure = {
  categories: [
    "Terminbuchung (Erforderlich)",
    "Marketing-Kommunikation (Optional)", 
    "Analyse & Verbesserung (Optional)",
    "Personalisierung (Optional)"
  ],
  
  retentionPeriods: {
    bookingData: "36 Monate nach letztem Termin",
    marketingConsent: "Bis zum Widerruf",
    analyticsData: "26 Monate",
    photoConsent: "5 Jahre oder bis Widerruf"
  },
  
  userRights: [
    "Auskunft (Art. 15 DSGVO)",
    "Berichtigung (Art. 16 DSGVO)",
    "Löschung (Art. 17 DSGVO)",
    "Einschränkung (Art. 18 DSGVO)",
    "Datenportabilität (Art. 20 DSGVO)",
    "Widerspruch (Art. 21 DSGVO)"
  ]
};
```

---

## 📊 COMPONENT STATE DOCUMENTATION

### UNIVERSAL COMPONENT STATES

**1. Loading States**:
```typescript
// Skeleton Screen Specifications
const skeletonSpec = {
  background: "linear-gradient(90deg, rgba(34,34,34,0.8) 25%, rgba(192,192,192,0.1) 50%, rgba(34,34,34,0.8) 75%)",
  animation: "shimmer 2s infinite",
  borderRadius: "8px",
  height: "auto", // Match content height
  
  // Luxury brand aesthetic
  goldShimmer: "rgba(212, 175, 55, 0.1)",
  chromeShimmer: "rgba(192, 192, 192, 0.05)"
};

// Loading Component Types
enum LoadingStates {
  SKELETON = "skeleton",        // Content structure preview
  SPINNER = "spinner",          // Action in progress  
  SHIMMER = "shimmer",         // Image/media loading
  PROGRESSIVE = "progressive"   // Step-by-step loading
}
```

**2. Error States**:
```typescript
const errorStateSpec = {
  // Visual Design
  background: "rgba(34, 34, 34, 0.95)",
  border: "1px solid rgba(192, 192, 192, 0.3)",
  borderRadius: "12px",
  padding: "32px",
  textAlign: "center",
  
  // Error Types & Messages
  errorTypes: {
    network: {
      title: "Verbindungsfehler / Connection Error",
      message: "Bitte prüfen Sie Ihre Internetverbindung / Please check your internet connection",
      action: "Erneut versuchen / Try Again",
      icon: "wifi-off"
    },
    
    validation: {
      title: "Eingabe prüfen / Please check your input", 
      message: "Einige Felder enthalten ungültige Daten / Some fields contain invalid data",
      action: "Korrigieren / Correct",
      icon: "alert-triangle"
    },
    
    authentication: {
      title: "Anmeldung erforderlich / Login Required",
      message: "Bitte melden Sie sich an / Please log in to continue", 
      action: "Anmelden / Login",
      icon: "lock"
    },
    
    authorization: {
      title: "Zugriff verweigert / Access Denied",
      message: "Keine Berechtigung für diese Aktion / No permission for this action",
      action: "Zurück / Go Back", 
      icon: "shield-x"
    },
    
    notFound: {
      title: "Seite nicht gefunden / Page Not Found",
      message: "Die angeforderte Seite existiert nicht / The requested page does not exist",
      action: "Zur Startseite / Go Home",
      icon: "search-x"
    }
  }
};
```

**3. Empty States**:
```typescript
const emptyStateSpec = {
  // Visual Design
  illustration: {
    size: "120px",
    color: "#C0C0C0", // Chrome silver
    style: "outline", // Minimalist line art
    animation: "subtle-float" // Gentle movement
  },
  
  // Empty State Types
  emptyTypes: {
    noResults: {
      title: "Keine Ergebnisse / No Results",
      message: "Versuchen Sie andere Suchbegriffe / Try different search terms",
      action: "Filter zurücksetzen / Reset Filters",
      illustration: "search-empty"
    },
    
    noBookings: {
      title: "Noch keine Termine / No Appointments Yet", 
      message: "Buchen Sie Ihren ersten Termin / Book your first appointment",
      action: "Jetzt buchen / Book Now",
      illustration: "calendar-empty"
    },
    
    noPortfolio: {
      title: "Portfolio wird geladen / Portfolio Loading",
      message: "Neue Arbeiten werden bald hinzugefügt / New work coming soon",
      action: "Benachrichtigung aktivieren / Get Notified",
      illustration: "image-empty"
    },
    
    noArtists: {
      title: "Künstler nicht verfügbar / Artists Unavailable",
      message: "Alle Künstler sind ausgebucht / All artists are fully booked",
      action: "Warteliste beitreten / Join Waitlist", 
      illustration: "user-empty"
    }
  }
};
```

**4. Success States**:
```typescript
const successStateSpec = {
  // Visual Design
  background: "linear-gradient(145deg, rgba(212, 175, 55, 0.1), rgba(34, 34, 34, 0.95))",
  border: "1px solid rgba(212, 175, 55, 0.3)",
  glow: "0 0 20px rgba(212, 175, 55, 0.2)",
  
  // Success Animation
  checkmarkAnimation: {
    strokeDasharray: "100",
    strokeDashoffset: "100", 
    animationDuration: "0.8s",
    animationTimingFunction: "ease-in-out",
    strokeColor: "#D4AF37"
  },
  
  // Success Types
  successTypes: {
    bookingConfirmed: {
      title: "Termin bestätigt! / Appointment Confirmed!",
      message: "Sie erhalten eine Bestätigungs-E-Mail / You will receive a confirmation email",
      action: "Zum Kalender / View Calendar",
      nextSteps: [
        "Terminbestätigung per E-Mail / Email confirmation",
        "24h vorher Erinnerung / 24h reminder", 
        "Nachsorge-Anweisungen / Aftercare instructions"
      ]
    },
    
    formSubmitted: {
      title: "Nachricht gesendet! / Message Sent!",
      message: "Wir antworten innerhalb von 24 Stunden / We'll respond within 24 hours",
      action: "WhatsApp öffnen / Open WhatsApp",
      icon: "check-circle"
    },
    
    subscriptionConfirmed: {
      title: "Newsletter abonniert! / Newsletter Subscribed!",
      message: "Danke für Ihr Interesse / Thank you for your interest",
      action: "Profil vervollständigen / Complete Profile",
      icon: "mail-check"
    }
  }
};
```

---

## 🚀 MIGRATION GUIDE & IMPLEMENTATION NOTES

### BREAKING CHANGES & MIGRATION PATHS

**1. Breakpoint Updates**:
```bash
# Find and replace all instances
Find: min-width: 640px
Replace: min-width: 768px

Find: min-width: 1280px  
Replace: min-width: 1200px

# Update Tailwind classes
Find: sm: (640px)
Replace: md: (768px)

Find: xl: (1280px)
Replace: lg: (1200px)
```

**2. Component State Integration**:
```typescript
// Before (inconsistent)
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// After (standardized)
const [state, setState] = useState<ComponentState>({
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error' | 'empty'
  data: null,
  error: null,
  meta: {}
});
```

**3. German Typography Migration**:
```typescript
// Before
<h1 className="text-4xl font-bold">Titel</h1>

// After  
<h1 className="text-4xl font-bold german-headline" lang="de">
  Titel
</h1>
```

### IMPLEMENTATION CHECKLIST

**Phase 1: Foundation (Week 1)**
- [ ] Update all breakpoint references
- [ ] Implement standardized component states
- [ ] Add German typography enhancements
- [ ] Create legal compliance components

**Phase 2: Component Updates (Week 2)**
- [ ] Migrate all URL routing to IA mapping
- [ ] Update booking flow to 8-step process
- [ ] Implement performance optimizations
- [ ] Add bilingual content support

**Phase 3: Testing & Validation (Week 3)**
- [ ] Test all breakpoint transitions
- [ ] Validate Core Web Vitals targets
- [ ] German legal compliance review
- [ ] Accessibility audit (WCAG 2.1 AA)

**Phase 4: Production Deployment (Week 4)**
- [ ] Performance monitoring setup
- [ ] Error tracking configuration
- [ ] Analytics implementation
- [ ] SEO optimization verification

### QUALITY ASSURANCE GATES

**Pre-deployment Requirements**:
```yaml
# Performance
Core Web Vitals: ALL targets met
Bundle Size: Within budgets
Image Optimization: 100% WebP
Font Loading: FOUT < 100ms

# Accessibility  
WCAG 2.1 AA: 100% compliance
Keyboard Navigation: Full support
Screen Reader: Tested & verified
Color Contrast: 4.5:1 minimum

# German Legal
Impressum: Complete & accurate
Datenschutz: GDPR compliant
Age Verification: Functional
Cookie Consent: Granular options

# Brand Compliance
Color Palette: Only 4 approved colors
Typography: Playfair + Inter only
Spacing: 8px token system
Touch Targets: 44px minimum
```

---

## 📋 FINAL IMPLEMENTATION CHECKLIST

### CRITICAL SUCCESS CRITERIA

**✅ BRAND COMPLIANCE**
- [ ] Only 4 approved colors used (#222222, #FFFFFF, #D4AF37, #C0C0C0)
- [ ] Playfair Display + Inter fonts only
- [ ] 8px spacing token system throughout
- [ ] Gold glow effects only (no other shadows)

**✅ GERMAN LEGAL COMPLIANCE**
- [ ] Impressum page functional (/impressum)
- [ ] Datenschutz page functional (/datenschutz)
- [ ] Age verification (18+) implemented
- [ ] GDPR consent with granular permissions

**✅ PERFORMANCE TARGETS**
- [ ] LCP < 2.5s (all pages)
- [ ] FID < 100ms (all interactions)
- [ ] CLS < 0.1 (no layout shifts)
- [ ] Bundle size within budgets

**✅ ACCESSIBILITY STANDARDS**
- [ ] WCAG 2.1 AA compliance (100%)
- [ ] 44px+ touch targets (all elements)
- [ ] Keyboard navigation (complete)
- [ ] Screen reader support (tested)

**✅ RESPONSIVE DESIGN**
- [ ] Mobile-first approach (320px+)
- [ ] Tablet optimization (768px+)
- [ ] Desktop enhancement (1200px+)
- [ ] No layout chaos during resize

**✅ GERMAN MARKET OPTIMIZATION**
- [ ] Bilingual support (DE/EN)
- [ ] German typography enhancements
- [ ] Cultural localization complete
- [ ] Legal requirements fulfilled

---

## 🎯 CONCLUSION

This Master Alignment Specification v2.0 establishes the definitive standards for the Medusa Tattoo München website. All development must follow these exact specifications to ensure brand compliance, legal adherence, and optimal user experience.

**AUTHORITY**: This document supersedes all previous specifications and serves as the single source of truth for the project.

**COMPLIANCE**: Any deviation from these specifications requires explicit approval and documentation of the change rationale.

**MAINTENANCE**: This document should be updated only when fundamental business requirements change, with version control and stakeholder approval.

---

*Document Authority: Senior Design System Architect & Technical Documentation Lead*  
*Last Review: December 2024*  
*Next Review: Quarterly or upon major updates*