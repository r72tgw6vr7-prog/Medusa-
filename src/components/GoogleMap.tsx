import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { env } from '@/lib/env';

interface Props {
  width?: string;
  height?: string;
  className?: string;
  title?: string;
}

const GoogleMap: React.FC<Props> = ({
  width = '100%',
  height = '400px',
  className = '',
  title = 'Medusa Studio Location Map',
}) => {
  const [mapError, setMapError] = React.useState(false);
  const [showFallback, setShowFallback] = React.useState(!env.VITE_GOOGLE_MAPS_API_KEY);

  const apiKey = env.VITE_GOOGLE_MAPS_API_KEY;
  const mapUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Medusa+Tattoo+München,+Altheimer+Eck+11,+80331+München&zoom=15&maptype=roadmap`
    : null;

  const handleMapError = () => {
    console.error('Map failed to load');
    setMapError(true);
    setShowFallback(true);
  };

  if (showFallback) {
    return (
      <div
        data-testid='map-fallback'
        className='flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-[var(--brand-gold)]/20'
        style={{ minHeight: height }}
      >
        <MapPin className='text-[var(--brand-gold)] w-16 h-16 mb-8' />
        <h3 className='text-white text-xl font-semibold mb-0'>Medusa Tattoo München</h3>
        <p className='text-white/70 text-sm mb-8 max-w-xs'>Altheimer Eck 11, 80331 München</p>
        <div className='flex flex-col sm:flex-row gap-0'>
          <a
            href='https://maps.google.com/?q=Medusa+Tattoo+München+Altheimer+Eck+11+80331+München'
            target='_blank'
            rel='noopener noreferrer'
            data-testid='map-fallback-link'
            className='inline-flex items-center gap-0 bg-[var(--brand-gold)] text-black px-8 py-0 rounded-lg hover:bg-[#B8941F] transition-colors font-medium transition duration-200 ease-out'
          >
            <ExternalLink size={16} />
            Karte öffnen
          </a>
          <a
            href='https://www.google.com/maps/dir//Medusa+Tattoo+München,+Altheimer+Eck+11,+80331+München'
            target='_blank'
            rel='noopener noreferrer'
            data-testid='map-fallback-link'
            className='inline-flex items-center gap-0 border border-[var(--brand-gold)] text-[var(--brand-gold)] px-8 py-0 rounded-lg hover:bg-[var(--brand-gold)]/10 transition-colors font-medium transition duration-200 ease-out'
          >
            Route planen
          </a>
        </div>
        <p className='text-white/50 text-xs mt-8'>Karte temporär nicht verfügbar</p>
      </div>
    );
  }

  return (
    <div data-testid='map-embed' style={{ width, height }} className={`relative ${className}`}>
      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px' }}>
        <iframe
          src={mapUrl || undefined}
          style={{
            border: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          title={title}
          onError={handleMapError}
        />
      </div>
      {mapError && !showFallback && (
        <div className='absolute top-2 right-2 z-10'>
          <button
            onClick={() => setShowFallback(true)}
            className='bg-black/50 text-white text-xs px-0 py-0 rounded hover:bg-black/70 transition duration-200 ease-out'
          >
            Static Map
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
