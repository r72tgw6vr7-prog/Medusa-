'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';

// ===========================================
// ANIMATION CONSTANTS (tattoo gun mechanical vibe)
// ===========================================
const ANIMATION = {
  // Durations (ms)
  SNAP_DURATION: 0.6, // 600ms - stagger+snap frame movement
  BLUR_DURATION: 0.4, // 400ms - blur/focus transitions
  REVEAL_DURATION: 0.8, // 800ms - chrome border reveal
  TEXT_DELAY: 0.2, // 200ms - delay before text fade starts
  TEXT_FADE: 0.3, // 300ms - text fade-in duration
  STAGGER_OFFSET: 0.1, // 100ms - stagger between frames

  // Spring config for elastic overshoot (tattoo gun vibe)
  SNAP_SPRING: {
    type: 'spring' as const,
    damping: 12, // Lower = more bounce
    stiffness: 100, // Controls speed
    mass: 0.8, // Inertia feel
  },

  // Standard spring for smooth transforms
  SMOOTH_SPRING: { stiffness: 300, damping: 30, bounce: 100 },
};

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const isMobileViewport =
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false;

  const mobileFirstRow = products.slice(0, 4);
  const mobileSecondRow = products.slice(4, 8);
  const mobileThirdRow = products.slice(8, 12);
  const mobileFourthRow = products.slice(12, 16);

  const row0Products = isMobileViewport ? mobileFirstRow : firstRow;
  const row1Products = isMobileViewport ? mobileSecondRow : secondRow;
  const row2Products = isMobileViewport ? mobileThirdRow : thirdRow;
  const row3Products = mobileFourthRow;

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const { scrollY } = useScroll();
  const prefersReducedMotion = false;

  // ===========================================
  // UNIFIED BACKGROUND: deep-black (matches Artist page)
  // ===========================================
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['var(--deep-black)', 'var(--deep-black)', 'var(--deep-black)'],
  );

  const springConfig = ANIMATION.SMOOTH_SPRING;

  const translateXAmount = isMobileViewport ? 520 : 1000;

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, translateXAmount]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -translateXAmount]),
    springConfig,
  );
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], isMobileViewport ? [-130, 620] : [-130, 920]),
    springConfig,
  );
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={
        {
          height: 'var(--hero-height)',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          // Unified background: canonical dark value
          background: prefersReducedMotion ? 'var(--deep-black)' : undefined,
          '--hero-height': '180vh',
          '--hero-header-shift': 'calc(-1.2 * var(--space-8))',
          '--hero-text-force-offset': 'calc(var(--space-12) + var(--space-0-5))',
          '--hero-scroll-lift': 'calc(-1 * (var(--space-12) + var(--space-0-5)))',
          '--hero-text-force-height': 'calc(100% - var(--hero-text-force-offset))',
        } as React.CSSProperties
      }
      className='hero-section pb-ma-md antialiased relative flex flex-col self-auto overflow-x-clip [--hero-mobile-extra-offset:0px] max-md:[--hero-height:160vh] max-sm:[--hero-height:150vh] max-md:[--hero-header-shift:0px] max-sm:[--hero-text-force-offset:90px] max-md:[--hero-scroll-lift:calc(-1 * (var(--space-12) + var(--space-0-5) + 50px))] max-sm:[--hero-scroll-lift:calc(-1 * (var(--space-10) + 50px))] max-md:min-[430px]:[--hero-text-force-offset:110px] max-md:min-[430px]:[--hero-scroll-lift:-160px] max-sm:[--hero-mobile-extra-offset:200px] max-md:pb-6'
    >
      {/* Background shift layer - animated with scroll */}
      {!prefersReducedMotion && (
        <motion.div className='absolute inset-0 -z-10' style={{ backgroundColor }} />
      )}
      <Header opacity={prefersReducedMotion ? 1 : heroOpacity} />
      <div className='max-md:translate-y-[calc(var(--hero-scroll-lift)+var(--hero-mobile-extra-offset))]'>
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
          className=''
        >
          <motion.div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-12 mb-12 max-md:flex max-md:flex-nowrap max-md:items-center max-md:justify-start max-md:gap-4 max-md:mb-4 max-md:px-0 max-sm:gap-4 max-sm:mb-4'>
            {row0Products.map((product, index) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
                index={index}
                rowIndex={0}
              />
            ))}
          </motion.div>
          <motion.div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-12 mb-12 max-md:flex max-md:flex-nowrap max-md:flex-row-reverse max-md:items-center max-md:justify-start max-md:gap-4 max-md:mb-4 max-md:px-0 max-sm:gap-4 max-sm:mb-4'>
            {row1Products.map((product, index) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={product.title}
                index={index}
                rowIndex={1}
              />
            ))}
          </motion.div>
          <motion.div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-12 max-md:flex max-md:flex-nowrap max-md:items-center max-md:justify-start max-md:gap-4 max-md:px-0 max-sm:gap-4'>
            {row2Products.map((product, index) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
                index={index}
                rowIndex={2}
              />
            ))}
          </motion.div>
          {isMobileViewport && row3Products.length > 0 && (
            <motion.div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-12 mt-12 max-md:flex max-md:flex-nowrap max-md:flex-row-reverse max-md:items-center max-md:justify-start max-md:gap-4 max-md:mt-4 max-md:px-0 max-sm:gap-4 max-sm:mt-4'>
              {row3Products.map((product, index) => (
                <ProductCard
                  product={product}
                  translate={translateXReverse}
                  key={product.title}
                  index={index}
                  rowIndex={3}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Header = ({ opacity }: { opacity: MotionValue<number> | number }) => {
  const isMobileViewport =
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false;

  return (
    <motion.div
      className='absolute inset-0 z-20 flex items-center justify-center px-(--space-2) pointer-events-none max-md:items-start max-md:justify-start'
      style={{ opacity, transform: 'translateY(var(--hero-header-shift))' }}
    >
      {!isMobileViewport ? (
        <div
          className='max-w-7xl w-full flex flex-col items-center text-center gap-(--space-6) pointer-events-auto max-md:hidden'
          style={{ transform: 'translateY(-500px)' }}
        >
          {/* Heading - design system typography */}
          <h1 className='hero-text-glow font-headline tracking-tight leading-tight text-brand-accent'>
            <span className='text-(length:--text-h1) font-bold'>
              Wo andere Perfektion anstreben, spielen wir damit.
            </span>{' '}
            <span className='text-(length:--text-h2) font-normal opacity-90'>
              Jedes Genre. Jeden Tag.
            </span>{' '}
            <span className='text-(length:--text-h3) font-light opacity-70'>Seit 1994.</span>
          </h1>

          {/* Subtext - design system typography */}
          <p className='max-w-2xl text-luxury-text-inverse-muted text-(length:--text-lg) leading-(--line-height-normal) font-body font-normal'>
            30 JAHRE, 30.000 TATTOOS UND FAST JEDES GENRE. Andere folgen Trends – wir erschaffen
            sie. Wir bringen Ihre Vision mit Präzision und Leidenschaft zum Leben.
          </p>

          <div className='pt-(--space-2)'>
            <a
              href='/booking'
              className='inline-flex items-center justify-center px-(--space-4) py-(--space-2) bg-white text-deep-black font-medium rounded-lg transition-all duration-300 hover:bg-white/90 hover:shadow-chrome-glow touch-feedback focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxury-accent-chrome text-(length:--text-body)'
              style={{
                minHeight: 'var(--touch-target-min)',
              }}
            >
              Lass uns darüber reden
            </a>
          </div>
        </div>
      ) : (
        <div className='hidden max-md:flex absolute top-0 left-0 right-0 flex-col items-center justify-start pointer-events-none max-md:h-(--hero-text-force-height)'>
          <div className='w-full flex flex-col items-center text-center gap-(--space-6) px-(--space-2) pointer-events-auto max-md:pt-(--hero-text-force-offset)!'>
            {/* Heading - design system typography */}
            <h1 className='hero-text-glow font-headline tracking-tight leading-tight text-brand-accent'>
              <span className='text-(length:--text-h1) font-bold'>
                Wo andere Perfektion anstreben, spielen wir damit.
              </span>{' '}
              <span className='text-(length:--text-h2) font-normal opacity-90'>
                Jedes Genre. Jeden Tag.
              </span>{' '}
              <span className='text-(length:--text-h3) font-light opacity-70'>Seit 1994.</span>
            </h1>

            {/* Subtext - design system typography */}
            <p className='max-w-2xl text-luxury-text-inverse-muted text-(length:--text-lg) leading-(--line-height-normal) font-body font-normal'>
              30 JAHRE, 30.000 TATTOOS UND FAST JEDES GENRE. Andere folgen Trends – wir erschaffen
              sie. Wir bringen Ihre Vision mit Präzision und Leidenschaft zum Leben.
            </p>

            <div className='pt-(--space-2)'>
              <a
                href='/booking'
                className='inline-flex items-center justify-center px-(--space-4) py-(--space-2) bg-white text-deep-black font-medium rounded-lg transition-all duration-300 hover:bg-white/90 hover:shadow-chrome-glow touch-feedback focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxury-accent-chrome text-(length:--text-body)'
                style={{
                  minHeight: 'var(--touch-target-min)',
                }}
              >
                Lass uns darüber reden
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export const ProductCard = ({
  product,
  translate,
  index = 0,
  rowIndex = 0,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
    fallbackSrc?: string;
    priority?: boolean;
  };
  translate: MotionValue<number>;
  index?: number;
  rowIndex?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAligned, setIsAligned] = useState(false);
  const [showText, setShowText] = useState(false);
  const prefersReducedMotion = false;

  // Calculate stagger delay based on position (100ms per frame)
  const staggerDelay = (rowIndex * 5 + index) * ANIMATION.STAGGER_OFFSET;

  // ===========================================
  // ANIMATION TIMELINE ORCHESTRATION
  // T=0ms:      Frame enters viewport, snap begins
  // T=0-600ms:  Frame snaps with elastic overshoot
  // T=400ms:    Depth blur activates on inactive frames
  // T=600ms:    Frame settles, Chrome Reveal starts
  // T=800ms:    Text fade delay begins (200ms after settle)
  // T=1100ms:   Text fully visible
  // T=1400ms:   Chrome border fully revealed
  // ===========================================

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Active state: more than 50% visible in viewport center
          const isInCenter = entry.intersectionRatio > 0.5;
          setIsActive(isInCenter);

          // Alignment detection: trigger snap + reveal sequence
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            if (!isAligned) {
              setIsAligned(true);

              // Chrome reveal: trigger after snap settles (600ms)
              if (!isRevealed) {
                setTimeout(
                  () => {
                    setIsRevealed(true);
                  },
                  prefersReducedMotion ? 0 : 600,
                );
              }

              // Text fade: 200ms AFTER frame settles (T=800ms total)
              setTimeout(
                () => {
                  setShowText(true);
                },
                prefersReducedMotion ? 0 : 800,
              );
            }
          }
        });
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '-10% 0px -10% 0px',
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isRevealed, isAligned, prefersReducedMotion]);

  // Performance: manage will-change
  useEffect(() => {
    const element = cardRef.current;
    if (!element || prefersReducedMotion) return;

    // Add will-change before animations
    element.style.willChange = 'transform, filter, opacity';

    // Remove after all animations complete (~1500ms)
    const cleanup = setTimeout(() => {
      if (element) element.style.willChange = 'auto';
    }, 1500);

    return () => clearTimeout(cleanup);
  }, [isAligned, prefersReducedMotion]);

  // Generate responsive image sources for optimized images
  const sizes = [400, 640, 960];
  const avifSrcSet = sizes
    .map((size) => `${encodeURI(`${product.thumbnail}-${size}w.avif`)} ${size}w`)
    .join(', ');
  const webpSrcSet = sizes
    .map((size) => `${encodeURI(`${product.thumbnail}-${size}w.webp`)} ${size}w`)
    .join(', ');

  // Determine CSS classes based on state
  const revealClass = isRevealed ? 'chrome-border-reveal revealed' : 'chrome-border-reveal';
  const isHeroLcpCandidate = product.priority === true && rowIndex === 0 && index === 0;

  // Depth blur + chrome glow: inline styles for reliable application
  const frameStyles: React.CSSProperties = prefersReducedMotion
    ? {
        // No filter effects for reduced motion, keep chrome glow
        border: '2px solid var(--accent-chrome)',
        boxShadow: '0 0 20px rgba(var(--accent-chrome-rgb), 0.3)',
      }
    : isActive
      ? {
          // Active: sharp, chrome border + glow
          filter: 'blur(0) brightness(1)',
          opacity: 1,
          border: '2px solid var(--accent-chrome)',
          boxShadow: '0 0 20px rgba(var(--accent-chrome-rgb), 0.3)',
          transition:
            'filter 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms ease-out',
        }
      : {
          // Inactive: blurred + darkened
          filter: 'blur(4px) brightness(0.7)',
          opacity: 0.6,
          border: '1px solid rgba(var(--accent-chrome-rgb), 0.2)',
          boxShadow: 'none',
          transition:
            'filter 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms ease-out',
        };

  // Framer Motion variants for stagger+snap with elastic overshoot
  const snapVariants = {
    hidden: {
      scale: 0.95,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        x: translate,
        ...frameStyles,
      }}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={isAligned ? 'visible' : 'hidden'}
      variants={snapVariants}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              ...ANIMATION.SNAP_SPRING,
              delay: staggerDelay,
            }
      }
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className={`group/product aspect-square w-full relative rounded-lg overflow-hidden ${revealClass} max-md:w-[100px] max-md:flex-none`}
      data-revealed={isRevealed}
      data-aligned={isAligned}
    >
      <a href={product.link} className='block group-hover/product:shadow-2xl'>
        <picture>
          <source type='image/avif' srcSet={avifSrcSet} sizes='(max-width: 767px) 100px, 400px' />
          <source type='image/webp' srcSet={webpSrcSet} sizes='(max-width: 767px) 100px, 400px' />
          <img
            src={encodeURI(`${product.thumbnail}-400w.webp`)}
            height='600'
            width='600'
            className='max-w-full object-cover object-top-left absolute h-full w-full inset-0'
            alt={product.title}
            loading={isHeroLcpCandidate ? 'eager' : 'lazy'}
            fetchPriority={isHeroLcpCandidate ? 'high' : 'low'}
            decoding='async'
            onError={(e) => {
              if (!product.fallbackSrc) return;
              const target = e.target as HTMLImageElement;
              const currentSrc = target.getAttribute('src');
              const nextSrc = encodeURI(product.fallbackSrc);
              if (currentSrc !== nextSrc) {
                target.setAttribute('src', nextSrc);
              }
            }}
          />
        </picture>
      </a>
      <div className='absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-luxury-bg-dark pointer-events-none'></div>
      {/* Text with 200ms delayed fade-in after frame settles */}
      <p
        className='absolute bottom-4 left-4 text-luxury-text-inverse transition-opacity duration-300'
        style={{
          opacity: showText ? 1 : 0,
          transitionDelay: showText ? '0ms' : '0ms',
        }}
      >
        {product.title}
      </p>
    </motion.div>
  );
};
