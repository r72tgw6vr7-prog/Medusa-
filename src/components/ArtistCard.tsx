import React from 'react';
import { PenTool, Target, UserIcon, Palette, Clock, Instagram } from 'lucide-react';

interface ArtistCardProps {
  artist: {
    id?: string;
    name: string;
    role: string;
    photo: string;
    specialties: string[];
    experience?: string;
    instagram?: string;
    bookable?: boolean;
    roleIcon?: string;
    specialty?: string; // For booking modal compatibility
  };
  variant?: 'full' | 'booking';
  isSelected?: boolean;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  className?: string;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({
  artist,
  variant = 'full',
  isSelected = false,
  onClick,
  onKeyDown,
  className = '',
}) => {
  const getRoleIcon = (roleIcon?: string) => {
    switch (roleIcon) {
      case 'Pen':
        return <PenTool size={16} className='icon' />;
      case 'Target':
        return <Target size={16} className='icon' />;
      case 'Palette':
        return <Palette size={16} className='icon' />;
      default:
        return <UserIcon size={16} className='icon' />;
    }
  };

  if (variant === 'booking') {
    return (
      <button
        type='button'
        className={`artist-card ${isSelected ? 'selected' : ''} ${className}`}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <div className='artist-photo'>
          <img
            src={artist.photo}
            alt={`${artist.name} - ${artist.role}`}
            loading='lazy'
          />
        </div>
        <div className='artist-info'>
          <h4>{artist.name}</h4>
          <p>{artist.role}</p>
          <p className='specialty'>{artist.specialty || artist.specialties.join(', ')}</p>
        </div>
      </button>
    );
  }

  return (
    <div className={`team-card-wrap ${className}`}>
      <article className='team-card' data-artist-name={artist.name}>
        <img
          src={artist.photo}
          alt={artist.name}
          className='team-card-image'
          loading='lazy'
          decoding='async'
          sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 360px) 50vw, 100vw'
          onError={(e) => (e.currentTarget.src = '/assets/images/photos/artists/picture.webp')}
        />
        <div className='team-card-overlay'></div>

        <div className='team-card-name-top'>{artist.name}</div>

        <div className='team-role-badge'>
          {getRoleIcon(artist.roleIcon)}
          {artist.role}
        </div>

        <div className='team-card-content'>
          <p className='team-card-specialties'>{artist.specialties.join(', ')}</p>

          <div className='team-card-bottom-info'>
            {artist.experience && (
              <div className='team-card-experience'>
                <Clock size={16} className='icon' />
                <span>{artist.experience}</span>
              </div>
            )}

            {artist.instagram && (
              <div className='team-card-social'>
                <Instagram size={16} className='icon' />
                <a
                  href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {artist.instagram}
                </a>
              </div>
            )}
          </div>
        </div>
      </article>
      {/* Actions moved outside the card to match previous design */}
      {artist.bookable && (
        <div className='team-card-actions'>
          <a
            href={`/booking?artist=${encodeURIComponent(artist.name)}`}
            className='team-card-button team-card-button-primary'
          >
            Jetzt Buchen
          </a>
          <a
            href={`/gallery#${artist.name.toLowerCase()}`}
            className='team-card-button team-card-button-secondary'
          >
            Galerie
          </a>
        </div>
      )}
    </div>
  );
};

export default ArtistCard;