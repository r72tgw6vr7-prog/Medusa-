// ============================================
// COMPONENT: StudioHero
// ============================================
// PURPOSE: A full-width hero section that provides an overview of the tattoo studio, featuring an image slider and key statistics to build trust and highlight professionalism.
//
// DESIGN SPECIFICATIONS:
// ----------------------
// Layout:
//   - Container: A full-width container with a dark background (`w-full bg-black`).
//   - Main Content Block: Centered text block with a main heading and subheading. Use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
//   - Image Slider: A full-width image carousel directly below the text block. The slider should show one image at a time with subtle navigation controls (arrows on the sides).
//   - Stats Bar: A full-width bar below the slider containing five key statistics. It should be centered and use a flexbox layout with gaps between items. `flex justify-center items-center gap-x-12 py-8`.
//   - CTA Block: A final text block at the bottom to guide users to the services section.

import React, { useState, useEffect } from 'react';
import {
  Award,
  ShieldCheck,
  Droplets,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// ============================================
// DATA STRUCTURES
// ============================================

const stats = [
  { icon: Award, label: '25+ Jahre' },
  { icon: ShieldCheck, label: '100% Hygiene' },
  { icon: Droplets, label: 'EU-REACH Farben' },
  { icon: Users, label: '10,000+ Kunden' },
  { icon: Clock, label: '5 min U/S-Bahn' },
];

const sliderImages = [
  { src: '/images/studio/studio-interior-1.webp', alt: 'Interior of Medusa Tattoo Studio' },
  { src: '/images/studio/studio-interior-2.webp', alt: 'Close-up of tattoo equipment' },
  { src: '/images/studio/studio-interior-3.webp', alt: 'Another view of the studio waiting area' },
  { src: '/images/studio/studio3876.webp', alt: 'Medusa Studio professional workspace' },
  { src: '/images/studio/studio3947.webp', alt: 'Studio reception area' },
  { src: '/images/studio/studio3994.webp', alt: 'Tattoo artist workstation' },
];

// ============================================
// COMPONENT
// ============================================

export const StudioHero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  return (
    <section className='w-full bg-deep-black'>
      {/* Main Content Block */}
      <div className='max-w-7xl mx-auto px-8 sm:px-8 lg:px-8 pt-16 pb-16 text-center'>
        <h2 className='font-headline text-5xl md:text-6xl lg:text-7xl text-brand-gold mb-8'>
          Unser Studio
        </h2>
        <p className='font-body text-lg text-brand-chrome max-w-3xl mx-auto leading-relaxed'>
          Willkommen im Medusa Tattoo Studio – Ihrem professionellen Tattoo- und Piercing-Studio im
          Herzen Münchens. Mit über 25 Jahren Erfahrung, höchsten Hygienestandards und
          EU-zertifizierten Farben bieten wir Ihnen erstklassige Kunstwerke in einer sauberen,
          professionellen Umgebung.
        </p>
      </div>

      {/* Image Slider - FIXED: Aspect ratio container to prevent ceiling cropping */}
      <div className='relative w-full aspect-[16/7] max-h-[600px] overflow-hidden group'>
        {/* Images */}
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className='w-full h-full object-cover'
              style={{
                objectPosition: 'center center',
              }}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Navigation Arrows - Visible on hover */}
        <button
          onClick={goToPrevious}
          className='absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:border hover:border-brand-gold transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-transparent z-10'
          aria-label='Previous image'
        >
          <ChevronLeft className='w-6 h-6 text-white' />
        </button>

        <button
          onClick={goToNext}
          className='absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:border hover:border-brand-gold transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-transparent z-10'
          aria-label='Next image'
        >
          <ChevronRight className='w-6 h-6 text-white' />
        </button>

        {/* Slide Indicator Dots */}
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-0 z-10'>
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-brand-gold w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className='w-full bg-black py-8 md:py-16'>
        <div className='max-w-7xl mx-auto px-8'>
          <div className='grid grid-cols-5 items-center justify-items-center gap-8 md:gap-16'>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className='flex flex-col items-center gap-0 group cursor-default transition-all duration-300'
                >
                  <IconComponent
                    className='w-8 h-8 text-brand-gold group-hover:text-white transition-colors duration-300'
                    strokeWidth={1.5}
                  />
                  <span className='font-body text-sm font-medium text-brand-chrome group-hover:text-white transition-colors duration-300'>
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Block */}
      <div className='max-w-7xl mx-auto px-8 sm:px-8 lg:px-8 py-16 text-center'>
        <h3 className='font-headline text-3xl md:text-4xl text-brand-gold mb-8'>
          Alle Services Entdecken
        </h3>
        <p className='font-body text-lg text-brand-chrome max-w-3xl mx-auto leading-relaxed'>
          Von individuellen Tattoo-Designs bis hin zu professionellem Piercing – entdecken Sie unser
          vollständiges Angebot an Dienstleistungen und finden Sie den perfekten Stil für Ihre
          Körperkunst.
        </p>
      </div>
    </section>
  );
};

export default StudioHero;
