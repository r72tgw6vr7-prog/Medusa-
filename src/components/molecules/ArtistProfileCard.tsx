import React from 'react';

import { Artist } from '@/data/artists';
import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/i18n/utils/localizePath';

interface ArtistProfileCardProps {
  artist: Artist;
}

export function ArtistProfileCard({ artist }: ArtistProfileCardProps) {
  const { language } = useLanguage();

  const bio = language === 'en' ? artist.bio.en : artist.bio.de;
  const roleLabel =
    (language === 'en' ? artist.roleLocalized?.en : artist.roleLocalized?.de) ?? artist.role;
  const specialties =
    (language === 'en' ? artist.specialtiesLocalized?.en : artist.specialtiesLocalized?.de) ??
    artist.specialties;

  return (
    <div className='flex flex-col lg:flex-row gap-12 items-start mb-24'>
      <div className='flex flex-col h-full'>
        <Card variant='default' size='default' className='overflow-hidden'>
          <div className='relative aspect-3/4 w-full overflow-hidden'>
            <img
              src={artist.profileImage}
              alt={artist.displayName}
              className='w-full h-full object-cover grayscale'
              loading='lazy'
              decoding='async'
              width='640'
              height='800'
            />
            <div className='absolute inset-0 bg-linear-to-t from-luxury-bg-dark via-transparent to-transparent opacity-70' />
          </div>
        </Card>
      </div>

      <div className='flex flex-col h-full space-y-12'>
        <div className='space-y-6'>
          <h2 className='font-headline text-(length:--text-h2) font-bold tracking-tight leading-tight text-(--color-text-primary)'>
            {artist.displayName}
          </h2>

          <div className='flex flex-wrap items-center gap-4'>
            <span className='inline-flex items-center justify-center px-6 py-4 bg-[rgba(var(--color-surface-darker-rgb),0.65)] backdrop-blur-lg border border-[rgba(var(--color-accent-silver-rgb),0.15)] rounded-full text-(length:--text-sm) uppercase tracking-widest font-medium text-brand-chrome'>
              {roleLabel}
            </span>
            {artist.experience ? (
              <span className='inline-flex items-center justify-center px-6 py-4 bg-[rgba(var(--color-surface-darker-rgb),0.45)] backdrop-blur-md border border-[rgba(var(--color-accent-silver-rgb),0.10)] rounded-full text-(length:--text-sm) uppercase tracking-widest font-medium text-brand-chrome'>
                {artist.experience}
              </span>
            ) : null}
          </div>
        </div>

        <div className='space-y-6'>
          <p className='text-(length:--text-body) text-luxury-text-inverse/80 leading-(--line-height-normal) font-body whitespace-pre-line'>
            {bio}
          </p>
        </div>

        {artist.specialties?.length ? (
          <div>
            <h3 className='font-headline text-(length:--text-h4) text-brand-accent mb-8'>
              {language === 'en' ? 'Specialties' : 'Schwerpunkte'}
            </h3>
            <div className='flex flex-wrap gap-4'>
              {specialties.map((specialty) => (
                <span
                  key={specialty}
                  className='inline-flex items-center px-6 py-4 bg-[rgba(var(--color-surface-darker-rgb),0.55)] backdrop-blur-md border border-[rgba(var(--color-accent-silver-rgb),0.15)] rounded-xl text-(length:--text-sm) text-luxury-text-inverse/80 font-body'
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className='pt-12 border-t border-[rgba(var(--color-accent-silver-rgb),0.2)]'>
          <a
            href={localizePath('/booking', language)}
            className='inline-flex items-center justify-center px-8 py-6 bg-(--accent-chrome) hover:bg-(--accent-chrome)/80 text-luxury-text-primary font-semibold text-(length:--text-body) rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2'
          >
            {language === 'en' ? 'Book Appointment' : 'Termin buchen'}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ArtistProfileCard;
