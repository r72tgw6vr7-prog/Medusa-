import React from 'react';
import Section from './primitives/Section';
import Container from './ui/Container';
import { SectionHeading } from './SectionHeading';
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
        <SectionHeading
          eyebrow='Preise'
          title='Services mit transparenten Preisen'
          subtitle='Keine versteckten Kosten – ehrliche Beratung seit 1998'
          level='secondary'
        />
      </Container>
    </Section>
  );
};

export default PricingSection;
