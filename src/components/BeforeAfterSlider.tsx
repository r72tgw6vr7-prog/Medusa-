// ============================================
// COMPONENT: BeforeAfterSlider
// ============================================
// PURPOSE: Draggable before/after image comparison slider
// FEATURES: Gold handle (44px), clip-path reveal, 60fps smooth drag

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeSrc?: string;
  afterSrc?: string;
  labelBefore?: string;
  labelAfter?: string;
  heading?: string;
  initial?: number; // 0..100
  aspect?: string; // CSS aspect-ratio value e.g. '16/9'
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeSrc = '/images/gallery/restoration-before.jpg',
  afterSrc = '/images/gallery/restoration-after.jpg',
  labelBefore = 'Vorher',
  labelAfter = 'Nachher',
  heading = 'Vorher & Nachher',
  initial = 50,
  aspect = '16/9',
} = {}) => {
  const [sliderPosition, setSliderPosition] = useState(initial);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    let next = sliderPosition;
    const step = 5;
    if (e.key === 'ArrowLeft') {
      next = Math.max(0, sliderPosition - step);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      next = Math.min(100, sliderPosition + step);
      e.preventDefault();
    } else if (e.key === 'Home') {
      next = 0;
      e.preventDefault();
    } else if (e.key === 'End') {
      next = 100;
      e.preventDefault();
    }
    if (next !== sliderPosition) setSliderPosition(next);
  };

  return (
    <section className='py-16 px-8 sm:px-8 lg:px-8 bg-[#222222]'>
      <div className='max-w-[1104px] mx-auto'>
        {/* Section Title */}
        <div className='text-center mb-16'>
          <h2
            id='vorher-nachher-heading'
            className='font-playfair text-3xl md:text-4xl lg:text-5xl font-semibold text-[#D4AF37] mb-8'
          >
            {heading}
          </h2>
          <p className='font-inter text-base md:text-lg text-[#C0C0C0] max-w-[700px] mx-auto'>
            Sehen Sie die beeindruckende Transformation unserer Cover-Up und Restaurationsarbeiten
          </p>
        </div>

        {/* Before/After Slider */}
        <div
          ref={containerRef}
          className='relative w-full rounded-2xl overflow-hidden cursor-ew-resize select-none'
          style={{ aspectRatio: aspect }}
          role='region'
          aria-labelledby='vorher-nachher-heading'
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* After Image (Right) - Full width */}
          <div className='absolute inset-0'>
            <img
              src={afterSrc}
              alt={labelAfter}
              className='w-full h-full object-cover'
              loading='lazy'
              decoding='async'
              sizes='100vw'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder-tattoo.jpg';
              }}
            />
            {/* After Label */}
            <div className='absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-8 py-0 rounded-lg'>
              <span className='font-inter text-sm font-medium text-white'>{labelAfter}</span>
            </div>
          </div>

          {/* Before Image (Left) - Clipped by slider position */}
          <div
            className='absolute inset-0'
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={beforeSrc}
              alt={labelBefore}
              className='w-full h-full object-cover'
              loading='lazy'
              decoding='async'
              sizes='100vw'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder-tattoo.jpg';
              }}
            />
            {/* Before Label */}
            <div className='absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-8 py-0 rounded-lg'>
              <span className='font-inter text-sm font-medium text-white'>{labelBefore}</span>
            </div>
          </div>

          {/* Slider Handle - Gold circle with vertical line */}
          <div
            className='absolute top-0 bottom-0 w-1 bg-[#D4AF37] pointer-events-none'
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Draggable Handle - 44px diameter for touch target */}
            <button
              type='button'
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/50 flex items-center justify-center cursor-ew-resize pointer-events-auto'
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              onKeyDown={handleKeyDown}
              role='slider'
              aria-label='Vorher/Nachher-Regler'
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPosition)}
              aria-describedby='vorher-nachher-heading'
            >
              {/* Left/Right Arrows */}
              <div className='flex items-center gap-0.5'>
                <ChevronLeft size={16} className='text-[#1A1A1A]' />
                <ChevronRight size={16} className='text-[#1A1A1A]' />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
