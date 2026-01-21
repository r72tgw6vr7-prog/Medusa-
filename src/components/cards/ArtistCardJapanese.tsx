import React from 'react';

/**
 * ArtistCardJapanese - Japanese aesthetic-inspired artist card
 * 
 * Design principles applied:
 * - Ma (間): Intentional negative space using ma-* spacing tokens
 * - Bokashi (暈し): Gradient overlays for atmospheric depth
 * - Wabi-sabi (侘寂): Subtle irregular border-radius for organic feel
 * - Kasane-no-irome (襲の色目): Layered semi-transparent elements
 * 
 * IMPORTANT: All Tailwind classes are static strings - no dynamic construction.
 * This ensures Tailwind v4 CSS generation works reliably.
 */

interface ArtistRole {
  name: string;
  icon: string;
}

interface ArtistCardJapaneseProps {
  name: string;
  role: ArtistRole;
  specialties: string[];
  experience: string;
  instagramHandle: string;
  imageUrl: string;
  className?: string;
  onClick?: () => void;
  onBookClick?: () => void;
  onGalleryClick?: () => void;
  bookHref?: string;
  galleryHref?: string;
  imagePosition?: string;
  isSelected?: boolean;
  variant?: 'light' | 'dark';
}

// Static variant classes map - NO dynamic class construction
const variantClasses = {
  light: {
    card: 'bg-luxury-bg-surface border-luxury-border-subtle',
    text: {
      primary: 'text-luxury-text-primary',
      secondary: 'text-luxury-text-secondary',
      tertiary: 'text-luxury-text-tertiary',
    },
    badge: 'bg-luxury-bg-base text-luxury-text-primary border-luxury-border-light',
    button: {
      primary: 'bg-luxury-bg-dark text-luxury-text-inverse hover:bg-luxury-bg-dark-hover',
      secondary: 'bg-luxury-bg-base text-luxury-text-primary border-luxury-border-medium hover:bg-luxury-bg-elevated',
    },
    focus: 'focus-visible:ring-2 focus-visible:ring-luxury-accent-chrome-safe focus-visible:ring-offset-2',
  },
  dark: {
    card: 'bg-luxury-bg-dark-elevated border-luxury-border-on-dark',
    text: {
      primary: 'text-luxury-text-inverse',
      secondary: 'text-luxury-text-inverse-muted',
      tertiary: 'text-luxury-text-inverse-muted',
    },
    badge: 'bg-luxury-bg-dark text-luxury-text-inverse border-luxury-border-chrome',
    button: {
      primary: 'bg-luxury-accent-chrome text-luxury-text-primary hover:bg-luxury-accent-chrome-hover',
      secondary: 'bg-transparent text-luxury-text-inverse border-luxury-border-chrome hover:bg-luxury-bg-dark-hover',
    },
    focus: 'focus-visible:ring-2 focus-visible:ring-luxury-accent-chrome focus-visible:ring-offset-2 focus-visible:ring-offset-luxury-bg-dark',
  },
} as const;

