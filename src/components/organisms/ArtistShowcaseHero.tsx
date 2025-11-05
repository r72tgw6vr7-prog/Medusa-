import React from 'react';

interface ArtistShowcaseHeroProps {
  onBookNowClick: () => void;
  language: 'DE' | 'EN';
}

export function ArtistShowcaseHero({ onBookNowClick, language }: ArtistShowcaseHeroProps) {
  const content = {
    DE: {
      headline: 'Lernen Sie Unsere Artists Kennen',
      subhead: 'Preisgekrönte Profis, die sich Ihrer Vision und Sicherheit verschrieben haben',
      cta: 'Jetzt Buchen',
    },
    EN: {
      headline: 'Meet Our Artists',
      subhead: 'Award-winning professionals dedicated to your vision and safety',
      cta: 'Book Now',
    },
  };

  const t = content[language];

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Image with Overlay */}
      <div className='absolute inset-0'>
        <img
          src='https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&crop=center'
          alt='Professional tattoo artists at work in luxury studio'
          className='w-full h-full object-cover'
          onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
        />
        {/* Pure Black Overlays */}
        <div className='absolute inset-0 bg-linear-to-r from-black/85 via-black/70 to-black/85'></div>
        <div className='absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/70'></div>
        {/* Official Gold Glow */}
        <div className='absolute inset-0 bg-linear-to-t from-[var(--brand-gold)]/10 via-transparent to-transparent'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-[1104px] mx-auto px-8 text-center pt-24'>
        {/* Brand Identity */}
        <div className='mb-16'>
          <div className='text-[var(--brand-gold)] text-3xl md:text-4xl tracking-[0.2em] mb-0 font-playfair font-semibold'>
            MEDUSA
          </div>
          <div className='text-white/80 text-base tracking-[0.1em] font-sans'>
            TATTOO SALON MÜNCHEN
          </div>
        </div>

        {/* Main Headlines */}
        <div className='mb-16'>
          <h1 className='text-white text-4xl md:text-5xl leading-tight mb-8 font-playfair'>
            {t.headline}
          </h1>
          <p className='text-white/90 text-xl max-w-4xl mx-auto leading-relaxed font-sans'>
            {t.subhead}
          </p>
        </div>

        {/* Primary CTA */}
        <div className='mb-24'>
          <button
            onClick={onBookNowClick}
            className='bg-linear-to-r from-[#B8941F] to-[var(--brand-gold)] text-black px-16 py-8 rounded-full text-lg font-medium shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-h-11'
          >
            {t.cta}
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className='text-white/60 animate-bounce'>
          <div className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mx-auto'>
            <div className='w-1 h-3 bg-[var(--brand-gold)] rounded-full mt-0 animate-pulse'></div>
          </div>
        </div>
      </div>
    </section>
  );
}
