import React from 'react';
import { ArtistCard } from '../components/molecules/ArtistCard';

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
  onGalleryClick?: (artistName: string) => void;
  className?: string;
}

export const ArtistSection: React.FC<ArtistSectionProps> = ({
  title,
  subtitle,
  artists,
  onBookClick,
  onGalleryClick,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-start bg-white ${className}`}>
      <div className='flex flex-col items-start w-full max-w-[1064px] mx-auto'>
        {/* Header */}
        <div className='flex flex-col items-center self-stretch mb-[3px]'>
          <span className='text-[#D4AF37] text-[42px] font-bold'>{title}</span>
        </div>

        {/* Divider */}
        <div className='flex flex-col items-center self-stretch mb-[22px]'>
          <div
            className='w-[351px] h-[3px]'
            style={{
              background: 'linear-gradient(180deg, #00000000, #D4AF37, #00000000)',
            }}
          />
        </div>

        {/* Subtitle */}
        <div className='flex flex-col items-center self-stretch mb-[13px]'>
          <span className='text-white text-[21px]'>{subtitle}</span>
        </div>

        {/* Artist Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8'>
          {artists.map((artist, index) => (
            <ArtistCard
              key={index}
              name={artist.name}
              role={artist.role}
              specialties={artist.specialties}
              experience={artist.experience}
              instagramHandle={artist.instagramHandle}
              imageUrl={artist.imageUrl}
              onBookClick={() => onBookClick?.(artist.name)}
              onGalleryClick={() => onGalleryClick?.(artist.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistSection;