export const ArtistCardJapanese: React.FC<ArtistCardJapaneseProps> = ({
  name,
  role,
  specialties,
  experience,
  instagramHandle,
  imageUrl,
  className = '',
  onClick,
  onBookClick,
  onGalleryClick,
  bookHref,
  galleryHref,
  imagePosition = 'center',
  isSelected = false,
  variant = 'light',
}) => {
  const styles = variantClasses[variant];
  
  const hasBookCta = Boolean(onBookClick) || Boolean(bookHref);
  const hasGalleryCta = Boolean(onGalleryClick) || Boolean(galleryHref);
  
  const descriptors = [
    name,
    role?.name,
    hasBookCta ? 'Buchung verfügbar' : null,
    hasGalleryCta ? 'Galerie verfügbar' : null,
  ].filter(Boolean) as string[];
  const cardAriaLabel = descriptors.join(' – ');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  // Card root element - semantic, accessible
  const CardWrapper = onClick ? 'button' : 'article';
  
  return (
    <div className={`group relative ${className}`} data-card="japanese-v1">
      {/* DEBUG: Visible badge to prove this component is rendering */}
      <div className="absolute top-2 left-2 z-50 bg-red-500 text-luxury-text-inverse text-sm lg:text-xs px-2 py-1 rounded font-bold">
        JAPANESE V1
      </div>
      
      {/* Card container with wabi-sabi irregular radius */}
      <CardWrapper
        onClick={onClick}
        onKeyDown={onClick ? handleKeyDown : undefined}
        aria-label={cardAriaLabel}
        className={`
          relative w-full overflow-hidden rounded-md
          border shadow-luxury
          transition-all duration-300
          hover:shadow-luxury-lg
          ${styles.card}
          ${styles.focus}
          ${onClick ? 'cursor-pointer' : ''}
        `}
        style={{
          // Wabi-sabi: subtle irregular border-radius
          borderRadius: '6px 8px 7px 9px',
        }}
      >
        {/* Image container with bokashi gradient overlay */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: imagePosition }}
          />
          
          {/* Bokashi gradient overlay - bottom fade */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(10, 10, 10, 0.85) 0%, rgba(10, 10, 10, 0.4) 40%, transparent 70%)',
            }}
          />
          
          {/* Kasane-no-irome: layered semi-transparent element at top */}
          <div 
            className="absolute inset-x-0 top-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.3) 0%, transparent 100%)',
            }}
          />

          {/* Selection checkmark - visible when selected */}
          {isSelected && (
            <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-luxury-accent-chrome flex items-center justify-center shadow-chrome-glow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-luxury-text-primary"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}

          {/* Content overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 p-ma-xs">
            {/* Chrome accent divider - ma spacing above */}
            <div className="mb-3 h-px w-12 bg-luxury-accent-chrome opacity-60" />
            
            {/* Artist name */}
            <h3 className="text-xl font-light tracking-tight text-luxury-text-inverse mb-1">
              {name}
            </h3>

            {/* Role badge with chrome accent */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-luxury-accent-chrome" />
              <span className="text-sm font-light text-luxury-text-inverse-muted">
                {role?.name}
              </span>
            </div>

            {/* Specialties - with ma-xs vertical spacing */}
            <p className="text-sm lg:text-xs font-light text-luxury-text-inverse-muted mb-3 line-clamp-2">
              {specialties.join(' • ')}
            </p>

            {/* Experience and Instagram row */}
            <div className="flex items-center justify-between text-sm lg:text-xs text-luxury-text-inverse-muted">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {experience}
              </span>
              <a
                href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-luxury-accent-chrome hover:text-luxury-accent-chrome-hover transition-colors focus-visible:ring-2 focus-visible:ring-luxury-accent-chrome focus-visible:ring-offset-1 focus-visible:ring-offset-luxury-bg-dark rounded"
              >
                {instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </CardWrapper>

      {/* Action buttons - outside card for proper accessibility */}
      {(hasBookCta || hasGalleryCta) && (
        <div className="flex gap-2 mt-3">
          {bookHref ? (
            <a
              href={bookHref}
              className="flex-1 py-2.5 px-4 text-center text-sm font-medium rounded-md bg-luxury-bg-dark text-luxury-text-inverse hover:bg-luxury-bg-dark-hover transition-colors focus-visible:ring-2 focus-visible:ring-luxury-accent-chrome-safe focus-visible:ring-offset-2"
              aria-label={`Jetzt Buchen mit ${name}`}
            >
              Jetzt Buchen
            </a>
          ) : onBookClick ? (
            <button
              onClick={onBookClick}
              className="flex-1 py-2.5 px-4 text-sm font-medium rounded-md bg-luxury-bg-dark text-luxury-text-inverse hover:bg-luxury-bg-dark-hover transition-colors focus-visible:ring-2 focus-visible:ring-luxury-accent-chrome-safe focus-visible:ring-offset-2"
              aria-label={`Jetzt Buchen mit ${name}`}
            >
              Jetzt Buchen
            </button>
          ) : null}
          
          {galleryHref ? (
            <a
              href={galleryHref}
              className="flex-1 py-2.5 px-4 text-center text-sm font-medium rounded-md bg-luxury-bg-base text-luxury-text-primary border border-luxury-border-medium hover:bg-luxury-bg-elevated transition-colors focus-visible:ring-2 focus-visible:ring-luxury-accent-chrome-safe focus-visible:ring-offset-2"
              aria-label={`${name} Galerie ansehen`}
            >
              Galerie
            </a>
          ) : onGalleryClick ? (
            <button
              onClick={onGalleryClick}
              className="flex-1 py-2.5 px-4 text-sm font-medium rounded-md bg-luxury-bg-base text-luxury-text-primary border border-luxury-border-medium hover:bg-luxury-bg-elevated transition-colors focus-visible:ring-2 focus-visible:ring-luxury-accent-chrome-safe focus-visible:ring-offset-2"
              aria-label={`${name} Galerie ansehen`}
            >
              Galerie
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ArtistCardJapanese;
