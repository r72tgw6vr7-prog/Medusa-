// ============================================
// GALLERY DATA
// ============================================
// Gallery image catalog for Medusa Tattoo München
// Used by: GalleryPage, ArtistDetailPage, HomePage gallery section

export interface GalleryImage {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string;
  title: string;
  description?: string;
  artist: string;
  artistId: string;
  artistSlug: string;
  year: string;
  category: 'tattoo' | 'piercing' | 'cover-up' | 'restoration' | 'permanent-makeup';
  style: string[];
  featured: boolean;
  tags: string[];
  dimensions?: {
    width: number;
    height: number;
  };
  location?: string;
  sessionCount?: number;
  duration?: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  // Aaron's Portfolio
  {
    id: 'aaron-001',
    imageUrl: '/images/gallery/traditional-aaron-001.webp',
    title: 'Dragon Sleeve',
    description: 'Full sleeve traditional Japanese dragon in vibrant colors',
    artist: 'Aaron',
    artistId: 'aaron',
    artistSlug: 'aaron',
    year: '2024',
    category: 'tattoo',
    style: ['Traditional', 'Japanese', 'Color'],
    featured: true,
    tags: ['dragon', 'sleeve', 'japanese', 'traditional', 'color'],
    sessionCount: 3,
    duration: '18 hours total',
  },
  {
    id: 'aaron-002',
    imageUrl: '/images/gallery/traditional-aaron-002.webp',
    title: 'American Traditional Rose',
    description: 'Classic American traditional rose with bold lines',
    artist: 'Aaron',
    artistId: 'aaron',
    artistSlug: 'aaron',
    year: '2024',
    category: 'tattoo',
    style: ['Traditional', 'American Traditional'],
    featured: false,
    tags: ['rose', 'traditional', 'flash', 'color'],
    sessionCount: 1,
    duration: '2 hours',
  },
  {
    id: 'aaron-003',
    imageUrl: '/images/gallery/blackwork-aaron-001.webp',
    title: 'Blackwork Geometric Pattern',
    description: 'Bold blackwork with geometric elements',
    artist: 'Aaron',
    artistId: 'aaron',
    artistSlug: 'aaron',
    year: '2023',
    category: 'tattoo',
    style: ['Blackwork', 'Geometric'],
    featured: false,
    tags: ['blackwork', 'geometric', 'bold'],
    sessionCount: 2,
    duration: '8 hours total',
  },

  // Angie's Portfolio
  {
    id: 'angie-001',
    imageUrl: '/images/gallery/realism-angie-001.webp',
    title: 'Portrait Realism',
    description: 'Photorealistic portrait with incredible detail',
    artist: 'Angie Rodriguez',
    artistId: 'angie',
    artistSlug: 'angie',
    year: '2024',
    category: 'tattoo',
    style: ['Realism', 'Portrait', 'Black & Grey'],
    featured: true,
    tags: ['portrait', 'realism', 'photorealistic', 'black and grey'],
    sessionCount: 4,
    duration: '20 hours total',
  },
  {
    id: 'angie-002',
    imageUrl: '/images/gallery/portrait-angie-001.webp',
    title: 'Family Portrait',
    description: 'Emotional family portrait in black and grey',
    artist: 'Angie Rodriguez',
    artistId: 'angie',
    artistSlug: 'angie',
    year: '2024',
    category: 'tattoo',
    style: ['Portrait', 'Realism'],
    featured: true,
    tags: ['portrait', 'family', 'emotional', 'realism'],
    sessionCount: 3,
    duration: '15 hours total',
  },
  {
    id: 'angie-003',
    imageUrl: '/images/gallery/blackgrey-angie-001.webp',
    title: 'Nature Scene',
    description: 'Detailed nature scene with realistic shading',
    artist: 'Angie Rodriguez',
    artistId: 'angie',
    artistSlug: 'angie',
    year: '2023',
    category: 'tattoo',
    style: ['Realism', 'Black & Grey', 'Nature'],
    featured: false,
    tags: ['nature', 'landscape', 'realistic', 'shading'],
    sessionCount: 2,
    duration: '12 hours total',
  },

