import React from 'react';

interface PriceFeature {
  text: string;
  iconUrl: string;
}

interface PriceCardProps {
  iconUrl: string;
  title: string;
  description: string;
  features: PriceFeature[];
  ctaText: string;
  onCtaClick?: () => void;
  highlighted?: boolean;
  className?: string;
}

export const PriceCard: React.FC<PriceCardProps> = ({
  iconUrl,
  title,
  description,
  features,
  ctaText,
  onCtaClick,
  highlighted = false,
  className = '',
}) => {
  const baseClasses =
    'cool-lines-card flex flex-col items-center bg-[var(--color-surface-darker)]/70 w-card-md pt-10 pb-14 rounded-2xl border border-solid border-[var(--brand-accent)]';
  const highlightedClasses = highlighted ? 'bg-[var(--color-surface-darker)]/80 border-2' : '';
  const shadowClasses = highlighted ? 'shadow-[var(--shadow-chrome-lg)]' : '';

  return (
    <div className={`${baseClasses} ${highlightedClasses} ${shadowClasses} ${className}`}>
      <img src={iconUrl} alt={title} className='w-12 h-12 mb-8 rounded-2xl object-fill' />
      <span className='text-[var(--brand-accent)] text-3xl font-bold text-center mb-8'>
        {title}
      </span>
      <span className='text-luxury-text-inverse text-base text-center mb-8'>{description}</span>
      <div className='flex flex-col items-start self-stretch mb-16 mx-8 gap-0'>
        {features.map((feature, index) => (
          <div key={index} className='flex items-center'>
            <img src={feature.iconUrl} alt='' className='w-4 h-4 mr-0 object-fill' />
            <div className='flex flex-col items-center'>
              <span className='text-luxury-text-inverse text-sm-15'>{feature.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div
        className='flex flex-col items-start cursor-pointer'
        role='button'
        tabIndex={0}
        onClick={onCtaClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onCtaClick && onCtaClick()}
      >
        <span className='text-luxury-text-inverse text-base'>{ctaText}</span>
      </div>
    </div>
  );
};

export default PriceCard;
