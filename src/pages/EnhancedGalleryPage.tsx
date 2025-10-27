import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import Footer from '../components/Footer';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { useLanguage } from '../contexts/LanguageContext';

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
    image: '/images/gallery/debi-oldschool-1.jpg',
    title: 'Old School Classic',
    artist: 'Debi',
    style: 'Old School',
    date: '2024-09',
    featured: true,
  },
  {
    id: 2,
    image: '/images/gallery/debi-flash-1.jpg',
    title: 'Traditional Flash',
    artist: 'Debi',
    style: 'Old School',
    date: '2024-08',
    featured: false,
  },
  {
    id: 3,
    image: '/images/gallery/debi-maori-1.jpg',
    title: 'Maori Traditional',
    artist: 'Debi',
    style: 'Maori',
    date: '2024-07',
    featured: true,
  },
  {
    id: 4,
    image: '/images/gallery/debi-blackwork-1.jpg',
    title: 'Bold Blackwork',
    artist: 'Debi',
    style: 'Blackwork',
    date: '2024-06',
    featured: false,
  },
  {
    id: 5,
    image: '/images/gallery/debi-tribal-1.jpg',
    title: 'New Tribal Design',
    artist: 'Debi',
    style: 'Tribal',
    date: '2024-05',
    featured: true,
  },
  {
    id: 6,
    image: '/images/gallery/debi-fineline-1.jpg',
    title: 'Fineline Detail',
    artist: 'Debi',
    style: 'Fineline',
    date: '2024-04',
    featured: false,
  },
  {
    id: 7,
    image: '/images/gallery/debi-lettering-1.jpg',
    title: 'Custom Lettering',
    artist: 'Debi',
    style: 'Lettering',
    date: '2024-03',
    featured: true,
  },
  {
    id: 8,
    image: '/images/gallery/debi-biomechanic-1.jpg',
    title: 'Biomechanic Art',
    artist: 'Debi',
    style: 'Biomechanic',
    date: '2024-02',
    featured: false,
  },
  {
    id: 9,
    image: '/images/gallery/debi-linework-1.jpg',
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
    image: '/images/gallery/loui-linework-floral.jpg',
    title: 'Floral Linework - 1.5h €350',
    artist: 'Loui',
    style: 'Linework',
    date: '2024-07',
    featured: true,
  },
  {
    id: 13,
    image: '/images/gallery/loui-portrait-1.jpg',
    title: 'Portrait Realism',
    artist: 'Loui',
    style: 'Realism',
    date: '2024-06',
    featured: false,
  },
  {
    id: 14,
    image: '/images/gallery/loui-realistic-2.jpg',
    title: 'Detailed Realistic Work',
    artist: 'Loui',
    style: 'Realism',
    date: '2024-05',
    featured: true,
  },
  {
    id: 15,
    image: '/images/gallery/loui-blackgrey-1.jpg',
    title: 'Black & Grey Portrait',
    artist: 'Loui',
    style: 'Black & Gray',
    date: '2024-04',
    featured: false,
  },

  // Luz (Eli Luquez) - Modern Realism
  {
    id: 16,
    image: '/images/gallery/luz-realistic-1.jpg',
    title: 'Modern Realism',
    artist: 'Eli Luquez',
    style: 'Realism',
    date: '2024-09',
    featured: true,
  },
  {
    id: 17,
    image: '/images/gallery/luz-realistic-2.jpg',
    title: 'Realistic Detail',
    artist: 'Eli Luquez',
    style: 'Realism',
    date: '2024-08',
    featured: false,
  },
  {
    id: 18,
    image: '/images/gallery/luz-detailed-1.jpg',
    title: 'Intricate Detail Work',
    artist: 'Eli Luquez',
    style: 'Fineline',
    date: '2024-07',
    featured: true,
  },
  {
    id: 19,
    image: '/images/gallery/luz-work-1.jpg',
    title: 'Fine Detail Tattoo',
    artist: 'Eli Luquez',
    style: 'Fineline',
    date: '2024-06',
    featured: false,
  },

  // Mix with numbered placeholders for variety
  {
    id: 20,
    image: '/images/gallery/tattoo-1.jpg',
    title: 'Studio Work',
    artist: 'Debi',
    style: 'Mixed',
    date: '2024-03',
    featured: false,
  },
  {
    id: 21,
    image: '/images/gallery/tattoo-5.jpg',
    title: 'Custom Design',
    artist: 'Loui',
    style: 'Custom',
    date: '2024-02',
    featured: true,
  },
  {
    id: 22,
    image: '/images/gallery/tattoo-10.jpg',
    title: 'Unique Piece',
    artist: 'Eli Luquez',
    style: 'Custom',
    date: '2024-01',
    featured: false,
  },
  {
    id: 23,
    image: '/images/gallery/tattoo-15.jpg',
    title: 'Creative Work',
    artist: 'Debi',
    style: 'Mixed',
    date: '2023-12',
    featured: true,
  },
  {
    id: 24,
    image: '/images/gallery/tattoo-20.jpg',
    title: 'Artistic Expression',
    artist: 'Loui',
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
              <h1 className='typo-h1 text-[#D4AF37]'>
                {t('gallery.title')}
              </h1>
              <p className='typo-subtitle text-[#C0C0C0]'>
                {t('gallery.subtitle')}
              </p>
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
                  {t('gallery.filters.reset')}
                </button>
              </div>
            ) : (
              <>
                {/* Photo Grid - 4 columns desktop, 2 tablet, 1 mobile */}
                <div className='responsive-grid cols-4-desktop gap-8 lg:gap-8'>
                  <AnimatePresence mode='popLayout'>
                    {displayedItems.map((item, index) => {
                      // Fade effect for 3rd row (items 9-12, indices 8-11) when not showing all
                      const isInFadedRow = !showAllPhotos && index >= 8 && index < 12;

                      return (
                        <motion.div
                          key={item.id}
                          initial={
                            prefersReducedMotion.current
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 20 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={
                            prefersReducedMotion.current ? { duration: 0 } : { duration: 0.3 }
                          }
                          className={`group relative cursor-pointer overflow-hidden rounded-xl bg-black/20 hover:shadow-gold-glow transition-all duration-300 ${
                            isInFadedRow ? 'opacity-30 hover:opacity-50' : ''
                          }`}
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
                            <div className='absolute top-3 right-3 bg-[#D4AF37] text-[#1A1A1A] px-2 py-1 rounded-full text-xs font-bold inline-flex items-center justify-center shadow-md'>
                              Featured
                            </div>
                          )}

                          {/* Gold Ring on Hover */}
                          <div className='absolute inset-0 ring-2 ring-transparent group-hover:ring-[#C19B26] transition-all duration-300 rounded-xl flex flex-col h-full' />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Load More Button - Chrome glow, 20% opacity */}
                {!showAllPhotos && hasMorePhotos && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoadMoreVisible ? 1 : 0, y: isLoadMoreVisible ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                    className='flex justify-center mt-16'
                  >
                    <button
                      ref={loadMoreRef}
                      onClick={() => setShowAllPhotos(true)}
                      className='group px-8 py-8 rounded-lg bg-transparent border-2 border-[#C0C0C0] text-[#C0C0C0] font-inter font-semibold text-lg hover:border-[#C19B26] hover:text-[#C19B26] transition-all duration-300 flex items-center gap-0'
                      style={{
                        boxShadow: '0 0 16px rgba(192, 192, 192, 0.3)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 24px rgba(193, 155, 38, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 16px rgba(192, 192, 192, 0.3)';
                      }}
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
        </section>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              {...animationConfig}
              className='fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8'
              onClick={() => setSelectedImage(null)}
            >
              <button
                ref={closeButtonRef}
                onClick={() => setSelectedImage(null)}
                className='absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 transition duration-200 ease-out'
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
                  className='absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 transition duration-200 ease-out'
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
                  className='absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 transition duration-200 ease-out'
                  aria-label='Next image'
                >
                  <ChevronRight size={24} />
                </button>
              )}

              <div
                ref={dialogRef}
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
                    prefersReducedMotion.current ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }
                  }
                  animate={{ x: 0, opacity: 1 }}
                  transition={prefersReducedMotion.current ? { duration: 0 } : { delay: 0.1 }}
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
