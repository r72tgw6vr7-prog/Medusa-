import React, { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import Meta from '@/components/Meta';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import { useLanguage } from '@/contexts/LanguageContext';
import { getArtistBySlug } from '@/data/artists';

import NotFoundPage from './NotFoundPage';

import ArtistHero from '@/components/molecules/ArtistHero';
import ArtistProfileCard from '@/components/molecules/ArtistProfileCard';
import ArtistPortfolioGallery from '@/components/molecules/ArtistPortfolioGallery';
import ArtistContactCTA from '@/components/molecules/ArtistContactCTA';

export function ArtistProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { language, t } = useLanguage();

  const artist = useMemo(() => {
    if (!slug) return undefined;
    return getArtistBySlug(slug);
  }, [slug]);

  const isEnglishPath = location.pathname === '/en' || location.pathname.startsWith('/en/');
  const backHref = isEnglishPath ? '/en/artists' : '/artists';

  if (!artist) {
    return <NotFoundPage />;
  }

  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.muenchen-tattoo-studio.de';
  const dePath = `/artists/${artist.slug}`;
  const enPath = `/en/artists/${artist.slug}`;

  const title = `Medusa Tattoo München | ${artist.displayName}`;
  const descriptionSource = language === 'en' ? artist.bio.en : artist.bio.de;
  const description =
    descriptionSource.length > 160 ? `${descriptionSource.slice(0, 157)}...` : descriptionSource;

  return (
    <>
      <Meta
        title={title}
        description={description}
        canonicalPath={location.pathname}
        ogImage={artist.coverImage || artist.profileImage}
        hreflang={{
          de: `${SITE_URL}${dePath}`,
          en: `${SITE_URL}${enPath}`,
        }}
        locale={language === 'en' ? 'en_US' : 'de_DE'}
        alternateLocale={language === 'en' ? ['de_DE'] : ['en_US']}
      />

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

      <div className='w-full min-h-screen relative z-10 bg-luxury-bg-dark overflow-x-clip'>
        <MainNavigation />

        <main id='main-content' className='lg:pt-16 md:pt-24 max-md:pt-32'>
          <ArtistHero artist={artist} />

          <Section variant='default' spacing='normal' bg='dark'>
            <Container size='default'>
              <div className='mb-16'>
                <Link
                  to={backHref}
                  className='inline-flex items-center gap-4 text-brand-accent hover:text-brand-accent-hover font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2'
                >
                  <span aria-hidden='true'>←</span>
                  <span>{t('artists.profile.backToAll')}</span>
                </Link>
              </div>

              <ArtistProfileCard artist={artist} />
              <ArtistPortfolioGallery artist={artist} />
              <ArtistContactCTA artist={artist} />
            </Container>
          </Section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ArtistProfilePage;
