/**
 * Gallery Manifest Loader
 *
 * Loads gallery images from optimized manifest.json
 * Falls back to gallery-index.json if manifest doesn't exist
 */

export interface GalleryImageVariant {
  width: number;
  format: 'webp' | 'jpeg';
  filename: string;
  url: string;
  size: number;
}

export interface GalleryManifestImage {
  id: string;
  original: string;
  title: string;
  category: 'tattoo' | 'piercing' | 'portraits';
  width: number;
  height: number;
  aspectRatio: string;
  variants: GalleryImageVariant[];
  loading: 'eager' | 'lazy';
  priority: boolean;
  src: string;
  alt: string;
  artist: string;
  style: string;
  date: string;
  featured: boolean;
}

export interface GalleryManifest {
  version: string;
  generatedAt: string;
  stats: {
    totalImages: number;
    totalVariants: number;
    totalSize: number;
    byCategory: Record<string, number>;
  };
  images: GalleryManifestImage[];
}

/**
 * Load gallery manifest from public/gallery/manifest.json
 */
export async function loadGalleryManifest(): Promise<GalleryManifest | null> {
  try {
    const response = await fetch('/gallery/manifest.json');
    if (!response.ok) {
      console.warn('Gallery manifest not found, using fallback');
      return null;
    }
    const manifest = await response.json();
    return manifest;
  } catch (error) {
    console.error('Error loading gallery manifest:', error);
    return null;
  }
}

/**
 * Get srcSet string for responsive images
 */
export function getSrcSet(variants: GalleryImageVariant[]): string {
  return variants
    .filter((v) => v.format === 'webp')
    .map((v) => `${v.url} ${v.width}w`)
    .join(', ');
}

/**
 * Get optimal image URL for given viewport width
 */
export function getOptimalImageUrl(
  variants: GalleryImageVariant[],
  viewportWidth: number = 800,
): string {
  // Find WebP variant closest to viewport width
  const webpVariants = variants
    .filter((v) => v.format === 'webp')
    .sort((a, b) => a.width - b.width);

  for (const variant of webpVariants) {
    if (variant.width >= viewportWidth) {
      return variant.url;
    }
  }

  // Return largest if none match
  return webpVariants[webpVariants.length - 1]?.url || variants[0]?.url;
}
