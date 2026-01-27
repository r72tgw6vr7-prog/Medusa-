import React, { useMemo } from 'react';

import { Artist } from '@/data/artists';
import { LayoutGridDemo } from '@/components/layout-grid-demo';
import Section from '@/components/primitives/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { useLanguage } from '@/contexts/LanguageContext';

interface ArtistPortfolioGalleryProps {
  artist: Artist;
}

export function ArtistPortfolioGallery({ artist }: ArtistPortfolioGalleryProps) {
  const { language } = useLanguage();

  const images = useMemo(() => {
    return (artist.portfolioImages || []).map((src, idx) => ({
      id: `${artist.slug}-${idx}`,
      src,
      alt:
        language === 'en'
          ? `Portfolio image ${idx + 1} by ${artist.displayName}`
          : `Portfolio Bild ${idx + 1} von ${artist.displayName}`,
      title: artist.displayName,
      category: language === 'en' ? 'Portfolio' : 'Portfolio',
    }));
  }, [artist.displayName, artist.portfolioImages, artist.slug, language]);

  return (
    <Section variant='default' spacing='normal' bg='dark' as='section' id='portfolio'>
      <div className='mb-16'>
        <SectionHeading
          eyebrow='Medusa München'
          title={language === 'en' ? 'Portfolio' : 'Portfolio'}
          subtitle={
            language === 'en'
              ? `A selection of ${artist.displayName}'s recent work`
              : `Eine Auswahl der Arbeiten von ${artist.displayName}`
          }
        />
      </div>

      {images.length ? (
        <LayoutGridDemo images={images} />
      ) : (
        <div className='text-center py-16'>
          <p className='text-luxury-text-inverse/60 text-(length:--text-body) font-body'>
            {language === 'en' ? 'No portfolio images available yet.' : 'Noch keine Portfolio-Bilder verfügbar.'}
          </p>
        </div>
      )}
    </Section>
  );
}

export default ArtistPortfolioGallery;
