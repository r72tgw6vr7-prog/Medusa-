import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import Footer from '../components/Footer';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import { PageBackground } from '../components/atoms/PageBackground';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  artist: string;
  style: string;
  date: string;
  featured?: boolean;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: '/images/gallery/tattoo-1.jpg',
    title: 'Traditional Rose',
    artist: 'Debi',
    style: 'Old School',
    date: '2024-09',
    featured: true,
  },
  {
    id: 2,
    image: '/images/gallery/tattoo-2.jpg',
    title: 'Anchor & Rope',
    artist: 'Debi',
    style: 'Old School',
    date: '2024-08',
    featured: false,
  },
  {
    id: 3,
    image: '/images/gallery/tattoo-3.jpg',
    title: 'Maori Shoulder',
    artist: 'Debi',
    style: 'Maori',
    date: '2024-07',
    featured: true,
  },
  {
    id: 4,
    image: '/images/gallery/tattoo-4.jpg',
    title: 'Geometric Mandala',
    artist: 'Debi',
    style: 'Blackwork',
    date: '2024-06',
    featured: false,
  },
  {
    id: 5,
    image: '/images/gallery/tattoo-5.jpg',
    title: 'Portrait Study',
    artist: 'Loui',
    style: 'Realism',
    date: '2024-09',
    featured: true,
  },
  {
    id: 6,
    image: '/images/gallery/tattoo-6.jpg',
    title: 'Animal Portrait',
    artist: 'Loui',
    style: 'Realism',
    date: '2024-08',
    featured: false,
  },
  {
    id: 7,
    image: '/images/gallery/tattoo-7.jpg',
    title: 'Watercolor Flower',
    artist: 'Loui',
    style: 'Watercolor',
    date: '2024-07',
    featured: true,
  },
  {
    id: 8,
    image: '/images/gallery/tattoo-8.jpg',
    title: 'Black & Grey Sleeve',
    artist: 'Loui',
    style: 'Realism',
    date: '2024-06',
    featured: false,
  },
  {
    id: 9,
    image: '/images/gallery/tattoo-9.jpg',
    title: 'Fine Line Portrait',
    artist: 'Eli Luquez',
    style: 'Fineline',
    date: '2024-09',
    featured: true,
  },
  {
    id: 10,
    image: '/images/gallery/tattoo-10.jpg',
    title: 'Realistic Tiger',
    artist: 'Eli Luquez',
    style: 'Realism',
    date: '2024-08',
    featured: false,
  },
  {
    id: 11,
    image: '/images/gallery/tattoo-11.jpg',
    title: 'Blackwork Back',
    artist: 'Eli Luquez',
    style: 'Blackwork',
    date: '2024-07',
    featured: true,
  },
  {
    id: 12,
    image: '/images/gallery/tattoo-12.jpg',
    title: 'Grey Wash Portrait',
    artist: 'Eli Luquez',
    style: 'Realism',
    date: '2024-06',
    featured: false,
  },
  {
    id: 13,
    image: '/images/gallery/tattoo-13.jpg',
    title: 'Japanese Koi',
    artist: 'Debi',
    style: 'Japanese',
    date: '2024-05',
    featured: false,
  },
  {
    id: 14,
    image: '/images/gallery/tattoo-14.jpg',
    title: 'Dotwork Sleeve',
    artist: 'Eli Luquez',
    style: 'Dotwork',
    date: '2024-05',
    featured: true,
  },
  {
    id: 15,
    image: '/images/gallery/tattoo-15.jpg',
    title: 'Neo Traditional',
    artist: 'Loui',
    style: 'Neo Traditional',
    date: '2024-04',
    featured: false,
  },
  {
    id: 16,
    image: '/images/gallery/tattoo-16.jpg',
    title: 'Tribal Pattern',
    artist: 'Debi',
    style: 'Tribal',
    date: '2024-04',
    featured: false,
  },
  {
    id: 17,
    image: '/images/gallery/tattoo-17.jpg',
    title: 'Dragon Back Piece',
    artist: 'Eli Luquez',
    style: 'Realism',
    date: '2023-12',
    featured: true,
  },
  {
    id: 18,
    image: '/images/gallery/tattoo-18.jpg',
    title: 'Sacred Geometry',
    artist: 'Debi',
    style: 'Geometry',
    date: '2023-11',
    featured: false,
  },
  {
    id: 19,
    image: '/images/gallery/tattoo-19.jpg',
    title: 'Color Portrait',
    artist: 'Loui',
    style: 'Realism',
    date: '2023-10',
    featured: true,
  },
  {
    id: 20,
    image: '/images/gallery/tattoo-20.jpg',
    title: 'Blackwork Chest',
    artist: 'Eli Luquez',
    style: 'Blackwork',
    date: '2023-09',
    featured: false,
  },
  {
    id: 21,
    image: '/images/gallery/tattoo-21.jpg',
    title: 'Traditional Dagger',
    artist: 'Debi',
    style: 'Old School',
    date: '2022-08',
    featured: false,
  },
  {
    id: 22,
    image: '/images/gallery/tattoo-22.jpg',
    title: 'Realistic Eye',
    artist: 'Loui',
    style: 'Realism',
    date: '2022-07',
    featured: true,
  },
  {
    id: 23,
    image: '/images/gallery/tattoo-23.jpg',
    title: 'Fineline Flower',
    artist: 'Eli Luquez',
    style: 'Fineline',
    date: '2022-06',
    featured: false,
  },
  {
    id: 24,
    image: '/images/gallery/tattoo-24.jpg',
    title: 'Maori Leg Piece',
    artist: 'Debi',
    style: 'Maori',
    date: '2022-05',
    featured: true,
  },
  // PIERCING PHOTOS - Added to complete gallery
  {
    id: 25,
    image: '/images/piercings/piercings/conch-helix-lobe-kettchen.webp',
    title: 'Conch, Helix & Lobe mit Kettchen',
    artist: 'Vive',
    style: 'Piercing',
    date: '2024-09',
    featured: true,
  },
  {
    id: 26,
    image: '/images/piercings/piercings/double-helix-daith-tragus-jpg.webp',
    title: 'Double Helix, Daith & Tragus',
    artist: 'Aaron',
    style: 'Piercing',
    date: '2024-08',
    featured: true,
  },
];

