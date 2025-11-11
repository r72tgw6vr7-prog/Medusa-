import React from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { Section, PageHeader } from '@/components/atoms';

const AftercarePage: React.FC = () => {
  return (
    <div className='min-h-screen bg-deep-black text-white'>
      <MainNavigation />
      <Section background='transparent' className='pt-32'>
        <div className='mx-auto w-full max-w-[1104px]'>
          <PageHeader
            eyebrow='Medusa München'
            title='Tattoo Nachsorge'
            subtitle='Ihr Leitfaden für perfekte Heilung und langanhaltende Schönheit'
            alignment='center'
          />
        </div>
      </Section>
      <Footer />
    </div>
  );
};

export default AftercarePage;
