import React from 'react';
import { PenTool, Target, UserIcon, Palette, Clock, Instagram } from 'lucide-react';
import styles from './ArtistCard.module.css';

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
        return <PenTool size={16} className={styles.icon} />;
      case 'Target':
        return <Target size={16} className={styles.icon} />;
      case 'Palette':
        return <Palette size={16} className={styles.icon} />;
      default:
        return <UserIcon size={16} className={styles.icon} />;
    }
  };

  if (variant === 'booking') {
    return (
      <button
        type='button'
        className={`${styles['artist-card']} ${isSelected ? styles.selected : ''} ${className}`}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <div className={styles['artist-photo']}>
          <img
            src={artist.photo}
            alt={`${artist.name} - ${artist.role}`}
            loading='lazy'
          />
        </div>
        <div className={styles['artist-info']}>
          <h4>{artist.name}</h4>
          <p>{artist.role}</p>
          <p className={styles.specialty}>{artist.specialty || artist.specialties.join(', ')}</p>
        </div>
      </button>
    );
  }

  return (
    <div className={`${styles['team-card-wrap']} ${className}`}>
      <article className={styles['team-card']} data-artist-name={artist.name}>
        <img
          src={artist.photo}
          alt={artist.name}
          className={styles['team-card-image']}
          loading='lazy'
          decoding='async'
          sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 360px) 50vw, 100vw'
          onError={(e) => (e.currentTarget.src = '/assets/images/photos/artists/picture.webp')}
        />
        <div className={styles['team-card-overlay']}></div>

        <div className={styles['team-card-name-top']}>{artist.name}</div>

        <div className={styles['team-role-badge']}>
          {getRoleIcon(artist.roleIcon)}
          {artist.role}
        </div>

        <div className={styles['team-card-content']}>
          <p className={styles['team-card-specialties']}>{artist.specialties.join(', ')}</p>

          <div className={styles['team-card-bottom-info']}>
            {artist.experience && (
              <div className={styles['team-card-experience']}>
                <Clock size={16} className={styles.icon} />
                <span>{artist.experience}</span>
              </div>
            )}

            {artist.instagram && (
              <div className={styles['team-card-social']}>
                <Instagram size={16} className={styles.icon} />
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
        <div className={styles['team-card-actions']}>
          <a
            href={`/booking?artist=${encodeURIComponent(artist.name)}`}
            className={`${styles['team-card-button']} ${styles['team-card-button-primary']}`}
          >
            Jetzt Buchen
          </a>
          <a
            href={`/gallery#${artist.name.toLowerCase()}`}
            className={`${styles['team-card-button']} ${styles['team-card-button-secondary']}`}
          >
            Galerie
          </a>
        </div>
      )}
    </div>
  );
};

export default ArtistCard;