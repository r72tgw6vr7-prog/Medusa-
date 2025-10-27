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
    'flex flex-col items-center bg-[#0A0A0AB0] w-[400px] pt-[41px] pb-[55px] rounded-2xl border border-solid border-[#D4AF37]';
  const highlightedClasses = highlighted ? 'bg-[#0A0A0ACC] border-2' : '';
  const shadowClasses = highlighted ? 'shadow-[0px_0px_20px_#D4AF3726]' : '';

  return (
    <div className={`${baseClasses} ${highlightedClasses} ${shadowClasses} ${className}`}>
      <img src={iconUrl} alt={title} className='w-12 h-12 mb-8 rounded-2xl object-fill' />
      <span className='text-[#D4AF37] text-[31px] font-bold text-center mb-8'>{title}</span>
      <span className='text-white text-base text-center mb-[31px]'>{description}</span>
      <div className='flex flex-col items-start self-stretch mb-16 mx-[41px] gap-0'>
        {features.map((feature, index) => (
          <div key={index} className='flex items-center'>
            <img src={feature.iconUrl} alt='' className='w-4 h-4 mr-0 object-fill' />
            <div className='flex flex-col items-center'>
              <span className='text-white text-[15px]'>{feature.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-col items-start cursor-pointer' onClick={onCtaClick}>
        <span className='text-white text-base'>{ctaText}</span>
      </div>
    </div>
  );
};

export default PriceCard;
