import React, { useState, useEffect } from 'react';
import '../styles/StudioShowcase.css';

// Use optimized assets from the new consolidated structure
// These are the 3 most important studio images
const studioImages = [
  '/assets/images/photos/studio/img3914.webp',
  '/assets/images/photos/studio/img3947.webp',
  '/assets/images/photos/studio/img4031.webp',
];

export const StudioShowcase: React.FC = () => {
  // State for managing the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === studioImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className='relative w-full studio-showcase h-[350px] md:h-[450px] lg:h-[600px] mb-0 overflow-hidden'
      aria-label='Studio Interior Showcase'
    >
      {/* Background image carousel */}
      <div className='absolute inset-0'>
        {studioImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out studio-carousel-image ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${src})` }}
            role='img'
            aria-label={`Medusa Tattoo Studio Interior - Image ${index + 1}`}
          />
        ))}
      </div>

      {/* MEDUSA overlay with readability background */}
      <div className='absolute inset-0 flex items-center justify-center bg-black/30 z-10 pointer-events-none'>
        <h1
          className='font-playfair text-5xl md:text-6xl lg:text-8xl font-bold text-[var(--brand-gold)] tracking-widest medusa-logo'
          aria-label='Medusa Tattoo Studio'
        >
          MEDUSA
        </h1>
      </div>

      {/* Content container (kept for optional tagline and dots) */}
      <div className='relative h-full flex flex-col items-center justify-center z-20'>
        {/* Navigation dots - absolute bottom centered */}
        <div className='flex space-x-0 absolute bottom-8 left-1/2 -translate-x-1/2'>
          {studioImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-[var(--brand-gold)]'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`View studio image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioShowcase;
