// ============================================
// COMPONENT: OurArtists
// ============================================
// PURPOSE: Display team of 6 bookable artists in responsive grid with detail modal
// LAYOUT: 3 columns desktop, 2 tablet, 1 mobile

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArtistCard } from '../molecules/Card/ArtistCard';
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
    imageSrc: '/assets/images/photos/artists/Loui/Loui.png',
    imageFallback: '/images/placeholder.jpg',
    instagramHandle: '@loui_medusa',
    imagePosition: 'center', // Unified positioning via CSS
  },
  {
    id: 'debi',
    name: 'Debi',
    role: 'Tattoo Artist',
    specialties: ['Old School', 'Geometry', 'Blackwork', 'Maori'],
    experience: '12+ Jahre',
    imageSrc: '/assets/images/photos/artists/Debi/Debi.png',
    imageFallback: '/images/placeholder.jpg',
    instagramHandle: '@debi_medusa',
    imagePosition: 'center', // Unified positioning via CSS
  },
  {
    id: 'aaron',
    name: 'Aaron',
    role: 'Ear Magician & Piercer',
    specialties: ['Kids Specialist', 'Dermalanker', 'Surface'],
    experience: '11+ Jahre',
    imageSrc: '/assets/images/photos/artists/Aaron/Aaron.png',
    imageFallback: '/images/placeholder.jpg',
    instagramHandle: '@aaron_medusa',
    imagePosition: 'center', // Unified positioning via CSS
  },
  {
    id: 'vivi',
    name: 'Vivi',
    role: 'Resident Piercer',
    specialties: ['Consultation', 'Snake Eye', 'Collection Curator'],
    experience: '9+ Jahre',
    imageSrc: '/assets/images/photos/artists/Vivi/IMG_3149.png',
    imageFallback: '/images/placeholder.jpg',
    instagramHandle: '@vivi_medusa',
    imagePosition: 'center', // Unified positioning via CSS
  },
  {
    id: 'angie',
    name: 'Angie',
    role: 'Resident Piercer',
    specialties: ['Consultation', 'Social Media', 'Septum'],
    experience: '7+ Jahre',
    imageSrc: '/assets/images/photos/artists/Angie/Angie.png',
    imageFallback: '/images/placeholder.jpg',
    instagramHandle: '@angie_medusa',
    imagePosition: 'center', // Unified positioning via CSS
  },
  {
    id: 'eli-luquez',
    name: 'Eli Luquez',
    role: 'Tattoo Artist',
    specialties: ['Realism', 'Black & Gray', 'Fineline', 'Blackwork'],
    experience: '8+ Jahre',
    imageSrc: '/assets/images/photos/artists/Luz/Luz.png',
    imageFallback: '/images/placeholder.jpg',
    instagramHandle: '@eli_luquez',
    imagePosition: 'center', // Unified positioning via CSS
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
      <section className='w-full section-padding' data-texture-bg>
        <div className='responsive-container safe-area-padding'>
          {/* Section Header - STANDARDIZED TYPOGRAPHY */}
          <div className='section-header text-center mb-8 md:mb-16 max-w-[800px] mx-auto'>
            <h2 className='section-title font-playfair text-[36px] font-semibold text-[var(--brand-gold)] mb-8 leading-[1.2] tracking-tight'>
              Unser Meisterteam
            </h2>
            <p className='section-description font-inter text-[18px] text-[#C0C0C0] leading-[1.5]'>
              Lernen Sie unsere erfahrenen Künstler kennen – jeder mit einzigartigem Stil und
              Expertise
            </p>
          </div>

          {/* Artist Grid - Updated: 2 columns mobile, 3-4 columns larger screens */}
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-8 lg:gap-8'>
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
                className='cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] rounded-2xl flex flex-col h-full'
                aria-label={`${artist.name} Details anzeigen`}
              >
                <ArtistCard
                  artist={{
                    id: artist.id,
                    name: artist.name,
                    role: artist.role,
                    photo: artist.imageSrc,
                    specialties: artist.specialties,
                    experience: artist.experience,
                    instagram: artist.instagramHandle,
                    bookable: true,
                  }}
                  onClick={() => onBookArtist(artist.id)}
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