  // Debi's Portfolio
  {
    id: 'debi-001',
    imageUrl: '/images/gallery/watercolor-debi-001.webp',
    title: 'Watercolor Flowers',
    description: 'Dreamy watercolor floral design',
    artist: 'Debi',
    artistId: 'debi',
    artistSlug: 'debi',
    year: '2024',
    category: 'tattoo',
    style: ['Watercolor', 'Floral', 'Illustrative'],
    featured: true,
    tags: ['watercolor', 'flowers', 'colorful', 'dreamy'],
    sessionCount: 2,
    duration: '8 hours total',
  },
  {
    id: 'debi-002',
    imageUrl: '/images/gallery/floral-debi-001.webp',
    title: 'Botanical Illustration',
    description: 'Delicate botanical illustration with soft colors',
    artist: 'Debi',
    artistId: 'debi',
    artistSlug: 'debi',
    year: '2024',
    category: 'tattoo',
    style: ['Illustrative', 'Botanical', 'Fine Line'],
    featured: false,
    tags: ['botanical', 'flowers', 'delicate', 'illustration'],
    sessionCount: 1,
    duration: '4 hours',
  },
  {
    id: 'debi-003',
    imageUrl: '/images/gallery/abstract-debi-001.webp',
    title: 'Abstract Flow',
    description: 'Abstract flowing design with vibrant colors',
    artist: 'Debi',
    artistId: 'debi',
    artistSlug: 'debi',
    year: '2023',
    category: 'tattoo',
    style: ['Abstract', 'Watercolor'],
    featured: false,
    tags: ['abstract', 'flow', 'color', 'unique'],
    sessionCount: 2,
    duration: '6 hours total',
  },

  // Eli's Portfolio
  {
    id: 'eli-001',
    imageUrl: '/images/gallery/geometric-eli-001.webp',
    title: 'Sacred Geometry Mandala',
    description: 'Intricate mandala with perfect symmetry',
    artist: 'Eli Luquez',
    artistId: 'eli',
    artistSlug: 'eli-luquez',
    year: '2024',
    category: 'tattoo',
    style: ['Geometric', 'Mandala', 'Dotwork'],
    featured: true,
    tags: ['mandala', 'geometric', 'sacred geometry', 'symmetry'],
    sessionCount: 3,
    duration: '14 hours total',
  },
  {
    id: 'eli-002',
    imageUrl: '/images/gallery/dotwork-eli-001.webp',
    title: 'Dotwork Pattern',
    description: 'Precise dotwork with stunning detail',
    artist: 'Eli Luquez',
    artistId: 'eli',
    artistSlug: 'eli-luquez',
    year: '2024',
    category: 'tattoo',
    style: ['Dotwork', 'Geometric'],
    featured: false,
    tags: ['dotwork', 'dots', 'precision', 'pattern'],
    sessionCount: 2,
    duration: '10 hours total',
  },
  {
    id: 'eli-003',
    imageUrl: '/images/gallery/ornamental-eli-001.webp',
    title: 'Ornamental Sleeve',
    description: 'Full ornamental sleeve with complex patterns',
    artist: 'Eli Luquez',
    artistId: 'eli',
    artistSlug: 'eli-luquez',
    year: '2023',
    category: 'tattoo',
    style: ['Ornamental', 'Geometric'],
    featured: true,
    tags: ['ornamental', 'sleeve', 'patterns', 'complex'],
    sessionCount: 4,
    duration: '22 hours total',
  },

  // Loui's Portfolio
  {
    id: 'loui-001',
    imageUrl: '/images/gallery/lettering-loui-001.webp',
    title: 'Script Lettering',
    description: 'Elegant script lettering with beautiful flow',
    artist: 'Loui',
    artistId: 'loui',
    artistSlug: 'loui',
    year: '2024',
    category: 'tattoo',
    style: ['Lettering', 'Script', 'Calligraphy'],
    featured: false,
    tags: ['lettering', 'script', 'text', 'elegant'],
    sessionCount: 1,
    duration: '2 hours',
  },
  {
    id: 'loui-002',
    imageUrl: '/images/gallery/typography-loui-001.webp',
    title: 'Modern Typography',
    description: 'Bold modern typography design',
    artist: 'Loui',
    artistId: 'loui',
    artistSlug: 'loui',
    year: '2024',
    category: 'tattoo',
    style: ['Typography', 'Lettering', 'Minimalist'],
    featured: false,
    tags: ['typography', 'modern', 'bold', 'text'],
    sessionCount: 1,
    duration: '3 hours',
  },

  // Oli's Portfolio
  {
    id: 'oli-001',
    imageUrl: '/images/gallery/newschool-oli-001.webp',
    title: 'New School Character',
    description: 'Vibrant new school character with bold colors',
    artist: 'Oli',
    artistId: 'oli',
    artistSlug: 'oli',
    year: '2024',
    category: 'tattoo',
    style: ['New School', 'Cartoon', 'Color'],
    featured: false,
    tags: ['new school', 'cartoon', 'colorful', 'fun'],
    sessionCount: 2,
    duration: '8 hours total',
  },
  {
    id: 'oli-002',
    imageUrl: '/images/gallery/popart-oli-001.webp',
    title: 'Pop Art Portrait',
    description: 'Bold pop art style portrait',
    artist: 'Oli',
    artistId: 'oli',
    artistSlug: 'oli',
    year: '2024',
    category: 'tattoo',
    style: ['Pop Art', 'New School', 'Portrait'],
    featured: false,
    tags: ['pop art', 'bold', 'colorful', 'portrait'],
    sessionCount: 2,
    duration: '10 hours total',
  },