const _uniqueArtists = [
  'All Artists',
  ...Array.from(new Set(galleryItems.map((item) => item.artist))),
];
const _uniqueStyles = ['All Styles', ...Array.from(new Set(galleryItems.map((item) => item.style)))];
const _uniqueYears = [
  'All Years',
  ...Array.from(new Set(galleryItems.map((item) => item.date.substring(0, 4))))
    .sort((a, b) => b.localeCompare(a)),
];

export const GalleryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [_filterArtist, setFilterArtist] = useState<string>('All Artists');
  const [_filterStyle, setFilterStyle] = useState<string>('All Styles');
  const [_filterYear, setFilterYear] = useState<string>('All Years');
  const [_showArtistDropdown, setShowArtistDropdown] = useState(false);
  const [_showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [_showYearDropdown, setShowYearDropdown] = useState(false);

  const closeAllDropdowns = () => {
    setShowArtistDropdown(false);
    setShowStyleDropdown(false);
    setShowYearDropdown(false);
  };

  // Focus management refs
  const _dialogRef = useRef<HTMLDivElement>(null);
  const _closeButtonRef = useRef<HTMLButtonElement>(null);
  const _triggerRef = useRef<HTMLElement | null>(null);

  // Check for reduced motion preference
  const _prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const artist = searchParams.get('artist');
    const style = searchParams.get('style');
    const year = searchParams.get('year');

    if (artist) setFilterArtist(artist);
    if (style) setFilterStyle(style);
    if (year) setFilterYear(year);
  }, [searchParams]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (_filterArtist !== 'All Artists') params.artist = _filterArtist;
    if (_filterStyle !== 'All Styles') params.style = _filterStyle;
    if (_filterYear !== 'All Years') params.year = _filterYear;
    setSearchParams(params);
  }, [_filterArtist, _filterStyle, _filterYear, setSearchParams]);

  const filteredItems = galleryItems.filter((item) => {
    const matchesArtist = _filterArtist === 'All Artists' || item.artist === _filterArtist;
    const matchesStyle = _filterStyle === 'All Styles' || item.style === _filterStyle;
    const matchesYear = _filterYear === 'All Years' || item.date.startsWith(_filterYear);
    return matchesArtist && matchesStyle && matchesYear;
  });

  const resetFilters = () => {
    closeAllDropdowns();
    setFilterArtist('All Artists');
    setFilterStyle('All Styles');
    setFilterYear('All Years');
    setSearchParams({});
  };

  const currentIndex = selectedImage
    ? filteredItems.findIndex((item) => item.id === selectedImage.id)
    : -1;

  const goToPrevious = React.useCallback(() => {
    if (currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1]);
    }
  }, [currentIndex, filteredItems]);

  const goToNext = React.useCallback(() => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1]);
    }
  }, [currentIndex, filteredItems]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedImage]);

  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleArrowKeys);
    return () => window.removeEventListener('keydown', handleArrowKeys);
  }, [selectedImage, goToPrevious, goToNext]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  // Focus management: Set focus to close button when lightbox opens
  useEffect(() => {
    if (selectedImage && _closeButtonRef.current) {
      // Store the currently focused element to restore later
      _triggerRef.current = document.activeElement as HTMLElement;

      // Set focus to close button after a brief delay to ensure render
      setTimeout(() => {
        _closeButtonRef.current?.focus();
      }, 100);
    } else if (!selectedImage && _triggerRef.current) {
      // Restore focus when lightbox closes
      _triggerRef.current.focus();
      _triggerRef.current = null;
    }
  }, [selectedImage]);

  // Focus trap: Keep focus within the dialog
  useEffect(() => {
    if (!selectedImage || !_dialogRef.current) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const dialog = _dialogRef.current;
      if (!dialog) return;

      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: Move focus backwards
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab: Move focus forwards
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleFocusTrap);
    return () => document.removeEventListener('keydown', handleFocusTrap);
  }, [selectedImage]);

  // Filter state tracking
  const _hasActiveFilters = _filterArtist !== 'All Artists' || _filterStyle !== 'All Styles' || _filterYear !== 'All Years';
  const _isAllFiltersActive = _filterArtist === 'All Artists' && _filterStyle === 'All Styles' && _filterYear === 'All Years';

  // Animation config based on motion preference
  const animationConfig = _prefersReducedMotion.current
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
      };

  const dialogAnimationConfig = _prefersReducedMotion.current
    ? {
        initial: { scale: 1 },
        animate: { scale: 1 },
        exit: { scale: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { scale: 0.9 },
        animate: { scale: 1 },
        exit: { scale: 0.9 },
        transition: { duration: 0.3 },
      };

  return (
    <MotionConfig reducedMotion={_prefersReducedMotion.current ? 'always' : 'never'}>
      <PageBackground>
        <div className='text-white' style={{ paddingTop: 'var(--header-height)' }}>
          <MainNavigation />
          <div className='nav-offset-spacer' aria-hidden='true' />

          {/* Hero Section - Container → Section → Content */}
          <section className='py-32 md:py-40'>
            <div className='max-w-7xl mx-auto px-8'>
              <div className='text-center'>
                {/* Unified heading section applied: matches ServicesPageInteractive styling */}
                <h1 className='font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 text-[#D4AF37]'>
                  Gallery
                </h1>
                <p className='text-lg text-[#C0C0C0] max-w-2xl mx-auto'>
                  Eine Auswahl unserer besten Arbeiten aus Tattoo und Piercing.
                </p>
              </div>
            </div>
          </section>

          {/* Gallery Grid Section - Container → Section → Grid → Components */}
          <section className='section-padding'>
            <div className='responsive-container safe-area-padding'>
              {filteredItems.length === 0 ? (
                <div className='text-center py-24'>
                  <p className='text-xl text-white/60 mb-8'>Keine Kunstwerke gefunden</p>
                  <button
                    onClick={resetFilters}
                    className='touch-target px-8 py-0 rounded-lg bg-[#D4AF37] text-[#222222] font-medium hover:bg-brand-gold-hover transition-colors transition duration-200 ease-out'
                  >
                    Alle Filter zurücksetzen
                  </button>
                </div>
              ) : (
                <div className='responsive-grid cols-3-desktop gap-8'>
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={
                        _prefersReducedMotion.current ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        _prefersReducedMotion.current ? { duration: 0 } : { duration: 0.3 }
                      }
                      className='group relative cursor-pointer overflow-hidden rounded-xl bg-black/20 hover:shadow-lg hover:shadow-gold-glow transition-all duration-300 flex flex-col h-full'
                      onClick={() => setSelectedImage(item)}
                      role='button'
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedImage(item);
                        }
                      }}
                      aria-label={`${item.title} von ${item.artist} ansehen`}
                    >
                      <div className='aspect-4/3 overflow-hidden'>
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          fallback='/images/placeholder-tattoo.jpg'
                          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                          sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 360px) 50vw, 100vw'
                        />
                      </div>

                      <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 h-full'>
                        <h3 className="text-white font-['Playfair_Display'] text-xl font-bold mb-0">
                          {item.title}
                        </h3>
                        <p className='text-[#D4AF37] text-sm font-medium'>{item.artist}</p>
                        <p className='text-white/70 text-xs mt-0'>
                          {item.style} • {item.date.substring(0, 4)}
                        </p>
                      </div>

                      {item.featured && (
                        <div className='absolute top-4 right-4 gallery-feature-badge'>Featured</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <AnimatePresence>
            {selectedImage && (
              <motion.div
                {...animationConfig}
                className='fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8 safe-area-padding'
                onClick={() => setSelectedImage(null)}
              >
                <button
                  ref={_closeButtonRef}
                  onClick={() => setSelectedImage(null)}
                  className='touch-target absolute top-6 right-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-colors duration-200 ease-out'
                  aria-label='Close lightbox'
                >
                  <X size={24} />
                </button>

                {currentIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    className='touch-target absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-colors duration-200 ease-out'
                    aria-label='Previous image'
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {currentIndex < filteredItems.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    className='touch-target absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-colors duration-200 ease-out'
                    aria-label='Next image'
                  >
                    <ChevronRight size={24} />
                  </button>
                )}

                <div
                  ref={_dialogRef}
                  className='responsive-container w-full max-h-[90vh] flex flex-col lg:flex-row gap-8'
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation();
                    }
                  }}
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='lightbox-title'
                  aria-describedby='lightbox-description'
                >
                  <motion.div
                    {...dialogAnimationConfig}
                    className='flex-1 flex items-center justify-center'
                  >
                    <img
                      src={selectedImage.image}
                      alt={selectedImage.title}
                      className='max-w-full max-h-[70vh] object-contain rounded-lg'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder-tattoo.jpg';
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={
                      _prefersReducedMotion.current ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }
                    }
                    animate={{ x: 0, opacity: 1 }}
                    transition={_prefersReducedMotion.current ? { duration: 0 } : { delay: 0.1 }}
                    className='lg:w-80 bg-[#2A2A2A]/90 backdrop-blur-md border border-[#D4AF37]/20 rounded-xl p-8 space-y-8'
                  >
                    <div>
                      <h2
                        id='lightbox-title'
                        className="font-['Playfair_Display'] text-2xl text-white font-bold mb-0"
                      >
                        {selectedImage.title}
                      </h2>
                      <p
                        id='lightbox-description'
                        className='text-[#D4AF37] text-lg font-medium mb-8'
                      >
                        Von {selectedImage.artist}
                      </p>
                    </div>

                    <div className='space-y-0'>
                      <div className='flex items-center gap-0'>
                        <span className='text-white/60 text-sm'>Stil:</span>
                        <span className='px-0 py-0 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm'>
                          {selectedImage.style}
                        </span>
                      </div>
                      <div className='flex items-center gap-0'>
                        <span className='text-white/60 text-sm'>Datum:</span>
                        <span className='text-white text-sm'>
                          {new Date(selectedImage.date).toLocaleDateString('de-DE', {
                            year: 'numeric',
                            month: 'long',
                          })}
                        </span>
                      </div>
                      {selectedImage.featured && (
                        <div className='flex items-center gap-0'>
                          <span className='px-0 py-0 rounded-full bg-[#D4AF37] text-[#222222] text-xs font-bold'>
                            Featured Work
                          </span>
                        </div>
                      )}
                    </div>

                    <div className='pt-8 border-t border-white/10'>
                      <button
                        onClick={() => (window.location.href = '/booking')}
                        className='w-full py-8 px-8 rounded-lg bg-[#D4AF37] text-[#222222] hover:bg-brand-gold-hover font-bold text-lg shadow-lg shadow-[#D4AF37]/20 transition-colors duration-200 ease-out'
                      >
                        Termin buchen
                      </button>
                    </div>

                    <div className='text-white/40 text-xs text-center'>
                      {currentIndex + 1} von {filteredItems.length}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Footer />
        </div>
      </PageBackground>
    </MotionConfig>
  );
};

export default GalleryPage;
