// ============================================
// COMPONENT: PartnersAndPressSection
// ============================================
// PURPOSE: Display trusted partner and press logos with gold heading

import React from 'react';
import { PARTNERS } from '../data/partners';
import '../styles/partners.css';

// TypeScript interfaces
interface PartnerLogo {
  id: string;
  name: string;
  image: string;
  alt: string;
}

// Build a clean list from PARTNERS data (single duplication for seamless loop)
const partnerLogos: PartnerLogo[] = PARTNERS.map((p, idx) => ({
  id: `${p.title}-${idx}`,
  name: p.title,
  image: p.src,
  alt: p.alt,
}));
const loopedPartnerLogos: PartnerLogo[] = [...partnerLogos, ...partnerLogos];

const PartnersAndPressSection: React.FC = () => {
  return (
    <section
      className='w-full bg-[#222222] py-16 md:py-16 lg:py-24'
      aria-label='Partner and press logos'
    >
      <div className='max-w-[1104px] mx-auto px-8 md:px-8'>
        {/* Heading */}
        <div className='text-center mb-8'>
          <h2 className="font-['Inter'] text-sm font-normal leading-snug tracking-widest uppercase text-[#D4AF37] mb-0">
            Unsere Partner & Presse
          </h2>
          <p className="font-['Inter'] text-xs font-light leading-relaxed text-white/70">
            Vertrauensvolle Partnerschaften mit führenden Marken der Branche
          </p>
        </div>

        {/* Partner Logos Row (flex gap + overflow hidden) */}
        <div
          className='partners-carousel-wrapper partners-fade max-w-[1100px] mx-auto px-8 md:px-8 overflow-hidden'
          role='region'
          aria-label='Partners and Press carousel'
        >
          <div className='partners-carousel-track flex items-center will-change-transform'>
            {loopedPartnerLogos.map((partner) => (
              <div
                key={partner.id}
                className='h-10 md:h-12 shrink-0 flex items-center justify-center max-w-[160px]'
              >
                <img
                  src={partner.image}
                  alt={partner.alt}
                  title={partner.name}
                  loading='lazy'
                  decoding='async'
                  className='partners-logo-img opacity-85 hover:opacity-100 transition-opacity transition duration-200 ease-out'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersAndPressSection;
