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
  className = '',
}) => {
  return (
    <div 
      className={`
        bg-(--card-bg)
        border border-(--card-border)
        shadow-(--card-shadow)
        rounded-(--card-radius)
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
        <span className="font-semibold text-sm tracking-wide uppercase text-[color:var(--text-secondary)]">
          Paket
        </span>
        <span className="font-normal text-sm tracking-wider uppercase text-white/60">
          Flexibel
        </span>
      </div>

      {/* Heading */}
      <h3 className="font-headline font-normal text-(length:--text-h3) leading-9 text-white mb-6">
        {title}
      </h3>

      {/* Description */}
      <p className="font-normal text-sm leading-7 text-white/70 mb-8 flex-1">
        {description}
      </p>

      {/* List */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-4">
            {feature.iconUrl && (
              <img 
                src={feature.iconUrl} 
                alt="" 
                className="w-4 h-4 text-[color:var(--text-secondary)] shrink-0 mt-2 object-fill" 
              />
            )}
            <span className="font-normal text-base leading-6 text-white/80">
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button
        onClick={onCtaClick}
        className="
          w-full h-12
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
