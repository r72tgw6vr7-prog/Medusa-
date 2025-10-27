// ========================================
// GLASSMORPHISM DESIGN TOKENS - Production Spec
// ========================================
// Navigation: 45% (not scrolled) → 65% (scrolled) + 24px blur
// Trust Badges: 60% opacity + 10px blur
// Service Cards: 70% opacity + 16px blur
// Modals: 85-90% opacity + blur
//
// WCAG 2.1 AA Compliance:
// - Text contrast: 5.8:1 (exceeds 4.5:1 requirement)
// - Touch targets: 44×44px minimum
// - Focus indicators: 2px gold outline
// ========================================

// ========================================
// Z-INDEX HIERARCHY - Stacking Order
// Must be declared first (referenced by glassmorphism)
// ========================================

export const zIndex = {
  modal: 10000, // Modals/overlays (highest)
  navigation: 9999, // Fixed navigation bar
  mobileMenu: 9998, // Mobile menu drawer
  dropdown: 1000, // Dropdowns from nav
  overlay: 500, // Semi-transparent overlays
  stickyElement: 200, // Sticky elements
  trustBadges: 100, // Trust badges/scrolling elements
  card: 50, // Card components
  content: 1, // Page content
  background: 0, // Background images
  // Legacy alias
  badges: 100, // Alias for trustBadges
};

export const glassmorphism = {
  navigation: {
    default: {
      background: 'rgba(34, 34, 34, 0.45)', // 45% opacity - hero visibility
      blur: 'blur(24px)', // Strong frosted glass
      webkitBlur: 'blur(24px)', // Safari support
      border: '1px solid rgba(212, 175, 55, 0.1)',
      zIndex: zIndex.navigation,
    },
    scrolled: {
      background: 'rgba(34, 34, 34, 0.65)', // 65% opacity - readability
      blur: 'blur(24px)', // Strong frosted glass
      webkitBlur: 'blur(24px)', // Safari support
      border: '1px solid rgba(212, 175, 55, 0.15)',
      zIndex: zIndex.navigation,
    },
  },
  trustBadges: {
    background: 'rgba(34, 34, 34, 0.7)', // 70% opacity
    blur: 'blur(16px)', // Medium blur
    webkitBlur: 'blur(16px)', // Safari support
    border: '1px solid rgba(212, 175, 55, 0.2)',
    zIndex: zIndex.trustBadges,
  },
  serviceCards: {
    background: 'rgba(34, 34, 34, 0.7)', // 70% opacity
    blur: 'blur(16px)', // Medium blur
    webkitBlur: 'blur(16px)', // Safari support
    border: '1px solid rgba(212, 175, 55, 0.15)',
    zIndex: zIndex.card,
  },
  statsBar: {
    background: 'rgba(34, 34, 34, 0.85)', // 85% opacity
    blur: 'blur(20px)', // Strong blur
    webkitBlur: 'blur(20px)', // Safari support
    border: '1px solid rgba(212, 175, 55, 0.2)',
    zIndex: zIndex.content,
  },
  // Legacy aliases for backward compatibility
  card: {
    background: 'rgba(34, 34, 34, 0.7)',
    blur: 'blur(16px)',
    webkitBlur: 'blur(16px)',
    border: '1px solid rgba(212, 175, 55, 0.15)',
  },
  badge: {
    background: 'rgba(34, 34, 34, 0.6)',
    blur: 'blur(10px)',
    webkitBlur: 'blur(10px)',
    border: '1px solid rgba(212, 175, 55, 0.15)',
  },
  footer: {
    background: 'rgba(34, 34, 34, 0.85)',
    blur: 'blur(20px)',
    webkitBlur: 'blur(20px)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
  },
  modal: {
    background: 'rgba(34, 34, 34, 0.9)',
    blur: 'blur(24px)',
    webkitBlur: 'blur(24px)',
    border: '1px solid rgba(212, 175, 55, 0.25)',
  },
};

// ========================================
// BREAKPOINTS - Responsive Design System
// From styles/design-tokens.ts
// ========================================

export const breakpoints = {
  mobile: '320px',
  mobileMax: '767px',
  tablet: '768px',
  tabletMax: '1199px',
  desktop: '1200px',
  wide: '1440px',
  ultra: '1920px',
};

// ========================================
// COLOR TOKENS
// ========================================

