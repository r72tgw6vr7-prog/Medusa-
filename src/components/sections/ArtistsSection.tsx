import React, { useEffect, useRef, useState } from 'react';
import { SectionHeading } from '../SectionHeading';
import { ArtistCard, type Artist } from '../cards/ArtistCard';

interface ArtistsSectionProps {
  artists: Artist[];
  className?: string;
}

/**
 * ArtistsSection - Japanese luxury aesthetic artist showcase
 *
 * Features:
 * - IntersectionObserver scroll-reveal at 30% threshold
 * - Staggered animation delays (index * 200ms)
 * - Alternating two-column layout
 * - Deep black background (#1a1a1c)
 * - Chrome accents throughout
 */
export function ArtistsSection({ artists, className = '' }: ArtistsSectionProps) {
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setRevealedIndices((prev) => new Set(prev).add(index));
              }, index * 200);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-50px',
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [artists.length]);

  return (
    <section className={`min-h-screen bg-luxury-bg-dark py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-32">
          <SectionHeading title="Our Artists" />
        </div>

        {/* Artist cards with alternating layout */}
        <div className="space-y-40">
          {artists.map((artist, index) => (
            <div
              key={artist.id}
              ref={(el) => {
                observerRefs.current[index] = el;
              }}
              className="relative"
            >
              <ArtistCard
                artist={artist}
                isRevealed={revealedIndices.has(index)}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArtistsSection;
