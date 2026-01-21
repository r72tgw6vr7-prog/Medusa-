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
      className="void-grid-container w-full h-full p-6 md:p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto gap-3 md:gap-4 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        '--spotlight-x': `${mousePos.x}px`,
        '--spotlight-y': `${mousePos.y}px`,
        '--spotlight-size': '280px',
      } as React.CSSProperties}
    >
      {/* Void overlay with spotlight cutout */}
      <div
        className={cn(
          "void-overlay pointer-events-none absolute inset-0 z-20 transition-opacity duration-300",
          spotlightEnabled ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: spotlightEnabled
            ? `radial-gradient(circle var(--spotlight-size) at var(--spotlight-x) var(--spotlight-y), transparent 0%, rgba(10, 10, 10, 0.6) 100%)`
            : 'transparent',
        }}
        aria-hidden="true"
      />
      
      {cards.map((card, i) => (
        <div key={i} className={cn("void-grid-item", card.className === "md:col-span-2" ? "col-span-2" : "col-span-1")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              "relative overflow-hidden cursor-pointer",
              "aspect-square", // Smaller, consistent sizing
              "transition-shadow duration-200 ease-out",
              "hover:shadow-[0_0_20px_rgba(192,192,192,0.3)]", // Chrome shadow on hover
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(192,192,192)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(10,10,10)]",
              selected?.id === card.id
                ? "rounded-lg absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40 bg-[rgb(10,10,10)] rounded-lg"
                : "bg-[rgb(10,10,10)] rounded-lg"
            )}
            layoutId={`card-${card.id}`}
            tabIndex={0}
            role="button"
            aria-label={`View ${card.title}`}
            onKeyDown={(e) => e.key === 'Enter' && handleClick(card)}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <div className="void-grid-frame relative block h-full w-full">
              <ImageComponent card={card} />
            </div>
          </motion.div>
        </div>
      ))}
      <AnimatePresence>
        {selected && (
          <motion.div
            onClick={handleOutsideClick}
            className="absolute h-full w-full left-0 top-0 bg-luxury-bg-dark opacity-0 z-30"
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
