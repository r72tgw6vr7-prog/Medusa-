import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import Footer from '../components/Footer';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/gallery-grid.css';

interface ManifestImage {
  id: string;
  category: string;
  artist?: string;
  src: string;
  srcset: Record<string, string>;
  alt: string;
}

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  artist: string;
  style: string;
  date: string;
  featured?: boolean;
}

interface Manifest {
  images: ManifestImage[];
}

export const EnhancedGalleryPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const allArtistsLabel = t('gallery.filters.allArtists');
  const allStylesLabel = t('gallery.filters.allStyles');
  const allYearsLabel = t('gallery.filters.allYears');
  
  // Fetch gallery manifest
  useEffect(() => {
    // Fetch the manifest.json file from the new asset structure
    fetch('/assets/data/manifest.json')
      .then(response => response.json())
      .then((data: Manifest) => {
        
        // Convert manifest images to gallery items
        const items: GalleryItem[] = data.images.map((img, index) => {
          // Extract style from the image path or use category as fallback
          const style = img.category.charAt(0).toUpperCase() + img.category.slice(1);
          
          // Use the highest resolution image available
          const imageUrl = img.src;
          
          return {
            id: index + 1,
            image: imageUrl,
            title: img.alt,
            artist: img.artist || 'Unknown',
            style: style,
            date: '2024-' + (12 - (index % 12)).toString().padStart(2, '0'), // Generate a fake date
            featured: index % 3 === 0 // Mark every third item as featured
          };
        });
        
        setGalleryItems(items);
      })
      .catch(error => {
        console.error('Error loading gallery manifest:', error);
        // Fallback to empty array if manifest can't be loaded
        setGalleryItems([]);
      });
  }, []);

  const [filterArtist, setFilterArtist] = useState<string>(allArtistsLabel);
  const [filterStyle, setFilterStyle] = useState<string>(allStylesLabel);
  const [filterYear, setFilterYear] = useState<string>(allYearsLabel);
  const [showArtistDropdown, setShowArtistDropdown] = useState(false);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false);

  // i18n-aware unique lists wrapped in useMemo to avoid re-creation on each render
  const i18nUniqueArtists = useMemo(() => [
    allArtistsLabel,
    ...Array.from(new Set(galleryItems.map((item) => item.artist))),
  ], [allArtistsLabel, galleryItems]);
  
  const i18nUniqueStyles = useMemo(() => [
    allStylesLabel,
    ...Array.from(new Set(galleryItems.map((item) => item.style))),
  ], [allStylesLabel, galleryItems]);
  
  const i18nUniqueYears = useMemo(() => [
    allYearsLabel,
    ...Array.from(new Set(galleryItems.map((item) => item.date.substring(0, 4))))
      .sort((a: string, b: string) => b.localeCompare(a)) // Use localeCompare for reliable sorting
  ], [allYearsLabel, galleryItems]);

  // Focus management refs
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
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
      <div className='min-h-screen'>
        <MainNavigation />
        <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

        {/* Unified heading section applied: matches ServicesPageInteractive styling */}
        <section className='relative z-10 section-padding-lg'>
          <div className='responsive-container safe-area-padding'>
            <div className='text-center'>
              <h1 className='typo-h1 text-[var(--brand-gold)]'>{t('gallery.title')}</h1>
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
        <section className='section-padding relative z-10'>
          <div className='responsive-container safe-area-padding'>
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-8 items-center justify-between mb-8">
              <div className="flex flex-wrap gap-0">
                <button
                  onClick={resetFilters}
                  className="px-8 py-0 bg-[var(--brand-gold)]/10 border-2 border-[var(--brand-gold)] text-[var(--brand-gold)] font-medium transition-all duration-300 rounded-lg hover:bg-[var(--brand-gold)]/20"
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
                        ? 'bg-[var(--brand-gold)] text-[var(--deep-black)] border-2 border-[var(--brand-gold)]'
                        : 'bg-white/5 text-white border-2 border-white/10 hover:border-[var(--brand-gold-hover)]/30'
                    }`}
                  >
                    {filterArtist}
                  </button>
                  {showArtistDropdown && (
                    <div className="absolute top-full mt-0 left-0 bg-black/80 backdrop-blur-sm border border-[var(--brand-gold)]/20 rounded-lg shadow-lg z-100 min-w-[200px]">
                      {i18nUniqueArtists.map((artist: string) => (
                        <button
                          key={artist}
                          onClick={() => {
                            setFilterArtist(artist);
                            setShowArtistDropdown(false);
                          }}
                          className="block w-full text-left px-8 py-0 text-white hover:bg-[var(--brand-gold-hover)]/10 transition-colors first:rounded-t-lg last:rounded-b-lg transition duration-200 ease-out"
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
                        ? 'bg-[var(--brand-gold)] text-[var(--deep-black)] border-2 border-[var(--brand-gold)]'
                        : 'bg-white/5 text-white border-2 border-white/10 hover:border-[var(--brand-gold-hover)]/30'
                    }`}
                  >
                    {filterStyle}
                  </button>
                  {showStyleDropdown && (
                    <div className="absolute top-full mt-0 left-0 bg-black/80 backdrop-blur-sm border border-[var(--brand-gold)]/20 rounded-lg shadow-lg z-100 min-w-[200px] max-h-[400px] overflow-y-auto">
                      {i18nUniqueStyles.map((style: string) => (
                        <button
                          key={style}
                          onClick={() => {
                            setFilterStyle(style);
                            setShowStyleDropdown(false);
                          }}
                          className="block w-full text-left px-8 py-0 text-white hover:bg-[var(--brand-gold-hover)]/10 transition-colors first:rounded-t-lg last:rounded-b-lg transition duration-200 ease-out"
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
                        ? 'bg-[var(--brand-gold)] text-[var(--deep-black)] border-2 border-[var(--brand-gold)]'
                        : 'bg-white/5 text-white border-2 border-white/10 hover:border-[var(--brand-gold-hover)]/30'
                    }`}
                  >
                    {filterYear}
                  </button>
                  {showYearDropdown && (
                    <div className="absolute top-full mt-0 left-0 bg-black/80 backdrop-blur-sm border border-[var(--brand-gold)]/20 rounded-lg shadow-lg z-100 min-w-[150px]">
                      {i18nUniqueYears.map((year: string) => (
                        <button
                          key={year}
                          onClick={() => {
                            setFilterYear(year);
                            setShowYearDropdown(false);
                          }}
                          className="block w-full text-left px-8 py-0 text-white hover:bg-[var(--brand-gold-hover)]/10 transition-colors first:rounded-t-lg last:rounded-b-lg transition duration-200 ease-out"
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
                  className="px-8 py-0 rounded-lg bg-red-500/10 border-2 border-red-500/30 text-red-400 hover:bg-red-500/20 font-medium transition-all duration-300"
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
                  className="px-8 py-8 bg-[var(--brand-gold)] text-[#1A1A1A] font-medium hover:bg-[var(--brand-gold-hover)] transition-colors rounded-lg transition duration-200 ease-out"
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
                        <p className="text-[var(--brand-gold)] font-medium">{item.artist}</p>
                        <p className="text-white/70 text-sm">{item.style}</p>
                        {item.featured && (
                          <span className="inline-block mt-0 px-0 py-0 rounded-full bg-[var(--brand-gold)] text-[var(--deep-black)] text-xs font-bold flex flex-col h-full">
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
                      className="group inline-flex items-center gap-0 px-8 py-8 bg-[var(--brand-gold)] text-[var(--deep-black)] font-medium hover:bg-[var(--brand-gold-hover)] transition-colors rounded-lg transition duration-200 ease-out"
                    >
                      <span>{t('gallery.filters.more')}</span>
                      <ChevronRight
                        size={20}
                        className="transition-transform group-hover:translate-x-1 transition duration-200 ease-out"
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
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                {...dialogAnimationConfig}
                className="relative bg-black/90 backdrop-blur-md rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  ref={closeButtonRef}
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-0 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10 transition duration-200 ease-out"
                  aria-label="Close lightbox"
                >
                  <X size={24} />
                </button>

                {/* Navigation Buttons */}
                {currentIndex > 0 && (
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-0 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10 transition duration-200 ease-out"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {currentIndex < filteredItems.length - 1 && (
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-0 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10 transition duration-200 ease-out"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}

                {/* Image and Details */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="aspect-square overflow-hidden rounded-lg flex flex-col h-full">
                    <ImageWithFallback
                      src={selectedImage.image}
                      alt={`${selectedImage.title} by ${selectedImage.artist}`}
                      className="w-full h-full object-cover"
                      fallback="/images/placeholder-tattoo.jpg"
                    />
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-0">{selectedImage.title}</h2>
                      <p className="text-[var(--brand-gold)] text-lg font-medium">{selectedImage.artist}</p>
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-center gap-0">
                        <span className="text-white/60 text-sm">Stil:</span>
                        <span className="px-0 py-0 rounded-full bg-[var(--brand-gold)]/10 border border-[var(--brand-gold)]/20 text-[var(--brand-gold)] text-sm flex flex-col h-full">
                          {selectedImage.style}
                        </span>
                      </div>
                      <div className="flex items-center gap-0">
                        <span className="text-white/60 text-sm">Datum:</span>
                        <span className="text-white text-sm">
                          {new Date(selectedImage.date).toLocaleDateString('de-DE', {
                            year: 'numeric',
                            month: 'long',
                          })}
                        </span>
                      </div>
                      {selectedImage.featured && (
                        <div className="flex items-center gap-0">
                          <span className="px-0 py-0 rounded-full bg-[var(--brand-gold)] text-[var(--deep-black)] text-xs font-bold flex flex-col h-full">
                            Featured Work
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-8 border-t border-white/10 flex flex-col h-full">
                      <button
                        onClick={() => (window.location.href = '/booking')}
                        className="w-full py-8 px-8 rounded-lg bg-[var(--brand-gold)] text-[var(--deep-black)] hover:bg-[var(--brand-gold)]/90 transition-colors font-bold text-lg shadow-lg shadow-[var(--brand-gold)]/20 flex flex-col h-full transition duration-200 ease-out"
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