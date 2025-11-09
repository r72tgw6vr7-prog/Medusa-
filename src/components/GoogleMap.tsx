import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

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
  const [showFallback, setShowFallback] = React.useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
  const mapUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Medusa+Tattoo+München,+Altheimer+Eck+11,+80331+München&zoom=15&maptype=roadmap`
    : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.5!2d11.571546!3d48.137433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e758cb4aa17f1%3A0x86e7767363488348!2sMedusa%20Tattoo%20M%C3%BCnchen!5e0!3m2!1sen!2sde!4v1699112345678`;

  const handleMapError = () => {
    console.error('Map failed to load');
    setMapError(true);
    setShowFallback(true);
  };

  if (showFallback) {
    return (
      <div
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
            className='inline-flex items-center gap-0 bg-[var(--brand-gold)] text-black px-8 py-0 rounded-lg hover:bg-[#B8941F] transition-colors font-medium transition duration-200 ease-out'
          >
            <ExternalLink size={16} />
            Karte öffnen
          </a>
          <a
            href='https://www.google.com/maps/dir//Medusa+Tattoo+München,+Altheimer+Eck+11,+80331+München'
            target='_blank'
            rel='noopener noreferrer'
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
    <div style={{ width, height }} className={`relative ${className}`}>
      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px' }}>
        <iframe
          src={mapUrl}
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
