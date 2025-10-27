import type { PageType } from './types/route-types';

// Route configuration for the application
export const routes: Partial<
  Record<PageType, { path: string; title: Record<'DE' | 'EN', string> }>
> = {
  home: {
    path: '/',
    title: {
      DE: 'Home',
      EN: 'Home',
    },
  },
  services: {
    path: '/services',
    title: {
      DE: 'Services',
      EN: 'Services',
    },
  },
  artists: {
    path: '/artists',
    title: {
      DE: 'Künstler',
      EN: 'Artists',
    },
  },
  gallery: {
    path: '/gallery',
    title: {
      DE: 'Galerie',
      EN: 'Gallery',
    },
  },
  booking: {
    path: '/booking',
    title: {
      DE: 'Buchung',
      EN: 'Booking',
    },
  },
  contact: {
    path: '/contact',
    title: {
      DE: 'Kontakt',
      EN: 'Contact',
    },
  },
  aftercare: {
    path: '/aftercare',
    title: {
      DE: 'Nachsorge',
      EN: 'Aftercare',
    },
  },
  legal: {
    path: '/legal',
    title: {
      DE: 'Rechtliches',
      EN: 'Legal',
    },
  },
  faq: {
    path: '/faq',
    title: {
      DE: 'FAQ',
      EN: 'FAQ',
    },
  },
  'design-system-demo': {
    path: '/design-system',
    title: {
      DE: 'Design System',
      EN: 'Design System',
    },
  },
  'animation-showcase': {
    path: '/animation-showcase',
    title: {
      DE: 'Animation System',
      EN: 'Animation System',
    },
  },
  impressum: {
    path: '/impressum',
    title: {
      DE: 'Impressum',
      EN: 'Legal Notice',
    },
  },
  datenschutz: {
    path: '/datenschutz',
    title: {
      DE: 'Datenschutz',
      EN: 'Privacy Policy',
    },
  },
};
