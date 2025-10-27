/**
 * ImageWithFallback Component
 *
 * A resilient image component that gracefully handles loading and error states.
 * This component follows the atomic design pattern and uses the Medusa design system.
 *
 * Features:
 * - Displays a loading state while the image is loading
 * - Handles image loading errors with a branded fallback
 * - Supports custom fallback images
 * - Includes proper accessibility attributes
 * - Uses design system tokens for styling
 */

import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

// Error fallback is a gold-colored broken image icon
const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjRDRBRjM3IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Primary image source URL */
  src: string;

  /** Alternative text for accessibility */
  alt: string;

  /** Optional fallback image to display if primary image fails to load */
  fallback: string;

  /** Additional CSS classes */
  className?: string;

  /** Image loading strategy */
  loading?: 'lazy' | 'eager';

  /** Callback function when image successfully loads */
  onLoad?: () => void;

  /** Callback function when image fails to load */
  onError?: () => void;

  /** Object fit property for the image */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

  /** Source set for responsive images */
  srcSet?: string;

  /** Sizes attribute for responsive images */
  sizes?: string;

  /** Whether to show loading state */
  showLoading?: boolean;

  /** Whether to display error notification */
  showErrorNotification?: boolean;

  /** Custom loading component */
  loadingComponent?: React.ReactNode;
}

export function ImageWithFallback({
  src,
  alt,
  fallback = '/images/fallback-background.jpg',
  showLoading = true,
  showErrorNotification = false,
  className = '',
  style,
  width,
  height,
  loadingComponent,
  onError,
  onLoad,
  objectFit = 'cover',
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Reset state when source changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    setHasError(true);

    // If fallback is provided, try to use it
    if (fallback && imgSrc !== fallback) {
      setImgSrc(fallback);
    } else if (imgSrc !== ERROR_IMG_SRC) {
      // If fallback also fails, use error SVG
      setImgSrc(ERROR_IMG_SRC);
    }

    // Call optional onError callback
    if (onError) onError();
  };

  const handleLoad = () => {
    setIsLoading(false);

    // Call optional onLoad callback
    if (onLoad) onLoad();
  };

  // Calculate container style properties
  const containerStyle = {
    width: width ?? 'auto',
    height: height ?? 'auto',
    ...style,
  };

  return (
    <div
      className={`relative inline-block overflow-hidden rounded-lg ${className}`}
      style={containerStyle}
      data-testid='image-container'
    >
      {/* Loading State */}
      {isLoading && showLoading && (
        <div
          className='absolute inset-0 flex items-center justify-center bg-brand-background animate-pulse'
          data-testid='image-loading-state'
        >
          {loadingComponent || (
            <div className='w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin' />
          )}
        </div>
      )}

      {/* Actual Image */}
      <img
        src={imgSrc}
        alt={alt}
        className={`w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ objectFit }}
        onError={handleError}
        onLoad={handleLoad}
        loading={rest.loading || 'lazy'}
        decoding={(rest as any).decoding || 'async'}
        aria-live='polite'
        role='img'
        {...rest}
      />

      {/* Error Notification */}
      {hasError && showErrorNotification && (
        <div
          className='absolute top-2 right-2 bg-brand-background/80 text-brand-gold px-0 py-0 text-xs rounded-md backdrop-blur-sm border border-border-default flex items-center gap-0'
          aria-hidden='true'
          data-testid='image-fallback'
        >
          <AlertCircle size={12} />
          <span>Failed to load</span>
        </div>
      )}
    </div>
  );
}
