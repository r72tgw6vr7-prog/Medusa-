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
  imagePosition?: string;
  isSelected?: boolean;
}

export const ArtistCard: React.FC<ArtistProps> = ({
  name,
  role,
  specialties: _specialties,
  experience: _experience,
  instagramHandle: _instagramHandle,
  imageUrl,
  className = '',
  onClick,
  onBookClick,
  onGalleryClick,
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
    if (!onClick) {
      return;
    }
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
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-[21px] border border-solid ${
        isSelected
          ? 'border-brand-gold shadow-gold-glow ring-2 ring-brand-gold/50'
          : 'border-[#C0BFBF33]'
      } bg-black/40 ${className} ${onClick ? 'cursor-pointer hover:border-brand-gold/60' : ''}`}
      aria-label={cardAriaLabel}
      {...interactiveProps}
    >
      <div className='flex flex-col h-full'>
        <div className='relative flex flex-col items-center justify-center self-stretch h-80 overflow-hidden'>
          <img
            src={imageUrl}
            alt={name}
            className='absolute inset-0 w-full h-full object-cover'
            style={{
              objectPosition: imagePosition,
            }}
          />
          {/* Dark overlay */}
          <div className='absolute inset-0 bg-black/20 z-1' />

          {/* Artist name badge at top center - smaller and subtle */}
          <div className='absolute top-8 left-1/2 transform -translate-x-1/2 z-3'>
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
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col gap-8 p-8 mt-auto'>
          {onBookClick && (
            <button
              onClick={onBookClick}
              className='w-full h-12 bg-[#D4AF37] text-[#1A1A1A] font-inter font-semibold rounded-lg hover:bg-[#C19B26] transition-all duration-300 hover:shadow-gold-glow'
            >
              Jetzt Buchen
            </button>
          )}
          {onGalleryClick && (
            <button
              onClick={onGalleryClick}
              className='w-full h-12 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-inter font-semibold rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300'
            >
              Galerie Ansehen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
