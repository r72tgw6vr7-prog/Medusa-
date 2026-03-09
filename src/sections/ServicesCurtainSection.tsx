'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ServiceCard, type Service } from '@/components/cards/ServiceCard';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * ServicesCurtainSection - Homepage services section with curtain reveal
 *
 * Features:
 * - 2 service cards only (Tattoo & Piercing)
 * - Same Japanese curtain reveal animation as Artists page
 * - IntersectionObserver triggers staggered reveals
 * - Responsive: side-by-side on desktop, stacked on mobile
 */

export const ServicesCurtainSection: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const { language } = useLanguage();
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isEnglish = language === 'en';

  const services: Service[] = [
    {
      id: 'tattoo',
      title: isEnglish ? 'Tattoo Services' : 'Tattoo Leistungen',
      subtitle: isEnglish ? 'Custom designs & cover-ups' : 'Custom Designs & Cover-ups',
      description: isEnglish
        ? 'From fine line work to large-scale statement pieces, our artists translate your vision with precision and high-end craftsmanship.'
        : 'Von feinen Linien bis hin zu großflächigen Kunstwerken verwirklichen unsere Artists Ihre Vision mit höchster Präzision und künstlerischem Anspruch.',
      icon: 'tattoo',
      link: '/services/tattoos',
    },
    {
      id: 'piercing',
      title: isEnglish ? 'Piercing Services' : 'Piercing Leistungen',
      subtitle: isEnglish ? 'Professional piercings & aftercare' : 'Professionelle Piercings & Nachsorge',
      description: isEnglish
        ? 'Professional piercings, premium jewellery and attentive aftercare designed around safety, precision and aesthetics.'
        : 'Professionelle Piercings mit erstklassigem Schmuck und umfassender Nachsorge. Sicherheit und Aesthetik stehen bei uns an erster Stelle.',
      icon: 'piercing',
      link: '/services/piercings',
    },
  ];

  // IntersectionObserver for staggered curtain reveal
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Stagger reveal with 200ms delay per card (same as ArtistCard)
              setTimeout(() => {
                setRevealedIndices((prev) => new Set(prev).add(index));
              }, index * 150);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.3, // Trigger at 30% visibility (same as TeamGrid)
          rootMargin: '-50px', // Start 50px before entering viewport
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section
      className={`py-24 lg:py-32 bg-luxury-bg-dark ${className}`}
      aria-label={isEnglish ? 'Our services' : 'Unsere Leistungen'}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="text-center">
          {/* Chrome accent line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
            <span className="text-luxury-text-inverse/40 text-sm tracking-widest uppercase font-light">
              {isEnglish ? 'Services' : 'Leistungen'}
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
          </div>

          <h2 className="font-headline text-(length:--text-h2) font-bold tracking-tight leading-tight text-brand-chrome mb-4">
            {isEnglish ? 'Our Services' : 'Unsere Leistungen'}
          </h2>

          <p className="text-luxury-text-inverse/60 text-lg font-light max-w-2xl mx-auto">
            {isEnglish
              ? 'Discover our range of professional tattoo and piercing services.'
              : 'Entdecken Sie unser Angebot an professionellen Tattoo- und Piercing-Dienstleistungen.'}
          </p>
        </div>
      </div>

      {/* Services Grid - 2 cards only */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-16 lg:space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <ServiceCard
                service={service}
                isRevealed={revealedIndices.has(index)}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
};

export default ServicesCurtainSection;
