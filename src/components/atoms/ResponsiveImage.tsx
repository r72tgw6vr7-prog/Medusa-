import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  widths?: number[];
  useModernFormats?: boolean;
}

/**
 * ResponsiveImage - Serves optimal image size per device with modern format support
 * Automatically generates srcset for different screen sizes
 * Uses <picture> element for AVIF/WebP with fallback
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  widths = [640, 1024, 1920, 2560],
  useModernFormats = true,
}) => {
  // Extract base path and extension
  const basePath = src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  const originalExt = src.match(/\.(jpg|jpeg|png|webp|avif)$/i)?.[0] || '.webp';
  
  // Check if image is in optimized directory
  const isOptimized = src.includes('/optimized/');
  
  // Generate srcset for a specific format
  const generateSrcSet = (format: string) => {
    return widths
      .map((width) => {
        if (isOptimized) {
          // Use optimized responsive images
          const fileName = basePath.split('/').pop();
          const dir = basePath.substring(0, basePath.lastIndexOf('/'));
          return `${dir}/${fileName}-${width}w.${format} ${width}w`;
        }
        // Fallback to original naming convention
        return `${basePath}@${width}w.${format} ${width}w`;
      })
      .join(', ');
  };

  // If modern formats are not enabled or not optimized, use simple img
  if (!useModernFormats || !isOptimized) {
    const srcset = widths
      .map((width) => `${basePath}@${width}w${originalExt} ${width}w`)
      .join(', ');

    return (
      <img
        src={src}
        srcSet={srcset}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    );
  }

  // Use <picture> element for modern formats with fallback
  return (
    <picture>
      {/* AVIF - Best compression, newest format */}
      <source
        type="image/avif"
        srcSet={generateSrcSet('avif')}
        sizes={sizes}
      />
      
      {/* WebP - Good compression, wide support */}
      <source
        type="image/webp"
        srcSet={generateSrcSet('webp')}
        sizes={sizes}
      />
      
      {/* Fallback for older browsers */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  );
};
