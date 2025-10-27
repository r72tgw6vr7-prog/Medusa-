import React from 'react';
import { SafeImage } from './SafeImage';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * ResponsiveImage - Serves optimal image size per device
 * Automatically generates srcset for different screen sizes
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  fallback,
  loading = 'lazy',
}) => {
  // Generate srcset from base image path
  const basePath = src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const ext = src.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '.webp';

  const srcset = `
    ${basePath}@400w${ext} 400w,
    ${basePath}@800w${ext} 800w,
    ${basePath}@1200w${ext} 1200w,
    ${basePath}@2400w${ext} 2400w
  `;

  return (
    <SafeImage
      src={src}
      srcSet={srcset}
      sizes={sizes}
      alt={alt}
      className={className}
      fallback={fallback}
      loading={loading}
    />
  );
};
