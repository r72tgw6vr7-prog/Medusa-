/**
 * MEDUSA TATTOO SALON - APP CONFIGURATION
 * Global configuration constants
 */

// Brand configuration
export const BRAND_CONFIG = {
  name: 'MEDUSA',
  fullName: 'Medusa Tattoo München',
  tagline: 'Premium Tattoo Studio München',
  location: 'München, Deutschland',
  
  // Contact information
  contact: {
    phone: '+49 89 123 456 789',
    email: 'info@medusa-tattoo.de',
    address: {
      street: 'Maximilianstraße 123',
      city: 'München',
      zip: '80539',
      country: 'Deutschland'
    }
  },
  
  // Business hours
  hours: {
    monday: { open: '10:00', close: '20:00' },
    tuesday: { open: '10:00', close: '20:00' },
    wednesday: { open: '10:00', close: '20:00' },
    thursday: { open: '10:00', close: '20:00' },
    friday: { open: '10:00', close: '21:00' },
    saturday: { open: '10:00', close: '21:00' },
    sunday: 'closed'
  },
  
  // Social media
  social: {
    instagram: 'https://instagram.com/medusa_tattoo_muenchen',
    facebook: 'https://facebook.com/medusatattoomuenchen',
    tiktok: 'https://tiktok.com/@medusatattoo'
  }
} as const;

// App configuration
export const APP_CONFIG = {
  defaultLanguage: 'DE' as const,
  supportedLanguages: ['DE', 'EN'] as const,
  
  // Performance settings
  lazyLoadOffset: 200,
  animationDuration: 300,
  debounceDelay: 300,
  
  // Accessibility
  skipLinkTarget: '#main-content',
  focusRingWidth: 2,
  touchTargetMinSize: 44,
  
  // Navigation
  stickyNavOffset: 80,
  mobileBreakpoint: 768,
  tabletBreakpoint: 1024,
  desktopBreakpoint: 1200,
  
  // Grid system
  gridColumns: 12,
  gridGutter: 16,
  maxContentWidth: 1440,
  
  // Design tokens
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16
  },
  
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64
  }
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  enableBookingFlow: true,
  enableLanguageSwitch: true,
  enableBreadcrumbs: true,
  enableMobileMenu: true,
  enableErrorBoundaries: true,
  enableLazyLoading: true,
  enableAnimations: true,
  enableAnalytics: false, // Disabled for privacy
  enableChatbot: false, // Future feature
  enableCRM: false // Future feature
} as const;

// API configuration (for future use)
export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || '',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000
} as const;

export default {
  BRAND_CONFIG,
  APP_CONFIG,
  FEATURE_FLAGS,
  API_CONFIG
};