export const colors = {
  background: '#222222', // Changed from #1A1A1A per Figma spec
  gold: {
    primary: '#D4AF37',
    border: 'rgba(212, 175, 55, 0.2)',
    // Extended palette from styles/design-tokens.ts
    50: '#FBF7E9',
    100: '#F7EFD3',
    200: '#F3E7BD',
    300: '#EFDF97',
    400: '#EBD771',
    500: '#D4AF37', // Primary
    600: '#B38F1D',
    700: '#926F03',
    800: '#715000',
    900: '#503000',
  },
  white: '#FFFFFF',
  chrome: '#C0C0C0',
  // Alpha variants
  backgroundAlpha: {
    45: 'rgba(34, 34, 34, 0.45)', // Updated to #222222 base
    60: 'rgba(34, 34, 34, 0.6)',
    65: 'rgba(34, 34, 34, 0.65)',
    70: 'rgba(34, 34, 34, 0.7)',
    75: 'rgba(34, 34, 34, 0.75)',
    85: 'rgba(34, 34, 34, 0.85)',
    90: 'rgba(34, 34, 34, 0.9)',
  },
  goldAlpha: {
    10: 'rgba(212, 175, 55, 0.1)',
    15: 'rgba(212, 175, 55, 0.15)',
    20: 'rgba(212, 175, 55, 0.2)',
    25: 'rgba(212, 175, 55, 0.25)',
  },
  // Brand aliases expected by legacy styles
  brand: {
    gold: '#D4AF37',
    background: '#222222',
    white: '#FFFFFF',
  },
  // Semantic color roles expected by legacy glassmorphism utilities
  semantic: {
    borders: {
      navigation: 'rgba(212, 175, 55, 0.1)',
      default: 'rgba(212, 175, 55, 0.15)',
      hover: 'rgba(212, 175, 55, 0.2)',
    },
    accent: {
      hover: '#B69121',
      active: '#926F03',
    },
  },
};

// ========================================
// SPACING TOKENS - 8px Base Grid
// ========================================

export const spacing = {
  // Named tokens (master)
  xs: 8, // 8px
  sm: 16, // 16px
  md: 24, // 24px
  lg: 32, // 32px
  xl: 48, // 48px
  xxl: 64, // 64px
  xxxl: 96, // 96px
  // Numeric scale from brand-tokens.ts
  base: '8px',
  0: '0',
  2: '2px',
  4: '4px',
  8: '8px',
  16: '16px',
  24: '24px',
  32: '32px',
  40: '40px',
  48: '48px',
  64: '64px',
  80: '80px',
  96: '96px',
  128: '128px',
  // Responsive spacing from styles/design-tokens.ts
  responsive: {
    desktop: {
      sectionPadding: '80px',
      componentGap: '32px',
      cardGap: '24px',
      gridGutter: '16px',
    },
    tablet: {
      sectionPadding: '40px',
      componentGap: '24px',
      cardGap: '16px',
      gridGutter: '16px',
    },
    mobile: {
      sectionPadding: '24px',
      componentGap: '16px',
      cardGap: '12px',
      gridGutter: '16px',
    },
  },
};

// ========================================
// TYPOGRAPHY TOKENS
// From styles/design-tokens.ts
// ========================================

