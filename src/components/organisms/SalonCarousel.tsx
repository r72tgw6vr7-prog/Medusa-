import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDrag } from '@use-gesture/react';
import salonMainLevel from 'figma:asset/4ba4b5ee79fffa380a84277c61b38f32ff42ec37.png';
import salonUpperLevel from 'figma:asset/45cd1fc2ed6614d86b0670b0fd926d0269967146.png';
import salonTreatmentRoom from 'figma:asset/5a6857c9f59f892552b7bcbe4ad205d96df76db8.png';
import salonEnvironment1 from 'figma:asset/895ac0a94078e8a7cdf5f7e2f4e31a66ea5c6fae.png';
import salonEnvironment2 from 'figma:asset/18d7dc765a127cfdd40662c47bde9b6355824894.png';
import { useMedusaDesignSystem } from '../../foundation';

interface SalonImage {
  /** Source URL of the image */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional caption */
  caption?: string;
}

export interface SalonCarouselProps {
  /** Images to display in carousel */
  images?: SalonImage[];
  /** Enable autoplay functionality */
  autoplay?: boolean;
  /** Interval for autoplay in milliseconds */
  autoplayInterval?: number;
  /** Whether to pause autoplay on hover */
  pauseOnHover?: boolean;
  /** Callback when slide changes */
  onSlideChange?: (index: number) => void;
  /** Whether to display navigation arrows */
  showArrows?: boolean;
  /** Whether to display indicator dots */
  showIndicators?: boolean;
  /** Whether to enable keyboard navigation */
  keyboardNavigation?: boolean;
  /** Custom CSS class name */
  className?: string;
  /** Custom heading text */
  heading?: string;
}

