import React from 'react';
import { ArtistCardJapanese } from '@/components/cards/ArtistCardJapanese';

interface Artist {
  name: string;
  role: {
    name: string;
    icon: string;
  };
  specialties: string[];
  experience: string;
  instagramHandle: string;
  imageUrl: string;
}

interface ArtistSectionProps {
  title: string;
  subtitle: string;
  artists: Artist[];
  onBookClick?: (artistName: string) => void;
  _onGalleryClick?: (artistName: string) => void;
  className?: string;
}

export const ArtistSection: React.FC<ArtistSectionProps> = ({
  title,
  subtitle,
  artists,
  onBookClick,
  _onGalleryClick,
  className = '',
}) => {
  return (
    <section className={`bg-luxury-bg-dark py-ma-md ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Ma spacing */}
        <div className="text-center mb-ma-sm">
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-luxury-text-inverse mb-4">
            {title}
          </h2>
          
          {/* Chrome accent divider */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-px bg-luxury-accent-chrome" />
          </div>
          
          <p className="text-lg text-luxury-text-inverse-muted font-light max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Artist Grid - with Ma spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-ma-xs">
          {artists.map((artist, index) => (
            <ArtistCardJapanese
              key={index}
              name={artist.name}
              role={artist.role}
              imageUrl={artist.imageUrl}
              specialties={artist.specialties}
              experience={artist.experience}
              instagramHandle={artist.instagramHandle}
              onBookClick={onBookClick ? () => onBookClick(artist.name) : undefined}
              variant="dark"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
