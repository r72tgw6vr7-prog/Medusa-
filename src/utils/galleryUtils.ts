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