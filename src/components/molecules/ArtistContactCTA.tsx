import React from 'react';

import { Artist } from '@/data/artists';
import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/i18n/utils/localizePath';

interface ArtistContactCTAProps {
  artist: Artist;
}

export function ArtistContactCTA({ artist }: ArtistContactCTAProps) {
  const { language } = useLanguage();

  const bookingHref = localizePath(artist.bookingUrl || '/booking', language);

  return (
    <div className='mt-24'>
      <Card variant='default' size='lg' className='text-center'>
        <h2 className='font-headline text-(length:--text-h2) font-bold tracking-tight leading-tight text-(--color-text-primary)'>
          {language === 'en' ? 'Ready to book?' : 'Bereit für deinen Termin?'}
        </h2>

        <p className='mt-8 text-(length:--text-lg) text-luxury-text-inverse/70 font-body leading-(--line-height-normal) max-w-2xl mx-auto'>
          {language === 'en'
            ? `Book with ${artist.displayName}.`
            : `Buche deinen Termin mit ${artist.displayName}.`}
        </p>

        <div className='mt-12 flex flex-col sm:flex-row items-center justify-center gap-8'>
          <a
            href={bookingHref}
            className='inline-flex items-center justify-center px-8 py-6 bg-(--accent-chrome) hover:bg-(--accent-chrome)/80 text-luxury-text-primary font-semibold text-(length:--text-body) rounded-xl transition-all duration-200 min-w-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2'
          >
            {language === 'en' ? 'Book Appointment' : 'Termin buchen'}
          </a>

          <a
            href={localizePath('/contact', language)}
            className='inline-flex items-center justify-center gap-4 px-8 py-6 border-2 border-(--brand-accent) text-(--brand-accent) hover:bg-(--brand-accent) hover:text-luxury-text-primary font-semibold text-(length:--text-body) rounded-xl transition-all duration-200 min-w-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2'
          >
            {language === 'en' ? 'Email Studio' : 'Studio mailen'}
          </a>
        </div>
      </Card>
    </div>
  );
}

export default ArtistContactCTA;
