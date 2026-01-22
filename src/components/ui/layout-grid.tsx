"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || isTouchDevice) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, [prefersReducedMotion, isTouchDevice]);

  const handleClick = useCallback((card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  }, [selected]);

  const handleOutsideClick = useCallback(() => {
    setLastSelected(selected);
    setSelected(null);
  }, [selected]);

  // Spotlight disabled for reduced motion or touch devices
  const spotlightEnabled = !prefersReducedMotion && !isTouchDevice && isHovering;

  return (
    <div
      ref={containerRef}
      className="w-screen h-full px-4 md:px-6 py-6 md:py-8 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        background: 'var(--bg-page)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
        gap: '1rem',
        '--spotlight-x': `${mousePos.x}px`,
        '--spotlight-y': `${mousePos.y}px`,
        '--spotlight-size': '280px',
      } as React.CSSProperties}
    >
      {/* Spotlight overlay - subtle dim only, no dark background */}
      <div
        className={cn(
          "void-overlay pointer-events-none absolute inset-0 z-20 transition-opacity duration-300",
          spotlightEnabled ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: spotlightEnabled
            ? `radial-gradient(circle var(--spotlight-size) at var(--spotlight-x) var(--spotlight-y), transparent 0%, rgba(0, 0, 0, 0.3) 100%)`
            : 'transparent',
        }}
        aria-hidden="true"
      />
      
      {cards.map((card, i) => (
        <div key={i} className={cn("relative", card.className === "md:col-span-2" ? "md:col-span-2" : "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              "gallery-frame relative overflow-hidden cursor-pointer",
              "aspect-square rounded-xl",
              "border border-[var(--card-border)]",
              "transition-all duration-300 ease-out",
              "hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2",
              selected?.id === card.id
                ? "absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40"
                : ""
            )}
            style={{
              boxShadow: 'var(--surface-card-shadow)',
              background: 'transparent',
            }}
            layoutId={`card-${card.id}`}
            tabIndex={0}
            role="button"
            aria-label={`View ${card.title}`}
            onKeyDown={(e) => e.key === 'Enter' && handleClick(card)}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <div className="relative block h-full w-full">
              <ImageComponent card={card} />
            </div>
          </motion.div>
        </div>
      ))}
      <AnimatePresence>
        {selected && (
          <motion.div
            onClick={handleOutsideClick}
            className="absolute h-full w-full left-0 top-0 bg-luxury-bg-dark opacity-0 z-30 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
          />
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
      className="object-cover object-top absolute inset-0 h-full w-full transition duration-200"
      loading="lazy"
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 h-full w-full bg-luxury-bg-dark z-10"
      />
      <motion.div
        layoutId={`content-${selected.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected.content}
      </motion.div>
    </div>
  );
};
