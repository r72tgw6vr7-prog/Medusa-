import React from 'react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-brand-background flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-brand-gold font-headline text-6xl mb-8'>404</h1>
        <h2 className='text-brand-white font-headline text-2xl mb-8'>Page Not Found</h2>
        <p className='text-brand-chrome text-lg mb-8 max-w-md mx-auto'>
          The page you're looking for doesn't exist. Please check the URL or return to the home
          page.
        </p>
        <a
          href='/'
          className='inline-block bg-brand-gold text-brand-background px-8 py-0 rounded-lg font-medium hover:bg-brand-gold-hover transition duration-200 ease-out'
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
