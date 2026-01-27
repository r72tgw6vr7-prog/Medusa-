import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import './ArtistCard.css';

/**
 * Artist type for the luxury Japanese-inspired card
 */
export interface Artist {
  id: string;
  name: string;
  discipline: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  category?: 'tattoo' | 'piercing';
}

interface ArtistCardProps {
  artist: Artist;
  isRevealed: boolean;
  index: number;
}

/**
 * ArtistCard - Japanese-inspired luxury artist card with alternating layout
 *
 * Features:
 * - Alternating two-column grid (image left/right, text right/left)
 * - Curtain reveal animation (translate-x-full)
 * - Grayscale images with hover effects
 * - Chrome accent lines and glow
 * - Deep black background (deep-black)
 * - Category badge (TATTOO/PIERCING)
 * - 6 hover enhancements: Chrome Glow, Content Lift, Shadow Depth, Image Zoom, Overlay Fade, Neighbor Shrink
 */
export function ArtistCard({ artist, isRevealed, index }: ArtistCardProps) {
  const location = useLocation();
  const { t } = useLanguage();
  const isEven = index % 2 === 0;
  const categoryLabel = artist.category === 'piercing' ? 'PIERCING' : 'TATTOO';
  const isEli =
    artist.id === 'eli' || artist.id === 'eli-luquez' || artist.name.toLowerCase().includes('eli');
  const mobileFaceY = isEli ? '40%' : 'calc(40% - 50px)';

  const isEnglishPath = location.pathname === '/en' || location.pathname.startsWith('/en/');
  const artistSlug = artist.id;
  const portfolioHref = isEnglishPath ? `/en/artists/${artistSlug}` : `/artists/${artistSlug}`;
  const portfolioLabel = t('common.actions.viewPortfolio');

  return (
    <div
      className={`artist-card-wrapper relative grid grid-cols-1 lg:grid-cols-2 gap-0 items-center ${
        isEven ? '' : 'lg:grid-flow-dense'
      }`}
      data-index={index}
      data-category={artist.category || 'tattoo'}
    >
      {/* Image container with curtain reveal and hover effects */}
      <div
        className={`artist-card-image-container relative aspect-3/4 overflow-hidden bg-luxury-bg-dark-elevated ${
          isEven ? '' : 'lg:col-start-2'
        }`}
      >
        {/* Category indicator - subtle circle */}
        <div className='artist-category-indicator' title={categoryLabel} aria-label={categoryLabel}>
          <span className='artist-category-dot' />
        </div>

        {/* Image layer with zoom effect */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            isRevealed ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {artist.image_url && (
            <img
              src={artist.image_url}
              alt={artist.name}
              className='artist-card-image w-full h-full object-cover grayscale max-md:object-[center_var(--artist-face-y)]'
              style={{ '--artist-face-y': mobileFaceY } as React.CSSProperties}
              loading='lazy'
              width='400'
              height='500'
              decoding='async'
            />
          )}
        </div>

        {/* Dark overlay that fades on hover */}
        <div className='artist-card-overlay' />

        {/* Curtain reveal overlay */}
        <div
          className={`absolute inset-0 bg-luxury-bg-dark-elevated transition-transform duration-900 ease-in-out origin-left ${
            isRevealed ? 'translate-x-full' : 'translate-x-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        />

        {/* Border overlay */}
        <div
          className={`absolute inset-0 border border-white/10 transition-opacity duration-600 ${
            isRevealed ? 'opacity-100' : 'opacity-20'
          }`}
        />

        {/* Vertical chrome accent line */}
        <div
          className={`absolute top-0 ${
            isEven ? 'right-0' : 'left-0'
          } w-px h-full bg-linear-to-b from-transparent via-white/40 to-transparent transition-opacity duration-700 ${
            isRevealed ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '450ms' }}
        />
      </div>

      {/* Text content with lift effect */}
      <div className={`relative px-8 lg:px-16 py-12 ${isEven ? 'lg:pl-20' : 'lg:pr-20'}`}>
        <div
          className={`artist-card-content transition-all duration-1000 ease-out ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          {/* Index number and divider */}
          <div className='mb-4'>
            <div className='flex items-center gap-4 mb-2'>
              <span className='text-luxury-text-inverse/40 text-sm font-light tracking-widest uppercase'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className='h-px grow bg-luxury-text-inverse/10' />
            </div>
            {/* Artist name with chrome underline on hover */}
            <h3 className='artist-card-name text-luxury-text-inverse text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-none'>
              {artist.name}
            </h3>
          </div>

          {/* Chrome underline */}
          <div
            className='mb-8 h-px bg-linear-to-r from-luxury-text-inverse/40 to-transparent'
            style={{ width: '60%' }}
          />

          {/* Discipline */}
          <p className='text-luxury-text-inverse/60 text-sm tracking-wider uppercase mb-6 font-light'>
            {artist.discipline}
          </p>

          {/* Description */}
          {artist.description && (
            <p className='text-luxury-text-inverse/70 text-base lg:text-lg leading-relaxed font-light max-w-xl'>
              {artist.description}
            </p>
          )}

          <div className='mt-8'>
            <Link
              to={portfolioHref}
              className='inline-flex items-center justify-center px-8 py-6 border-2 border-(--brand-accent) text-(--brand-accent) hover:bg-(--brand-accent) hover:text-luxury-text-primary font-semibold text-(length:--text-body) rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2'
            >
              {portfolioLabel}
            </Link>
          </div>
        </div>

        {/* Side chrome accent line */}
        <div
          className={`absolute ${
            isEven ? 'left-0' : 'right-0'
          } top-0 bottom-0 w-px bg-linear-to-b from-transparent via-luxury-text-inverse/20 to-transparent transition-opacity duration-1000 ${
            isRevealed ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        />
      </div>

      {/* Loading pulse overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-2000 ${
          isRevealed ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-px h-0 bg-white/20 animate-pulse' />
        </div>
      </div>
    </div>
  );
}

export default ArtistCard;
