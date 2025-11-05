import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageProps } from '../../utils/imageUtils';

interface StudioImage {
  src: string;
  alt: string;
  priority?: boolean;
}

const STUDIO_IMAGES: StudioImage[] = [
  {
    src: '/assets/images/photos/studio/img3876.webp',
    alt: 'Medusa Tattoo Studio München - Empfangsbereich',
    priority: true,
  },
  {
    src: '/assets/images/photos/studio/img3914.webp',
    alt: 'Medusa Tattoo Studio München - Tattoo Arbeitsplatz',
  },
  {
    src: '/assets/images/photos/studio/img3947.webp',
    alt: 'Medusa Tattoo Studio München - Wartebereich',
  },
  {
    src: '/assets/images/photos/studio/img3969.webp',
    alt: 'Medusa Tattoo Studio München - Piercing Bereich',
  },
  {
    src: '/assets/images/photos/studio/img3994.webp',
    alt: 'Medusa Tattoo Studio München - Tattoo Station',
  },
  {
    src: '/assets/images/photos/studio/img4031.webp',
    alt: 'Medusa Tattoo Studio München - Sterilisationsraum',
  },
  {
    src: '/assets/images/photos/studio/img4070.webp',
    alt: 'Medusa Tattoo Studio München - Schmuck Vitrine',
  },
  {
    src: '/assets/images/photos/studio/img4096.webp',
    alt: 'Medusa Tattoo Studio München - Beratungsecke',
  },
  {
    src: '/assets/images/photos/studio/img4120.webp',
    alt: 'Medusa Tattoo Studio München - Wartebereich Detail',
  },
  {
    src: '/assets/images/photos/studio/img4158.webp',
    alt: 'Medusa Tattoo Studio München - Tattoo Arbeitsplatz Detail',
  },
  {
    src: '/assets/images/photos/studio/img4197.webp',
    alt: 'Medusa Tattoo Studio München - Piercing Bereich Detail',
  },
  {
    src: '/assets/images/photos/studio/img4248.webp',
    alt: 'Medusa Tattoo Studio München - Schmuck Auswahl',
  },
  {
    src: '/assets/images/photos/studio/img4288.webp',
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
        <h2 className='font-playfair text-4xl md:text-5xl font-semibold text-[var(--brand-gold)] text-center'>
          Unser Studio
        </h2>
        <p className='font-inter text-lg text-[#C0C0C0] text-center mt-8'>
          Ein Blick in unser professionelles, EU-zertifiziertes Tattoo-Studio im Herzen Münchens
        </p>
      </div>

      {/* FULL-WIDTH CAROUSEL - FIXED: 16:9 aspect ratio with max height limit */}
      <div className='relative w-full'>
        {/* Main Image Container - Fixed aspect ratio 16:9 */}
        <div className='relative w-full aspect-[16/9] max-h-[80vh] overflow-hidden bg-[#1a1a1a]'>
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
            className='absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[rgba(26,26,26,0.8)] backdrop-blur-sm flex items-center justify-center hover:bg-[rgba(212,175,55,0.9)] transition-all duration-300 z-10'
            style={{ boxShadow: '0 0 16px rgba(192,192,192,0.3)' }}
            aria-label='Vorheriges Bild'
          >
            <ChevronLeft className='w-6 h-6 text-white' />
          </button>

          <button
            onClick={goToNext}
            className='absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[rgba(26,26,26,0.8)] backdrop-blur-sm flex items-center justify-center hover:bg-[rgba(212,175,55,0.9)] transition-all duration-300 z-10'
            style={{ boxShadow: '0 0 16px rgba(192,192,192,0.3)' }}
            aria-label='Nächstes Bild'
          >
            <ChevronRight className='w-6 h-6 text-white' />
          </button>

          {/* Counter */}
          <div className='absolute bottom-4 md:bottom-6 right-4 md:right-6 bg-[rgba(26,26,26,0.8)] backdrop-blur-sm text-white px-8 py-0 rounded-lg font-inter text-sm font-semibold z-10'>
            {currentIndex + 1} / {STUDIO_IMAGES.length}
          </div>
        </div>

        {/* ❌ REMOVED: Dot Indicators and Thumbnail Gallery - Full-width carousel only */}
      </div>
    </section>
  );
};

export default StudioCarousel;
