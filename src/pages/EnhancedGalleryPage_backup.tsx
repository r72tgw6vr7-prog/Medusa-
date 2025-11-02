import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import Footer from '../components/Footer';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/gallery-grid.css';

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
  // Debi - Old School & Traditional Master
  {
    id: 1,
    image: '/images/gallery/tattoos/Legacy/Oldschool.webp',
    title: 'Old School Classic',
    artist: 'Debi',
    style: 'Old School',
    date: '2024-09',
    featured: true,
  },
  {
    id: 2,
    image: '/images/gallery/tattoos/Legacy/Falsh.webp',
    title: 'Traditional Flash',
    artist: 'Debi',
    style: 'Old School',
    date: '2024-08',
    featured: false,
  },
  {
    id: 3,
    image: '/images/gallery/tattoos/Legacy/Maori.webp',
    title: 'Maori Traditional',
    artist: 'Debi',
    style: 'Maori',
    date: '2024-07',
    featured: true,
  },
  {
    id: 4,
    image: '/images/gallery/tattoos/Legacy/Blackwork.webp',
    title: 'Bold Blackwork',
    artist: 'Debi',
    style: 'Blackwork',
    date: '2024-06',
    featured: false,
  },
  {
    id: 5,
    image: '/images/gallery/tattoos/Legacy/Tribal _ New-Tribal.webp',
    title: 'New Tribal Design',
    artist: 'Debi',
    style: 'Tribal',
    date: '2024-05',
    featured: true,
  },
  {
    id: 6,
    image: '/images/gallery/tattoos/Legacy/Fineline.webp',
    title: 'Fineline Detail',
    artist: 'Debi',
    style: 'Fineline',
    date: '2024-04',
    featured: false,
  },
  {
    id: 7,
    image: '/images/gallery/tattoos/Legacy/Lettering.webp',
    title: 'Custom Lettering',
    artist: 'Debi',
    style: 'Lettering',
    date: '2024-03',
    featured: true,
  },
  {
    id: 8,
    image: '/images/gallery/tattoos/Legacy/Biomechanic.webp',
    title: 'Biomechanic Art',
    artist: 'Debi',
    style: 'Biomechanic',
    date: '2024-02',
    featured: false,
  },
  {
    id: 9,
    image: '/images/gallery/tattoos/Legacy/Linework.webp',
    title: 'Intricate Linework',
    artist: 'Debi',
    style: 'Linework',
    date: '2024-01',
    featured: true,
  },

  // Loui - Realism & Detail Specialist
  {
    id: 10,
    image: '/images/placeholder-tattoo.jpg',
    title: 'Realistic Jellyfish - 4.5h €600',
    artist: 'Loui',
    style: 'Realism',
    date: '2024-09',
    featured: true,
  },
  {
    id: 11,
    image: '/images/placeholder-tattoo.jpg',
    title: 'Butterfly Realistic - 2.5h €400',
    artist: 'Loui',
    style: 'Realism',
    date: '2024-08',
    featured: false,
  },
  {
    id: 12,
    image: '/images/gallery/tattoos/Legacy/ line work_floral_hand_€350_1.5 hours.webp',
    title: 'Floral Linework - 1.5h €350',
    artist: 'Loui',
    style: 'Linework',
    date: '2024-07',
    featured: true,
  },
  {
    id: 13,
    image: '/images/gallery/tattoos/Legacy/26832a0e-491d-4542-af40-bcbbaae3b2a1.webp',
    title: 'Portrait Realism',
    artist: 'Loui',
    style: 'Realism',
    date: '2024-06',
    featured: false,
  },
  {
    id: 14,
    image: '/images/gallery/tattoos/Legacy/39823510-93e5-47d9-aa5b-5b2538c1f9b4.webp',
    title: 'Detailed Realistic Work',
    artist: 'Loui',
    style: 'Realism',
    date: '2024-05',
    featured: true,
  },
  {
    id: 15,
    image: '/images/gallery/tattoos/Legacy/b841b7f0-6014-49d8-9fe3-c594485ef1fd.webp',
    title: 'Black & Grey Portrait',
    artist: 'Loui',
    style: 'Black & Gray',
    date: '2024-04',
    featured: false,
  },

  // Luz (Eli Luquez) - Modern Realism
  {
    id: 16,
    image: '/images/gallery/tattoos/Luz/26832a0e-491d-4542-af40-bcbbaae3b2a1.webp',
    title: 'Modern Realism',
    artist: 'Eli Luquez',
    style: 'Realism',
    date: '2024-09',
    featured: true,
  },
  {
    id: 17,
    image: '/images/gallery/tattoos/Luz/39823510-93e5-47d9-aa5b-5b2538c1f9b4.webp',
    title: 'Realistic Detail',
    artist: 'Eli Luquez',
    style: 'Realism',
    date: '2024-08',
    featured: false,
  },
  {
    id: 18,
    image: '/images/gallery/tattoos/Luz/b841b7f0-6014-49d8-9fe3-c594485ef1fd.webp',
    title: 'Intricate Detail Work',
    artist: 'Eli Luquez',
    style: 'Fineline',
    date: '2024-07',
    featured: true,
  },
  {
    id: 19,
    image: '/images/gallery/tattoos/Luz/c5f62ece-7bdd-49c6-a38f-719eecd906a8.webp',
    title: 'Fine Detail Tattoo',
    artist: 'Eli Luquez',
    style: 'Fineline',
    date: '2024-06',
    featured: false,
  },

  // Mix with numbered placeholders for variety
  {
    id: 20,
    image: '/images/gallery/tattoos/Legacy/aa6c12f5-2767-47fb-8d2a-82d80725be1c.webp',
    title: 'Studio Work',
    artist: 'Debi',
    style: 'Mixed',
    date: '2024-03',
    featured: false,
  },
  {
    id: 21,
    image: '/images/gallery/tattoos/Legacy/26832a0e-491d-4542-af40-bcbbaae3b2a1.webp',
    title: 'Custom Design',
    artist: 'Loui',
    style: 'Custom',
    date: '2024-02',
    featured: true,
  },
  {
    id: 22,
    image: '/images/gallery/tattoos/Legacy/39823510-93e5-47d9-aa5b-5b2538c1f9b4.webp',
    title: 'Unique Piece',
    artist: 'Eli Luquez',
    style: 'Custom',
    date: '2024-01',
    featured: false,
  },
  {
    id: 23,
    image: '/images/gallery/tattoos/Legacy/b841b7f0-6014-49d8-9fe3-c594485ef1fd.webp',
    title: 'Artistic Expression',
    artist: 'Loui',
    style: 'Mixed',
    date: '2023-12',
    featured: true,
  },
  {
    id: 24,
    image: '/images/gallery/tattoos/Legacy/c5f62ece-7bdd-49c6-a38f-719eecd906a8.webp',
    title: 'Creative Work',
    artist: 'Debi',
    style: 'Mixed',
    date: '2023-11',
    featured: false,
  },
];