export function SalonCarousel({
  images,
  autoplay = true,
  autoplayInterval = 5000,
  pauseOnHover = true,
  onSlideChange,
  showArrows = true,
  showIndicators = true,
  keyboardNavigation = true,
  className = '',
  heading = 'MEDUSA',
}: SalonCarouselProps) {
  // Get language from Medusa design system
  const { language } = useMedusaDesignSystem();

  // Default salon images if none provided
  const defaultSalonImages: SalonImage[] = [
    {
      src: salonMainLevel,
      alt: 'Medusa Salon main level with elegant spiral staircase and professional workstations',
      caption: language === 'DE' ? 'Hauptbereich des Medusa Salons' : 'Medusa Salon Main Area',
    },
    {
      src: salonUpperLevel,
      alt: 'Medusa Salon upper level workspace with modern equipment and comfortable seating',
      caption: language === 'DE' ? 'Obere Ebene des Salons' : 'Salon Upper Level',
    },
    {
      src: salonTreatmentRoom,
      alt: 'Professional treatment room with premium equipment and luxury finishes',
      caption:
        language === 'DE' ? 'Professioneller Behandlungsraum' : 'Professional Treatment Room',
    },
    {
      src: salonEnvironment1,
      alt: 'Medusa Salon sophisticated interior with premium atmosphere and modern design',
      caption: language === 'DE' ? 'Elegantes Salon-Interieur' : 'Sophisticated Salon Interior',
    },
    {
      src: salonEnvironment2,
      alt: 'Medusa Salon luxury environment showcasing professional workspace and elegant ambiance',
      caption: language === 'DE' ? 'Luxuriöse Salonumgebung' : 'Luxury Salon Environment',
    },
  ];

  // Use provided images or fallback to default
  const salonImages = images || defaultSalonImages;

  // States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Callback handlers for slide navigation
  const nextSlide = useCallback(() => {
    const nextIndex = (currentSlide + 1) % salonImages.length;
    setCurrentSlide(nextIndex);
    if (onSlideChange) onSlideChange(nextIndex);
  }, [currentSlide, salonImages.length, onSlideChange]);

  const prevSlide = useCallback(() => {
    const prevIndex = (currentSlide - 1 + salonImages.length) % salonImages.length;
    setCurrentSlide(prevIndex);
    if (onSlideChange) onSlideChange(prevIndex);
  }, [currentSlide, salonImages.length, onSlideChange]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      if (onSlideChange) onSlideChange(index);
    },
    [onSlideChange],
  );

  // Handle intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle autoplay
  useEffect(() => {
    if (autoplay && isVisible && !isPaused && !isFocused) {
      autoplayTimerRef.current = setInterval(() => {
        nextSlide();
      }, autoplayInterval);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, isVisible, isPaused, isFocused, autoplayInterval, nextSlide]);

  // Setup keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!keyboardNavigation || !isVisible || !isFocused) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(salonImages.length - 1);
          break;
      }
    };

    if (keyboardNavigation) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (keyboardNavigation) {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [
    keyboardNavigation,
    isVisible,
    isFocused,
    salonImages.length,
    prevSlide,
    nextSlide,
    goToSlide,
  ]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    if (pauseOnHover) setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchCurrentX = e.touches[0].clientX;
    const diff = touchStartX - touchCurrentX;

    // Use a threshold to prevent accidental swipes
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTouchStartX(touchCurrentX);
    }
  };

  const handleTouchEnd = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  // Mouse enter/leave handlers for autoplay
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (pauseOnHover) setIsPaused(false);
  };

  // Drag gesture handler
  const bind = useDrag(
    ({ down, movement: [mx], cancel, first, last }) => {
      if (first) {
        setIsGrabbing(true);
        setDragStartX(mx);
      }

      if (down) {
        setDragDelta(mx - dragStartX);

        // Cancel the gesture if user attempts to scroll vertically
        if (Math.abs(mx) > 100) {
          cancel();
        }
      } else if (last) {
        setIsGrabbing(false);

        // Determine if we should navigate based on drag distance
        if (dragDelta < -80) {
          nextSlide();
        } else if (dragDelta > 80) {
          prevSlide();
        }

        setDragDelta(0);
      }
    },
    {
      axis: 'x',
      filterTaps: true,
      bounds: { left: -300, right: 300, top: 0, bottom: 0 },
      rubberband: true,
    },
  );

  // Focus handlers
  const handleFocus = () => {
    setIsFocused(true);
    if (pauseOnHover) setIsPaused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-brand-background ${className}`}
      aria-label={language === 'DE' ? 'Salon Galerie' : 'Salon Gallery'}
      aria-roledescription='carousel'
      aria-live='polite'
    >
      {/* Header with MEDUSA title and golden glow effect */}
      <div className='relative z-20 pt-24 pb-16'>
        <div className='text-center'>
          <motion.h2
            className='text-headline-xl font-headline text-brand-gold relative inline-block'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
          >
            {heading}

            {/* Metallic Shimmer Effect */}
            <motion.div
              className='absolute inset-0 pointer-events-none'
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.015, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.h2>
        </div>
      </div>

      {/* Main Carousel Container */}
      <div
        ref={sliderRef}
        className='relative w-full overflow-hidden h-[60vh] min-h-[500px]'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        role='region'
        aria-label={language === 'DE' ? 'Bildkarussell' : 'Image carousel'}
        {...bind()}
      >
        {/* Image Slides */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            className='absolute inset-0 w-full h-full'
            initial={{ opacity: 0, x: dragDelta > 0 ? -100 : 100 }}
            animate={{
              opacity: 1,
              x: isGrabbing ? dragDelta : 0,
            }}
            exit={{ opacity: 0, x: dragDelta > 0 ? 100 : -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* Background Image */}
            <div className='relative w-full h-full'>
              <img
                src={salonImages[currentSlide].src}
                alt={salonImages[currentSlide].alt}
                className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'brightness-110 saturate-110' : ''}`}
                onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
              />

              {/* Image caption if provided */}
              {salonImages[currentSlide].caption && (
                <div className='absolute bottom-0 left-0 right-0 p-8 bg-brand-background/70 backdrop-blur-sm'>
                  <p className='text-brand-gold text-center'>{salonImages[currentSlide].caption}</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {showArrows && (
          <motion.div
            className='absolute inset-0 flex items-center justify-between px-8 pointer-events-none'
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Previous Button */}
            <motion.button
              onClick={prevSlide}
              className='pointer-events-auto bg-brand-background/60 backdrop-blur-sm border border-brand-gold/30 text-brand-gold p-0 rounded-full hover:bg-brand-gold hover:text-brand-background hover:border-brand-gold hover:scale-110 transition duration-200 ease-out'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={language === 'DE' ? 'Vorheriges Bild' : 'Previous image'}
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={nextSlide}
              className='pointer-events-auto bg-brand-background/60 backdrop-blur-sm border border-brand-gold/30 text-brand-gold p-0 rounded-full hover:bg-brand-gold hover:text-brand-background hover:border-brand-gold hover:scale-110 transition duration-200 ease-out'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={language === 'DE' ? 'Nächstes Bild' : 'Next image'}
            >
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        )}

        {/* Slide Indicators */}
        {showIndicators && (
          <motion.div
            className='absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-8 z-10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {salonImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className='relative group touch-target p-0'
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                aria-label={`${language === 'DE' ? 'Gehe zu Bild' : 'Go to slide'} ${index + 1}`}
                aria-current={currentSlide === index ? 'true' : 'false'}
              >
                {/* Diamond Indicator */}
                <div
                  className={`w-2 h-2 transform rotate-45 transition-all duration-500 ${
                    currentSlide === index ? 'bg-brand-gold' : 'bg-brand-gold/40'
                  }`}
                />
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Slide Counter */}
        <motion.div
          className='absolute top-8 right-8 z-20'
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.6 : 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className='bg-brand-background/40 backdrop-blur-sm border border-brand-chrome/20 text-brand-chrome px-0 py-0 rounded-full text-body-small font-body'>
            {String(currentSlide + 1).padStart(2, '0')} /{' '}
            {String(salonImages.length).padStart(2, '0')}
          </div>
        </motion.div>

        {/* Accessibility announcement for screen readers */}
        <div className='sr-only' aria-live='assertive' aria-atomic='true'>
          {language === 'DE'
            ? `Bild ${currentSlide + 1} von ${salonImages.length}: ${salonImages[currentSlide].alt}`
            : `Image ${currentSlide + 1} of ${salonImages.length}: ${salonImages[currentSlide].alt}`}
        </div>
      </div>
    </section>
  );
}
