'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export type Card = {
  id: number;
  title: string;
  thumbnail: string;
  fallbackSrc?: string;
  className?: string;
  content: React.ReactNode;
};

interface LayoutGridProps {
  cards: Card[];
}

export function LayoutGrid({ cards }: LayoutGridProps) {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect reduced motion preference and touch device
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    // Detect touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Track mouse position for spotlight effect
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || isTouchDevice) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    },
    [prefersReducedMotion, isTouchDevice],
  );

  const handleClick = useCallback(
    (card: Card) => {
      setLastSelected(selected);
      setSelected(card);
    },
    [selected],
  );

  const handleOutsideClick = useCallback(() => {
    setLastSelected(selected);
    setSelected(null);
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleOutsideClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, handleOutsideClick]);

  // Spotlight disabled for reduced motion or touch devices
  const overlayEnabled = !prefersReducedMotion && !isTouchDevice;
  const spotlightEnabled = overlayEnabled && isHovering;

  return (
    <div
      ref={containerRef}
      className='w-full h-full px-4 md:px-6 py-6 md:py-8 relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      role='presentation'
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={
        {
          background: 'var(--bg-page)',
          gap: 'var(--space-2)',
          '--spotlight-x': `${mousePos.x}px`,
          '--spotlight-y': `${mousePos.y}px`,
          '--spotlight-size': '280px',
        } as React.CSSProperties
      }
    >
      {/* Default dim overlay (80%) always on; spotlight reveals on hover */}
      <div
        className={cn(
          'void-overlay pointer-events-none absolute inset-0 z-30 transition-[mask-image,opacity] duration-300',
          overlayEnabled ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          background: overlayEnabled ? 'rgba(var(--color-surface-darker-rgb), 0.8)' : 'transparent',
          maskImage: spotlightEnabled
            ? `radial-gradient(circle var(--spotlight-size) at var(--spotlight-x) var(--spotlight-y), transparent 0%, transparent 45%, #000 65%, #000 100%)`
            : undefined,
          WebkitMaskImage: spotlightEnabled
            ? `radial-gradient(circle var(--spotlight-size) at var(--spotlight-x) var(--spotlight-y), transparent 0%, transparent 45%, #000 65%, #000 100%)`
            : undefined,
        }}
        aria-hidden='true'
      />

      {cards.map((card, i) => (
        <div key={i} className={cn('relative', card.className)}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              'gallery-frame relative overflow-hidden cursor-pointer',
              'aspect-square rounded-xl w-full',
              'border border-(--card-border)',
              'transition-all duration-300 ease-out',
              'hover:-translate-y-1 hover:shadow-(--shadow-xl)',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2',
              lastSelected?.id === card.id ? 'z-40' : '',
            )}
            style={{
              boxShadow: 'var(--surface-card-shadow)',
              background: 'transparent',
            }}
            layoutId={`card-${card.id}`}
            tabIndex={0}
            role='button'
            aria-label={`View ${card.title}`}
            onKeyDown={(e) => e.key === 'Enter' && handleClick(card)}
          >
            <div className='relative block h-full w-full'>
              <ImageComponent card={card} />
            </div>
          </motion.div>
        </div>
      ))}
      <AnimatePresence>
        {selected && (
          <motion.div
            onClick={handleOutsideClick}
            className='fixed inset-0 z-modal flex items-center justify-center bg-black/80 p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role='dialog'
            aria-modal='true'
            aria-label={selected.title}
          >
            <motion.div
              layoutId={`card-${selected.id}`}
              className='relative w-full max-w-5xl overflow-hidden rounded-2xl border border-(--card-border) bg-luxury-bg-dark shadow-(--shadow-xl)'
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type='button'
                onClick={handleOutsideClick}
                className='absolute right-4 top-4 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors duration-200 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-chrome)'
                style={{ width: '44px', height: '44px' }}
                aria-label='Close'
              >
                ×
              </button>
              <div className='relative w-full' style={{ aspectRatio: '16 / 9' }}>
                <motion.img
                  layoutId={`image-${selected.id}-image`}
                  src={selected.thumbnail}
                  onError={(e) => {
                    if (selected.fallbackSrc && e.currentTarget.src !== selected.fallbackSrc) {
                      e.currentTarget.src = selected.fallbackSrc;
                    }
                  }}
                  alt={selected.title}
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
              <div className='p-6 md:p-8'>
                <SelectedCard selected={selected} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ImageComponent = ({ card }: { card: Card }) => {
  const [imageSrc, setImageSrc] = useState(card.thumbnail);

  const handleError = () => {
    if (card.fallbackSrc && imageSrc !== card.fallbackSrc) {
      setImageSrc(card.fallbackSrc);
    }
  };

  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={imageSrc}
      onError={handleError}
      alt={card.title}
      className='object-fill object-top absolute inset-0 h-full w-full transition duration-200'
      loading='lazy'
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card }) => {
  return (
    <div className='bg-transparent w-full flex flex-col justify-end rounded-lg relative z-dropdown'>
      <motion.div
        layoutId={`content-${selected.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='relative z-dropdown'
      >
        {selected.content}
      </motion.div>
    </div>
  );
};
