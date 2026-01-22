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
  return (
    <div 
      className={`
        bg-[#000000]
        border border-[rgba(192,192,192,0.91)]
        shadow-[0px_4px_12px_rgba(0,0,0,0.4),0px_0px_20px_rgba(192,192,192,0.3),inset_0px_1px_0px_2px_rgba(192,192,192,0.1)]
        rounded-[32px]
        p-8
        flex flex-col text-center
        h-full
        ${className}
      `}
    >
      {/* Icon */}
      {iconUrl && (
        <img 
          src={iconUrl} 
          alt={title} 
          className='w-12 h-12 mb-8 rounded-2xl object-fill' 
        />
      )}

      {/* Top labels */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold text-sm tracking-[0.7px] uppercase text-[color:var(--text-secondary)]">
          Paket
        </span>
        <span className="font-normal text-sm tracking-[1.4px] uppercase text-white/60">
          Flexibel
        </span>
      </div>

      {/* Heading */}
      <h3 className="font-headline font-normal text-[length:var(--text-h3)] leading-9 text-white mb-6">
        {title}
      </h3>

      {/* Description */}
      <p className="font-normal text-sm leading-7 text-white/70 mb-8 flex-1">
        {description}
      </p>

      {/* List */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            {feature.iconUrl && (
              <img 
                src={feature.iconUrl} 
                alt="" 
                className="w-4 h-4 text-[color:var(--text-secondary)] shrink-0 mt-1 object-fill" 
              />
            )}
            <span className="font-normal text-base leading-[23px] text-white/80">
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button
        onClick={onCtaClick}
        className="
          w-full h-12.5
          border border-[color:var(--text-secondary)]
          rounded-3xl
          font-semibold text-sm leading-5 text-white
          hover:bg-[color:var(--text-secondary)] hover:text-black
          transition-all duration-200
        "
      >
        {ctaText}
      </button>
    </div>
  );
};

export default PriceCard;
