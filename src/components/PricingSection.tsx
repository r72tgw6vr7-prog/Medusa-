import React from 'react';
import Section from './primitives/Section';
import Container from './ui/Container';
import { PageHeading } from './PageHeading';
import './PricingSection.css';

export const PricingSection: React.FC = () => {
  return (
    <Section
      className='py-16 md:py-24 relative z-10'
      spacing='none'
      variant='default'
      aria-labelledby='pricing-section-title'
      id='pricing-section'
    >
      <Container size='wide'>
        {/* Section Header - Secondary Section (h3) */}
        <div className='mb-16'>
          <PageHeading
            eyebrow="PREISE"
            title="Services mit transparenten Preisen"
            subtitle="Keine versteckten Kosten – Ehrliche Beratung seit 1998"
            level="secondary"
          />
        </div>
      </Container>
    </Section>
  );
};

export default PricingSection;
