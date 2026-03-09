import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/i18n/utils/localizePath';
import './ServiceCard.css';

/**
 * Service type for the curtain reveal card
 */
export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: 'tattoo' | 'piercing';
  link: string;
}

interface ServiceCardProps {
  service: Service;
  isRevealed: boolean;
  index: number;
}

/**
 * ServiceCard - Japanese-inspired luxury service card with curtain reveal
 *
 * Adapted from ArtistCard with same animation system:
 * - Alternating two-column grid (icon left/right, text right/left)
 * - Curtain reveal animation (translate-x-full)
 * - Chrome accent lines and glow
 * - Deep black background
 * - 6 hover enhancements: Chrome Glow, Content Lift, Shadow Depth, Icon Zoom, Overlay Fade, Neighbor Shrink
 */
export function ServiceCard({ service, isRevealed, index }: ServiceCardProps) {
  const { language } = useLanguage();
  const isEven = index % 2 === 0;
  const backgroundImage =
    service.icon === 'tattoo'
      ? '/assets/images/photos/backgrounds/tattoo-card-bg.webp'
      : '/assets/images/photos/backgrounds/piercing-card-bg.webp';

  return (
    <div
      className={`service-card-wrapper relative grid grid-cols-1 lg:grid-cols-2 gap-0 items-center transition-all duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isRevealed
          ? 'opacity-100 translate-x-0'
          : isEven
            ? 'opacity-0 translate-x-[-100px]'
            : 'opacity-0 translate-x-[100px]'
      } ${isEven ? '' : 'lg:grid-flow-dense'}`}
      data-index={index}
      data-service={service.icon}
    >
      {/* Icon/visual container with curtain reveal and hover effects */}
      <div
        className={`service-card-image-container relative aspect-[16/9] lg:aspect-[4/3] min-h-[200px] max-h-[280px] lg:min-h-[300px] lg:max-h-[400px] overflow-hidden bg-luxury-bg-dark-elevated ${
          isEven ? '' : 'lg:col-start-2'
        }`}
      >
        {/* Service type indicator */}
        <div
          className='service-category-indicator'
          title={service.icon.toUpperCase()}
          aria-label={service.icon.toUpperCase()}
        >
          <span
            className={`service-category-dot ${service.icon === 'piercing' ? 'service-category-dot--ring' : ''}`}
          />
        </div>

        {/* Icon/visual layer with zoom effect */}
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div
          className='absolute inset-0'
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* Dark overlay that fades on hover */}
        <div className='service-card-overlay' />

        {/* Border overlay */}
        <div
          className={`absolute inset-0 border border-white/10 transition-opacity duration-600 ${
            isRevealed ? 'opacity-100' : 'opacity-20'
          }`}
        />

        {/* Vertical chrome accent line */}
        <div
          className={`absolute top-0 ${
            isEven ? 'right-0' : 'left-0'
          } w-px h-full bg-linear-to-b from-transparent via-white/40 to-transparent transition-opacity duration-700 ${
            isRevealed ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '450ms' }}
        />
      </div>

      {/* Text content with lift effect */}
      <div className={`relative px-8 lg:px-16 py-12 ${isEven ? 'lg:pl-20' : 'lg:pr-20'}`}>
        <div
          className={`service-card-content transition-all duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          {/* Index number and divider */}
          <div className='mb-4'>
            <div className='flex items-center gap-4 mb-2'>
              <span className='text-luxury-text-inverse/40 text-sm font-light tracking-widest uppercase'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className='h-px grow bg-luxury-text-inverse/10' />
            </div>
            {/* Service title with chrome underline on hover */}
            <h3 className='service-card-name text-luxury-text-inverse text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-none'>
              {service.title}
            </h3>
          </div>

          {/* Chrome underline */}
          <div
            className='mb-8 h-px bg-linear-to-r from-luxury-text-inverse/40 to-transparent'
            style={{ width: '60%' }}
          />

          {/* Subtitle */}
          <p className='text-luxury-text-inverse/60 text-sm tracking-wider uppercase mb-6 font-light'>
            {service.subtitle}
          </p>

          {/* Description */}
          <p className='text-luxury-text-inverse/70 text-base lg:text-lg leading-relaxed font-light max-w-xl mb-8'>
            {service.description}
          </p>

          {/* CTA Button */}
          <Link
            to={localizePath(service.link, language)}
            className='service-card-cta inline-flex items-center gap-4 px-6 py-4 border border-white/20 hover:border-white/40 transition-all duration-300'
          >
            <span className='text-luxury-text-inverse text-sm tracking-wider uppercase font-light'>
              {language === 'en' ? 'Learn more' : 'Mehr erfahren'}
            </span>
            <svg
              className='w-4 h-4 text-luxury-text-inverse/60'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>
        </div>

        {/* Side chrome accent line */}
        <div
          className={`absolute ${
            isEven ? 'left-0' : 'right-0'
          } top-0 bottom-0 w-px bg-linear-to-b from-transparent via-luxury-text-inverse/20 to-transparent transition-opacity duration-1000 ${
            isRevealed ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        />
      </div>

      {/* Loading pulse overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-2000 ${
          isRevealed ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-px h-0 bg-white/20 animate-pulse' />
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
