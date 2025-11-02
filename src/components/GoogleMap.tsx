import React, { useState, useEffect } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface GoogleMapProps {
  width?: string;
  height?: string;
  className?: string;
  title?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  width = '100%',
  height = '400',
  className = '',
  title = 'Medusa Studio Location Map'
}) => {
  const [mapError, setMapError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Studio location details
  const studioLocation = {
    name: 'Medusa Tattoo München',
    address: 'Musterstraße 123, 80331 München, Deutschland',
    coordinates: { lat: 48.1351, lng: 11.5678 },
    googleMapsUrl: 'https://maps.google.com/?q=Medusa+Tattoo+München+Musterstraße+123+80331+München',
    directionsUrl: 'https://www.google.com/maps/dir//Medusa+Tattoo+München'
  };

  // Get API key from environment variables
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Construct embed URL with API key if available
  const embedUrl = apiKey 
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Medusa+Tattoo+München&zoom=15&maptype=roadmap`
    : null;

  // Fallback embed URL (basic, no API key required but may have limitations)
  const fallbackEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.5!2d11.5678!3d48.1351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDA4JzA2LjQiTiAxMcKwMzQnMDQuMSJF!5e0!3m2!1sen!2sde!4v1234567890';

  useEffect(() => {
    // If no API key and basic embed fails, show static fallback
    if (!apiKey) {
      console.warn('Google Maps API key not found. Using fallback embed URL.');
    }
  }, [apiKey]);

  const handleMapError = () => {
    setMapError(true);
    setShowFallback(true);
    console.error('Google Maps failed to load. Showing static fallback.');
  };

  const StaticMapFallback = () => (
    <div 
      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-[#D4AF37]/20 flex flex-col items-center justify-center p-8 text-center ${className}`}
      style={{ width, height }}
    >
      <MapPin className="text-[#D4AF37] w-16 h-16 mb-4" />
      <h3 className="text-white text-xl font-semibold mb-2">{studioLocation.name}</h3>
      <p className="text-white/70 text-sm mb-6 max-w-xs">{studioLocation.address}</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={studioLocation.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-4 py-2 rounded-lg hover:bg-[#B8941F] transition-colors font-medium"
        >
          <ExternalLink size={16} />
          Karte öffnen
        </a>
        <a
          href={studioLocation.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors font-medium"
        >
          Route planen
        </a>
      </div>
      
      <p className="text-white/50 text-xs mt-4">
        Karte temporär nicht verfügbar
      </p>
    </div>
  );

  if (showFallback) {
    return <StaticMapFallback />;
  }

  return (
    <div className={`relative rounded-lg overflow-hidden border-2 border-[#D4AF37]/20 ${className}`}>
      <iframe
        src={embedUrl || fallbackEmbedUrl}
        width={width}
        height={height}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="h-[300px] md:h-[350px] lg:h-[400px] border-0 w-full"
        onError={handleMapError}
        onLoad={() => {
          // Additional check: if iframe loads but shows error content
          setTimeout(() => {
            const iframe = document.querySelector('iframe[title="' + title + '"]') as HTMLIFrameElement;
            if (iframe) {
              try {
                // Check if iframe content indicates an error (basic check)
                if (iframe.contentDocument?.title?.includes('Error') || 
                    iframe.contentDocument?.body?.textContent?.includes('error')) {
                  handleMapError();
                }
              } catch (e) {
                // Cross-origin restrictions prevent access, this is normal
                // If we can't access content, assume it's working
              }
            }
          }, 2000);
        }}
      />
      
      {/* Fallback trigger button if map seems broken */}
      {mapError && (
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setShowFallback(true)}
            className="bg-black/50 text-white text-xs px-2 py-1 rounded"
            title="Switch to static map"
          >
            Static Map
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;