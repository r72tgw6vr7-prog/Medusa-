import React from 'react';
import GoogleMap from '@/components/GoogleMap';

export const GoogleMapSection: React.FC = () => {
  return (
    <section className='google-map-section w-full relative' style={{ background: '#0a0a0a' }}>
      <GoogleMap height='450px' title='Medusa Tattoo München Location' className='w-full' />
      <noscript>
        <div className='p-4 text-center bg-gray-100 text-black'>
          <p>Medusa Tattoo & Piercingstudio München</p>
          <p>Altheimer Eck 11, 80331 München, Germany</p>
        </div>
      </noscript>
    </section>
  );
};

export default GoogleMapSection;
