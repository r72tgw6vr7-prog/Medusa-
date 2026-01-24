'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ARTISTS, type Artist } from '@/data/artists';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * BLADE ACCORDION COMPONENT
 *
 * A full-height horizontal blade accordion for showcasing artists.
 * Follows the Medusa Design System with luxury dark aesthetic.
 *
 * Features:
 * - Desktop: Horizontal expanding blades on hover with vertical text
 * - Grayscale to color transition on expand
 * - Mobile: Vertical stack with tap-to-expand
 * - Prefers-reduced-motion support
 */

interface BladeArtist {
  id: string;
  name: string;
  discipline: string;
  imageUrl: string;
  specialty: string;
  slug: string;
}

// Map real artist data to blade format
const mapArtistsToBlades = (artists: Artist[], defaultDiscipline: string): BladeArtist[] => {
  // Exclude Sasha and Oliver
  const filteredArtists = artists.filter((artist) => artist.id !== 'sasha' && artist.id !== 'oli');

  // Sort: Aaron first (leftmost), then alphabetically by name
  const sortedArtists = [...filteredArtists]
    .sort((a, b) => {
      // Aaron always first (leftmost blade)
      if (a.id === 'aaron') return -1;
      if (b.id === 'aaron') return 1;
      // Then alphabetically by name
      return a.name.localeCompare(b.name);
    })
    .slice(0, 6);

  return sortedArtists.map((artist) => ({
    id: artist.id,
    name: artist.displayName || artist.name,
    discipline: artist.specialties[0] || defaultDiscipline,
    imageUrl: artist.profileImage,
    specialty: artist.role,
    slug: artist.slug,
  }));
};

