"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// ===========================================
// ANIMATION CONSTANTS (tattoo gun mechanical vibe)
// ===========================================
const ANIMATION = {
  // Durations (ms)
  SNAP_DURATION: 0.6,        // 600ms - stagger+snap frame movement
  BLUR_DURATION: 0.4,        // 400ms - blur/focus transitions
  REVEAL_DURATION: 0.8,      // 800ms - chrome border reveal
  TEXT_DELAY: 0.2,           // 200ms - delay before text fade starts
  TEXT_FADE: 0.3,            // 300ms - text fade-in duration
  STAGGER_OFFSET: 0.1,       // 100ms - stagger between frames
  
  // Spring config for elastic overshoot (tattoo gun vibe)
  SNAP_SPRING: {
    type: "spring" as const,
    damping: 12,              // Lower = more bounce
    stiffness: 100,           // Controls speed
    mass: 0.8,                // Inertia feel
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
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // ===========================================
  // BACKGROUND SHIFT: #0a0a0a → #1a1a1c on scroll
  // ===========================================
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#0a0a0a", "#141416", "#1a1a1c"]
  );
  
  // Spring-smoothed background for fluid feel
  const smoothBackground = useSpring(backgroundColor, { stiffness: 100, damping: 30 });

  const springConfig = ANIMATION.SMOOTH_SPRING;

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-130, 920]),
    springConfig
  );
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  
  return (
    <motion.div
      ref={ref}
      style={{ 
        height: '180vh', 
        perspective: '1000px', 
        transformStyle: 'preserve-3d',
        // Background shift: scroll-linked color transition
        background: prefersReducedMotion ? '#0a0a0a' : undefined,
      }}
      className="hero-section pb-ma-md antialiased relative flex flex-col self-auto overflow-hidden"
    >
      {/* Background shift layer - animated with scroll */}
      {!prefersReducedMotion && (
        <motion.div 
          className="absolute inset-0 -z-10"
          style={{ backgroundColor: smoothBackground }}
        />
      )}
      <Header opacity={prefersReducedMotion ? 1 : heroOpacity} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 mb-12">
          {firstRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              index={index}
              rowIndex={0}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-12 space-x-12">
          {secondRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
              index={index}
              rowIndex={1}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12">
          {thirdRow.map((product, index) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              index={index}
              rowIndex={2}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const Header = ({
  opacity,
}: {
  opacity: MotionValue<number> | number;
}) => {
  const { t: _t } = useLanguage();
  
  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-center justify-center px-(--space-2)"
      style={{ opacity, transform: 'translateY(calc(-1.2 * var(--space-8)))' }}
    >
      <div className="max-w-7xl w-full flex flex-col items-center text-center gap-(--space-6)" style={{ transform: 'translateY(-500px)' }}>
        {/* Heading - design system typography */}
        <h1
          className="font-headline text-(length:--heading-hero-fluid) font-bold tracking-tight leading-tight text-brand-accent"
        >
Wo andere Perfektion anstreben, spielen wir damit. Jedes Genre. Jeden Tag. Seit 1994.
        </h1>
        
        {/* Subtext - design system typography */}
        <p 
          className="max-w-2xl text-luxury-text-inverse-muted"
          style={{
            fontSize: 'clamp(var(--space-2), 3vw, var(--text-lg))',
            lineHeight: 'var(--line-height-normal)',
            fontWeight: 'var(--font-weight-normal)',
          }}
        >
30 YEARS, 30,000 TATTOOS, AND ALMOST EVERY GENRE OTHERS FOLLOW TRENDS, BUT IN OUR SALOON, WE CREATE MADNESS AND WE PLAY WITH EXCELLENCE TO BRING YOUR VISION TO LIFE
        </p>

        <div className="pt-(--space-2)">
          <a
            href="/booking"
            className="inline-flex items-center justify-center px-(--space-4) py-(--space-2) bg-luxury-accent-chrome text-luxury-text-primary font-medium rounded-lg transition-all duration-300 hover:bg-luxury-accent-chrome-hover hover:shadow-chrome-glow touch-feedback focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxury-accent-chrome"
            style={{
              fontSize: 'var(--text-body)',
              minHeight: 'var(--touch-target-min)',
            }}
          >
Let's Talk About It
          </a>
        </div>
      </div>
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
  const prefersReducedMotion = useReducedMotion();

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
                setTimeout(() => {
                  setIsRevealed(true);
                }, prefersReducedMotion ? 0 : 600);
              }
              
              // Text fade: 200ms AFTER frame settles (T=800ms total)
              setTimeout(() => {
                setShowText(true);
              }, prefersReducedMotion ? 0 : 800);
            }
          }
        });
      },
      { 
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '-10% 0px -10% 0px'
      }
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

  // Depth blur + chrome glow: inline styles for reliable application
  const frameStyles: React.CSSProperties = prefersReducedMotion
    ? {
        // No filter effects for reduced motion, keep chrome glow
        border: '2px solid #C0C0C0',
        boxShadow: '0 0 20px rgba(192, 192, 192, 0.3)',
      }
    : isActive
      ? {
          // Active: sharp, chrome border + glow
          filter: 'blur(0) brightness(1)',
          opacity: 1,
          border: '2px solid #C0C0C0',
          boxShadow: '0 0 20px rgba(192, 192, 192, 0.3)',
          transition: 'filter 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms ease-out',
        }
      : {
          // Inactive: blurred + darkened
          filter: 'blur(4px) brightness(0.7)',
          opacity: 0.6,
          border: '1px solid rgba(192, 192, 192, 0.2)',
          boxShadow: 'none',
          transition: 'filter 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms ease-out',
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
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate={isAligned ? "visible" : "hidden"}
      variants={snapVariants}
      transition={prefersReducedMotion ? { duration: 0 } : {
        ...ANIMATION.SNAP_SPRING,
        delay: staggerDelay,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className={`group/product h-96 w-96 relative shrink-0 rounded-lg overflow-hidden ${revealClass}`}
      data-revealed={isRevealed}
      data-aligned={isAligned}
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <picture>
          <source type="image/avif" srcSet={avifSrcSet} sizes="400px" />
          <source type="image/webp" srcSet={webpSrcSet} sizes="400px" />
          <img
            src={product.fallbackSrc ? encodeURI(product.fallbackSrc) : encodeURI(`${product.thumbnail}-640w.webp`)}
            height="600"
            width="600"
            className="object-cover object-top-left absolute h-full w-full inset-0"
            alt={product.title}
            loading={product.priority ? "eager" : "lazy"}
            decoding="async"
          />
        </picture>
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-luxury-bg-dark pointer-events-none"></div>
      {/* Text with 200ms delayed fade-in after frame settles */}
      <h2 
        className="absolute bottom-4 left-4 text-luxury-text-inverse transition-opacity duration-300"
        style={{ 
          opacity: showText ? 1 : 0,
          transitionDelay: showText ? '0ms' : '0ms',
        }}
      >
        {product.title}
      </h2>
    </motion.div>
  );
};
