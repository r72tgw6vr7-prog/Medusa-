import React, { useEffect } from 'react';
import { MapPin, Landmark, Train, Car } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Container from '@/components/ui/Container';

export const LocationSection: React.FC = () => {
  const { t } = useLanguage();

  // Add schema markup for SEO
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Medusa Tattoo & Piercingstudio München',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Altheimer Eck 11',
        addressLocality: 'München',
        postalCode: '80331',
        addressCountry: 'DE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '48.1351',
        longitude: '11.5750',
      },
      telephone: '+49 (0) 89 269 313',
      openingHours: 'Mo-Fr 11:00-19:00, Sa 10:00-16:00',
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    // Return cleanup function
    return () => {
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <section
      className='relative z-10 w-full py-16 text-luxury-text-inverse'
      style={{
        background: 'var(--card-bg)',
        borderTop: 'calc(var(--space-0-5) / 4) solid var(--card-border)',
        boxShadow: 'var(--card-shadow-depth), var(--card-shadow-glow)',
      }}
    >
      <Container>
        {/* Location Section - SEO Content */}
        <div>
          <div className='flex items-center gap-4 py-4'>
            <MapPin size={20} className='text-white/60 shrink-0' />
            <h3 className='font-headline text-xl font-semibold text-white'>
              {t('common.footer.location.title')}
            </h3>
          </div>

          <div className='pt-8 pb-8 space-y-12'>
            {/* Location Icons Grid */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              <div className='flex flex-col h-full text-center'>
                <Landmark className='mx-auto mb-4 w-8 h-8 text-white/80' />
                <h4 className='font-semibold text-base text-white mb-2'>
                  {t('common.footer.location.items.marienplatz.title')}
                </h4>
                <p className='text-base text-white/70'>
                  {t('common.footer.location.items.marienplatz.subtitle')}
                </p>
              </div>
              <div className='flex flex-col h-full text-center'>
                <Train className='mx-auto mb-4 w-8 h-8 text-white/80' />
                <h4 className='font-semibold text-base text-white mb-2'>
                  {t('common.footer.location.items.subway.title')}
                </h4>
                <p className='text-base text-white/70'>
                  {t('common.footer.location.items.subway.subtitle')}
                </p>
              </div>
              <div className='flex flex-col h-full text-center'>
                <Train className='mx-auto mb-4 w-8 h-8 text-white/80' />
                <h4 className='font-semibold text-base text-white mb-2'>
                  {t('common.footer.location.items.suburbanRail.title')}
                </h4>
                <p className='text-base text-white/70'>
                  {t('common.footer.location.items.suburbanRail.subtitle')}
                </p>
              </div>
              <div className='flex flex-col h-full text-center'>
                <Car className='mx-auto mb-4 w-8 h-8 text-white/80' />
                <h4 className='font-semibold text-base text-white mb-2'>
                  {t('common.footer.location.items.parking.title')}
                </h4>
                <p className='text-base text-white/70'>
                  {t('common.footer.location.items.parking.subtitle')}
                </p>
              </div>
            </div>

            {/* SEO Tags */}
            <div className='flex flex-wrap gap-2 justify-center'>
              <span className='text-sm bg-white/10 text-white px-4 py-2 rounded-full'>
                {t('common.footer.location.tags.marienplatz')}
              </span>
              <span className='text-sm bg-white/10 text-white px-4 py-2 rounded-full'>
                {t('common.footer.location.tags.innerCity')}
              </span>
              <span className='text-sm bg-white/10 text-white px-4 py-2 rounded-full'>
                {t('common.footer.location.tags.cityCenter')}
              </span>
              <span className='text-sm bg-white/10 text-white px-4 py-2 rounded-full'>
                {t('common.footer.location.tags.altheimerEck')}
              </span>
              <span className='text-sm bg-white/10 text-white px-4 py-2 rounded-full'>
                {t('common.footer.location.tags.englishSpeaking')}
              </span>
            </div>

            {/* Divider */}
            <hr className='border-t border-white/10' />

            {/* FAQ Cards */}
            <div>
              <h3 className='text-xl font-semibold mb-8 text-center text-white'>
                {t('common.footer.location.faq.title')}
              </h3>

              <div className='grid md:grid-cols-3 gap-8'>
                <div className='flex flex-col h-full bg-white/5 rounded-lg p-6'>
                  <h4 className='font-semibold text-lg text-white mb-4'>
                    {t('common.footer.location.faq.cards.locals.title')}
                  </h4>
                  <p className='text-base text-white/70 leading-relaxed'>
                    {t('common.footer.location.faq.cards.locals.body')}
                  </p>
                </div>

                <div className='flex flex-col h-full bg-white/5 rounded-lg p-6'>
                  <h4 className='font-semibold text-lg text-white mb-4'>
                    {t('common.footer.location.faq.cards.tourists.title')}
                  </h4>
                  <p className='text-base text-white/70 leading-relaxed'>
                    {t('common.footer.location.faq.cards.tourists.body')}
                  </p>
                </div>

                <div className='flex flex-col h-full bg-white/5 rounded-lg p-6'>
                  <h4 className='font-semibold text-lg text-white mb-4'>
                    {t('common.footer.location.faq.cards.hours.title')}
                  </h4>
                  <div className='text-base text-white/70 space-y-2'>
                    <p>
                      <strong className='text-white'>
                        {t('common.footer.location.faq.cards.hours.monFriLabel')}
                      </strong>{' '}
                      {t('common.footer.location.faq.cards.hours.monFriValue')}
                    </p>
                    <p>
                      <strong className='text-white'>
                        {t('common.footer.location.faq.cards.hours.satLabel')}
                      </strong>{' '}
                      {t('common.footer.location.faq.cards.hours.satValue')}
                    </p>
                    <p>
                      <strong className='text-white'>
                        {t('common.footer.location.faq.cards.hours.sunLabel')}
                      </strong>{' '}
                      {t('common.footer.location.faq.cards.hours.sunValue')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LocationSection;
