/**
 * MEDUSA TATTOO SALON - ROUTE CONFIGURATION
 * Complete route definitions with metadata
 */

import { ROUTES, RouteConfig } from '../types/routes';

export const ROUTE_CONFIG: Record<string, RouteConfig> = {
  [ROUTES.HOME]: {
    path: '/',
    label: { de: 'Startseite', en: 'Home' },
    showInNav: true
  },
  [ROUTES.LEISTUNGEN]: {
    path: '/leistungen',
    label: { de: 'Leistungen', en: 'Services' },
    showInNav: true
  },
  [ROUTES.SERVICES]: {
    path: '/services',
    label: { de: 'Services', en: 'Services' },
    showInNav: false // Hidden - legacy route
  },
  [ROUTES.PRICING]: {
    path: '/pricing',
    label: { de: 'Preise', en: 'Pricing' },
    showInNav: true
  },
  [ROUTES.ARTISTS]: {
    path: '/artists',
    label: { de: 'Künstler', en: 'Artists' },
    showInNav: true
  },
  [ROUTES.GALLERY]: {
    path: '/gallery',
    label: { de: 'Portfolio', en: 'Gallery' },
    showInNav: true
  },
  [ROUTES.BOOKING]: {
    path: '/booking',
    label: { de: 'Termin', en: 'Booking' },
    showInNav: true
  },
  [ROUTES.CONTACT]: {
    path: '/contact',
    label: { de: 'Kontakt', en: 'Contact' },
    showInNav: true
  },
  [ROUTES.FAQ]: {
    path: '/faq',
    label: { de: 'FAQ', en: 'FAQ' },
    showInNav: false
  },
  [ROUTES.AFTERCARE]: {
    path: '/aftercare',
    label: { de: 'Nachsorge', en: 'Aftercare' },
    showInNav: false
  },
  [ROUTES.LEGAL]: {
    path: '/legal',
    label: { de: 'Rechtliches', en: 'Legal' },
    showInNav: false,
    isLegal: true
  },
  [ROUTES.IMPRESSUM]: {
    path: '/impressum',
    label: { de: 'Impressum', en: 'Imprint' },
    showInNav: false,
    isLegal: true
  },
  [ROUTES.DATENSCHUTZ]: {
    path: '/datenschutz',
    label: { de: 'Datenschutz', en: 'Privacy' },
    showInNav: false,
    isLegal: true
  }
};

// Route mapping for German URLs (legacy support)
export const ROUTE_MAPPING: Record<string, string> = {
  'kuenstler': ROUTES.ARTISTS,
  'arbeiten': ROUTES.GALLERY,
  'kontakt': ROUTES.CONTACT,
  'termin': ROUTES.BOOKING,
  'preise': ROUTES.PRICING
};

// Get visible navigation routes
export const getNavigationRoutes = (language: 'DE' | 'EN' = 'DE') => {
  return Object.entries(ROUTE_CONFIG)
    .filter(([_, config]) => config.showInNav)
    .map(([route, config]) => ({
      id: route,
      label: config.label[language.toLowerCase() as 'de' | 'en'],
      path: config.path
    }));
};

// Get legal routes
export const getLegalRoutes = (language: 'DE' | 'EN' = 'DE') => {
  return Object.entries(ROUTE_CONFIG)
    .filter(([_, config]) => config.isLegal)
    .map(([route, config]) => ({
      id: route,
      label: config.label[language.toLowerCase() as 'de' | 'en'],
      path: config.path
    }));
};

export default ROUTE_CONFIG;