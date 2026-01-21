/**
 * GALLERY IMAGES - Single Source of Truth
 * 
 * All gallery images for Medusa Tattoo München
 * Used by: HeroParallax (hero section) and GallerySection (homepage preview)
 * 
 * Images are optimized via scripts/optimize-gallery-images.mjs
 * Original sources: public/assets/images/photos/gallery/tattoo/
 * Optimized outputs: public/assets/images/photos/gallery/optimized/
 */

export interface GalleryImage {
  id: string;
  alt: string;
  src: string; // Original source path
  optimizedSrc: string; // Base path for optimized versions (without size suffix)
  title: string;
  category: string;
  priority?: boolean; // Only for hero images (above the fold)
  width: number; // Original dimensions for aspect ratio
  height: number;
}

/**
 * Main gallery images array
 * First 3 images are used in the hero section
 * All images are shown in the gallery section preview
 */
export const GALLERY_IMAGES: GalleryImage[] = [
  // === HERO IMAGES (priority: true) ===
  {
    id: 'biomechanic',
    alt: 'Biomechanischer Tattoo-Stil mit detaillierten mechanischen Elementen',
    src: '/assets/images/photos/gallery/tattoo/Biomechanic.jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/Biomechanic',
    title: 'Biomechanik',
    category: 'Biomechanical',
    priority: true,
    width: 1200,
    height: 1600,
  },
  {
    id: 'blackwork',
    alt: 'Blackwork Tattoo mit kräftigen schwarzen Linien und Schattierungen',
    src: '/assets/images/photos/gallery/tattoo/Blackwork.jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/Blackwork',
    title: 'Blackwork',
    category: 'Blackwork',
    priority: true,
    width: 1200,
    height: 1600,
  },
  {
    id: 'maori',
    alt: 'Traditionelles Maori Tattoo mit authentischen polynesischen Mustern',
    src: '/assets/images/photos/gallery/tattoo/Maori.jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/Maori',
    title: 'Maori',
    category: 'Tribal',
    priority: true,
    width: 1200,
    height: 1600,
  },

  // === GALLERY IMAGES ===
  {
    id: 'anime-blackgrey',
    alt: 'Anime-inspiriertes Tattoo in Black & Grey Stil',
    src: '/assets/images/photos/gallery/tattoo/Anime Black&Grey 7_10.jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/Anime Black&Grey 7_10',
    title: 'Anime Black & Grey',
    category: 'Anime',
    width: 1200,
    height: 1600,
  },
  {
    id: 'oldschool',
    alt: 'Klassisches Old School Tattoo mit traditionellen Motiven',
    src: '/assets/images/photos/gallery/tattoo/Oldschool(2).jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/Oldschool(2)',
    title: 'Old School',
    category: 'Traditional',
    width: 1200,
    height: 1600,
  },
  {
    id: 'dragon',
    alt: 'Detailliertes Drachen-Tattoo von Raphael Bannert',
    src: '/assets/images/photos/gallery/tattoo/Raphael Bannert Dragon.jpg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/Raphael Bannert Dragon',
    title: 'Dragon',
    category: 'Japanese',
    width: 1200,
    height: 1600,
  },
  {
    id: 'symmetric-linework',
    alt: 'Symmetrisches Linework Tattoo mit präzisen geometrischen Linien',
    src: '/assets/images/photos/gallery/tattoo/Symetric Linework .jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/Symetric Linework ',
    title: 'Symmetrisches Linework',
    category: 'Geometric',
    width: 1200,
    height: 1600,
  },
  {
    id: 'tattoo-1',
    alt: 'Professionelles Tattoo-Kunstwerk aus unserem Studio',
    src: '/assets/images/photos/gallery/tattoo/26E068EC-3DDD-46AA-B8CA-397CF13D80FA.jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/26E068EC-3DDD-46AA-B8CA-397CF13D80FA',
    title: 'Studio Artwork',
    category: 'Custom',
    width: 1200,
    height: 1600,
  },
  {
    id: 'tattoo-2',
    alt: 'Kundenspezifisches Tattoo-Design',
    src: '/assets/images/photos/gallery/tattoo/2B27BC8A-CB81-4F11-AEFE-9B7B1EC02049_1_105_c.jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/2B27BC8A-CB81-4F11-AEFE-9B7B1EC02049_1_105_c',
    title: 'Custom Design',
    category: 'Custom',
    width: 1200,
    height: 1600,
  },
  {
    id: 'tattoo-3',
    alt: 'Einzigartiges Tattoo mit individueller Gestaltung',
    src: '/assets/images/photos/gallery/tattoo/334E3517-4AB5-4F09-9D53-69FAB6F16F56.jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/334E3517-4AB5-4F09-9D53-69FAB6F16F56',
    title: 'Unique Design',
    category: 'Custom',
    width: 1200,
    height: 1600,
  },
  {
    id: 'tattoo-4',
    alt: 'Detailliertes Tattoo-Kunstwerk',
    src: '/assets/images/photos/gallery/tattoo/3BEB3413-F5A0-427D-AF50-0397FD1C996C.jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/3BEB3413-F5A0-427D-AF50-0397FD1C996C',
    title: 'Detailed Artwork',
    category: 'Custom',
    width: 1200,
    height: 1600,
  },
  {
    id: 'tattoo-5',
    alt: 'Professionelle Tattoo-Arbeit aus München',
    src: '/assets/images/photos/gallery/tattoo/A9FECE5E-D7FB-4FAF-98B1-DEB516259BF4.jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/A9FECE5E-D7FB-4FAF-98B1-DEB516259BF4',
    title: 'Professional Work',
    category: 'Custom',
    width: 1200,
    height: 1600,
  },
  {
    id: 'tattoo-6',
    alt: 'Hochwertiges Tattoo-Design',
    src: '/assets/images/photos/gallery/tattoo/AEBBE7A1-6538-4223-8B35-5E399107E44A.jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/AEBBE7A1-6538-4223-8B35-5E399107E44A',
    title: 'Premium Design',
    category: 'Custom',
    width: 1200,
    height: 1600,
  },
  {
    id: 'tattoo-7',
    alt: 'Künstlerisches Tattoo-Design mit feinen Details',
    src: '/assets/images/photos/gallery/tattoo/C4BA9901-D2B7-4DFC-8D87-19D223340B29_1_201_a.jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/C4BA9901-D2B7-4DFC-8D87-19D223340B29_1_201_a',
    title: 'Artistic Design',
    category: 'Custom',
    width: 1200,
    height: 1600,
  },
  {
    id: 'tattoo-8',
    alt: 'Exklusives Tattoo-Kunstwerk aus München',
    src: '/assets/images/photos/gallery/tattoo/DD3C77C8-504D-4FCF-AF11-11AEFA767736_1_105_c.jpeg',
    optimizedSrc: '/assets/images/photos/gallery/optimized/DD3C77C8-504D-4FCF-AF11-11AEFA767736_1_105_c',
    title: 'Exclusive Artwork',
    category: 'Custom',
    width: 1200,
    height: 1600,
  },
];

