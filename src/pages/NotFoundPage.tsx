import React from 'react';

import { PageHeading } from '../components/PageHeading';

export const NotFoundPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-luxury-bg-dark flex items-center justify-center'>
      <div className='text-center'>
        <PageHeading 
          title="404"
          subtitle="Page Not Found. The page you're looking for doesn't exist. Please check the URL or return to the home page."
        />
        <a
          href='/'
          className='inline-block bg-[var(--accent-chrome)] text-[var(--deep-black)] px-8 py-0 rounded-lg font-medium hover:bg-[var(--accent-chrome)]/80 transition duration-200 ease-out' 
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
