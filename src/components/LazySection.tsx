import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  rootMargin?: string; // e.g., "200px" to load 200px before visible
  threshold?: number;
  fallback?: ReactNode;
}

/**
 * LazySection - Only renders children when component is near viewport
 * Reduces initial load by deferring heavy components until needed
 */
export function LazySection({
  children,
  className = '',
  rootMargin = '400px', // Start loading 400px before visible
  threshold = 0.01,
  fallback = null,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Once rendered, keep it rendered (don't unmount on scroll away)
    if (hasRendered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasRendered(true);
            observer.disconnect(); // Stop observing once loaded
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasRendered, rootMargin, threshold]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
}
