import React from 'react';
import '@/sections/PartnersAndTestimonialsSection.css';

export interface InfiniteLogoCarouselItem {
  id: string | number;
  name: string;
  src?: string;
  alt?: string;
  icon?: React.ReactNode;
  url?: string;
  ariaLabel?: string;
}

export interface InfiniteLogoCarouselProps {
  items: InfiniteLogoCarouselItem[];
  className?: string;
  ariaLabel?: string;
}

export const InfiniteLogoCarousel: React.FC<InfiniteLogoCarouselProps> = ({
  items,
  className = '',
  ariaLabel = 'Infinite logo carousel',
}) => {
  const scrollItems = [...items, ...items];

  return (
    <div className={`partners-carousel-wrapper ${className}`.trim()}>
      <div className='partners-carousel-container' role='region' aria-label={ariaLabel}>
        <div className='partners-carousel-track' aria-hidden='true'>
          {scrollItems.map((item, idx) => {
            const content = item.src ? (
              <img
                src={item.src}
                alt={item.alt ?? item.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.error('Failed to load logo:', item.src);
                  target.style.display = 'none';
                }}
              />
            ) : (
              item.icon
            );

            if (item.url) {
              const isExternal = /^https?:\/\//.test(item.url);

              return (
                <a
                  key={`${item.id}-${idx}`}
                  className='partners-logo'
                  href={item.url}
                  title={item.name}
                  aria-label={item.ariaLabel ?? item.name}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={`${item.id}-${idx}`} className='partners-logo' title={item.name}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InfiniteLogoCarousel;
