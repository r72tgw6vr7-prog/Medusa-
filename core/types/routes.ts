/**
 * MEDUSA TATTOO SALON - CORE ROUTE TYPE SYSTEM
 * Centralized route definitions and types
 */

export const ROUTES = {
  HOME: 'home',
  SERVICES: 'services',
  LEISTUNGEN: 'leistungen',
  PRICING: 'pricing',
  ARTISTS: 'artists',
  GALLERY: 'gallery',
  PORTFOLIO: 'portfolio',
  BOOKING: 'booking',
  CONTACT: 'contact',
  FAQ: 'faq',
  AFTERCARE: 'aftercare',
  LEGAL: 'legal',
  IMPRESSUM: 'impressum',
  DATENSCHUTZ: 'datenschutz',
  HERO_SHOWCASE: 'hero-showcase'
} as const;

export type PageType = typeof ROUTES[keyof typeof ROUTES];

export interface RouteConfig {
  path: string;
  label: {
    de: string;
    en: string;
  };
  showInNav: boolean;
  requiresAuth?: boolean;
  isLegal?: boolean;
}

// Navigation item structure
export interface NavItem {
  id: PageType;
  label: string;
  href?: string;
  children?: NavItem[];
}

// Breadcrumb data structure
export interface BreadcrumbData {
  category?: string;
  subcategory?: string;
  item?: string;
  subPage?: string;
  subPageParent?: string;
  artistName?: string;
  serviceType?: string;
  styleType?: string;
}

export default ROUTES;