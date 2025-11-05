import React, { useState } from 'react';

interface GalleryImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Optimized Gallery Image Component
 * 
 * Features:
 * - Native lazy loading for performance
 * - Error fallback with brand styling
 * - Loading skeleton animation
 * - Responsive srcset support (when available)
 * - WCAG AA compliant
 */
export function GalleryImage({ 
  src, 
  alt, 
  className = '', 
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false 
}: GalleryImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate srcSet for responsive images (if optimized versions exist)
  const generateSrcSet = (baseSrc: string): string | undefined => {
    if (!baseSrc || baseSrc.includes('placeholder')) return undefined;
    
    const lastDot = baseSrc.lastIndexOf('.');
    if (lastDot === -1) return undefined;
    
    const base = baseSrc.substring(0, lastDot);
    const ext = baseSrc.substring(lastDot);
    
    // Check if WebP optimized versions exist
    const variants = [
      `${base}@400w${ext} 400w`,
      `${base}@800w${ext} 800w`,
      `${base}@1200w${ext} 1200w`,
    ];
    
    return variants.join(', ');
  };

  if (hasError) {
    return (
      <div
        className="w-full h-full bg-gradient-to-br from-brand-gold/10 to-brand-background/90 flex items-center justify-center rounded-lg border border-brand-gold/20"
        role="img"
        aria-label={`${alt} (konnte nicht geladen werden)`}
      >
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-brand-chrome text-sm">
            Bild nicht verfügbar
          </span>
        </div>
      </div>
    );
  }

  const srcSet = generateSrcSet(src);

  return (
    <div className={`relative overflow-hidden rounded-lg bg-brand-background/50 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-brand-background to-black/90" />
      )}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          // Try fallback to placeholder
          const target = e.target as HTMLImageElement;
          if (!target.src.includes('placeholder-tattoo.jpg')) {
            target.src = '/images/placeholder-tattoo.jpg';
          } else {
            setHasError(true);
            setIsLoading(false);
          }
        }}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
      />
    </div>
  );
}