  // Sasha's Portfolio
  {
    id: 'sasha-001',
    imageUrl: '/images/gallery/fineline-sasha-001.webp',
    title: 'Fine Line Botanical',
    description: 'Delicate fine line botanical design',
    artist: 'Sasha',
    artistId: 'sasha',
    artistSlug: 'sasha',
    year: '2024',
    category: 'tattoo',
    style: ['Fine Line', 'Botanical', 'Minimalist'],
    featured: true,
    tags: ['fine line', 'botanical', 'delicate', 'minimalist'],
    sessionCount: 1,
    duration: '3 hours',
  },
  {
    id: 'sasha-002',
    imageUrl: '/images/gallery/micro-sasha-001.webp',
    title: 'Micro Tattoo Set',
    description: 'Set of tiny micro tattoos',
    artist: 'Sasha',
    artistId: 'sasha',
    artistSlug: 'sasha',
    year: '2024',
    category: 'tattoo',
    style: ['Micro', 'Fine Line', 'Minimalist'],
    featured: false,
    tags: ['micro', 'tiny', 'delicate', 'minimalist'],
    sessionCount: 1,
    duration: '2 hours',
  },

  // Vive's Portfolio
  {
    id: 'vive-001',
    imageUrl: '/images/gallery/coverup-vive-001.webp',
    title: 'Cover-Up Transformation',
    description: 'Successful cover-up with beautiful new design',
    artist: 'Vive',
    artistId: 'vive',
    artistSlug: 'vive',
    year: '2024',
    category: 'cover-up',
    style: ['Cover-Up', 'Dark Art'],
    featured: true,
    tags: ['cover-up', 'transformation', 'dark art'],
    sessionCount: 3,
    duration: '16 hours total',
  },
  {
    id: 'vive-002',
    imageUrl: '/images/gallery/restoration-vive-001.webp',
    title: 'Tattoo Restoration',
    description: 'Restored and refreshed vintage tattoo',
    artist: 'Vive',
    artistId: 'vive',
    artistSlug: 'vive',
    year: '2023',
    category: 'restoration',
    style: ['Restoration', 'Traditional'],
    featured: false,
    tags: ['restoration', 'refresh', 'vintage'],
    sessionCount: 2,
    duration: '8 hours total',
  },

  // Piercing Examples
  {
    id: 'piercing-001',
    imageUrl: '/images/gallery/piercing-1.webp',
    title: 'Luxury Ear Curation',
    description: 'Curated ear piercing setup with premium jewelry',
    artist: 'Studio',
    artistId: 'studio',
    artistSlug: 'studio',
    year: '2024',
    category: 'piercing',
    style: ['Piercing', 'Curation'],
    featured: true,
    tags: ['piercing', 'ear', 'jewelry', 'curation'],
    duration: '45 minutes',
  },
  {
    id: 'piercing-002',
    imageUrl: '/images/gallery/piercing-2.webp',
    title: 'Nose Piercing',
    description: 'Classic nose piercing with titanium jewelry',
    artist: 'Studio',
    artistId: 'studio',
    artistSlug: 'studio',
    year: '2024',
    category: 'piercing',
    style: ['Piercing'],
    featured: false,
    tags: ['piercing', 'nose', 'titanium'],
    duration: '15 minutes',
  },
];

// Helper functions
export const getImageById = (id: string): GalleryImage | undefined => {
  return GALLERY_IMAGES.find((img) => img.id === id);
};

export const getImagesByArtist = (artistSlug: string): GalleryImage[] => {
  return GALLERY_IMAGES.filter((img) => img.artistSlug === artistSlug);
};

export const getImagesByCategory = (category: string): GalleryImage[] => {
  return GALLERY_IMAGES.filter((img) => img.category === category);
};

export const getImagesByStyle = (style: string): GalleryImage[] => {
  return GALLERY_IMAGES.filter((img) =>
    img.style.some((s) => s.toLowerCase().includes(style.toLowerCase())),
  );
};

export const getFeaturedImages = (): GalleryImage[] => {
  return GALLERY_IMAGES.filter((img) => img.featured);
};

export const getImagesByYear = (year: string): GalleryImage[] => {
  return GALLERY_IMAGES.filter((img) => img.year === year);
};

export const searchImages = (query: string): GalleryImage[] => {
  const lowerQuery = query.toLowerCase();
  return GALLERY_IMAGES.filter(
    (img) =>
      img.title.toLowerCase().includes(lowerQuery) ||
      img.description?.toLowerCase().includes(lowerQuery) ||
      img.artist.toLowerCase().includes(lowerQuery) ||
      img.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      img.style.some((style) => style.toLowerCase().includes(lowerQuery)),
  );
};

export default GALLERY_IMAGES;
