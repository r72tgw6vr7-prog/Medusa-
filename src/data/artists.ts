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
  specialties: string[];
  bio: {
    de: string;
    en: string;
  };
  experience: string;
  languages: string[];
  instagram: string;
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
    role: 'Tattoo Artist',
    specialties: ['Traditional', 'Japanese', 'Blackwork', 'Neo-Traditional'],
    bio: {
      de: 'Aaron ist spezialisiert auf traditionelle und japanische Tätowierungen mit über 8 Jahren Erfahrung. Seine kräftigen Linien und leuchtenden Farben bringen klassische Designs zum Leben. Er kombiniert traditionelle Techniken mit modernen Interpretationen für zeitlose Kunstwerke.',
      en: 'Aaron specializes in traditional and Japanese tattoos with over 8 years of experience. His bold lines and vibrant colors bring classic designs to life. He combines traditional techniques with modern interpretations for timeless artwork.',
    },
    experience: '8+ Jahre',
    languages: ['Deutsch', 'English'],
    instagram: '@aaron_tattoo_munich',
    profileImage: '/team/ImageWithFallback.png',
    coverImage: '/team/ImageWithFallback.png',
    portfolioImages: [
      '/images/gallery/traditional-aaron-001.webp',
      '/images/gallery/traditional-aaron-002.webp',
      '/images/gallery/japanese-aaron-001.webp',
      '/images/gallery/blackwork-aaron-001.webp',
    ],
    featured: true,
    available: true,
    style: ['Traditional', 'Japanese', 'Bold Lines', 'Color Work'],
    achievements: [
      'Best Traditional Tattoo 2023 - Munich Tattoo Convention',
      'Featured in Tattoo Magazine Germany',
      'Guest spots international',
    ],
  },
  {
    id: 'angie',
    slug: 'angie',
    name: 'Angie',
    displayName: 'Angie Rodriguez',
    role: 'Tattoo Artist & Realism Specialist',
    specialties: ['Realism', 'Portrait', 'Black & Grey', 'Fine Line'],
    bio: {
      de: 'Angie ist eine Meisterin des Realismus und der Portrait-Tätowierungen. Mit einem Hintergrund in der bildenden Kunst schafft sie fotorealistische Kunstwerke auf der Haut. Ihre Liebe zum Detail und ihr Verständnis für Licht und Schatten machen jedes Stück zu einem einzigartigen Meisterwerk.',
      en: 'Angie is a master of realism and portrait tattoos. With a background in fine arts, she creates photorealistic artwork on skin. Her attention to detail and understanding of light and shadow make each piece a unique masterpiece.',
    },
    experience: '10+ Jahre',
    languages: ['Deutsch', 'English', 'Español'],
    instagram: '@angie_realism_tattoo',
    profileImage: '/team/ImageWithFallback_2.png',
    coverImage: '/team/ImageWithFallback_2.png',
    portfolioImages: [
      '/images/gallery/realism-angie-001.webp',
      '/images/gallery/portrait-angie-001.webp',
      '/images/gallery/blackgrey-angie-001.webp',
      '/images/gallery/fineline-angie-001.webp',
    ],
    featured: true,
    available: true,
    style: ['Realism', 'Portrait', 'Photorealistic', 'Fine Details'],
    achievements: [
      'Best Portrait 2024 - International Tattoo Expo',
      'Published in Skin Deep Magazine',
      '10 years of professional experience',
    ],
  },
  {
    id: 'debi',
    slug: 'debi',
    name: 'Debi',
    displayName: 'Debi',
    role: 'Tattoo Artist',
    specialties: ['Watercolor', 'Illustrative', 'Floral', 'Abstract'],
    bio: {
      de: 'Debi bringt einen einzigartigen künstlerischen Ansatz mit ihrem Watercolor- und illustrativen Stil. Sie ist bekannt für ihre traumhaften, fließenden Designs, die traditionelle Tattoo-Grenzen überschreiten. Ihre Arbeit ist perfekt für diejenigen, die nach etwas wirklich Einzigartigem und Künstlerischem suchen.',
      en: 'Debi brings a unique artistic approach with her watercolor and illustrative style. She is known for her dreamy, flowing designs that push traditional tattoo boundaries. Her work is perfect for those seeking something truly unique and artistic.',
    },
    experience: '6+ Jahre',
    languages: ['Deutsch', 'English'],
    instagram: '@debi_watercolor_art',
    profileImage: '/team/ImageWithFallback_3.png',
    coverImage: '/team/ImageWithFallback_3.png',
    portfolioImages: [
      '/images/gallery/watercolor-debi-001.webp',
      '/images/gallery/floral-debi-001.webp',
      '/images/gallery/abstract-debi-001.webp',
      '/images/gallery/illustrative-debi-001.webp',
    ],
    featured: false,
    available: true,
    style: ['Watercolor', 'Illustrative', 'Soft Colors', 'Floral'],
    achievements: [
      'Featured in Tattoo Life Magazine',
      'Guest artist at Berlin Tattoo Convention',
      'Specialized in custom floral designs',
    ],
  },
  {
    id: 'eli',
    slug: 'eli-luquez',
    name: 'Eli Luquez',
    displayName: 'Eli Luquez',
    role: 'Head Tattoo Artist & Studio Manager',
    specialties: ['Geometric', 'Dotwork', 'Mandala', 'Ornamental'],
    bio: {
      de: 'Eli ist unser Head Artist und Studio Manager mit über 12 Jahren Erfahrung. Er ist spezialisiert auf geometrische und ornamentale Designs mit präziser Symmetrie und komplexen Mustern. Seine Arbeit verbindet mathematische Präzision mit künstlerischer Vision und schafft hypnotisierende, Sacred Geometry Kunstwerke.',
      en: 'Eli is our head artist and studio manager with over 12 years of experience. He specializes in geometric and ornamental designs with precise symmetry and intricate patterns. His work combines mathematical precision with artistic vision, creating mesmerizing sacred geometry artwork.',
    },
    experience: '12+ Jahre',
    languages: ['Deutsch', 'English', 'Português'],
    instagram: '@eli_geometric_tattoo',
    email: 'eli@medusa-tattoo.de',
    profileImage: '/team/ImageWithFallback_4.png',
    coverImage: '/team/ImageWithFallback_4.png',
    portfolioImages: [
      '/images/gallery/geometric-eli-001.webp',
      '/images/gallery/dotwork-eli-001.webp',
      '/images/gallery/mandala-eli-001.webp',
      '/images/gallery/ornamental-eli-001.webp',
    ],
    featured: true,
    available: true,
    style: ['Geometric', 'Dotwork', 'Precise', 'Sacred Geometry'],
    achievements: [
      'Head Artist & Studio Manager',
      'Best Geometric Tattoo 2022 & 2023',
      'International guest spots',
      'Featured in multiple tattoo publications',
    ],
  },
  {
    id: 'loui',
    slug: 'loui',
    name: 'Loui',
    displayName: 'Loui',
    role: 'Tattoo Artist',
    specialties: ['Lettering', 'Script', 'Minimalist', 'Typography'],
    bio: {
      de: 'Loui ist unser Lettering-Spezialist mit einem Auge für Typografie und Design. Er kreiert wunderschöne Script-Tattoos, von eleganter Kalligrafie bis zu modernen minimalistischen Schriftarten. Seine Expertise liegt darin, bedeutungsvolle Worte in visuelle Kunstwerke zu verwandeln.',
      en: 'Loui is our lettering specialist with an eye for typography and design. He creates beautiful script tattoos, from elegant calligraphy to modern minimalist fonts. His expertise lies in transforming meaningful words into visual art.',
    },
    experience: '7+ Jahre',
    languages: ['Deutsch', 'English', 'Français'],
    instagram: '@loui_lettering_tattoo',
    profileImage: '/team/ImageWithFallback_5.png',
    coverImage: '/team/ImageWithFallback_5.png',
    portfolioImages: [
      '/images/gallery/lettering-loui-001.webp',
      '/images/gallery/script-loui-001.webp',
      '/images/gallery/minimalist-loui-001.webp',
      '/images/gallery/typography-loui-001.webp',
    ],
    featured: false,
    available: true,
    style: ['Lettering', 'Script', 'Calligraphy', 'Minimalist'],
    achievements: [
      'Master of modern calligraphy',
      'Custom font design specialist',
      'Featured in Typography Magazine',
    ],
  },
  {
    id: 'oli',
    slug: 'oli',
    name: 'Oli',
    displayName: 'Oli',
    role: 'Tattoo Artist & Color Specialist',
    specialties: ['New School', 'Cartoon', 'Pop Art', 'Vibrant Color'],
    bio: {
      de: 'Oli bringt lebendige Energie mit seinem New School und Pop Art Stil. Er ist bekannt für seine kräftigen Farben, übertriebenen Formen und spielerischen Designs. Seine Arbeit ist perfekt für diejenigen, die ein lustiges, ausdrucksstarkes Tattoo suchen, das auffällt.',
      en: 'Oli brings vibrant energy with his new school and pop art style. He is known for his bold colors, exaggerated shapes, and playful designs. His work is perfect for those wanting a fun, expressive tattoo that stands out.',
    },
    experience: '5+ Jahre',
    languages: ['Deutsch', 'English'],
    instagram: '@oli_newschool_tattoo',
    profileImage: '/team/ImageWithFallback_6.png',
    coverImage: '/team/ImageWithFallback_6.png',
    portfolioImages: [
      '/images/gallery/newschool-oli-001.webp',
      '/images/gallery/cartoon-oli-001.webp',
      '/images/gallery/popart-oli-001.webp',
      '/images/gallery/color-oli-001.webp',
    ],
    featured: false,
    available: true,
    style: ['New School', 'Pop Art', 'Bold Colors', 'Cartoon'],
    achievements: [
      'Color specialist',
      'Guest artist at multiple conventions',
      'Featured in New School Tattoo Magazine',
    ],
  },
  {
    id: 'sasha',
    slug: 'sasha',
    name: 'Sasha',
    displayName: 'Sasha',
    role: 'Tattoo Artist & Fine Line Specialist',
    specialties: ['Fine Line', 'Micro Tattoo', 'Delicate', 'Botanical'],
    bio: {
      de: 'Sasha ist spezialisiert auf feine Linien und zarte Micro-Tattoos. Ihre Arbeit ist bekannt für ihre Präzision und Eleganz, perfekt für subtile und anspruchsvolle Designs. Sie kreiert wunderschöne botanische und minimalistische Kunstwerke, die zeitlos sind.',
      en: 'Sasha specializes in fine line and delicate micro tattoos. Her work is known for its precision and elegance, perfect for subtle and sophisticated designs. She creates beautiful botanical and minimalist artwork that is timeless.',
    },
    experience: '8+ Jahre',
    languages: ['Deutsch', 'English', 'Русский'],
    instagram: '@sasha_fineline_tattoo',
    profileImage: '/team/ImageWithFallback_7.png',
    coverImage: '/team/ImageWithFallback_7.png',
    portfolioImages: [
      '/images/gallery/fineline-sasha-001.webp',
      '/images/gallery/micro-sasha-001.webp',
      '/images/gallery/botanical-sasha-001.webp',
      '/images/gallery/delicate-sasha-001.webp',
    ],
    featured: true,
    available: true,
    style: ['Fine Line', 'Micro', 'Delicate', 'Botanical'],
    achievements: [
      'Fine line specialist',
      'Master of micro tattoos',
      'Featured in Fine Line Tattoo Magazine',
    ],
  },
  {
    id: 'vive',
    slug: 'vive',
    name: 'Vive',
    displayName: 'Vive',
    role: 'Tattoo Artist & Cover-Up Specialist',
    specialties: ['Cover-Up', 'Restoration', 'Dark Art', 'Blackout'],
    bio: {
      de: 'Vive ist unser Cover-Up und Restoration Spezialist. Mit einem Talent für die Transformation alter oder unerwünschter Tattoos in schöne neue Kunstwerke gibt er jedem Stück eine zweite Chance. Seine Expertise in Dark Art und Blackout-Techniken macht ihn perfekt für mutige Transformationen.',
      en: 'Vive is our cover-up and restoration specialist. With a talent for transforming old or unwanted tattoos into beautiful new artwork, he gives every piece a second chance. His expertise in dark art and blackout techniques makes him perfect for bold transformations.',
    },
    experience: '9+ Jahre',
    languages: ['Deutsch', 'English'],
    instagram: '@vive_coverup_tattoo',
    profileImage: '/team/picture.png',
    coverImage: '/team/picture.png',
    portfolioImages: [
      '/images/gallery/coverup-vive-001.webp',
      '/images/gallery/restoration-vive-001.webp',
      '/images/gallery/darkart-vive-001.webp',
      '/images/gallery/blackout-vive-001.webp',
    ],
    featured: false,
    available: true,
    style: ['Cover-Up', 'Dark Art', 'Blackout', 'Restoration'],
    achievements: [
      'Cover-up transformation specialist',
      'Master of tattoo restoration',
      'Featured in Cover-Up Magazine',
      'Expert in blackout techniques',
    ],
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