// Hook for reduced motion preference
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Hook for responsive breakpoints
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkBreakpoint = () => {
      if (window.innerWidth < 768) {
        setBreakpoint('mobile');
      } else if (window.innerWidth < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  return breakpoint;
};

// Individual blade component
interface BladeProps {
  artist: BladeArtist;
  index: number;
  isExpanded: boolean;
  onHover: () => void;
  total: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  t: (key: string) => string;
}

const Blade: React.FC<BladeProps> = ({
  artist,
  index,
  isExpanded,
  onHover,
  total,
  isMobile,
  prefersReducedMotion,
  t,
}) => {
  // Detect Eli to keep working baseline, shift others up
  const isEli =
    artist.id === 'eli' ||
    artist.id === 'eli-luquez' ||
    artist.slug === 'eli-luquez' ||
    artist.name.toLowerCase().includes('eli');
  const mobileImageY = isEli ? '40%' : 'calc(40% - 50px)';

  if (isMobile) {
    return (
      <motion.div
        layout
        initial={false}
        animate={{
          height: isExpanded ? 520 : 100,
        }}
        transition={{
          layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
          height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        }}
        className={`relative w-full overflow-hidden cursor-pointer md:h-96 md:touch-manipulation md:active:scale-[0.98] ${
          isExpanded ? 'md:col-span-full max-md:z-50' : 'md:h-48 max-md:z-10'
        } max-md:border-b max-md:border-white/10`}
        onClick={onHover}
      >
        {/* Background image */}
        <div className='absolute inset-0 overflow-hidden'>
          <motion.img
            src={artist.imageUrl}
            alt={artist.name}
            className='w-full h-full object-cover'
            style={{ objectPosition: `50% ${mobileImageY}` }}
            animate={{
              opacity: isExpanded ? 1 : 0.3,
              scale: isExpanded ? 1 : 1.05,
            }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className='absolute inset-0 bg-black'
            animate={{
              opacity: isExpanded ? 0.3 : 0.6,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Content */}
        <div className='relative z-10 px-6 py-8 max-md:px-4 max-md:py-6 h-full flex flex-col justify-between'>
          {/* Header - always visible */}
          <div className='flex items-start justify-between'>
            <div className='space-y-4 max-md:space-y-2 flex-1'>
              {/* Artist number */}
              <span className='text-white/70 text-sm tracking-[0.2em] uppercase'>
                {String(index + 1).padStart(2, '0')}/06
              </span>

              {/* Artist name */}
              <h2 className='text-4xl font-semibold text-white max-md:text-xl leading-tight'>
                {artist.name}
              </h2>
            </div>

            {/* Chevron icon - mobile only */}
            <motion.svg
              className='w-6 h-6 text-white ml-4 md:hidden flex-shrink-0'
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </motion.svg>
          </div>

          {/* Expanded content - slides in */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className='space-y-6 max-md:space-y-4'
              >
                {/* Specialty badge */}
                <div className='inline-flex items-center rounded-full border border-white/40 bg-black/40 backdrop-blur-sm px-4 py-2 max-md:px-4 max-md:py-2'>
                  <span className='text-xs font-medium tracking-wide text-white/85 uppercase'>
                    {artist.discipline}
                  </span>
                </div>

                {/* Role */}
                <p className='text-lg text-white/85 leading-relaxed max-md:text-sm'>
                  {artist.specialty}
                </p>

                {/* CTA Button */}
                <div>
                  <Link to={`/artists/${artist.slug}`} onClick={(e) => e.stopPropagation()}>
                    <button className='w-full max-w-xs inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-black/40 backdrop-blur-sm px-6 py-4 text-base font-medium text-white hover:bg-white/10 transition duration-200 ease-out max-md:px-4 max-md:py-2 max-md:text-sm'>
                      <span>PROFIL ANSEHEN</span>
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  // Desktop: horizontal expanding blades
  return (
    <motion.div
      layout
      className='relative h-full bg-luxury-bg-dark overflow-hidden cursor-pointer border-r border-white/10 last:border-r-0'
      onMouseEnter={onHover}
      style={{
        flex: isExpanded ? 3 : 1,
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
      }
    >
      {/* Background image slice */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.img
          src={artist.imageUrl}
          alt={artist.name}
          className='w-full h-full object-cover'
          style={{
            scale: isExpanded ? 1 : 1.5,
            filter: isExpanded ? 'grayscale(0%)' : 'grayscale(100%)',
          }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        />
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-luxury-bg-dark via-luxury-bg-dark/60 to-transparent' />
      </div>

      {/* Collapsed state - vertical text */}
      <AnimatePresence mode='wait'>
        {!isExpanded && (
          <motion.div
            key='collapsed'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
            className='absolute inset-0 flex items-center justify-center'
          >
            <div className='flex flex-col items-center gap-6'>
              {/* Index */}
              <span className='text-luxury-text-inverse/30 font-body text-(length:--text-sm) lg:text-(length:--text-xs)'>
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Chrome divider line */}
              <div className='w-px h-12 bg-gradient-to-b from-transparent via-luxury-text-inverse/40 to-transparent' />

              {/* Vertical artist name */}
              <div
                className='text-luxury-text-inverse font-headline text-(length:--text-sm) leading-(--line-height-tight) uppercase whitespace-nowrap'
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                }}
              >
                {artist.name}
              </div>
            </div>
          </motion.div>
        )}

        {/* Expanded state - full card */}
        {isExpanded && (
          <motion.div
            key='expanded'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: 0.2 }}
            className='absolute inset-0 flex flex-col justify-end p-8'
          >
            {/* Artist details */}
            <div className='space-y-4'>
              {/* Discipline tag */}
              <div className='inline-flex items-center gap-2 px-4 py-2 border border-luxury-text-inverse/20 backdrop-blur-sm'>
                <div className='w-1 h-1 bg-luxury-text-inverse/60' />
                <span className='text-luxury-text-inverse/60 font-body text-(length:--text-sm) lg:text-(length:--text-xs) uppercase'>
                  {artist.discipline}
                </span>
              </div>

              {/* Name */}
              <h2 className='text-luxury-text-inverse font-headline text-(length:--text-h3) leading-(--line-height-tight)'>
                {artist.name}
              </h2>

              {/* Specialty */}
              <p className='text-luxury-text-inverse/50 font-body text-(length:--text-sm) leading-(--line-height-normal) tracking-wide'>
                {artist.specialty}
              </p>

              {/* Chrome accent line */}
              <div className='w-16 h-px bg-gradient-to-r from-luxury-text-inverse/60 to-transparent' />

              {/* View Profile button */}
              <Link to={`/artists/${artist.slug}`}>
                <motion.button
                  className='group relative inline-flex items-center gap-4 px-6 py-4 bg-luxury-bg-base text-luxury-text-primary overflow-hidden'
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className='relative z-10 font-body text-(length:--text-sm) tracking-widest uppercase font-medium'>
                    {t('artists.bladeAccordion.viewProfile')}
                  </span>
                  <svg
                    className='relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 transition duration-200 ease-out'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>

                  {/* Hover effect */}
                  <motion.div
                    className='absolute inset-0 bg-white/20'
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </Link>
            </div>

            {/* Index in expanded state */}
            <div className='absolute top-8 right-8 text-luxury-text-inverse/20 font-body text-(length:--text-sm) lg:text-(length:--text-xs) tracking-widest'>
              {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main BladeAccordion component
export const BladeAccordion: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [artistBlades, setArtistBlades] = useState<BladeArtist[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint !== 'desktop';
  const isPhone = breakpoint === 'mobile';
  const { t } = useLanguage();

  // Load artist data
  useEffect(() => {
    const blades = mapArtistsToBlades(ARTISTS, t('artists.bladeAccordion.defaultDiscipline'));
    setArtistBlades(blades);
  }, [t]);

  const handleHover = useCallback((index: number) => {
    setExpandedIndex(index);
  }, []);

  const handleLeave = useCallback(() => {
    setExpandedIndex(null);
  }, []);

  if (artistBlades.length === 0) {
    return (
      <section className='h-screen bg-luxury-bg-dark flex items-center justify-center'>
        <div className='animate-pulse font-body text-(length:--text-body) text-luxury-text-inverse/60'>
          {t('artists.bladeAccordion.loading')}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`h-screen bg-luxury-bg-dark flex flex-col ${className}`}
      aria-label={t('artists.bladeAccordion.sectionAriaLabel')}
    >
      {/* Header - Primary Section Heading */}
      <div className='px-8 py-8 text-center max-md:pt-6 max-md:pb-6'>
        <h2 className='font-headline text-(length:--text-h2) font-bold tracking-tight leading-tight text-brand-chrome'>
          {t('artists.bladeAccordion.title') || 'Our Artists'}
        </h2>
      </div>

      {/* Blade container */}
      {isMobile ? (
        <motion.div
          layout
          className='flex-1 flex flex-col gap-4 max-md:gap-0 px-4 py-6 overflow-y-auto md:grid md:grid-cols-2 md:auto-rows-fr'
        >
          {artistBlades.map((artist, index) => (
            <Blade
              key={artist.id}
              artist={artist}
              isExpanded={expandedIndex === index}
              onHover={() =>
                setExpandedIndex((prev) => (isPhone ? index : prev === index ? null : index))
              }
              index={index}
              total={artistBlades.length}
              isMobile={true}
              prefersReducedMotion={prefersReducedMotion}
              t={t}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div layout className='flex-1 flex' onMouseLeave={handleLeave}>
          {artistBlades.map((artist, index) => (
            <Blade
              key={artist.id}
              artist={artist}
              isExpanded={expandedIndex === index}
              onHover={() => handleHover(index)}
              index={index}
              total={artistBlades.length}
              isMobile={false}
              prefersReducedMotion={prefersReducedMotion}
              t={t}
            />
          ))}
        </motion.div>
      )}

      {/* Footer instruction */}
      <div className='border-t border-luxury-text-inverse/5 px-8 py-4'>
        <p className='text-luxury-text-inverse/30 font-body text-(length:--text-sm) lg:text-(length:--text-xs) tracking-widest uppercase text-center'>
          {isMobile
            ? t('artists.bladeAccordion.instructions.mobile')
            : t('artists.bladeAccordion.instructions.desktop')}
        </p>
      </div>
    </section>
  );
};

export default BladeAccordion;
