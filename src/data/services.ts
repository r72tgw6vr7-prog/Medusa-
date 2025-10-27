// ============================================
// SERVICES DATA
// ============================================
// Complete service catalog for Medusa Tattoo München
// Used by: ServicesPage, ServicesShowcasePage, BookingPage

export interface Service {
  id: string;
  slug: string;
  name: {
    de: string;
    en: string;
  };
  tagline: {
    de: string;
    en: string;
  };
  description: {
    de: string;
    en: string;
  };
  category: 'tattoo' | 'piercing' | 'permanent-makeup' | 'special';
  pricing: {
    from: number;
    to?: number;
    currency: string;
    unit: string;
    note?: {
      de: string;
      en: string;
    };
  };
  duration: {
    min: number;
    max: number;
    unit: string;
  };
  process: string[];
  features: string[];
  examples: string[];
  recommended: boolean;
  popular: boolean;
  coverImage: string;
  galleryImages: string[];
  consultation: boolean;
  icon?: string;
}

export const SERVICES: Service[] = [
  {
    id: 'custom-tattoo',
    slug: 'custom-tattoo',
    name: {
      de: 'Custom Tattoo',
      en: 'Custom Tattoo',
    },
    tagline: {
      de: 'Einzigartige Designs für einzigartige Menschen',
      en: 'Unique designs for unique people',
    },
    description: {
      de: 'Arbeiten Sie mit unseren talentierten Künstlern zusammen, um Ihr perfektes Custom Tattoo zu kreieren. Von der ersten Idee bis zum fertigen Kunstwerk begleiten wir Sie durch den gesamten Prozess. Jedes Design wird individuell für Sie erstellt und perfekt auf Ihre Vorstellungen abgestimmt.',
      en: 'Work with our talented artists to create your perfect custom tattoo. From initial concept to finished artwork, we guide you through the entire process. Each design is individually created for you and perfectly tailored to your vision.',
    },
    category: 'tattoo',
    pricing: {
      from: 150,
      currency: 'EUR',
      unit: 'Stunde',
      note: {
        de: 'Preis abhängig von Größe, Detail und Künstler',
        en: 'Price depends on size, detail, and artist',
      },
    },
    duration: {
      min: 2,
      max: 8,
      unit: 'Stunden',
    },
    process: [
      'Kostenlose Beratung und Konzeptentwicklung',
      'Individuelle Design-Erstellung durch Ihren Künstler',
      'Design-Revision und finaler Entwurf',
      'Tattoo-Session mit professioneller Nachsorge',
      'Follow-up und Touch-up falls nötig',
    ],
    features: [
      'Individuelle Design-Erstellung',
      'Unbegrenzte Revisions-Runden',
      'Professionelle Künstler',
      'Premium Tattoo-Farben',
      'Sterile Einweg-Ausrüstung',
      'Kostenlose Touch-ups innerhalb 6 Monaten',
    ],
    examples: [
      '/images/services/custom-tattoo-1.jpg',
      '/images/services/custom-tattoo-2.jpg',
      '/images/services/custom-tattoo-3.jpg',
    ],
    recommended: true,
    popular: true,
    coverImage: '/images/services/custom-tattoo-hero.jpg',
    galleryImages: [
      '/images/gallery/custom-001.webp',
      '/images/gallery/custom-002.webp',
      '/images/gallery/custom-003.webp',
      '/images/gallery/custom-004.webp',
    ],
    consultation: true,
    icon: 'Palette',
  },
  {
    id: 'traditional-tattoo',
    slug: 'traditional-tattoo',
    name: {
      de: 'Traditional Tattoo',
      en: 'Traditional Tattoo',
    },
    tagline: {
      de: 'Klassische Tattoo-Kunst mit modernem Touch',
      en: 'Classic tattoo art with modern touch',
    },
    description: {
      de: 'Erleben Sie die zeitlose Schönheit traditioneller Tattoos. Mit kräftigen Linien, leuchtenden Farben und ikonischen Motiven schaffen wir klassische Designs, die ein Leben lang halten. Unsere Künstler sind Meister der alten Schule mit modernem Know-how.',
      en: 'Experience the timeless beauty of traditional tattoos. With bold lines, vibrant colors, and iconic motifs, we create classic designs that last a lifetime. Our artists are masters of old school with modern expertise.',
    },
    category: 'tattoo',
    pricing: {
      from: 120,
      currency: 'EUR',
      unit: 'Stunde',
      note: {
        de: 'Kleine Flash-Designs ab 80€',
        en: 'Small flash designs from 80€',
      },
    },
    duration: {
      min: 1,
      max: 6,
      unit: 'Stunden',
    },
    process: [
      'Motivauswahl aus unserem Flash oder Custom Design',
      'Platzierungs-Beratung',
      'Tattoo-Session',
      'Nachsorge-Anleitung',
      'Kostenlose Touch-ups',
    ],
    features: [
      'Kräftige Linien & leuchtende Farben',
      'Ikonische traditionelle Motive',
      'Flash-Designs verfügbar',
      'Schnelle Heilung',
      'Zeitlose Ästhetik',
    ],
    examples: [
      '/images/services/traditional-1.jpg',
      '/images/services/traditional-2.jpg',
      '/images/services/traditional-3.jpg',
    ],
    recommended: false,
    popular: true,
    coverImage: '/images/services/traditional-hero.jpg',
    galleryImages: [
      '/images/gallery/traditional-aaron-001.webp',
      '/images/gallery/traditional-aaron-002.webp',
    ],
    consultation: false,
    icon: 'Anchor',
  },
  {
    id: 'realism-tattoo',
    slug: 'realism-tattoo',
    name: {
      de: 'Realism Tattoo',
      en: 'Realism Tattoo',
    },
    tagline: {
      de: 'Fotorealistische Kunstwerke auf der Haut',
      en: 'Photorealistic artwork on skin',
    },
    description: {
      de: 'Unsere Realism-Spezialisten kreieren atemberaubende fotorealistische Tattoos. Von Portraits bis zu komplexen Szenen - jedes Detail wird mit höchster Präzision umgesetzt. Diese anspruchsvolle Kunst erfordert mehrere Sessions und absolute Hingabe.',
      en: 'Our realism specialists create breathtaking photorealistic tattoos. From portraits to complex scenes - every detail is executed with highest precision. This demanding art requires multiple sessions and absolute dedication.',
    },
    category: 'tattoo',
    pricing: {
      from: 180,
      to: 250,
      currency: 'EUR',
      unit: 'Stunde',
      note: {
        de: 'Großprojekte nach Absprache',
        en: 'Large projects by arrangement',
      },
    },
    duration: {
      min: 4,
      max: 12,
      unit: 'Stunden',
    },
    process: [
      'Intensive Beratung & Referenzfotos',
      'Detaillierte Design-Erstellung',
      'Mehrere Sessions je nach Größe',
      'Regelmäßige Heilungs-Checks',
      'Final Touch-ups',
    ],
    features: [
      'Fotorealistische Details',
      'Meisterhafte Schattierungen',
      'Portrait-Spezialisten',
      'Black & Grey oder Farbe',
      'Mehrere Sessions für beste Qualität',
    ],
    examples: [
      '/images/services/realism-1.jpg',
      '/images/services/realism-2.jpg',
      '/images/services/realism-3.jpg',
    ],
    recommended: true,
    popular: false,
    coverImage: '/images/services/realism-hero.jpg',
    galleryImages: [
      '/images/gallery/realism-angie-001.webp',
      '/images/gallery/portrait-angie-001.webp',
    ],
    consultation: true,
    icon: 'Image',
  },
  {
    id: 'fine-line-tattoo',
    slug: 'fine-line-tattoo',
    name: {
      de: 'Fine Line Tattoo',
      en: 'Fine Line Tattoo',
    },
    tagline: {
      de: 'Zarte, minimalistische Eleganz',
      en: 'Delicate, minimalist elegance',
    },
    description: {
      de: 'Entdecken Sie die Schönheit minimalistischer Fine Line Tattoos. Mit hauchdünnen Linien und eleganter Präzision kreieren wir subtile Kunstwerke, die Raffinesse ausstrahlen. Perfekt für Erstlinge oder diskrete Designs.',
      en: 'Discover the beauty of minimalist fine line tattoos. With ultra-thin lines and elegant precision, we create subtle artworks that radiate sophistication. Perfect for first-timers or discreet designs.',
    },
    category: 'tattoo',
    pricing: {
      from: 100,
      currency: 'EUR',
      unit: 'Stück',
      note: {
        de: 'Micro-Tattoos ab 80€',
        en: 'Micro tattoos from 80€',
      },
    },
    duration: {
      min: 1,
      max: 3,
      unit: 'Stunden',
    },
    process: [
      'Design-Beratung',
      'Präzise Platzierung',
      'Schnelle, schonende Session',
      'Einfache Heilung',
      'Optional: Touch-up',
    ],
    features: [
      'Hauchdünne, präzise Linien',
      'Minimalistische Designs',
      'Schnelle Heilung',
      'Diskret & elegant',
      'Ideal für erste Tattoos',
    ],
    examples: [
      '/images/services/fineline-1.jpg',
      '/images/services/fineline-2.jpg',
      '/images/services/fineline-3.jpg',
    ],
    recommended: false,
    popular: true,
    coverImage: '/images/services/fineline-hero.jpg',
    galleryImages: [
      '/images/gallery/fineline-sasha-001.webp',
      '/images/gallery/micro-sasha-001.webp',
    ],
    consultation: false,
    icon: 'Feather',
  },
  {
    id: 'cover-up',
    slug: 'cover-up',
    name: {
      de: 'Cover-Up & Restaurierung',
      en: 'Cover-Up & Restoration',
    },
    tagline: {
      de: 'Zweite Chancen für alte Tattoos',
      en: 'Second chances for old tattoos',
    },
    description: {
      de: 'Verwandeln Sie alte, verblasste oder unerwünschte Tattoos in schöne neue Kunstwerke. Unsere Cover-Up Spezialisten sind Experten darin, aus Herausforderungen Meisterwerke zu schaffen. Auch Restaurierungen wertvoller alter Tattoos sind möglich.',
      en: 'Transform old, faded, or unwanted tattoos into beautiful new artwork. Our cover-up specialists are experts in turning challenges into masterpieces. Restoration of valuable old tattoos is also possible.',
    },
    category: 'special',
    pricing: {
      from: 150,
      currency: 'EUR',
      unit: 'Stunde',
      note: {
        de: 'Preis abhängig vom Original-Tattoo',
        en: 'Price depends on original tattoo',
      },
    },
    duration: {
      min: 3,
      max: 10,
      unit: 'Stunden',
    },
    process: [
      'Ausführliche Analyse des alten Tattoos',
      'Cover-Up Design-Optionen',
      'Eventuell Laser-Vorbehandlung',
      'Mehrere Sessions',
      'Finaler Touch-up',
    ],
    features: [
      'Expertentransformation',
      'Kreative Lösungen',
      'Laser-Partnerschaften',
      'Realistische Planung',
      'Garantierte Zufriedenheit',
    ],
    examples: [
      '/images/services/coverup-1.jpg',
      '/images/services/coverup-2.jpg',
      '/images/services/coverup-3.jpg',
    ],
    recommended: true,
    popular: false,
    coverImage: '/images/services/coverup-hero.jpg',
    galleryImages: [
      '/images/gallery/coverup-vive-001.webp',
      '/images/gallery/restoration-vive-001.webp',
    ],
    consultation: true,
    icon: 'RefreshCw',
  },
  {
    id: 'piercing',
    slug: 'piercing',
    name: {
      de: 'Piercing',
      en: 'Piercing',
    },
    tagline: {
      de: 'Professionelles Piercing in luxuriöser Umgebung',
      en: 'Professional piercing in luxurious environment',
    },
    description: {
      de: 'Erleben Sie Piercing auf höchstem Niveau. Mit sterilen Techniken, hochwertigem Schmuck und erfahrenen Piercern bieten wir alle Arten von Piercings. Von klassischen Ohrpiercings bis zu individuellen Body Piercings - Ihre Sicherheit und Zufriedenheit stehen an erster Stelle.',
      en: 'Experience piercing at the highest level. With sterile techniques, high-quality jewelry, and experienced piercers, we offer all types of piercings. From classic ear piercings to individual body piercings - your safety and satisfaction come first.',
    },
    category: 'piercing',
    pricing: {
      from: 40,
      to: 120,
      currency: 'EUR',
      unit: 'Stück',
      note: {
        de: 'Inklusive hochwertigem Erstschmuck',
        en: 'Including high-quality initial jewelry',
      },
    },
    duration: {
      min: 15,
      max: 45,
      unit: 'Minuten',
    },
    process: [
      'Beratung & Platzierung',
      'Desinfektion & Markierung',
      'Professionelles Piercing',
      'Erstschmuck-Einsetzung',
      'Nachsorge-Anleitung',
    ],
    features: [
      'Sterile Einweg-Nadeln',
      'Premium Titan-Schmuck',
      'Erfahrene Piercer',
      'Schnelle Heilung',
      'Follow-up inklusive',
    ],
    examples: [
      '/images/services/piercing-1.jpg',
      '/images/services/piercing-2.jpg',
      '/images/services/piercing-3.jpg',
    ],
    recommended: false,
    popular: true,
    coverImage: '/images/services/piercing-hero.jpg',
    galleryImages: ['/images/gallery/piercing-1.webp', '/images/gallery/piercing-2.webp'],
    consultation: false,
    icon: 'Circle',
  },
  {
    id: 'permanent-makeup',
    slug: 'permanent-makeup',
    name: {
      de: 'Permanent Make-up',
      en: 'Permanent Makeup',
    },
    tagline: {
      de: 'Natürliche Schönheit, dauerhaft',
      en: 'Natural beauty, permanent',
    },
    description: {
      de: 'Wachen Sie jeden Tag perfekt geschminkt auf. Unser Permanent Make-up umfasst Augenbrauen (Microblading/Powder Brows), Eyeliner und Lippenkontur. Mit natürlichen Pigmenten und präzisen Techniken kreieren wir subtile, langanhaltende Ergebnisse.',
      en: 'Wake up perfectly made up every day. Our permanent makeup includes eyebrows (microblading/powder brows), eyeliner, and lip liner. With natural pigments and precise techniques, we create subtle, long-lasting results.',
    },
    category: 'permanent-makeup',
    pricing: {
      from: 250,
      to: 450,
      currency: 'EUR',
      unit: 'Behandlung',
      note: {
        de: 'Touch-up nach 6-8 Wochen inklusive',
        en: 'Touch-up after 6-8 weeks included',
      },
    },
    duration: {
      min: 2,
      max: 3,
      unit: 'Stunden',
    },
    process: [
      'Ausführliche Beratung & Farbauswahl',
      'Design & Vorzeichnung',
      'Betäubung für maximalen Komfort',
      'Präzise Pigmentierung',
      'Touch-up Session nach Heilung',
    ],
    features: [
      'Natürliche Ergebnisse',
      'Premium Pigmente',
      'Schmerzarm durch Betäubung',
      'Hält 1-3 Jahre',
      'Touch-up inklusive',
    ],
    examples: [
      '/images/services/pmu-1.jpg',
      '/images/services/pmu-2.jpg',
      '/images/services/pmu-3.jpg',
    ],
    recommended: true,
    popular: false,
    coverImage: '/images/services/pmu-hero.jpg',
    galleryImages: ['/images/gallery/pmu-001.webp', '/images/gallery/pmu-002.webp'],
    consultation: true,
    icon: 'Sparkles',
  },
];

// Helper functions
export const getServiceBySlug = (slug: string): Service | undefined => {
  return SERVICES.find((service) => service.slug === slug);
};

export const getServiceById = (id: string): Service | undefined => {
  return SERVICES.find((service) => service.id === id);
};

export const getServicesByCategory = (category: string): Service[] => {
  return SERVICES.filter((service) => service.category === category);
};

export const getRecommendedServices = (): Service[] => {
  return SERVICES.filter((service) => service.recommended);
};

export const getPopularServices = (): Service[] => {
  return SERVICES.filter((service) => service.popular);
};

export default SERVICES;
