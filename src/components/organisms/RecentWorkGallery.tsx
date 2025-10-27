import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { useMedusaDesignSystem } from '../../../src/foundation/SimpleMedusaProvider';
import { getFeaturedPortfolio } from '../../data/imageData';
import { getImageProps } from '../../utils/imageUtils';

interface GalleryImage {
  id: string;
  src: string;
  artist: string;
  style: string;
  description: {
    DE: string;
    EN: string;
  };
  isHero?: boolean;
}

interface RecentWorkGalleryProps {}

export function RecentWorkGallery({}: RecentWorkGalleryProps) {
  const { language } = useMedusaDesignSystem();
  const [activeFilter, setActiveFilter] = useState<'all' | 'style' | 'artist'>('all');
  const [styleFilter, setStyleFilter] = useState<string>('all');
  const [artistFilter, setArtistFilter] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const content = {
    DE: {
      headline: 'Unsere Arbeiten',
      subtitle:
        'Eine kuratierte Auswahl unserer neuesten Meisterwerke – Von traditionell bis hyperrealistisch',
      filterAll: 'Alle',
      filterStyle: 'Stil',
      filterArtist: 'Künstler',
      instagramCta: 'Mehr auf Instagram',
      lightboxClose: 'Galerie schließen',
      lightboxPrev: 'Vorheriges Bild',
      lightboxNext: 'Nächstes Bild',
    },
    EN: {
      headline: 'Our Work',
      subtitle:
        'A curated selection of our latest masterpieces – From traditional to hyperrealistic',
      filterAll: 'All',
      filterStyle: 'Style',
      filterArtist: 'Artist',
      instagramCta: 'More on Instagram',
      lightboxClose: 'Close gallery',
      lightboxPrev: 'Previous image',
      lightboxNext: 'Next image',
    },
  };

  const t = content[language];

  // Get portfolio images from centralized data source
  const portfolioData = getFeaturedPortfolio();

  // Transform portfolio data to gallery format
  const galleryImages: GalleryImage[] = portfolioData.map((item, index) => ({
    id: item.id,
    src: item.src,
    artist: item.artist,
    style: item.style,
    description: {
      DE: `${item.category === 'tattoo' ? 'Tattoo-Artwork' : 'Piercing-Arbeit'} von ${item.artist}`,
      EN: `${item.category === 'tattoo' ? 'Tattoo artwork' : 'Piercing work'} by ${item.artist}`,
    },
    isHero: index === 0,
  }));

  // Get unique styles and artists for filters
  const uniqueStyles = Array.from(new Set(galleryImages.map((img) => img.style)));
  const uniqueArtists = Array.from(new Set(galleryImages.map((img) => img.artist)));

  // Filter images based on active filters
  const filteredImages = galleryImages.filter((img) => {
    if (styleFilter !== 'all' && img.style !== styleFilter) return false;
    if (artistFilter !== 'all' && img.artist !== artistFilter) return false;
    return true;
  });

  // Visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const navigateLightbox = useCallback(
    (direction: 'prev' | 'next') => {
      const newIndex =
        direction === 'prev'
          ? (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
          : (lightboxIndex + 1) % filteredImages.length;

      setLightboxIndex(newIndex);
      setLightboxImage(filteredImages[newIndex]);
    },
    [lightboxIndex, filteredImages],
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;

      if (e.key === 'Escape') {
        setLightboxImage(null);
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, navigateLightbox]);

  const openLightbox = (image: GalleryImage) => {
    setLightboxImage(image);
    setLightboxIndex(filteredImages.findIndex((img) => img.id === image.id));
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section
      ref={sectionRef}
      className='relative bg-brand-background py-32 overflow-hidden'
      aria-label={t.headline}
    >
      {/* Background Enhancement */}
      <div className='absolute inset-0 bg-linear-to-b from-brand-background via-brand-background/95 to-brand-background'></div>

      <div className='relative responsive-container safe-area-padding'>
        {/* Section Header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-headline-lg font-headline text-brand-gold mb-8'>{t.headline}</h2>
          <p className='text-body-large font-body text-brand-chrome max-w-2xl mx-auto'>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Sticky Filter Bar */}
        <motion.div
          className='sticky top-24 z-40 mb-16'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className='nav-glassmorphic rounded-2xl p-8 border border-brand-gold/20'>
            {/* Luxury Filter System - Perfect Mobile Alignment */}
            <div className='luxury-filter-container'>
              {/* Primary All Filter - Gold & Prominent */}
              <button
                onClick={() => {
                  setStyleFilter('all');
                  setArtistFilter('all');
                  setActiveFilter('all');
                }}
                className={`luxury-filter-control luxury-filter-clean ${
                  activeFilter === 'all' && styleFilter === 'all' && artistFilter === 'all'
                    ? 'luxury-filter-primary'
                    : 'luxury-filter-secondary'
                }`}
                aria-label='Show all tattoo work'
              >
                <span className='luxury-filter-text'>{t.filterAll}</span>
              </button>

              {/* Style Filter - Clean Dropdown */}
              <div className='luxury-filter-group'>
                <select
                  value={styleFilter}
                  onChange={(e) => {
                    setStyleFilter(e.target.value);
                    setActiveFilter('style');
                  }}
                  className={`luxury-filter-control luxury-filter-select luxury-filter-clean ${
                    styleFilter !== 'all'
                      ? 'luxury-filter-secondary active'
                      : 'luxury-filter-secondary'
                  }`}
                  aria-label='Filter by tattoo style'
                >
                  <option value='all'>{t.filterAll} Styles</option>
                  {uniqueStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              {/* Artist Filter - Clean Dropdown */}
              <div className='luxury-filter-group'>
                <select
                  value={artistFilter}
                  onChange={(e) => {
                    setArtistFilter(e.target.value);
                    setActiveFilter('artist');
                  }}
                  className={`luxury-filter-control luxury-filter-select luxury-filter-clean ${
                    artistFilter !== 'all'
                      ? 'luxury-filter-secondary active'
                      : 'luxury-filter-secondary'
                  }`}
                  aria-label='Filter by artist'
                >
                  <option value='all'>{t.filterAll} Artists</option>
                  {uniqueArtists.map((artist) => (
                    <option key={artist} value={artist}>
                      {artist}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid - Masonry Layout: 32px gaps, 520px large / 244px small */}
        <motion.div
          className='portfolio-masonry-grid mb-16'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, auto)',
            gap: '32px',
            justifyContent: 'center',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <AnimatePresence mode='wait'>
            {filteredImages.slice(0, 12).map((image, index) => {
              // Determine if this should be a large image (first column of rows 1-3)
              // Large images: index 0, 3, 6 (rows 1-3, first column)
              // Small images: all others
              const isLarge = index === 0 || index === 3 || index === 6;
              const imageSize = isLarge ? '520px' : '244px';

              return (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className='group cursor-pointer relative overflow-hidden rounded-2xl flex flex-col h-full'
                  style={{
                    width: imageSize,
                    height: imageSize,
                    gridColumn: isLarge && index % 3 === 0 ? 'span 1' : 'auto',
                    gridRow: isLarge ? 'span 2' : 'span 1',
                  }}
                  onClick={() => openLightbox(image)}
                >
                  {/* Image Container */}
                  <div className='relative w-full h-full overflow-hidden bg-brand-background/50 flex flex-col'>
                    <img
                      {...getImageProps(image.src, `${image.artist} - ${image.style} work`, {
                        sizes: isLarge
                          ? '(max-width: 768px) 100vw, 520px'
                          : '(max-width: 768px) 100vw, 244px',
                        priority: index < 3, // Load first 3 images eagerly
                      })}
                      className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110'
                    />

                    {/* Hover Overlay */}
                    <div className='absolute inset-0 bg-linear-to-t from-brand-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col h-full'>
                      <div className='absolute bottom-0 left-0 right-0 p-8'>
                        <p className='text-brand-gold font-body text-sm mb-0'>{image.artist}</p>
                        <p className='text-brand-chrome font-body text-body-small'>{image.style}</p>
                      </div>
                    </div>

                    {/* Gold Border on Hover */}
                    <div className='absolute inset-0 border-2 border-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl flex flex-col h-full'></div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          className='text-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href='https://instagram.com/medusatattoo'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-0 text-brand-gold hover:text-brand-chrome transition-colors duration-300 font-body text-lg group'
          >
            <Instagram className='w-6 h-6 group-hover:scale-110 transition-transform duration-300' />
            {t.instagramCta}
          </a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/90'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className='relative max-w-4xl max-h-[90vh] mx-8 text-center'>
              <motion.img
                {...getImageProps(lightboxImage.src, lightboxImage.description[language], {
                  sizes: '100vw',
                  priority: true, // Lightbox images should load eagerly
                })}
                className='max-w-full max-h-[70vh] object-contain rounded-lg'
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              />

              <div className='mt-8 text-left'>
                <h3 className='text-2xl font-headline text-brand-gold mb-0'>
                  {lightboxImage.artist}
                </h3>
                <p className='text-body font-body text-brand-chrome'>{lightboxImage.style}</p>
                <p className='text-body-small font-body text-brand-white max-w-md'>
                  {lightboxImage.description[language]}
                </p>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('prev');
                }}
                className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 bg-brand-gold/20 hover:bg-brand-gold/40 border border-brand-gold/40 rounded-full flex items-center justify-center text-brand-gold transition-all duration-300'
                aria-label={t.lightboxPrev}
              >
                <ChevronLeft className='w-6 h-6' />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('next');
                }}
                className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 bg-brand-gold/20 hover:bg-brand-gold/40 border border-brand-gold/40 rounded-full flex items-center justify-center text-brand-gold transition-all duration-300'
                aria-label={t.lightboxNext}
              >
                <ChevronRight className='w-6 h-6' />
              </button>

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className='absolute -top-8 -right-8 w-10 h-10 bg-brand-gold/20 hover:bg-brand-gold/40 border border-brand-gold/40 rounded-full flex items-center justify-center text-brand-gold transition-all duration-300'
                aria-label={t.lightboxClose}
              >
                <X className='w-5 h-5' />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