export const typography = {
  fonts: {
    heading: {
      family: '"Playfair Display", serif',
      cssVariable: '--font-headline',
    },
    body: {
      family: '"Inter", sans-serif',
      cssVariable: '--font-body',
    },
  },
  scale: {
    desktop: {
      displayXL: '72px',
      headlineLG: '48px',
      headlineMD: '36px',
      bodyLarge: '24px',
      bodyStandard: '20px',
      bodySmall: '18px',
      label: '16px',
      caption: '14px',
    },
    tablet: {
      displayXL: '56px',
      headlineLG: '40px',
      headlineMD: '32px',
      bodyLarge: '24px',
      bodyStandard: '20px',
      bodySmall: '18px',
    },
    mobile: {
      displayXL: '40px',
      headlineLG: '32px',
      headlineMD: '24px',
      bodyLarge: '24px',
      bodyStandard: '16px',
      bodySmall: '16px',
    },
    fluid: {
      displayXL: 'clamp(40px, 5vw, 72px)',
      headlineLG: 'clamp(32px, 4vw, 48px)',
      headlineMD: 'clamp(24px, 3vw, 36px)',
      bodyLarge: 'clamp(20px, 2vw, 24px)',
      bodyStandard: 'clamp(16px, 1.5vw, 20px)',
      bodySmall: 'clamp(14px, 1.2vw, 18px)',
    },
  },
  lineHeight: {
    headlines: '1.1',
    body: '1.4',
    relaxed: '1.6',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// ========================================
// BORDER RADIUS
// From brand-tokens.ts
// ========================================

export const borderRadius = {
  none: '0',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
};

// ========================================
// SHADOWS & EFFECTS
// From styles/design-tokens.ts
// ========================================

export const shadows = {
  // Elevation shadows
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
  md: '0 4px 8px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.1)',
  xl: '0 16px 32px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.1)',
  '2xl': '0 24px 48px rgba(0, 0, 0, 0.05), 0 12px 24px rgba(0, 0, 0, 0.1)',
  // Gold accent shadows
  'gold-sm': '0 2px 4px rgba(212, 175, 55, 0.1)',
  'gold-md': '0 4px 8px rgba(212, 175, 55, 0.15)',
  'gold-lg': '0 8px 16px rgba(212, 175, 55, 0.2)',
  'gold-xl': '0 16px 32px rgba(212, 175, 55, 0.25)',
  // Gold glow from brand-tokens.ts
  'gold-glow': '0 0 24px rgba(212, 175, 55, 0.4)',
  'gold-glow-strong': '0 0 32px rgba(212, 175, 55, 0.6)',
  'gold-glow-subtle': '0 0 16px rgba(212, 175, 55, 0.2)',
  // Ambient light
  'ambient-sm': '0 0 16px rgba(212, 175, 55, 0.1)',
  'ambient-md': '0 0 32px rgba(212, 175, 55, 0.15)',
  'ambient-lg': '0 0 48px rgba(212, 175, 55, 0.2)',
  'ambient-xl': '0 0 64px rgba(212, 175, 55, 0.25)',
};

// ========================================
// ANIMATION SYSTEM
// From styles/design-tokens.ts and brand-tokens.ts
// ========================================

export const animations = {
  // Durations (merged from both files)
  duration: {
    fastest: '50ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '500ms',
    // From brand-tokens.ts
    brandFast: '0.2s',
    brandNormal: '0.3s',
    brandSlow: '0.5s',
    verySlow: '0.8s',
  },
  // Timing functions (from styles/design-tokens.ts)
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Premium feel
    premium: 'cubic-bezier(0.4, 0.2, 0.2, 1)',
    smooth: 'cubic-bezier(0.4, 0.1, 0.1, 1)',
    gentle: 'cubic-bezier(0.4, 0.3, 0.3, 1)',
    luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    breathing: 'cubic-bezier(0.37, 0, 0.63, 1)',
    // Spring physics
    spring: 'cubic-bezier(0.155, 1.105, 0.295, 1.12)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    // From brand-tokens.ts
    default: 'ease',
  },
  // Presets (from styles/design-tokens.ts)
  hover: {
    lift: 'transform 200ms cubic-bezier(0.4, 0.2, 0.2, 1)',
    glow: 'box-shadow 200ms cubic-bezier(0.4, 0.2, 0.2, 1)',
    color: 'color 200ms cubic-bezier(0.4, 0.2, 0.2, 1)',
    all: 'all 200ms cubic-bezier(0.4, 0.2, 0.2, 1)',
  },
  // Keyframes (from styles/design-tokens.ts)
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    scaleIn: {
      from: { transform: 'scale(0.95)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    slideIn: {
      from: { transform: 'translateY(10px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
  },
};

export const fonts = {
  heading: '"Playfair Display", serif',
  body: '"Inter", sans-serif',
};

// ========================================
// ACCESSIBILITY STANDARDS - WCAG 2.1 AA
// ========================================

export const accessibility = {
  contrastRatios: {
    navigation: 5.8, // White (#FFFFFF) on rgba(26,26,26,0.55) - PASS AA (4.5:1 required)
    largeText: 5.8, // Logo/headings (18pt+) - PASS AAA (3:1 required)
    normalText: 5.8, // Body text (16px) - PASS AA (4.5:1 required)
    goldOnDark: 4.8, // Gold (#D4AF37) on dark (#1A1A1A) - PASS AA
  },
  minTouchTarget: 44, // iOS/Android minimum (44×44px)
  focusOutline: '2px solid #D4AF37', // Gold focus ring for keyboard navigation
  reducedMotion: 'prefers-reduced-motion: reduce', // Respect user preferences
};

// Unified export for compatibility
export const designTokens = {
  breakpoints,
  zIndex,
  glassmorphism,
  colors,
  spacing,
  typography,
  borderRadius,
  // Legacy alias expected by styles/glassmorphism.ts
  radii: borderRadius,
  borders: {
    radius: {
      sm: borderRadius.sm,
      md: borderRadius.md,
      lg: borderRadius.lg,
      full: borderRadius.full,
    },
    width: {
      none: '0',
      thin: '1px',
      medium: '2px',
      thick: '4px',
    },
  },
  shadows,
  animations,
  // Legacy effects namespace expected by styles/glassmorphism.ts
  effects: {
    // Minimal legacy surface for styles/glassmorphism.ts
    glassmorphism: {
      navigation: {
        background: glassmorphism.navigation.default.background,
      },
      card: {
        background: glassmorphism.card.background,
      },
      modal: {
        background: glassmorphism.modal.background,
      },
    },
    shadows,
  },
  transitions: {
    fast: animations.duration.fast,
    normal: animations.duration.normal,
    slow: animations.duration.slow,
  },
  fonts,
  accessibility,
};
