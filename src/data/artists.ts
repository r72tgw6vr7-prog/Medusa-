// ============================================
// ARTIST DATA
// ============================================
// Complete artist profiles for Medusa Tattoo München
// Used by: ArtistsPage, ArtistDetailPage, GalleryPage

export interface Artist {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  role: string;
  roleLocalized?: {
    de: string;
    en: string;
  };
  specialties: string[];
  specialtiesLocalized?: {
    de: string[];
    en: string[];
  };
  bio: {
    de: string;
    en: string;
  };
  experience: string;
  languages: string[];
  email?: string;
  phone?: string;
  profileImage: string;
  coverImage?: string;
  portfolioImages: string[];
  featured: boolean;
  available: boolean;
  bookingUrl?: string;
  achievements?: string[];
  style: string[];
}

export const ARTISTS: Artist[] = [
  {
    id: 'aaron',
    slug: 'aaron',
    name: 'Aaron',
    displayName: 'Aaron',
    role: 'Salonleiter & Piercing-Spezialist',
    roleLocalized: {
      de: 'Salonleiter & Piercing-Spezialist',
      en: 'Salonleiter & Piercing Specialist',
    },
    specialties: ['Individuelle Designs', 'Special Piercings', 'Consultation', 'Ohrlochzauberer'],
    specialtiesLocalized: {
      de: ['Individuelle Designs', 'Spezialpiercings', 'Beratung', 'Ohrlochzauberer'],
      en: ['Individuelle Designs', 'Special Piercings', 'Consultation', 'Ohrlochzauberer'],
    },
    bio: {
      de: 'Aaron ist Salonleiter und spezialisiert auf besondere Piercings sowie individuelle Designs. Er begleitet Kund:innen in der Beratung und hilft dabei, passende Lösungen und Platzierungen zu finden. Seine Spezialität ist der "Ohrlochzauberer" – ein kinderfreundlicher Ansatz für Ohrlochstechen, bei dem er wie ein Zauberer auftritt, um Kindern die Angst zu nehmen und das Erlebnis zu etwas Besonderem zu machen.',
      en: 'Aaron is the salon director and specializes in special piercings and custom designs. He supports clients through consultation to find the right solutions and placements. His specialty is the "Ohrlochzauberer" (Ear Piercing Wizard) – a kid-friendly approach to ear piercing where he acts like a magician to ease children\'s fears and make the experience something special.',
    },
    experience: '',
    languages: ['Deutsch', 'English'],
    profileImage: '/images/artists/aaron.webp',
    coverImage: '/images/artists/aaron.webp',
    portfolioImages: [
      '/images/gallery/traditional-aaron-001.webp',
      '/images/gallery/traditional-aaron-002.webp',
      '/images/gallery/japanese-aaron-001.webp',
      '/images/gallery/blackwork-aaron-001.webp',
    ],
    featured: true,
    available: true,
    style: ['Traditional', 'Japanese', 'Bold Lines', 'Color Work'],
  },
  {
    id: 'angie',
    slug: 'angie',
    name: 'Angie',
    displayName: 'Angie Rodriguez',
    role: 'Piercing Specialist & Social Media Manager',
    roleLocalized: {
      de: 'Piercing-Spezialistin & Medienmanagerin',
      en: 'Piercing Specialist & Social Media Manager',
    },
    specialties: ['Hygiene Standards', 'Team Training', 'Piercing Procedures'],
    specialtiesLocalized: {
      de: ['Hygienestandards', 'Team-Schulungen', 'Piercing-Prozesse'],
      en: ['Hygiene Standards', 'Team Training', 'Piercing Procedures'],
    },
    bio: {
      de: 'Angie ist Piercing-Spezialistin und Medienmanagerin. Sie ist eine zentrale Ansprechpartnerin für Hygienestandards, bewährte Abläufe und interne Prozesse und unterstützt das Team mit Wissen, Organisation und Trainings.',
      en: 'Angie is a piercing specialist and social media manager. She is a key point of contact for hygiene standards, best practices, and internal procedures, supporting the team with organization and training.',
    },
    experience: '',
    languages: ['Deutsch', 'English', 'Español'],
    profileImage: '/images/artists/angie.webp',
    coverImage: '/images/artists/angie.webp',
    portfolioImages: [
      '/images/gallery/realism-angie-001.webp',
      '/images/gallery/portrait-angie-001.webp',
      '/images/gallery/blackgrey-angie-001.webp',
      '/images/gallery/fineline-angie-001.webp',
    ],
    featured: true,
    available: true,
    style: ['Realism', 'Portrait', 'Photorealistic', 'Fine Details'],
  },
  {
    id: 'debi',
    slug: 'debi',
    name: 'Debi',
    displayName: 'Debi',
    role: 'Tattoo Artist',
    roleLocalized: {
      de: 'Tattoo-Künstler',
      en: 'Tattoo Artist',
    },
    specialties: ['Linework', 'All-round styles'],
    specialtiesLocalized: {
      de: ['Linework', 'Vielseitige Stilrichtungen'],
      en: ['Linework', 'All-round styles'],
    },
    bio: {
      de: 'Debi hatte ein eigenes Studio in Ungarn und arbeitet mit einem starken Fokus auf präzise Linienarbeit. Als Allrounder setzt er Projekte in verschiedenen Stilrichtungen professionell um. Beratung und saubere Ausführung stehen dabei im Mittelpunkt.',
      en: 'Debi previously ran his own studio in Hungary and is known for precise linework. As an all‑round artist, he works confidently across multiple styles. Clear consultation and clean execution are central to his work.',
    },
    experience: '',
    languages: ['English', 'Hungarian'],
    profileImage: '/images/artists/debi.webp',
    coverImage: '/images/artists/debi.webp',
    portfolioImages: [
      '/images/gallery/watercolor-debi-001.webp',
      '/images/gallery/floral-debi-001.webp',
      '/images/gallery/abstract-debi-001.webp',
      '/images/gallery/illustrative-debi-001.webp',
    ],
    featured: false,
    available: true,
    style: ['Watercolor', 'Illustrative', 'Soft Colors', 'Floral'],
  },
  {
    id: 'eli',
    slug: 'eli-luquez',
    name: 'Eli Luquez',
    displayName: 'Eli Luquez',
    role: 'Studioleiter',
    roleLocalized: {
      de: 'Studioleiter',
      en: 'Studio Manager',
    },
    specialties: ['Geometric', 'Dotwork', 'Mandala', 'Ornamental'],
    specialtiesLocalized: {
      de: ['Geometrie', 'Dotwork', 'Mandala', 'Ornamental'],
      en: ['Geometric', 'Dotwork', 'Mandala', 'Ornamental'],
    },
    bio: {
      de: 'Eli ist unser Chefkünstler und Studioleiter mit über 12 Jahren Erfahrung. Er ist spezialisiert auf geometrische und ornamentale Designs mit präziser Symmetrie und komplexen Mustern. Seine Arbeit verbindet mathematische Präzision mit künstlerischer Vision und schafft hypnotisierende Kunstwerke der heiligen Geometrie. Er arbeitet seit 2022 bei Medusa Tattoo München.',
      en: 'Eli is our head artist and studio manager with over 12 years of experience. He specializes in geometric and ornamental designs with precise symmetry and intricate patterns. His work combines mathematical precision with artistic vision, creating mesmerizing sacred geometry artwork. He has been working at Medusa Tattoo München since 2022.',
    },
    experience: '12+ Jahre',
    languages: ['Deutsch', 'English', 'Português'],
    profileImage: '/images/artists/luz.webp',
    coverImage: '/images/artists/luz.webp',
    portfolioImages: [
      '/images/gallery/geometric-eli-001.webp',
      '/images/gallery/dotwork-eli-001.webp',
      '/images/gallery/mandala-eli-001.webp',
      '/images/gallery/ornamental-eli-001.webp',
    ],
    featured: true,
    available: true,
    style: ['Geometric', 'Dotwork', 'Precise', 'Sacred Geometry'],
  },
  {
    id: 'loui',
    slug: 'loui',
    name: 'Loui',
    displayName: 'Loui',
    role: 'Artist',
    roleLocalized: {
      de: 'Tattoo-Künstler',
      en: 'Artist',
    },
    specialties: ['Craftsmanship'],
    specialtiesLocalized: {
      de: ['Handwerk & Präzision'],
      en: ['Craftsmanship'],
    },
    bio: {
      de: 'Loui bringt rund 25 Jahre Erfahrung mit und ist handwerklich stark geprägt durch seine Ausbildung als Kirchenmaler. Diese Präzision und Gestaltungssicherheit fließen in seine Arbeiten ein.',
      en: 'Loui brings around 25 years of experience and a strong craft background, trained as a church painter. That precision and sense of composition shape his work.',
    },
    experience: '25+ Jahre',
    languages: ['Deutsch', 'English', 'Français'],
    profileImage: '/images/artists/loui.webp',
    coverImage: '/images/artists/loui.webp',
    portfolioImages: [
      '/images/gallery/lettering-loui-001.webp',
      '/images/gallery/script-loui-001.webp',
      '/images/gallery/minimalist-loui-001.webp',
      '/images/gallery/typography-loui-001.webp',
    ],
    featured: false,
    available: true,
    style: ['Lettering', 'Script', 'Calligraphy', 'Minimalist'],
  },
  {
    id: 'oli',
    slug: 'oli',
    name: 'Oli',
    displayName: 'Oli',
    role: 'Tattoo Artist & Color Specialist',
    roleLocalized: {
      de: 'Tattoo-Künstler & Farbspezialist',
      en: 'Tattoo Artist & Colour Specialist',
    },
    specialties: ['New School', 'Cartoon', 'Pop Art', 'Vibrant Color'],
    specialtiesLocalized: {
      de: ['New School', 'Cartoon', 'Pop Art', 'Kräftige Farben'],
      en: ['New School', 'Cartoon', 'Pop Art', 'Vibrant Colour'],
    },
    bio: {
      de: 'Oli bringt lebendige Energie mit seinem New School und Pop Art Stil. Er ist bekannt für seine kräftigen Farben, übertriebenen Formen und spielerischen Designs. Seine Arbeit ist perfekt für diejenigen, die ein lustiges, ausdrucksstarkes Tattoo suchen, das auffällt.',
      en: 'Oli brings vibrant energy with his new school and pop art style. He is known for his bold colors, exaggerated shapes, and playful designs. His work is perfect for those wanting a fun, expressive tattoo that stands out.',
    },
    experience: '5+ Jahre',
    languages: ['Deutsch', 'English'],
    profileImage: '/images/artists/oliver.webp',
    coverImage: '/images/artists/oliver.webp',
    portfolioImages: [
      '/images/gallery/newschool-oli-001.webp',
      '/images/gallery/cartoon-oli-001.webp',
      '/images/gallery/popart-oli-001.webp',
      '/images/gallery/color-oli-001.webp',
    ],
    featured: false,
    available: true,
    style: ['New School', 'Pop Art', 'Bold Colors', 'Cartoon'],
  },
  {
    id: 'sasha',
    slug: 'sasha',
    name: 'Sasha',
    displayName: 'Sasha',
    role: 'Tattoo Artist & Fine Line Specialist',
    roleLocalized: {
      de: 'Tattoo-Künstlerin & Fine-Line-Spezialistin',
      en: 'Tattoo Artist & Fine Line Specialist',
    },
    specialties: ['Fine Line', 'Micro Tattoo', 'Delicate', 'Botanical'],
    specialtiesLocalized: {
      de: ['Fine Line', 'Micro Tattoos', 'Zart & präzise', 'Botanisch'],
      en: ['Fine Line', 'Micro Tattoos', 'Delicate', 'Botanical'],
    },
    bio: {
      de: 'Sasha ist spezialisiert auf feine Linien und zarte Micro-Tattoos. Ihre Arbeit ist bekannt für ihre Präzision und Eleganz, perfekt für subtile und anspruchsvolle Designs. Sie kreiert wunderschöne botanische und minimalistische Kunstwerke, die zeitlos sind.',
      en: 'Sasha specializes in fine line and delicate micro tattoos. Her work is known for its precision and elegance, perfect for subtle and sophisticated designs. She creates beautiful botanical and minimalist artwork that is timeless.',
    },
    experience: '8+ Jahre',
    languages: ['Deutsch', 'English', 'Русский'],
    profileImage: '/images/artists/sascha.webp',
    coverImage: '/images/artists/sascha.webp',
    portfolioImages: [
      '/images/gallery/fineline-sasha-001.webp',
      '/images/gallery/micro-sasha-001.webp',
      '/images/gallery/botanical-sasha-001.webp',
      '/images/gallery/delicate-sasha-001.webp',
    ],
    featured: true,
    available: true,
    style: ['Fine Line', 'Micro', 'Delicate', 'Botanical'],
  },
  {
    id: 'vive',
    slug: 'vive',
    name: 'Vive',
    displayName: 'Vive',
    role: 'Piercer & Stylist',
    roleLocalized: {
      de: 'Piercerin & Stylistin',
      en: 'Piercer & Stylist',
    },
    specialties: ['Snake Eye Piercing', 'Style Consultation', 'Jewelry Assortment'],
    specialtiesLocalized: {
      de: ['Snake-Eye-Piercing', 'Style-Beratung', 'Schmuck-Sortiment'],
      en: ['Snake Eye Piercing', 'Style Consultation', 'Jewellery Assortment'],
    },
    bio: {
      de: 'Vivi ist Piercerin und Stylistin und berät Kund:innen auch rund um Stil und Kombinationen. Sie ist besonders stark bei Snake‑Eye‑Piercings und verantwortet die Auswahl und das Sortiment an Schmuck im Studio.',
      en: 'Vivi is a piercer and stylist, supporting clients with style and combination consultations. She is especially strong with snake‑eye piercings and is responsible for the studio’s jewelry selection and assortment.',
    },
    experience: '',
    languages: ['Deutsch', 'English'],
    profileImage: '/images/artists/vivi.webp',
    coverImage: '/images/artists/vivi.webp',
    portfolioImages: [
      '/images/gallery/coverup-vive-001.webp',
      '/images/gallery/restoration-vive-001.webp',
      '/images/gallery/darkart-vive-001.webp',
      '/images/gallery/blackout-vive-001.webp',
    ],
    featured: false,
    available: true,
    style: ['Cover-Up', 'Dark Art', 'Blackout', 'Restoration'],
  },
];

// Helper functions
export const getArtistBySlug = (slug: string): Artist | undefined => {
  return ARTISTS.find((artist) => artist.slug === slug);
};

export const getArtistById = (id: string): Artist | undefined => {
  return ARTISTS.find((artist) => artist.id === id);
};

export const getFeaturedArtists = (): Artist[] => {
  return ARTISTS.filter((artist) => artist.featured);
};

export const getAvailableArtists = (): Artist[] => {
  return ARTISTS.filter((artist) => artist.available);
};

export const getArtistsBySpecialty = (specialty: string): Artist[] => {
  return ARTISTS.filter((artist) =>
    artist.specialties.some((s) => s.toLowerCase().includes(specialty.toLowerCase())),
  );
};

export default ARTISTS;
