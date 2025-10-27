// ============================================
// COMPONENT: OurArtists
// ============================================
// PURPOSE: Display team of 6 bookable artists in responsive grid with detail modal
// LAYOUT: 3 columns desktop, 2 tablet, 1 mobile

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArtistCard } from '../molecules/ArtistCard';
import { ArtistDetailModal } from './ArtistDetailModal';
import './OurArtists.css';

interface Artist {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  experience: string;
  imageSrc: string;
  imageFallback: string;
  instagramHandle: string;
  imagePosition?: string; // REFINEMENT #5: Custom object position for photo
}

interface OurArtistsProps {
  onBookArtist: (artistId: string) => void;
}

// Create artists array with HIGH-QUALITY headshots
const artists: Artist[] = [
  {
    id: 'loui',
    name: 'Loui',
    role: 'Tattoo Artist',
    specialties: ['Black & Gray', 'Realism', 'Watercolor', 'Portrait'],
    experience: '10+ Jahre',
    imageSrc: '/images/artists/team-bio/headshots/loui.jpg',
    imageFallback: '/images/placeholder.jpg',
    instagramHandle: '@loui_medusa',
    imagePosition: 'object-[center_25%]', // FIX 1: Already well-positioned
  },
  {
    id: 'debi',
    name: 'Debi',
    role: 'Tattoo Artist',
    specialties: ['Old School', 'Geometry', 'Blackwork', 'Maori'],
    experience: '12+ Jahre',
    imageSrc: '/images/artists/team-bio/headshots/debi.jpg',
    imageFallback: '/images/placeholder.jpg',
    instagramHandle: '@debi_medusa',
    imagePosition: 'object-[center_22%]', // FIX 1: Move face up significantly (seated close-up)
  },
  {
    id: 'aaron',
    name: 'Aaron',
    role: 'Ear Magician & Piercer',
    specialties: ['Kids Specialist', 'Dermalanker', 'Surface'],
    experience: '11+ Jahre',
    imageSrc: '/images/artists/team-bio/headshots/aaron.jpg',
    imageFallback: '/images/placeholder.jpg',
    instagramHandle: '@aaron_medusa',
    imagePosition: 'object-[center_20%]', // FIX 1: Move face up significantly
  },
  {
    id: 'vivi',
    name: 'Vivi',
    role: 'Resident Piercer',
    specialties: ['Consultation', 'Snake Eye', 'Collection Curator'],
    experience: '9+ Jahre',
    imageSrc: '/images/artists/team-bio/headshots/vivi.jpg',
    imageFallback: '/images/placeholder.jpg',
    instagramHandle: '@vivi_medusa',
    imagePosition: 'object-[center_25%]', // FIX 1: Move face up
  },
  {
    id: 'angie',
    name: 'Angie',
    role: 'Resident Piercer',
    specialties: ['Consultation', 'Social Media', 'Septum'],
    experience: '7+ Jahre',
    imageSrc: '/images/artists/team-bio/headshots/angie.jpg',
    imageFallback: '/images/placeholder.jpg',
    instagramHandle: '@angie_medusa',
    imagePosition: 'object-[center_23%]', // FIX 1: Move face up
  },
  {
    id: 'eli-luquez',
    name: 'Eli Luquez',
    role: 'Tattoo Artist',
    specialties: ['Realism', 'Black & Gray', 'Fineline', 'Blackwork'],
    experience: '8+ Jahre',
    imageSrc: '/images/artists/team-bio/headshots/oli.jpg',
    imageFallback: '/images/placeholder.jpg',
    instagramHandle: '@eli_luquez',
    imagePosition: 'object-[center_40%]', // FIX 1: Standing pose, less adjustment needed
  },
];

export function OurArtists({ onBookArtist }: OurArtistsProps) {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const handleGalleryView = (artistId: string) => {
    window.location.href = `/gallery?artist=${artistId}`;
  };

  const handleCardClick = (artist: Artist) => {
    setSelectedArtist(artist);
  };

  const handleCloseModal = () => {
    setSelectedArtist(null);
  };

  return (
    <>
      <section className='w-full section-padding'>
        <div className='responsive-container safe-area-padding'>
          {/* Section Header - STANDARDIZED TYPOGRAPHY */}
          <div className='section-header text-center mb-8 md:mb-16 max-w-[800px] mx-auto'>
            <h2 className='section-title font-playfair text-[36px] font-semibold text-[#D4AF37] mb-8 leading-[1.2] tracking-tight'>
              Unser Meisterteam
            </h2>
            <p className='section-description font-inter text-[18px] text-[#C0C0C0] leading-[1.5]'>
              Lernen Sie unsere erfahrenen Künstler kennen – jeder mit einzigartigem Stil und
              Expertise
            </p>
          </div>

          {/* Artist Grid - FIX 12: 4 columns desktop, reduced gaps to 32px */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-8'>
            {artists.map((artist) => (
              <div
                key={artist.id}
                onClick={() => handleCardClick(artist)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(artist);
                  }
                }}
                role='button'
                tabIndex={0}
                className='cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-2xl flex flex-col h-full'
                aria-label={`${artist.name} Details anzeigen`}
              >
                <ArtistCard
                  name={artist.name}
                  role={{ name: artist.role, icon: '★' }}
                  specialties={artist.specialties}
                  experience={artist.experience}
                  instagramHandle={artist.instagramHandle}
                  imageUrl={artist.imageSrc}
                  imagePosition={artist.imagePosition} // Pass custom positioning
                  onBookClick={() => onBookArtist(artist.id)}
                  onGalleryClick={() => handleGalleryView(artist.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Detail Modal */}
      <AnimatePresence>
        {selectedArtist && <ArtistDetailModal artist={selectedArtist} onClose={handleCloseModal} />}
      </AnimatePresence>
    </>
  );
}
