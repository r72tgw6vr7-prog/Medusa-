import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageProps } from '../../utils/imageUtils';
import { IMAGE_PATHS } from '../../config/imagePaths';

interface StudioImage {
  src: string;
  alt: string;
  priority?: boolean;
}

const STUDIO_IMAGES: StudioImage[] = [
  {
    src: IMAGE_PATHS.studio.interior1,
    alt: 'Medusa Tattoo Studio München - Empfangsbereich',
    priority: true,
  },
  {
    src: IMAGE_PATHS.studio.interior2,
    alt: 'Medusa Tattoo Studio München - Tattoo Arbeitsplatz',
  },
  {
    src: IMAGE_PATHS.studio.interior3,
    alt: 'Medusa Tattoo Studio München - Wartebereich',
  },
  {
    src: IMAGE_PATHS.studio.interior1,
    alt: 'Medusa Tattoo Studio München - Piercing Bereich',
  },
  {
    src: IMAGE_PATHS.studio.interior2,
    alt: 'Medusa Tattoo Studio München - Tattoo Station',
  },
  {
    src: IMAGE_PATHS.studio.interior3,
    alt: 'Medusa Tattoo Studio München - Sterilisationsraum',
  },
  {
    src: IMAGE_PATHS.studio.interior1,
    alt: 'Medusa Tattoo Studio München - Schmuck Vitrine',
  },
  {
    src: IMAGE_PATHS.studio.interior2,
    alt: 'Medusa Tattoo Studio München - Beratungsecke',
  },
  {
    src: IMAGE_PATHS.studio.interior3,
    alt: 'Medusa Tattoo Studio München - Wartebereich Detail',
  },
  {
    src: IMAGE_PATHS.studio.interior1,
    alt: 'Medusa Tattoo Studio München - Tattoo Arbeitsplatz Detail',
  },
  {
    src: IMAGE_PATHS.studio.interior2,
    alt: 'Medusa Tattoo Studio München - Piercing Bereich Detail',
  },
  {
    src: IMAGE_PATHS.studio.interior3,
    alt: 'Medusa Tattoo Studio München - Schmuck Auswahl',
  },
  {
    src: IMAGE_PATHS.studio.interior1,
    alt: 'Medusa Tattoo Studio München - Studio Übersicht',
  },
];

const StudioCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Reference for container
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STUDIO_IMAGES.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + STUDIO_IMAGES.length) % STUDIO_IMAGES.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % STUDIO_IMAGES.length);
  };

  return (
    <section ref={containerRef} className='w-full py-16 md:py-16 overflow-hidden relative z-10'>
      {/* Section Header - Contained - EMERGENCY FIX: 40px spacing */}
      <div className='max-w-[1104px] mx-auto px-8 md:px-8 mb-8'>
        <h2 className='font-playfair text-4xl md:text-5xl font-semibold text-[var(--brand-primary)] text-center'>
          Unser Studio
        </h2>
        <p className='font-inter text-lg text-[var(--chrome-silver)] text-center mt-8'>
          Ein Blick in unser professionelles, EU-zertifiziertes Tattoo-Studio im Herzen Münchens
        </p>
      </div>

      {/* FULL-WIDTH CAROUSEL - FIXED: 16:9 aspect ratio with max height limit */}
      <div className='relative w-full'>
        {/* Main Image Container - Fixed aspect ratio 16:9 */}
        <div className='relative w-full aspect-[16/9] max-h-[80vh] overflow-hidden bg-[var(--color-surface-medium)]'>
          {/* Images */}
          {STUDIO_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                {...getImageProps(image.src, image.alt, {
                  sizes: '100vw',
                  priority: image.priority || false,
                })}
                alt={image.alt}
                className='w-full h-full object-cover'
                style={{ objectPosition: 'center center' }}
              />
              {/* Subtle Gradient Overlay - Bottom only */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none' />
            </div>
          ))}

          {/* Navigation Buttons - Brand Compliant */}
          <button
            onClick={goToPrevious}
            className='absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[rgba(var(--color-surface-darker-rgb),0.8)] backdrop-blur-sm flex items-center justify-center hover:bg-[rgba(var(--color-brand-primary-rgb),0.9)] transition-all duration-300 z-10'
            style={{ boxShadow: '0 0 16px rgba(var(--color-accent-silver-rgb), 0.3)' }}
            aria-label='Vorheriges Bild'
          >
            <ChevronLeft className='w-6 h-6 text-white' />
          </button>

          <button
            onClick={goToNext}
            className='absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[rgba(var(--color-surface-darker-rgb),0.8)] backdrop-blur-sm flex items-center justify-center hover:bg-[rgba(var(--color-brand-primary-rgb),0.9)] transition-all duration-300 z-10'
            style={{ boxShadow: '0 0 16px rgba(var(--color-accent-silver-rgb), 0.3)' }}
            aria-label='Nächstes Bild'
          >
            <ChevronRight className='w-6 h-6 text-white' />
          </button>

          {/* Counter */}
          <div className='absolute bottom-4 md:bottom-6 right-4 md:right-6 bg-[rgba(var(--color-surface-darker-rgb),0.8)] backdrop-blur-sm text-white px-8 py-0 rounded-lg font-inter text-sm font-semibold z-10'>
            {currentIndex + 1} / {STUDIO_IMAGES.length}
          </div>
        </div>

        {/* ❌ REMOVED: Dot Indicators and Thumbnail Gallery - Full-width carousel only */}
      </div>
    </section>
  );
};

export default StudioCarousel;
