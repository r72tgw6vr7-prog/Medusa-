// ============================================
// SERVICE CATEGORIES DATA
// ============================================
// Seven piercing/service categories from the price list
// Used by: ServiceCarousel on HomePage

export interface ServiceCategory {
  id: string;
  category: string;
  description: string;
  icon: string;
  link: string;
  priceFrom: string;
}

/**
 * Service categories based on the Medusa price list:
 * Ohr, Mund, Körper, Gesicht, Intim, Service, Pflege
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'ohr',
    category: 'Ohr',
    description: 'Lobe · Helix · Conch · Tragus',
    icon: '◉',
    link: '/services#piercing',
    priceFrom: 'ab 45€',
  },
  {
    id: 'mund',
    category: 'Mund',
    description: 'Labret · Medusa · Snake Bites',
    icon: '◎',
    link: '/services#piercing',
    priceFrom: 'ab 50€',
  },
  {
    id: 'koerper',
    category: 'Körper',
    description: 'Navel · Surface · Dermal',
    icon: '◇',
    link: '/services#piercing',
    priceFrom: 'ab 60€',
  },
  {
    id: 'gesicht',
    category: 'Gesicht',
    description: 'Nostril · Septum · Bridge',
    icon: '◈',
    link: '/services#piercing',
    priceFrom: 'ab 50€',
  },
  {
    id: 'intim',
    category: 'Intim',
    description: 'Diskret · Professionell · Sicher',
    icon: '◆',
    link: '/services#piercing',
    priceFrom: 'ab 80€',
  },
  {
    id: 'service',
    category: 'Service',
    description: 'Wechsel · Dehnen · Beratung',
    icon: '⬡',
    link: '/services#service',
    priceFrom: 'ab 15€',
  },
  {
    id: 'pflege',
    category: 'Pflege',
    description: 'Aftercare · Premium Produkte',
    icon: '✧',
    link: '/services#products',
    priceFrom: 'ab 12€',
  },
];

export default SERVICE_CATEGORIES;