// i18n-aware lists will be created inside the component using current language

export const EnhancedGalleryPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const allArtistsLabel = t('gallery.filters.allArtists');
  const allStylesLabel = t('gallery.filters.allStyles');
  const allYearsLabel = t('gallery.filters.allYears');

  const [filterArtist, setFilterArtist] = useState<string>(allArtistsLabel);
  const [filterStyle, setFilterStyle] = useState<string>(allStylesLabel);
  const [filterYear, setFilterYear] = useState<string>(allYearsLabel);
  const [showArtistDropdown, setShowArtistDropdown] = useState(false);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false);

  // i18n-aware unique lists
  const i18nUniqueArtists = [
    allArtistsLabel,
    ...Array.from(new Set(galleryItems.map((item) => item.artist))),
  ];
  const i18nUniqueStyles = [
    allStylesLabel,
    ...Array.from(new Set(galleryItems.map((item) => item.style))),
  ];
  const i18nUniqueYears = [
    allYearsLabel,
    ...Array.from(new Set(galleryItems.map((item) => item.date.substring(0, 4))))
      .sort()
      .reverse(),
  ];

  // Focus management refs
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const loadMoreRef = useRef<HTMLButtonElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  // Intersection Observer for Load More button fade-in
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoadMoreVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [showAllPhotos]);

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
    if (filterArtist !== allArtistsLabel) params.artist = filterArtist;
    if (filterStyle !== allStylesLabel) params.style = filterStyle;
    if (filterYear !== allYearsLabel) params.year = filterYear;
    setSearchParams(params);
  }, [
    filterArtist,
    filterStyle,
    filterYear,
    allArtistsLabel,
    allStylesLabel,
    allYearsLabel,
    setSearchParams,
  ]);

  // On language change, if current filters are not valid in the new lists, reset to "All"
  useEffect(() => {
    if (!i18nUniqueArtists.includes(filterArtist)) setFilterArtist(allArtistsLabel);
    if (!i18nUniqueStyles.includes(filterStyle)) setFilterStyle(allStylesLabel);
    if (!i18nUniqueYears.includes(filterYear)) setFilterYear(allYearsLabel);
  }, [
    language,
    allArtistsLabel,
    allStylesLabel,
    allYearsLabel,
    i18nUniqueArtists,
    i18nUniqueStyles,
    i18nUniqueYears,
    filterArtist,
    filterStyle,
    filterYear,
  ]);

  const filteredItems = galleryItems.filter((item) => {
    const matchesArtist = filterArtist === allArtistsLabel || item.artist === filterArtist;
    const matchesStyle = filterStyle === allStylesLabel || item.style === filterStyle;
    const matchesYear = filterYear === allYearsLabel || item.date.startsWith(filterYear);
    return matchesArtist && matchesStyle && matchesYear;
  });

  // Show first 8 photos clearly, next 4 faded (3rd row)
  const displayedItems = showAllPhotos ? filteredItems : filteredItems.slice(0, 12);
  const hasMorePhotos = filteredItems.length > 12;

  const resetFilters = () => {
    setFilterArtist(allArtistsLabel);
    setFilterStyle(allStylesLabel);
    setFilterYear(allYearsLabel);
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
    if (selectedImage && closeButtonRef.current) {
      // Store the currently focused element to restore later
      triggerRef.current = document.activeElement as HTMLElement;

      // Set focus to close button after a brief delay to ensure render
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else if (!selectedImage && triggerRef.current) {
      // Restore focus when lightbox closes
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [selectedImage]);

  // Focus trap: Keep focus within the dialog
  useEffect(() => {
    if (!selectedImage || !dialogRef.current) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const dialog = dialogRef.current;
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

  const hasActiveFilters =
    filterArtist !== allArtistsLabel ||
    filterStyle !== allStylesLabel ||
    filterYear !== allYearsLabel;

  // Animation config based on motion preference
  const animationConfig = prefersReducedMotion.current
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

  const dialogAnimationConfig = prefersReducedMotion.current
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
    <MotionConfig reducedMotion={prefersReducedMotion.current ? 'always' : 'never'}>
      <div className='min-h-screen bg-texture'>
        <MainNavigation />
        <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

        {/* Unified heading section applied: matches ServicesPageInteractive styling */}
        <section className='relative section-padding-lg'>
          <div className='responsive-container safe-area-padding'>
            <div className='text-center'>
              <h1 className='typo-h1 text-[#D4AF37]'>{t('gallery.title')}</h1>
              <p className='typo-subtitle text-[#C0C0C0]'>{t('gallery.subtitle')}</p>
            </div>
          </div>
        </section>

        {/* Before/After Slider Section */}
        <BeforeAfterSlider
          beforeSrc='/images/placeholder-tattoo.jpg'
          afterSrc='/images/placeholder-tattoo.jpg'
          labelBefore={t('slider.before')}
          labelAfter={t('slider.after')}
          heading={t('slider.heading')}
          initial={50}
          aspect='16/9'
        />

        <section className='section-padding border-b border-[#D4AF37]/10'>
          <div className='responsive-container safe-area-padding'>
            <div className='flex flex-wrap gap-8 items-center justify-between mb-8'>
              <div className='flex flex-wrap gap-0'>
                <button
                  onClick={resetFilters}
                  className='touch-target bg-[#D4AF37]/10 border-2 border-[#D4AF37] text-[#D4AF37] font-medium transition-all duration-300 rounded-lg'
                >
                  {t('gallery.filters.allWorks')}
                </button>

                <div className='relative'>
                  <button
                    onClick={() => {
                      setShowArtistDropdown(!showArtistDropdown);
                      setShowStyleDropdown(false);
                      setShowYearDropdown(false);
                    }}
                    className={`touch-target font-medium transition-all duration-300 rounded-lg ${
                      filterArtist !== 'Alle Künstler'
                        ? 'bg-[#D4AF37] text-[#222222] border-2 border-[#D4AF37]'
                        : 'bg-white/5 text-white border-2 border-white/10 hover:border-[#C19B26]/30'
                    }`}
                  >
                    {filterArtist}
                  </button>
                  {showArtistDropdown && (
                    <div className='absolute top-full mt-0 left-0 bg-[#2A2A2A] border border-[#D4AF37]/20 rounded-lg shadow-lg z-[100] min-w-[200px]'>
                      {i18nUniqueArtists.map((artist) => (
                        <button
                          key={artist}
                          onClick={() => {
                            setFilterArtist(artist);
                            setShowArtistDropdown(false);
                          }}
                          className='touch-target-inline block w-full text-left px-8 py-0 text-white hover:bg-[#C19B26]/10 transition-colors first:rounded-t-lg last:rounded-b-lg transition duration-200 ease-out'
                        >
                          {artist}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className='relative'>
                  <button
                    onClick={() => {
                      setShowStyleDropdown(!showStyleDropdown);
                      setShowArtistDropdown(false);
                      setShowYearDropdown(false);
                    }}
                    className={`touch-target font-medium transition-all duration-300 rounded-lg ${
                      filterStyle !== 'Alle Stile'
                        ? 'bg-[#D4AF37] text-[#222222] border-2 border-[#D4AF37]'
                        : 'bg-white/5 text-white border-2 border-white/10 hover:border-[#C19B26]/30'
                    }`}
                  >
                    {filterStyle}
                  </button>
                  {showStyleDropdown && (
                    <div className='absolute top-full mt-0 left-0 bg-[#2A2A2A] border border-[#D4AF37]/20 rounded-lg shadow-lg z-[100] min-w-[200px] max-h-[400px] overflow-y-auto'>
                      {i18nUniqueStyles.map((style) => (
                        <button
                          key={style}
                          onClick={() => {
                            setFilterStyle(style);
                            setShowStyleDropdown(false);
                          }}
                          className='block w-full text-left px-8 py-0 text-white hover:bg-[#C19B26]/10 transition-colors first:rounded-t-lg last:rounded-b-lg transition duration-200 ease-out'
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className='relative'>
                  <button
                    onClick={() => {
                      setShowYearDropdown(!showYearDropdown);
                      setShowArtistDropdown(false);
                      setShowStyleDropdown(false);
                    }}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      filterYear !== 'Alle Jahre'
                        ? 'bg-[#D4AF37] text-[#222222] border-2 border-[#D4AF37]'
                        : 'bg-white/5 text-white border-2 border-white/10 hover:border-[#C19B26]/30'
                    }`}
                  >
                    {filterYear}
                  </button>
                  {showYearDropdown && (
                    <div className='absolute top-full mt-0 left-0 bg-[#2A2A2A] border border-[#D4AF37]/20 rounded-lg shadow-lg z-[100] min-w-[150px]'>
                      {i18nUniqueYears.map((year) => (
                        <button
                          key={year}
                          onClick={() => {
                            setFilterYear(year);
                            setShowYearDropdown(false);
                          }}
                          className='block w-full text-left px-8 py-0 text-white hover:bg-[#C19B26]/10 transition-colors first:rounded-t-lg last:rounded-b-lg transition duration-200 ease-out'
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className='px-8 py-0 rounded-lg bg-red-500/10 border-2 border-red-500/30 text-red-400 hover:bg-red-500/20 font-medium transition-all duration-300'
                >
                  Filter zurücksetzen
                </button>
              )}
            </div>

            <div className='text-white/60 text-sm'>
              {filteredItems.length} von {galleryItems.length} Kunstwerken
            </div>
          </div>
        </section>

        <section className='section-padding'>
          <div className='responsive-container safe-area-padding'>
            {filteredItems.length === 0 ? (
              <div className='text-center py-24'>
                <p className='text-xl text-[#C0C0C0] mb-8'>{t('gallery.noResults')}</p>
                <button
                  onClick={resetFilters}
                  className='touch-target bg-[#D4AF37] text-[#1A1A1A] font-medium hover:bg-brand-gold-hover transition-colors rounded-lg transition duration-200 ease-out'
                >

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className='px-8 py-0 rounded-lg bg-red-500/10 border-2 border-red-500/30 text-red-400 hover:bg-red-500/20 font-medium transition-all duration-300'
            >
              <span>{t('gallery.filters.more')}</span>
              <ChevronRight
                size={20}
                className='transition-transform group-hover:translate-x-1 transition duration-200 ease-out'
              />
            </button>
          </motion.div>
        )}
      </>
    )}
  </div>
</MotionConfig>
);
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
                      className='w-full py-8 px-8 rounded-lg bg-[#D4AF37] text-[#222222] hover:bg-[#D4AF37]/90 transition-colors font-bold text-lg shadow-lg shadow-[#D4AF37]/20 transition duration-200 ease-out'
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
    </MotionConfig>
  );
};

export default EnhancedGalleryPage;
