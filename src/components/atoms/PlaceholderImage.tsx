interface PlaceholderImageProps {
  className?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
  size?: 'sm' | 'md' | 'lg' | 'full';
  variant?: 'default' | 'gold' | 'dark';
  loading?: boolean;
  alt?: string;
}

export function PlaceholderImage({
  className = '',
  aspectRatio = 'landscape',
  size = 'full',
  variant = 'default',
  loading = false,
  alt = 'Placeholder image',
}: PlaceholderImageProps) {
  const variantClass = {
    default: 'placeholder-gradient',
    gold: 'placeholder-gradient-gold',
    dark: 'placeholder-gradient-dark',
  }[variant];

  return (
    <div
      role='img'
      aria-label={alt}
      className={`
        placeholder-image
        placeholder-${aspectRatio}
        placeholder-${size}
        ${variantClass}
        ${loading ? 'placeholder-loading' : ''}
        ${className}
      `}
    />
  );
}
