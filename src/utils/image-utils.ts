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
  target.src = '/assets/images/icons/placeholder.svg';

  // Log the error for debugging
  console.warn('Image failed to load:', originalSrc);

  // Add error class for styling
  target.classList.add('image-error');
};

export const safeImageSrc = (src?: string | null) => {
  if (!src || src === '' || src === 'undefined' || src === 'null') {
    return '/assets/images/icons/placeholder.svg';
  }
  return encodeURI(src);
};

// Check if image source is a placeholder
export const isPlaceholderImage = (src: string) => {
  return src.includes('placeholder') || src === '/assets/images/icons/placeholder.svg';
};

interface ResponsiveImageConfig {
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

// Get optimized image props for React components
export const getImageProps = (src?: string, alt?: string, config: ResponsiveImageConfig = {}) => {
  const {
    sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    priority = false,
    quality: _quality = 85,
  } = config;

  // For studio images, use optimized AVIF/WebP variants
  if (src?.includes('/studio/')) {
    const filename = src.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp)$/i, '') || '';
    const optimizedBase = encodeURI(
      src.replace(
      /\/[^\/]+\.(jpg|jpeg|png|webp)$/i,
      `/optimized/${filename}`,
      ),
    );

    // Generate AVIF srcset (best compression)
    const avifSrcSet = [
      `${optimizedBase}-640w.avif 640w`,
      `${optimizedBase}-1024w.avif 1024w`,
      `${optimizedBase}-1920w.avif 1920w`,
      `${optimizedBase}-2560w.avif 2560w`,
    ].join(', ');

    // Generate WebP srcset (fallback)
    const webpSrcSet = [
      `${optimizedBase}-640w.webp 640w`,
      `${optimizedBase}-1024w.webp 1024w`,
      `${optimizedBase}-1920w.webp 1920w`,
      `${optimizedBase}-2560w.webp 2560w`,
    ].join(', ');

    return {
      // Return data for <picture> element rendering
      avifSrcSet,
      webpSrcSet,
      src: safeImageSrc(src),
      alt: alt || 'Image',
      sizes,
      onError: handleImageError,
      'data-original-src': src,
      loading: priority ? ('eager' as const) : ('lazy' as const),
      decoding: priority ? ('sync' as const) : ('async' as const),
      fetchPriority: priority ? ('high' as const) : ('auto' as const),
    };
  }

  // Get base path and extension for other images
  const basePath = src ? encodeURI(src.replace(/\.(jpg|jpeg|png|webp)$/i, '')) : '';
  const ext = src?.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '.webp';

  // Generate srcset for WebP and original format (conservative approach)
  const srcSet = src
    ? [`${basePath}@400w${ext} 400w`, `${basePath}@800w${ext} 800w`].join(', ')
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
    fetchPriority: priority ? ('high' as const) : ('auto' as const),
  };
};
