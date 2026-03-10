/**
 * useScrollProgress Hook
 * 
 * Provides scroll progress as a value from 0-1 for scroll-linked animations.
 * Uses RAF throttling for 60fps performance.
 */

import { useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const updateProgress = useCallback(() => {
    if (prefersReducedMotion) {
      setProgress(0);
      return;
    }
    
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? Math.max(0, Math.min(1, scrollTop / docHeight)) : 0;
    setProgress(scrollProgress);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, [updateProgress, prefersReducedMotion]);

  return progress;
}
