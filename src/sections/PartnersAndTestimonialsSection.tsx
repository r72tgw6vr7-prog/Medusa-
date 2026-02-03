import React from 'react';
import Container from '../components/ui/Container';
import InfiniteLogoCarousel from '@/components/organisms/InfiniteLogoCarousel';
import TestimonialsCarousel from '@/components/organisms/TestimonialsCarousel';

// PARTNER LOGOS - Updated list with latest partners
const partnerLogos = [
  {
    id: 'iamrobot',
    name: 'I AM ROBOT',
    src: '/assets/images/photos/partners/iamrobot-logo.svg',
    alt: 'I AM ROBOT NFC Chip Implants Logo',
  },
  {
    id: 'partner-1',
    name: 'Partner 1',
    src: '/assets/images/icons/Screenshot%202026-02-02%20at%2008.34.53%201.svg',
    alt: 'Partner Logo 1',
  },
  {
    id: 'partner-2',
    name: 'Partner 2',
    src: '/assets/images/icons/Screenshot%202026-02-02%20at%2008.35.16%201.svg',
    alt: 'Partner Logo 2',
  },
  {
    id: 'partner-3',
    name: 'Partner 3',
    src: '/assets/images/icons/Screenshot%202026-02-02%20at%2008.36.16%201.svg',
    alt: 'Partner Logo 3',
  },
  {
    id: 'upgraded-humans',
    name: 'Upgraded Humans',
    src: '/assets/images/icons/Simplification.svg',
    alt: 'Upgraded Humans Partner Logo',
  },
  {
    id: 'wepiercing',
    name: 'Wepiercing',
    src: '/assets/images/icons/Screenshot%202026-02-02%20at%2008.50.07%201_layerstyle.svg',
    alt: 'Wepiercing Partner Logo',
  },
  {
    id: 'tutto-tattoo',
    name: 'Tutto Tattoo',
    src: '/assets/images/icons/Screenshot%202026-02-02%20at%2008.49.30%201_layerstyle.svg',
    alt: 'Tutto Tattoo Partner Logo',
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
        <InfiniteLogoCarousel items={partnerLogos} ariaLabel='Partners and Press carousel' />
      </Container>

      {/* TESTIMONIALS */}
      <TestimonialsCarousel title={titleTestimonials} />
    </section>
  );
};

export default PartnersAndTestimonialsSection;
