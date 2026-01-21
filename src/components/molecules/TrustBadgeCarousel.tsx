import React, { useRef, useEffect } from 'react';
import { TrustBadge } from '../atoms/TrustBadge';

interface TrustBadge {
  icon: string;
  text: string;
}

interface TrustBadgeCarouselProps {
  badges: TrustBadge[];
  className?: string;
  autoScroll?: boolean;
  speed?: number;
}

export const TrustBadgeCarousel: React.FC<TrustBadgeCarouselProps> = ({
  badges,
  className = '',
  autoScroll = true,
  speed = 30000, // 30 seconds for one full cycle
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return;

    const prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;
    if (prefersReducedMotion) return;

    const scrollContainer = scrollRef.current;

    let scrollWidth = 0;
    let clientWidth = 0;

    const measure = () => {
      scrollWidth = scrollContainer.scrollWidth;
      clientWidth = scrollContainer.clientWidth;
    };

    measure();

    let animationId = 0;
    let startTime: number | null = null;
    let running = false;

    const start = () => {
      if (!running || animationId) return;
      if (scrollWidth <= clientWidth) return;
      startTime = null;
      animationId = requestAnimationFrame(animate);
    };

    const animate = (timestamp: number) => {
      if (!running) return;
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Only animate if content is wider than container
      if (scrollWidth <= clientWidth) {
        animationId = 0;
        return;
      }

      const currentPosition = (elapsed / speed) * scrollWidth;

      // Reset when we've scrolled through the full width
      if (currentPosition >= scrollWidth - clientWidth) {
        startTime = timestamp;
      }

      scrollContainer.scrollLeft = currentPosition % (scrollWidth - clientWidth);
      animationId = requestAnimationFrame(animate);
    };

    const ro = 'ResizeObserver' in globalThis ? new ResizeObserver(() => {
      measure();
      start();
    }) : null;

    ro?.observe(scrollContainer);
    window.addEventListener('resize', measure);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;

        if (running) {
          measure();
          start();
          return;
        }

        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = 0;
        }
      },
      { threshold: 0.1 },
    );

    io.observe(scrollContainer);

    return () => {
      io.disconnect();
      window.removeEventListener('resize', measure);
      ro?.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [autoScroll, speed]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient fade on left side */}
      <div className='absolute left-0 top-0 h-full w-12 bg-linear-to-r from-[var(--deep-black)] to-transparent z-10'></div>

      <div
        ref={scrollRef}
        className='flex gap-0 overflow-x-auto no-scrollbar py-0 px-8'
        style={{ scrollBehavior: 'smooth' }}
      >
        {badges.map((badge, index) => (
          <TrustBadge key={`trust-badge-${index}`} icon={badge.icon} text={badge.text} />
        ))}

        {/* Add duplicates for continuous scrolling effect */}
        {badges.length > 0 && autoScroll && (
          <>
            {badges.map((badge, index) => (
              <TrustBadge
                key={`trust-badge-duplicate-${index}`}
                icon={badge.icon}
                text={badge.text}
              />
            ))}
          </>
        )}
      </div>

      {/* Gradient fade on right side */}
      <div className='absolute right-0 top-0 h-full w-12 bg-linear-to-l from-[var(--deep-black)] to-transparent z-10'></div>
    </div>
  );
};

export default TrustBadgeCarousel;
