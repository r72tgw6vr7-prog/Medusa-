import React from 'react';
import { useLocation } from 'react-router-dom';

import Meta from '@/components/Meta';
import { PageHeading } from '@/components/PageHeading';

export const NotFoundPage: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Meta
        title='Seite nicht gefunden | Medusa Tattoo München'
        description='Die angeforderte Seite wurde nicht gefunden.'
        canonicalPath={location.pathname || '/'}
        robots='noindex,nofollow'
      />
      <main
        id='main-content'
        className='min-h-screen bg-luxury-bg-dark flex items-center justify-center lg:pt-16 md:pt-24 max-md:pt-32'
      >
        <div className='text-center'>
          <PageHeading
            title='404'
            subtitle='Seite nicht gefunden. Bitte prüfen Sie die URL oder kehren Sie zur Startseite zurück.'
          />
          <a
            href='/'
            className='inline-block bg-(--accent-chrome) text-(--deep-black) px-8 py-0 rounded-lg font-medium hover:bg-(--accent-chrome)/80 transition duration-200 ease-out'
          >
            Zur Startseite
          </a>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
