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
  }
];

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

        {/* Gallery Content */}
        <section className='section-padding'>
          <div className='responsive-container safe-area-padding'>
            {/* Filter Controls */}
            <div className='flex flex-wrap gap-4 items-center justify-between mb-8'>
              <div className='flex flex-wrap gap-2'>
                <button
                  onClick={resetFilters}
                  className='px-6 py-3 bg-[#D4AF37]/10 border-2 border-[#D4AF37] text-[#D4AF37] font-medium transition-all duration-300 rounded-lg hover:bg-[#D4AF37]/20'
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
                    className={`px-6 py-3 font-medium transition-all duration-300 rounded-lg ${
                      filterArtist !== allArtistsLabel
                        ? 'bg-[#D4AF37] text-[#222222] border-2 border-[#D4AF37]'
                        : 'bg-white/5 text-white border-2 border-white/10 hover:border-[#C19B26]/30'
                    }`}
                  >
                    {filterArtist}
                  </button>
                  {showArtistDropdown && (
                    <div className='absolute top-full mt-2 left-0 bg-[#2A2A2A] border border-[#D4AF37]/20 rounded-lg shadow-lg z-[100] min-w-[200px]'>
                      {i18nUniqueArtists.map((artist) => (
                        <button
                          key={artist}
                          onClick={() => {
                            setFilterArtist(artist);
                            setShowArtistDropdown(false);
                          }}
                          className='block w-full text-left px-4 py-2 text-white hover:bg-[#C19B26]/10 transition-colors first:rounded-t-lg last:rounded-b-lg'
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
                    className={`px-6 py-3 font-medium transition-all duration-300 rounded-lg ${
                      filterStyle !== allStylesLabel
                        ? 'bg-[#D4AF37] text-[#222222] border-2 border-[#D4AF37]'
                        : 'bg-white/5 text-white border-2 border-white/10 hover:border-[#C19B26]/30'
                    }`}
                  >
                    {filterStyle}
                  </button>
                  {showStyleDropdown && (
                    <div className='absolute top-full mt-2 left-0 bg-[#2A2A2A] border border-[#D4AF37]/20 rounded-lg shadow-lg z-[100] min-w-[200px] max-h-[400px] overflow-y-auto'>
                      {i18nUniqueStyles.map((style) => (
                        <button
                          key={style}
                          onClick={() => {
                            setFilterStyle(style);
                            setShowStyleDropdown(false);
                          }}
                          className='block w-full text-left px-4 py-2 text-white hover:bg-[#C19B26]/10 transition-colors first:rounded-t-lg last:rounded-b-lg'
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
                    className={`px-6 py-3 font-medium transition-all duration-300 rounded-lg ${
                      filterYear !== allYearsLabel
                        ? 'bg-[#D4AF37] text-[#222222] border-2 border-[#D4AF37]'
                        : 'bg-white/5 text-white border-2 border-white/10 hover:border-[#C19B26]/30'
                    }`}
                  >
                    {filterYear}
                  </button>
                  {showYearDropdown && (
                    <div className='absolute top-full mt-2 left-0 bg-[#2A2A2A] border border-[#D4AF37]/20 rounded-lg shadow-lg z-[100] min-w-[150px]'>
                      {i18nUniqueYears.map((year) => (
                        <button
                          key={year}
                          onClick={() => {
                            setFilterYear(year);
                            setShowYearDropdown(false);
                          }}
                          className='block w-full text-left px-4 py-2 text-white hover:bg-[#C19B26]/10 transition-colors first:rounded-t-lg last:rounded-b-lg'
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
                  className='px-4 py-2 rounded-lg bg-red-500/10 border-2 border-red-500/30 text-red-400 hover:bg-red-500/20 font-medium transition-all duration-300'
                >
                  Filter zurücksetzen
                </button>
              )}
            </div>

            <div className='text-white/60 text-sm mb-8'>
              {filteredItems.length} von {galleryItems.length} Kunstwerken
            </div>

            {filteredItems.length === 0 ? (
              <div className='text-center py-24'>
                <p className='text-xl text-[#C0C0C0] mb-8'>{t('gallery.noResults')}</p>
                <button
                  onClick={resetFilters}
                  className='px-8 py-4 bg-[#D4AF37] text-[#1A1A1A] font-medium hover:bg-[#C19B26] transition-colors rounded-lg'
                >
                  {t('gallery.filters.reset')}
                </button>
              </div>
            ) : (
              <>
                {/* Gallery Grid */}
                <div className='gallery-grid'>
                  {displayedItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      {...animationConfig}
                      className={`gallery-item ${
                        !showAllPhotos && index >= 8 && index < 12 ? 'opacity-50' : ''
                      }`}
                      onClick={() => setSelectedImage(item)}
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={`${item.title} by ${item.artist}`}
                        className="gallery-image"
                        fallback="/images/placeholder-tattoo.jpg"
                        loading={index > 4 ? 'lazy' : 'eager'}
                      />
                      <div className="gallery-overlay">
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        <p className="text-[#D4AF37] font-medium">{item.artist}</p>
                        <p className="text-white/70 text-sm">{item.style}</p>
                        {item.featured && (
                          <span className="inline-block mt-2 px-2 py-1 rounded-full bg-[#D4AF37] text-[#222222] text-xs font-bold">
                            Featured
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMorePhotos && !showAllPhotos && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoadMoreVisible ? 1 : 0, y: isLoadMoreVisible ? 0 : 20 }}
                    className="text-center mt-16"
                  >
                    <button
                      ref={loadMoreRef}
                      onClick={() => setShowAllPhotos(true)}
                      className="group inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#222222] font-medium hover:bg-[#C19B26] transition-colors rounded-lg"
                    >
                      <span>{t('gallery.filters.more')}</span>
                      <ChevronRight
                        size={20}
                        className='transition-transform group-hover:translate-x-1'
                      />
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              ref={dialogRef}
              {...animationConfig}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                {...dialogAnimationConfig}
                className="relative bg-[#222222] rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  ref={closeButtonRef}
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                  aria-label="Close lightbox"
                >
                  <X size={24} />
                </button>

                {/* Navigation Buttons */}
                {currentIndex > 0 && (
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {currentIndex < filteredItems.length - 1 && (
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}

                {/* Image and Details */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={selectedImage.image}
                      alt={`${selectedImage.title} by ${selectedImage.artist}`}
                      className="w-full h-full object-cover"
                      fallback="/images/placeholder-tattoo.jpg"
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                      <p className="text-[#D4AF37] text-lg font-medium">{selectedImage.artist}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white/60 text-sm">Stil:</span>
                        <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm">
                          {selectedImage.style}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/60 text-sm">Datum:</span>
                        <span className="text-white text-sm">
                          {new Date(selectedImage.date).toLocaleDateString('de-DE', {
                            year: 'numeric',
                            month: 'long',
                          })}
                        </span>
                      </div>
                      {selectedImage.featured && (
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#222222] text-xs font-bold">
                            Featured Work
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <button
                        onClick={() => (window.location.href = '/booking')}
                        className="w-full py-4 px-8 rounded-lg bg-[#D4AF37] text-[#222222] hover:bg-[#D4AF37]/90 transition-colors font-bold text-lg shadow-lg shadow-[#D4AF37]/20"
                      >
                        Termin buchen
                      </button>
                    </div>

                    <div className="text-white/40 text-xs text-center">
                      {currentIndex + 1} von {filteredItems.length}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </MotionConfig>
  );
};

export default EnhancedGalleryPage;