// ============================================
// PAGE ASSEMBLY: GalleryPage
// ============================================
// PURPOSE: Gallery page with interactive layout grid for tattoo/piercing work.

import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Footer } from '@/components/pages';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { LayoutGridDemo } from '@/components/layout-grid-demo';
import {
  getGalleryArtistOptions,
  getLocalizedGalleryImages,
  type GalleryArtistId,
} from '@/content/gallery-images';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeading } from '@/components/PageHeading';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import './GalleryPage.css';

export function GalleryPage() {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const localizedGalleryImages = useMemo(() => getLocalizedGalleryImages(language), [language]);
  const artistOptions = useMemo(() => getGalleryArtistOptions(), []);
  const artistOptionIds = useMemo(
    () => new Set(artistOptions.map((artist) => artist.id)),
    [artistOptions],
  );

  const selectedArtistParam = searchParams.get('artist');
  const selectedArtist: GalleryArtistId | 'all' =
    selectedArtistParam && artistOptionIds.has(selectedArtistParam as GalleryArtistId)
      ? (selectedArtistParam as GalleryArtistId)
      : 'all';

  const artistScopedImages = useMemo(() => {
    return selectedArtist === 'all'
      ? localizedGalleryImages
      : localizedGalleryImages.filter((image) => image.artistId === selectedArtist);
  }, [localizedGalleryImages, selectedArtist]);

  const styleOptions = useMemo(() => {
    const styles = new Map<string, string>();

    artistScopedImages.forEach((image) => {
      if (!styles.has(image.styleKey)) {
        styles.set(image.styleKey, image.style);
      }
    });

    return [...styles.entries()]
      .map(([id, label]) => ({ id, label }))
      .sort((a, b) => a.label.localeCompare(b.label, language));
  }, [artistScopedImages, language]);

  const styleOptionIds = useMemo(
    () => new Set(styleOptions.map((style) => style.id)),
    [styleOptions],
  );

  const selectedStyleParam = searchParams.get('style');
  const selectedStyle =
    selectedStyleParam && styleOptionIds.has(selectedStyleParam) ? selectedStyleParam : 'all';

  const filteredImages = useMemo(() => {
    return localizedGalleryImages.filter((image) => {
      const matchesArtist = selectedArtist === 'all' || image.artistId === selectedArtist;
      const matchesStyle = selectedStyle === 'all' || image.styleKey === selectedStyle;
      return matchesArtist && matchesStyle;
    });
  }, [localizedGalleryImages, selectedArtist, selectedStyle]);

  const hasActiveFilters = selectedArtist !== 'all' || selectedStyle !== 'all';

  useEffect(() => {
    const nextSearchParams = new URLSearchParams(searchParams);
    let hasChanges = false;

    if (selectedArtistParam && selectedArtist === 'all') {
      nextSearchParams.delete('artist');
      hasChanges = true;
    }

    if (selectedStyleParam && selectedStyle === 'all') {
      nextSearchParams.delete('style');
      hasChanges = true;
    }

    if (hasChanges) {
      setSearchParams(nextSearchParams, { replace: true });
    }
  }, [
    searchParams,
    selectedArtist,
    selectedArtistParam,
    selectedStyle,
    selectedStyleParam,
    setSearchParams,
  ]);

  const updateFilters = (nextArtist: GalleryArtistId | 'all', nextStyle: string | 'all') => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextArtist === 'all') {
      nextSearchParams.delete('artist');
    } else {
      nextSearchParams.set('artist', nextArtist);
    }

    if (nextStyle === 'all') {
      nextSearchParams.delete('style');
    } else {
      nextSearchParams.set('style', nextStyle);
    }

    setSearchParams(nextSearchParams);
  };

  const handleArtistChange = (artist: GalleryArtistId | 'all') => {
    const nextImages =
      artist === 'all'
        ? localizedGalleryImages
        : localizedGalleryImages.filter((image) => image.artistId === artist);
    const nextStyleIds = new Set(nextImages.map((image) => image.styleKey));
    const nextStyle =
      selectedStyle !== 'all' && nextStyleIds.has(selectedStyle) ? selectedStyle : 'all';

    updateFilters(artist, nextStyle);
  };

  const handleStyleChange = (style: string | 'all') => {
    updateFilters(selectedArtist, style);
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const getFilterButtonClass = (isActive: boolean) =>
    isActive
      ? 'inline-flex items-center justify-center rounded-full border border-(--brand-accent) bg-(--brand-accent) px-6 py-4 text-sm font-semibold text-(--deep-black) transition-colors duration-200'
      : 'inline-flex items-center justify-center rounded-full border border-(--card-border) bg-white/5 px-6 py-4 text-sm font-semibold text-luxury-text-inverse/80 transition-colors duration-200 hover:border-(--brand-accent) hover:text-luxury-text-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--deep-black)';

  return (
    <>
      {/* Skip to main content link */}
      {typeof navigator === 'undefined' || navigator.webdriver !== true ? (
        <a
          href='#main-content'
          data-testid='skip-to-content'
          style={{ margin: 0, top: 120, left: 0, zIndex: 10001 }}
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-modal focus:px-8 focus:py-4 focus:bg-brand-accent focus:text-deep-black focus:rounded-lg focus:shadow-lg'
        >
          Skip to main content
        </a>
      ) : null}
      <div className='gallery-page w-full min-h-screen relative z-10 bg-luxury-bg-dark'>
        {/* Navigation */}
        <MainNavigation />

        <main id='main-content' className='lg:pt-16 md:pt-24 max-md:pt-32'>
          {/* Page Header */}
          <Section variant='default' spacing='normal' bg='dark'>
            <Container size='wide'>
              <PageHeading
                eyebrow={language === 'en' ? 'Medusa Munich' : 'Medusa München'}
                title={t('gallery.title')}
                subtitle={t('gallery.subtitle')}
              />
              <div className='mt-8 text-center'>
                <p className='text-(length:--text-body) text-luxury-text-inverse/70 font-body leading-(--line-height-normal) max-w-3xl mx-auto'>
                  {t('gallery.intro')}
                </p>
              </div>
              <div className='mt-16 rounded-3xl border border-(--card-border) bg-white/5 p-8 md:p-10'>
                <div className='flex flex-col gap-8'>
                  <div className='flex flex-col gap-4'>
                    <p className='text-sm uppercase tracking-widest text-luxury-text-inverse/50 font-semibold'>
                      {t('gallery.filters.artistLabel')}
                    </p>
                    <div
                      className='flex flex-wrap gap-4'
                      role='toolbar'
                      aria-label={t('gallery.filters.artistLabel')}
                    >
                      <button
                        type='button'
                        onClick={() => handleArtistChange('all')}
                        aria-pressed={selectedArtist === 'all'}
                        className={getFilterButtonClass(selectedArtist === 'all')}
                      >
                        {t('gallery.filters.allArtists')}
                      </button>
                      {artistOptions.map((artist) => (
                        <button
                          key={artist.id}
                          type='button'
                          onClick={() => handleArtistChange(artist.id)}
                          aria-pressed={selectedArtist === artist.id}
                          className={getFilterButtonClass(selectedArtist === artist.id)}
                        >
                          {artist.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className='flex flex-col gap-4'>
                    <p className='text-sm uppercase tracking-widest text-luxury-text-inverse/50 font-semibold'>
                      {t('gallery.filters.styleLabel')}
                    </p>
                    <div
                      className='flex flex-wrap gap-4'
                      role='toolbar'
                      aria-label={t('gallery.filters.styleLabel')}
                    >
                      <button
                        type='button'
                        onClick={() => handleStyleChange('all')}
                        aria-pressed={selectedStyle === 'all'}
                        className={getFilterButtonClass(selectedStyle === 'all')}
                      >
                        {t('gallery.filters.allStyles')}
                      </button>
                      {styleOptions.map((style) => (
                        <button
                          key={style.id}
                          type='button'
                          onClick={() => handleStyleChange(style.id)}
                          aria-pressed={selectedStyle === style.id}
                          className={getFilterButtonClass(selectedStyle === style.id)}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className='flex flex-wrap items-center justify-between gap-4'>
                    <p
                      className='text-sm font-body text-luxury-text-inverse/60'
                      role='status'
                      aria-live='polite'
                    >
                      {t('gallery.filters.resultsCount', { count: filteredImages.length })}
                    </p>
                    {hasActiveFilters ? (
                      <button
                        type='button'
                        onClick={resetFilters}
                        className='inline-flex items-center justify-center rounded-full border border-(--card-border) bg-transparent px-6 py-4 text-sm font-semibold text-luxury-text-inverse/80 transition-colors duration-200 hover:border-(--brand-accent) hover:text-luxury-text-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--deep-black)'
                      >
                        {t('gallery.filters.reset')}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          {/* Gallery Grid Section - Full Viewport Width */}
          <Section variant='default' spacing='normal' bg='dark'>
            {filteredImages.length ? (
              <LayoutGridDemo images={filteredImages} />
            ) : (
              <Container size='wide'>
                <div className='rounded-3xl border border-(--card-border) bg-white/5 px-8 py-16 text-center'>
                  <p className='text-(length:--text-body) text-luxury-text-inverse/70 font-body'>
                    {t('gallery.filters.emptyState')}
                  </p>
                </div>
              </Container>
            )}
          </Section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default GalleryPage;
