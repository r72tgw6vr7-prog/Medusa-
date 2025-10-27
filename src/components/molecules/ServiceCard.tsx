import React from 'react';
// removed unused imports: motion, Check

export interface ServiceFeature {
  text: string;
  iconUrl?: string;
}

interface ServiceCardProps {
  title: string;
  subtitle?: string;
  description: string;
  price?: string;
  duration?: string;
  features?: ServiceFeature[] | string[];
  buttonText?: string;
  onButtonClick?: () => void;
  highlighted?: boolean;
  popular?: boolean;
  className?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>; // Component Icon (SVG-like)
  accentColor?: 'gold' | 'chrome';
  animationDelay?: number;
  isVisible?: boolean;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  iconUrl?: string; // For backward compatibility
  ctaText?: string; // For backward compatibility
  onCtaClick?: () => void; // For backward compatibility
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  price,
  duration,
  features = [],
  ctaText = 'Jetzt Buchen',
  buttonText,
  onCtaClick,
  onButtonClick,
  highlighted = false,
  popular = false,
  className = '',
  icon: IconComponent,
  accentColor = 'gold',
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Use the new props but fall back to old props for backward compatibility
  const handleClick = onButtonClick || onCtaClick;
  const buttonLabel = buttonText || ctaText;

  // Modern design system classes (transparent, centered, compact)
  const baseClasses = [
    'relative flex h-full w-full',
    'max-w-[360px] lg:max-w-[380px]',
    'flex-col justify-between rounded-2xl',
    'border',
    highlighted ? 'border-brand-gold' : 'border-[#C19B26]/30',
    'bg-black/60 backdrop-blur',
    'p-4 md:p-5',
    'mx-auto',
    'shadow-gold-glow',
  ].join(' ');
  const borderClasses = '';
  const padding = '';

  // Dynamic accent color classes
  const accentColorClasses = {
    gold: {
      text: 'text-brand-gold',
      border: 'border-brand-gold',
      bg: 'bg-brand-gold',
      shadow: 'shadow-gold-glow-subtle hover:shadow-gold-glow',
      iconBg: 'bg-brand-gold/10',
      hoverBg: 'hover:bg-brand-gold',
      hoverText: 'hover:text-brand-background',
    },
    chrome: {
      text: 'text-brand-chrome',
      border: 'border-brand-chrome',
      bg: 'bg-brand-chrome',
      shadow: 'shadow-chrome-glow',
      iconBg: 'bg-brand-chrome/10',
      hoverBg: 'hover:bg-brand-chrome',
      hoverText: 'hover:text-brand-background',
    },
  };

  const accent = accentColorClasses[accentColor];

  return (
    <div
      className={`relative transition-all duration-300 ${className} ${isHovered ? 'scale-[1.02]' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role='group'
    >
      {popular && (
        <div className='absolute -top-2 inset-x-0 mx-auto w-24 bg-brand-gold rounded-full py-0 text-center z-10'>
          <span className='text-brand-background text-xs font-bold'>BELIEBT</span>
        </div>
      )}

      <div className={`${baseClasses} ${borderClasses} ${padding} overflow-hidden`}>
        <div className='relative z-10 flex flex-col w-full'>
          {/* Service Icon */}
          {IconComponent && (
            <div
              className={`w-14 h-14 ${accent.iconBg} rounded-full flex items-center justify-center mb-6`}
            >
              <IconComponent size={24} className={accent.text} />
            </div>
          )}

          {/* Title and Subtitle */}
          <h3 className={`${accent.text} text-lg md:text-xl font-semibold leading-tight mb-2`}>
            {title}
          </h3>

          {subtitle && <h4 className='text-text-secondary text-lg mb-0'>{subtitle}</h4>}

          <p className='text-sm md:text-base leading-6 text-[#C0C0C0] line-clamp-4 md:line-clamp-5'>
            {description}
          </p>

          {/* Price */}
          {price && (
            <div className='mb-0'>
              <span className='text-text-primary text-2xl font-bold'>{price}</span>
            </div>
          )}

          {/* Duration */}
          {duration && (
            <div className='mb-8'>
              <span className='text-text-secondary text-sm'>{duration}</span>
            </div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <ul className='flex flex-col space-y-0 mb-8'>
              {features.map((feature, index) => {
                const featureText = typeof feature === 'string' ? feature : feature.text;

                return (
                  <li key={index} className='flex items-center'>
                    <div
                      className={`w-5 h-5 ${accent.iconBg} rounded-full flex items-center justify-center mr-3`}
                    >
                      <svg
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M10 3L4.5 8.5L2 6'
                          stroke={accentColor === 'gold' ? '#D4AF37' : '#C0C0C0'}
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                    <span className='text-text-secondary text-sm'>{featureText}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {/* CTA Button */}
          {buttonLabel && (
            <button
              className={`w-full min-h-11 px-4 rounded-xl mt-4 transition-all duration-300
                ${
                  highlighted
                    ? `${accent.bg} text-brand-background ${accent.shadow}`
                    : `bg-transparent border ${accent.border} ${accent.text} ${accent.hoverBg} ${accent.hoverText}`
                }`}
              onClick={handleClick}
              role='button'
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && handleClick && handleClick()
              }
            >
              <span className='font-medium'>{buttonLabel}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
