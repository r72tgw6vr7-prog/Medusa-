import React from 'react';
import TestimonialsCarousel from '../components/organisms/TestimonialsCarousel';
import './PartnersAndTestimonialsSection.css';

// PARTNER LOGOS - REFINEMENT #4: Only 4 real partners - FIXED WITH CORRECT PATHS
const partnerLogos = [
  {
    id: 'iamrobot',
    name: 'I AM ROBOT',
    src: '/assets/images/photos/partners/iamrobot-logo.svg',
    alt: 'I AM ROBOT NFC Chip Implants Logo',
  },
  {
    id: 'nannybag',
    name: 'nannybag',
    src: '/assets/images/photos/partners/nannybag-logo.svg',
    alt: 'nannybag Logo',
  },
  {
    id: 'partner3',
    name: 'Partner 3',
    src: '/assets/images/photos/partners/partner3-logo.svg',
    alt: 'Partner 3 Logo',
  },
  {
    id: 'bqla',
    name: 'BQLA',
    src: '/assets/images/photos/partners/bqla-logo.svg',
    alt: 'BQLA Partner Logo',
  },
];

export interface PartnersAndTestimonialsSectionProps {
  titlePartners?: string;
  subtitlePartners?: string;
  titleTestimonials?: string;
}

export const PartnersAndTestimonialsSection: React.FC<PartnersAndTestimonialsSectionProps> = ({
  titlePartners = 'Unsere Partner & Presse',
  subtitlePartners = 'Vertrauensvolle Partnerschaften mit führenden Marken der Branche',
  titleTestimonials = 'Was Kunden sagen',
}) => {
  // REFINEMENT #4: Duplicate array × 3 for seamless loop
  const scrollItems = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section className='w-full relative z-10' aria-label='Partners and Testimonials'>
      <div className='max-w-[1200px] mx-auto px-8 sm:px-8 lg:px-16 py-16 md:py-24 lg:py-24'>
        {/* PARTNERS */}
        <div className='text-center mb-8'>
          <h2 className="font-['Playfair_Display'] text-[32px] lg:text-[48px] font-semibold leading-tight text-[#D4AF37]">
            {titlePartners}
          </h2>
        </div>
        <p className='text-center text-white/70 text-[14px] mb-16 font-[Inter]'>
          {subtitlePartners}
        </p>

        {/* Partner Logos Carousel - Restored with gold styling */}
        <div className='partners-carousel-wrapper'>
          <div
            className='partners-carousel-container'
            role='region'
            aria-label='Partners and Press carousel'
          >
            <div className='partners-carousel-track' aria-hidden='true'>
              {scrollItems.map((logo, idx) => (
                <div key={`${logo.id}-${idx}`} className='partners-logo' title={logo.name}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.error('Failed to load logo:', logo.src);
                      target.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <TestimonialsCarousel title={titleTestimonials} />
    </section>
  );
};

export default PartnersAndTestimonialsSection;
