/**
 * useSectionTransition Hook
 * 
 * Phase 1: Section Transition System
 * Triggers wipe/fade transition when section enters viewport at 20% threshold.
 * Uses Intersection Observer for performance.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface UseSectionTransitionOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useSectionTransition(options: UseSectionTransitionOptions = {}) {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    once = false,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setIsVisible(true);
          if (once) {
            setHasTriggered(true);
          }
        } else if (!once && !hasTriggered) {
          setIsVisible(false);
        }
      });
    },
    [threshold, once, hasTriggered]
  );

  useEffect(() => {
    // If reduced motion, always show content
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Skip if already triggered and once mode
    if (once && hasTriggered) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, threshold, 0.5, 1],
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin, once, hasTriggered, prefersReducedMotion]);

  return {
    ref,
    isVisible: prefersReducedMotion ? true : isVisible,
    className: isVisible ? 'section-visible' : '',
  };
}

export default useSectionTransition;
