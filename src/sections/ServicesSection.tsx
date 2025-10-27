import React from 'react';
import { ServiceCard } from '../components/molecules/ServiceCard';

interface ServiceFeature {
  text: string;
  iconUrl: string;
}

interface ServicePackage {
  iconUrl: string;
  title: string;
  description: string;
  price?: string;
  duration?: string;
  features: ServiceFeature[];
  highlighted?: boolean;
  popular?: boolean;
}

interface ServicesQuickLink {
  iconUrl: string;
  title: string;
  description: string;
  onClick?: () => void;
}

interface ServicesSectionProps {
  quickLinks?: ServicesQuickLink[];
  title?: string;
  subtitle?: string;
  packages?: ServicePackage[];
  onBookClick?: (packageTitle: string) => void;
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  quickLinks,
  title,
  subtitle,
  packages,
  onBookClick,
  className = '',
}) => {
  return (
    <div className={`w-full bg-[#222222] ${className}`}>
      {/* Quick Links */}
      {quickLinks && quickLinks.length > 0 && (
        <div className='flex items-start justify-center py-16'>
          <div className='flex gap-8 max-w-7xl'>
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={link.onClick}
                className='flex flex-col items-center bg-[#222222] w-[279px] py-8 rounded-[14px] border border-solid border-[#C0BFBF33]'
              >
                <img
                  src={link.iconUrl}
                  alt={link.title}
                  className='w-14 h-14 mb-8 rounded-[14px] object-fill'
                />
                <span className='text-[#D4AF37] text-[31px] font-bold text-center mb-8'>
                  {link.title}
                </span>
                <span className='text-white text-sm text-center'>{link.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Packages Section */}
      {packages && packages.length > 0 && (
        <div className='flex flex-col items-center py-16 px-64'>
          {title && <span className='text-[#D4AF37] text-[42px] font-bold mb-0.5'>{title}</span>}
          {subtitle && <span className='text-white text-[15px] mb-16'>{subtitle}</span>}

          {/* Service Packages */}
          <div className='flex items-stretch justify-center gap-8 flex-wrap'>
            {packages.map((pkg, index) => (
              <ServiceCard
                key={index}
                iconUrl={pkg.iconUrl}
                title={pkg.title}
                description={pkg.description}
                price={pkg.price}
                duration={pkg.duration}
                features={pkg.features}
                highlighted={pkg.highlighted}
                popular={pkg.popular}
                onCtaClick={() => onBookClick?.(pkg.title)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesSection;
