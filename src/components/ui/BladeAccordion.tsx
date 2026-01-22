'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ARTISTS, type Artist } from '@/data/artists';

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
const mapArtistsToBlades = (artists: Artist[]): BladeArtist[] => {
  // Exclude Sasha and Oliver
  const filteredArtists = artists.filter(
    (artist) => artist.id !== 'sasha' && artist.id !== 'oli'
  );
  
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
    discipline: artist.specialties[0] || 'Tattoo Artist',
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
}

const Blade: React.FC<BladeProps> = ({
  artist,
  index,
  isExpanded,
  onHover,
  total,
  isMobile,
  prefersReducedMotion,
}) => {
  if (isMobile) {
    // Mobile: vertical stack
    return (
      <motion.div
        className="relative w-full h-96 overflow-hidden cursor-pointer"
        onClick={onHover}
        initial={false}
      >
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={artist.imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover"
            style={{
              filter: isExpanded ? 'grayscale(0%)' : 'grayscale(100%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg-dark via-luxury-bg-dark/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-luxury-text-inverse/20 backdrop-blur-sm w-fit">
              <div className="w-1 h-1 bg-luxury-text-inverse/60" />
              <span className="text-luxury-text-inverse/60 text-base lg:text-sm tracking-[0.2em] uppercase">
                {artist.discipline}
              </span>
            </div>
            <h2 className="text-luxury-text-inverse text-2xl tracking-tight">{artist.name}</h2>
            <p className="text-luxury-text-inverse/50 text-base lg:text-sm tracking-wide">{artist.specialty}</p>
            <div className="w-16 h-px bg-gradient-to-r from-luxury-text-inverse/60 to-transparent" />
            <Link to={`/artists/${artist.slug}`}>
              <motion.button
                className="group relative inline-flex items-center gap-4 px-6 py-4 bg-luxury-bg-base text-luxury-text-primary overflow-hidden"
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 text-base lg:text-sm tracking-[0.2em] uppercase font-medium">
                  Profil ansehen
                </span>
                <svg 
                  className="relative z-10 w-4 h-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </Link>
          </div>
        </div>

        <div className="absolute top-4 right-4 text-luxury-text-inverse/20 text-xs md:text-sm tracking-[0.3em]">
          {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </div>
      </motion.div>
    );
  }

  // Desktop: horizontal expanding blades
  return (
    <motion.div
      layout
      className="relative h-full bg-luxury-bg-dark overflow-hidden cursor-pointer border-r border-white/10 last:border-r-0"
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
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={artist.imageUrl}
          alt={artist.name}
          className="w-full h-full object-cover"
          style={{
            scale: isExpanded ? 1 : 1.5,
            filter: isExpanded ? 'grayscale(0%)' : 'grayscale(100%)',
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg-dark via-luxury-bg-dark/60 to-transparent" />
      </div>

      {/* Collapsed state - vertical text */}
      <AnimatePresence mode="wait">
        {!isExpanded && (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Index */}
              <span className="text-luxury-text-inverse/30 text-sm lg:text-xs tracking-[0.3em]">
                {String(index + 1).padStart(2, '0')}
              </span>
              
              {/* Chrome divider line */}
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-luxury-text-inverse/40 to-transparent" />
              
              {/* Vertical artist name */}
              <div 
                className="text-luxury-text-inverse tracking-[0.15em] uppercase whitespace-nowrap"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  fontSize: '0.875rem',
                  letterSpacing: '0.3em'
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
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: 0.2 }}
            className="absolute inset-0 flex flex-col justify-end p-8"
          >
            {/* Artist details */}
            <div className="space-y-4">
              {/* Discipline tag */}
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-luxury-text-inverse/20 backdrop-blur-sm">
                <div className="w-1 h-1 bg-luxury-text-inverse/60" />
                <span className="text-luxury-text-inverse/60 text-sm lg:text-xs tracking-[0.2em] uppercase">
                  {artist.discipline}
                </span>
              </div>

              {/* Name */}
              <h2 className="text-luxury-text-inverse text-4xl tracking-tight">
                {artist.name}
              </h2>

              {/* Specialty */}
              <p className="text-luxury-text-inverse/50 text-sm tracking-wide">
                {artist.specialty}
              </p>

              {/* Chrome accent line */}
              <div className="w-16 h-px bg-gradient-to-r from-luxury-text-inverse/60 to-transparent" />

              {/* View Profile button */}
              <Link to={`/artists/${artist.slug}`}>
                <motion.button
                  className="group relative inline-flex items-center gap-4 px-6 py-4 bg-luxury-bg-base text-luxury-text-primary overflow-hidden"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-medium">
                    Profil ansehen
                  </span>
                  <svg 
                    className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 transition duration-200 ease-out" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </Link>
            </div>

            {/* Index in expanded state */}
            <div className="absolute top-8 right-8 text-luxury-text-inverse/20 text-sm lg:text-xs tracking-[0.3em]">
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
  const isMobile = breakpoint === 'mobile';

  // Load artist data
  useEffect(() => {
    const blades = mapArtistsToBlades(ARTISTS);
    setArtistBlades(blades);
  }, []);

  const handleHover = useCallback((index: number) => {
    setExpandedIndex(index);
  }, []);

  const handleLeave = useCallback(() => {
    setExpandedIndex(null);
  }, []);

  if (artistBlades.length === 0) {
    return (
      <section className="h-screen bg-luxury-bg-dark flex items-center justify-center">
        <div className="animate-pulse text-luxury-text-inverse/60">Künstler werden geladen...</div>
      </section>
    );
  }

  return (
    <section
      className={`h-screen bg-luxury-bg-dark flex flex-col ${className}`}
      aria-label="Unsere Künstler"
    >
      {/* Header - Primary Section Heading */}
      <div className="px-8 py-8 text-center">
        <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-[var(--brand-accent)]">
          Unsere Künstler
        </h2>
      </div>

      {/* Blade container */}
      {isMobile ? (
        <div className="flex-1 flex flex-col gap-4 px-4 py-6 overflow-y-auto">
          {artistBlades.map((artist, index) => (
            <Blade
              key={artist.id}
              artist={artist}
              isExpanded={expandedIndex === index}
              onHover={() => setExpandedIndex(prev => prev === index ? null : index)}
              index={index}
              total={artistBlades.length}
              isMobile={true}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="flex-1 flex"
          onMouseLeave={handleLeave}
        >
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
            />
          ))}
        </motion.div>
      )}

      {/* Footer instruction */}
      <div className="border-t border-luxury-text-inverse/5 px-8 py-4">
        <p className="text-luxury-text-inverse/30 text-sm lg:text-xs tracking-[0.2em] uppercase text-center">
          {isMobile ? 'Tippen zum Erweitern' : 'Hover zum Erweitern'}
        </p>
      </div>
    </section>
  );
};

export default BladeAccordion;
