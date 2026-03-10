import React from 'react';

export const GoogleMapSection: React.FC = () => {
  return (
    <section className='google-map-section w-full relative' style={{ background: '#0a0a0a' }}>
      <div
        style={{
          filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.6) contrast(1.2)',
        }}
      >
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.7225864002025!2d11.570978476891853!3d48.13651205484429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e758a78df5acb%3A0x95f5eb6b753b370e!2sAltheimer%20Eck%2011%2C%2080331%20M%C3%BCnchen%2C%20Germany!5e0!3m2!1sen!2sus!4v1706810871205!5m2!1sen!2sus'
          width='100%'
          height='450'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          title='Medusa Tattoo München Location'
          className='w-full h-112 md:h-112 sm:h-75'
        />
      </div>
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
