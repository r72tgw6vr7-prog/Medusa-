import React from 'react';
import { ArtistCard } from './ArtistCard';

// Example usage of the ArtistCard component
export const ArtistCardExample: React.FC = () => {
  const handleBooking = () => {
    console.log('Booking clicked');
  };

  const handleGallery = () => {
    console.log('Gallery clicked');
  };

  const handleCardClick = () => {
    console.log('Card clicked');
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8'>
      {/* Basic Artist Card */}
      <ArtistCard
        name='Maria Schmidt'
        role={{ name: 'Tattoo Artist', icon: 'pen-icon.svg' }}
        specialties={['Black & Gray', 'Realism']}
        experience='5+ Jahre'
        instagramHandle='@maria_tattoo'
        imageUrl='/path/to/maria-image.jpg'
        onBookClick={handleBooking}
        onGalleryClick={handleGallery}
      />

      {/* Selected Artist Card */}
      <ArtistCard
        name='Alex Mueller'
        role={{ name: 'Piercing Specialist', icon: 'piercing-icon.svg' }}
        specialties={['Ear Piercing', 'Body Piercing']}
        experience='8+ Jahre'
        instagramHandle='@alex_piercing'
        imageUrl='/path/to/alex-image.jpg'
        isSelected={true}
        onBookClick={handleBooking}
        onGalleryClick={handleGallery}
      />

      {/* Interactive Artist Card */}
      <ArtistCard
        name='Sarah Weber'
        role={{ name: 'Nail Artist', icon: 'nail-icon.svg' }}
        specialties={['Gel Nails', 'Nail Art']}
        experience='3+ Jahre'
        instagramHandle='@sarah_nails'
        imageUrl='/path/to/sarah-image.jpg'
        onClick={handleCardClick}
        onBookClick={handleBooking}
        imagePosition='center 30%'
      />

      {/* Gallery Only Card */}
      <ArtistCard
        name='Tom Fischer'
        role={{ name: 'Tattoo Artist', icon: 'pen-icon.svg' }}
        specialties={['Traditional', 'Neo-Traditional']}
        experience='10+ Jahre'
        instagramHandle='@tom_traditional'
        imageUrl='/path/to/tom-image.jpg'
        onGalleryClick={handleGallery}
      />
    </div>
  );
};

export default ArtistCardExample;
