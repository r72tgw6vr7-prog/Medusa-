export interface GalleryImage {
  id: string;
  src: string;
  srcset: {
    [key: string]: string;
  };
  alt: string;
  category: 'tattoo' | 'piercing' | 'portraits' | 'other';
  artist?: string;
  title?: string;
  style?: string;
  date?: string;
  featured?: boolean;
  fileSize?: number;
  lastModified?: string;
}

// Helper function to generate srcSet string from srcset object
export const generateSrcSet = (srcset: { [key: string]: string }): string => {
  return Object.entries(srcset)
    .map(([size, url]) => `${url} ${size}`)
    .join(', ');
};

// Stats for gallery overview
interface GalleryStats {
  totalImages: number;
  featured: number;
  byArtist: Record<string, number>;
  byCategory: Record<string, number>;
  totalSize: number;
}

// Generate statistics from gallery data
export const getStats = (): GalleryStats => {
  // This is a stub implementation until the real data is available
  return {
    totalImages: 147,
    featured: 24,
    byArtist: {
      'Sophia': 42,
      'Marcus': 38,
      'Elena': 32,
      'David': 21,
      'Guest': 14
    },
    byCategory: {
      'tattoo': 98,
      'piercing': 27,
      'portraits': 12,
      'other': 10
    },
    totalSize: 187654321 // Approx 188MB
  };
};