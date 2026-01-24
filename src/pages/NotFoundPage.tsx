import React from 'react';

import { PageHeading } from '@/components/PageHeading';

export const NotFoundPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-luxury-bg-dark flex items-center justify-center lg:pt-16 md:pt-24 max-md:pt-32'>
      <div className='text-center'>
        <PageHeading
          title='404'
          subtitle="Page Not Found. The page you're looking for doesn't exist. Please check the URL or return to the home page."
        />
        <a
          href='/'
          className='inline-block bg-(--accent-chrome) text-(--deep-black) px-8 py-0 rounded-lg font-medium hover:bg-(--accent-chrome)/80 transition duration-200 ease-out'
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
