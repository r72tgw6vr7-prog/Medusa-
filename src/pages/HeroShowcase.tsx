import React from 'react';

export const HeroShowcase: React.FC = () => {
  return (
    <div className='min-h-screen bg-brand-background flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-brand-gold font-headline text-5xl mb-8'>Hero Showcase</h1>
        <p className='text-brand-chrome text-xl max-w-2xl mx-auto'>
          This is a hero showcase component demonstrating various design elements.
        </p>
      </div>
    </div>
  );
};

export default HeroShowcase;
