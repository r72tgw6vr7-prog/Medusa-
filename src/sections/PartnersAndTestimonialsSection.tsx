import React from 'react';
import Container from '../components/ui/Container';
import TestimonialsCarousel from '@/components/organisms/TestimonialsCarousel';
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
  // REFINEMENT #5: Duplicate array × 4 for seamless loop on all screen sizes
  const scrollItems = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section className='w-full relative z-10' aria-label='Partners and Testimonials'>
      <Container className='py-16 md:py-24 lg:py-24'>
        {/* PARTNERS */}
        <div className='text-center mb-4'>
          <h3 className='font-headline text-(length:--text-h2) font-bold tracking-tight leading-tight text-brand-accent'>
            {titlePartners}
          </h3>
        </div>
        <p className='text-center text-white/70 text-(length:--text-sm) mb-16 font-body'>
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
      </Container>

      {/* TESTIMONIALS */}
      <TestimonialsCarousel title={titleTestimonials} />
    </section>
  );
};

export default PartnersAndTestimonialsSection;
