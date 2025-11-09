import React from 'react';
import './ArtistCard.css';

interface ArtistRole {
  name: string;
  icon: string;
}

interface ArtistProps {
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
}

export const ArtistCard: React.FC<ArtistProps> = ({
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
}) => {
  const hasBookCta = Boolean(onBookClick);
  const hasGalleryCta = Boolean(onGalleryClick);
  const descriptors = [
    name,
    role?.name,
    hasBookCta ? 'Buchung verfügbar' : null,
    hasGalleryCta ? 'Galerie verfügbar' : null,
  ].filter(Boolean) as string[];
  const cardAriaLabel = descriptors.join(' – ');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  const interactiveProps: React.HTMLAttributes<HTMLDivElement> = onClick
    ? {
        onClick,
        onKeyDown: handleKeyDown,
        role: 'button',
        tabIndex: 0,
      }
    : {};

  return (
    <div className={`artist-card-wrap ${className}`}>
      <div className='artist-card' aria-label={cardAriaLabel} {...interactiveProps}>
        <img
          src={imageUrl}
          alt={name}
          className='artist-card-image'
          style={{
            objectPosition: imagePosition,
          }}
        />
        <div className='artist-card-overlay' />

        {/* Artist name badge at top */}
        <div className='artist-card-name-top'>
          <span className='inline-block px-8 py-0 bg-black/40 backdrop-blur-sm rounded-md text-white text-sm font-medium border border-brand-gold/20'>
            {name}
          </span>
        </div>

        {/* Selection checkmark */}
        {isSelected && (
          <div className='absolute top-8 right-8 z-4 w-24 h-24 bg-brand-gold rounded-full flex items-center justify-center shadow-gold-glow'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-black'
            >
              <polyline points='20 6 9 17 4 12' />
            </svg>
          </div>
        )}

        {/* Bottom content */}
        <div className='artist-card-content'>
          {/* Role badge positioned above specialties */}
          <div className='team-role-badge'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='icon'
            >
              <path d='M12 19l7-7 3 3-7 7-3-3z'></path>
              <path d='M18 13l-3-3'></path>
              <path d='M2 22l4-1 7-7-3-3-7 7-1 4z'></path>
            </svg>
            {role?.name}
          </div>
          <div className='artist-card-specialties'>{specialties.join(' • ')}</div>

          <div className='artist-card-bottom-info'>
            <div className='artist-card-experience'>
              <span className='icon'>⏱</span>
              <span>{experience}</span>
            </div>
            <div className='artist-card-social'>
              <a
                href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {instagramHandle}
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='artist-card-actions'>
            {bookHref ? (
              <a
                href={bookHref}
                className='artist-card-button artist-card-button-primary'
                aria-label={`Jetzt Buchen mit ${name}`}
              >
                Jetzt Buchen
              </a>
            ) : (
              onBookClick && (
                <button
                  onClick={onBookClick}
                  className='artist-card-button artist-card-button-primary'
                >
                  Jetzt Buchen
                </button>
              )
            )}
            {galleryHref ? (
              <a
                href={galleryHref}
                className='artist-card-button artist-card-button-secondary'
                aria-label={`${name} Galerie ansehen`}
              >
                Galerie Ansehen
              </a>
            ) : (
              onGalleryClick && (
                <button
                  onClick={onGalleryClick}
                  className='artist-card-button artist-card-button-secondary'
                >
                  Galerie Ansehen
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
