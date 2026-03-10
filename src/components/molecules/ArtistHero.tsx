import React from 'react';

import { Artist } from '@/data/artists';
import { PageHeading } from '@/components/PageHeading';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import { useLanguage } from '@/contexts/LanguageContext';

interface ArtistHeroProps {
  artist: Artist;
}

export function ArtistHero({ artist }: ArtistHeroProps) {
  const roleLabel = artist.roleLocalized?.de ?? artist.role;

  const backgroundImage = artist.coverImage || artist.profileImage;

  return (
    <Section variant='default' spacing='none' bg='dark' as='section'>
      <div className='relative w-full overflow-hidden'>
        {/* Background image */}
        <div className='absolute inset-0'>
          <img
            src={backgroundImage}
            alt={artist.displayName}
            className='w-full h-full object-cover grayscale'
            loading='eager'
            decoding='async'
          />
          <div className='absolute inset-0 bg-luxury-bg-dark/70' />
          <div className='absolute inset-0 bg-linear-to-t from-luxury-bg-dark via-luxury-bg-dark/60 to-transparent' />
        </div>

        {/* Content */}
        <div className='relative z-10 min-h-screen flex items-center'>
          <Container size='default'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='inline-flex items-center gap-4 px-6 py-4 bg-[rgba(var(--color-surface-darker-rgb),0.65)] backdrop-blur-xl border border-[rgba(var(--color-accent-silver-rgb),0.15)] rounded-full mb-12'>
                <span className='text-(length:--text-sm) uppercase tracking-widest font-medium text-brand-chrome'>
                  {roleLabel}
                </span>
              </div>

              <PageHeading
                eyebrow='Medusa München'
                title={artist.displayName}
                subtitle=''
                level='hero'
              />

              <p className='mt-12 text-(length:--text-lg) text-luxury-text-inverse/70 max-w-2xl mx-auto font-body leading-(--line-height-normal)'>
                {artist.bio.de}
              </p>

              <div className='mt-16 flex flex-col sm:flex-row items-center justify-center gap-8'>
                <a
                  href='#portfolio'
                  className='inline-flex items-center justify-center px-8 py-6 bg-(--accent-chrome) hover:bg-(--accent-chrome)/80 text-luxury-text-primary font-semibold text-(length:--text-body) rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2'
                >
                  Portfolio ansehen
                </a>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}

export default ArtistHero;
