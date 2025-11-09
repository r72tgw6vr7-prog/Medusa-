import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import './ArtistBioModal.css';

interface Artist {
  slug: string;
  name: string;
  fullName?: string;
  role: string;
  photo: string;
  photoAlt?: string;
  specialties: string[];
  experience: string;
  instagram: string;
  bio?: {
    de: string;
    en: string;
  };
  certifications?: string[];
}

interface ArtistBioModalProps {
  artist: Artist;
  onClose: () => void;
}

export const ArtistBioModal = ({ artist, onClose }: ArtistBioModalProps) => {
  const { language, t } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Focus trap
  useEffect(() => {
    const modalContent = document.querySelector('.artist-modal-content');
    const focusableElements = modalContent?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => window.removeEventListener('keydown', handleTab);
  }, []);

  const displayName = artist.fullName || artist.name;
  const lang = (language || 'de').toLowerCase() as 'de' | 'en';
  const bioText = artist.bio?.[lang] || '';
  const isGerman = lang === 'de';

  return (
    <div
      className='artist-modal-overlay'
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Enter' && onClose()}
      role='button'
      tabIndex={0}
      aria-label={t('common.close')}
    >
      <div
        className='artist-modal-content'
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
        aria-describedby='modal-bio'
      >
        <button
          className='modal-close-button'
          onClick={onClose}
          aria-label={t('common.close')}
          type='button'
        >
          <X size={24} />
        </button>

        {/* Left: Photo as Background */}
        <div
          className='modal-photo-section'
          style={{ backgroundImage: `url(${artist.photo})` }}
          role='img'
          aria-label={artist.photoAlt || `${artist.name}, ${artist.role}`}
        />

        {/* Right: Content */}
        <div className='modal-content-section'>
          <h2 id='modal-title' className='modal-artist-name'>
            {displayName}
          </h2>

          <p className='modal-artist-role'>{artist.role}</p>

          <div className='modal-artist-meta'>
            <span className='modal-experience'>{artist.experience}</span>
            {artist.instagram && (
              <a
                href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                target='_blank'
                rel='noopener noreferrer'
                className='modal-instagram'
              >
                {artist.instagram}
              </a>
            )}
          </div>

          <div className='modal-specialties'>
            {artist.specialties.map((spec) => (
              <span key={spec} className='specialty-badge'>
                {spec}
              </span>
            ))}
          </div>

          {bioText && (
            <div id='modal-bio' className='modal-bio'>
              {bioText.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}

          {/* Portfolio Samples */}
          <div className='modal-portfolio-samples'>
            <h3 className='modal-portfolio-title'>{isGerman ? 'Portfolio' : 'Portfolio'}</h3>
            <div className='portfolio-thumbnails'>
              {/* Placeholder for portfolio images - will be populated from gallery */}
              <div className='portfolio-placeholder'>📷</div>
              <div className='portfolio-placeholder'>📷</div>
              <div className='portfolio-placeholder'>📷</div>
            </div>
          </div>

          {artist.certifications && artist.certifications.length > 0 && (
            <div className='modal-certifications'>
              <h3 className='modal-section-title'>
                {isGerman ? 'Zertifizierungen' : 'Certifications'}
              </h3>
              <ul className='certification-list'>
                {artist.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>
          )}

          <div className='modal-actions'>
            <button
              className='modal-cta-button modal-cta-primary'
              onClick={() => {
                window.location.href = `/booking?artist=${encodeURIComponent(artist.name)}`;
              }}
              type='button'
            >
              {isGerman ? 'Jetzt Buchen' : 'Book Now'}
            </button>
            <button
              className='modal-cta-button modal-cta-secondary'
              onClick={() => {
                window.location.href = `/gallery#${artist.slug}`;
              }}
              type='button'
            >
              {isGerman ? 'Galerie Ansehen' : 'View Gallery'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