/**
 * Helper functions
 */

export const getHeroImages = (): GalleryImage[] => {
  return GALLERY_IMAGES.filter((img) => img.priority === true);
};

export const getGalleryPreviewImages = (limit = 8): GalleryImage[] => {
  return GALLERY_IMAGES.slice(0, limit);
};

export const getImageById = (id: string): GalleryImage | undefined => {
  return GALLERY_IMAGES.find((img) => img.id === id);
};

/**
 * Generate srcset for responsive images
 * @param optimizedSrc Base path without size suffix
 * @param format 'avif' or 'webp'
 * @param sizes Array of widths (e.g., [400, 640, 960])
 */
export const generateSrcSet = (
  optimizedSrc: string,
  format: 'avif' | 'webp',
  sizes: number[] = [400, 640, 960]
): string => {
  const encodedBase = encodeURI(optimizedSrc);
  return sizes.map((size) => `${encodedBase}-${size}w.${format} ${size}w`).join(', ');
};

/**
 * Generate picture element sources for a gallery image
 */
export const getImageSources = (image: GalleryImage, sizes: string = '(max-width: 768px) 100vw, 50vw') => {
  return {
    avifSrcSet: generateSrcSet(image.optimizedSrc, 'avif'),
    webpSrcSet: generateSrcSet(image.optimizedSrc, 'webp'),
    fallbackSrc: image.src,
    sizes,
    alt: image.alt,
    width: image.width,
    height: image.height,
    loading: image.priority ? 'eager' : ('lazy' as const),
  };
};

export default GALLERY_IMAGES;
