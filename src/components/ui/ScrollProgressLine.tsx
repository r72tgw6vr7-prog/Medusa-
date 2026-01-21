/**
 * ScrollProgressLine Component
 * 
 * Phase 2: Scroll Progress Line
 * Fixed thin line at top of viewport showing scroll progress.
 * Chrome-colored, animates width from 0% to 100% based on scroll position.
 */

import React from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollProgressLineProps {
  className?: string;
}

export const ScrollProgressLine: React.FC<ScrollProgressLineProps> = ({ className = '' }) => {
  const progress = useScrollProgress();
  const prefersReducedMotion = useReducedMotion();

  // Hide entirely if reduced motion preferred
  if (prefersReducedMotion) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[2px] bg-transparent z-[9999] pointer-events-none ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, transparent 0%, rgba(192, 192, 192, 0.6) 20%, rgba(192, 192, 192, 1) 100%)',
          boxShadow: '0 0 8px rgba(192, 192, 192, 0.5), 0 0 16px rgba(192, 192, 192, 0.3)',
        }}
      />
    </div>
  );
};

export default ScrollProgressLine;
