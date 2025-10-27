import { Artist } from '../types/artist';

type ImageVariant = 'thumbnail' | 'gallery' | 'hero' | 'avatar';

export const getImageAlt = ({
  artistName,
  type = 'tattoo',
  variant = 'gallery',
  index = 0,
}: {
  artistName: string;
  type?: 'tattoo' | 'piercing' | 'aftercare' | 'artist';
  variant?: ImageVariant;
  index?: number;
}): string => {
  const typeMap = {
    tattoo: 'Tattoo',
    piercing: 'Piercing',
    aftercare: 'Aftercare',
    artist: 'Artist',
  };

  const variantMap: Record<ImageVariant, string> = {
    thumbnail: 'thumbnail',
    gallery: 'gallery image',
    hero: 'hero image',
    avatar: 'profile picture',
  };

  const typeText = typeMap[type] || 'Image';
  const variantText = variantMap[variant] || '';
  const positionText = index > 0 ? ` #${index + 1}` : '';

  return `${artistName}'s ${typeText} ${variantText}${positionText}`.trim();
};

export const getArtistImageAlt = (
  artist: Pick<Artist, 'name' | 'specialty'>,
  variant: ImageVariant = 'gallery',
) => {
  return getImageAlt({
    artistName: artist.name,
    type: artist.specialty.toLowerCase() as 'tattoo' | 'piercing',
    variant,
  });
};

export const getPortfolioImageAlt = (
  artist: Pick<Artist, 'name' | 'specialty'>,
  index: number,
  variant: ImageVariant = 'gallery',
) => {
  return getImageAlt({
    artistName: artist.name,
    type: artist.specialty.toLowerCase() as 'tattoo' | 'piercing',
    variant,
    index,
  });
};

// Image error handling and safe utilities
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.currentTarget;
  const originalSrc = target.dataset.originalSrc || target.src;

  // Set placeholder image
  target.src = '/images/placeholder.svg';

  // Log the error for debugging
  console.warn('Image failed to load:', originalSrc);

  // Add error class for styling
  target.classList.add('image-error');
};

export const safeImageSrc = (src?: string | null) => {
  if (!src || src === '' || src === 'undefined' || src === 'null') {
    return '/images/placeholder.svg';
  }
  return src;
};

// Check if image source is a placeholder
export const isPlaceholderImage = (src: string) => {
  return src.includes('placeholder') || src === '/images/placeholder.svg';
};

interface ResponsiveImageConfig {
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

// Get optimized image props for React components
export const getImageProps = (src?: string, alt?: string, config: ResponsiveImageConfig = {}) => {
  const {
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    priority = false,
    quality = 85,
  } = config;

  // Get base path and extension
  const basePath = src ? src.replace(/\.(jpg|jpeg|png|webp)$/i, '') : '';
  const ext = src?.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '.webp';

  // Generate srcset for WebP and original format
  const srcSet = src
    ? [
        `${basePath}@400w${ext} 400w`,
        `${basePath}@800w${ext} 800w`,
        `${basePath}@1200w${ext} 1200w`,
        `${basePath}@2400w${ext} 2400w`,
      ].join(', ')
    : undefined;

  return {
    src: safeImageSrc(src),
    alt: alt || 'Image',
    srcSet,
    sizes,
    onError: handleImageError,
    'data-original-src': src,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    decoding: priority ? ('sync' as const) : ('async' as const),
    fetchpriority: priority ? ('high' as const) : ('auto' as const),
  };
};
