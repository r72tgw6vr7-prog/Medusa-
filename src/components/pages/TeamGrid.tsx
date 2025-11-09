import React, { useState, useEffect } from 'react';
import './TeamGrid.css';
import Section from '../ui/Section';
import { Button } from '../ui/button';
import type { ContainerSize } from '../ui/Container';
import ArtistCard from '../molecules/Card/ArtistCard';
import { ArtistBioModal } from '../molecules/ArtistBioModal';

interface TeamMember {
  id: string;
  slug: string;
  name: string;
  fullName?: string;
  role: string;
  category: string;
  photo: string;
  photoAlt?: string;
  specialties: string[];
  bookable: boolean;
  featured: boolean;
  bio:
    | {
        de: string;
        en: string;
      }
    | string;
  experience: string;
  instagram: string;
  certifications?: string[];
}

interface TeamData {
  team: TeamMember[];
}

// Add render timestamp for verification
const RENDER_TIMESTAMP = Date.now();

interface Artist {
  slug: string;
  name: string;
  fullName?: string;
  photo: string;
  role: string;
  roleIcon: string;
  specialties: string[];
  experience: string;
  instagram: string;
  bookable: boolean;
  featured: boolean;
  bio?: {
    de: string;
    en: string;
  };
}

type TeamGridProps = { containerSize?: ContainerSize };

const TeamGrid: React.FC<TeamGridProps> = ({ containerSize = 'default' }) => {
  // Fallback: show 8 cards if team.json is empty or missing (not used if team.json loads successfully)
  const defaultArtists: Artist[] = [
    {
      slug: 'loui',
      name: 'Loui',
      photo: '/images/placeholder.jpg',
      role: 'Tattoo Artist',
      roleIcon: 'Pen',
      specialties: ['Black & Gray', 'Realism', 'Watercolor', 'Portrait'],
      experience: '8+ Jahre',
      instagram: '@loui_medusa',
      bookable: true,
      featured: false,
    },
    {
      slug: 'angie',
      name: 'Angie',
      photo: '/images/placeholder.jpg',
      role: 'Tattoo Artist',
      roleIcon: 'Pen',
      specialties: ['Traditional', 'Neo-Traditional', 'Japanese'],
      experience: '6+ Jahre',
      instagram: '@angie_medusa',
      bookable: true,
      featured: false,
    },
    {
      slug: 'aaron',
      name: 'Aaron',
      photo: '/images/placeholder.jpg',
      role: 'Piercing Artist',
      roleIcon: 'Target',
      specialties: ['Dermal', 'Industrial', 'Complex Piercings'],
      experience: '10+ Jahre',
      instagram: '@aaron_medusa',
      bookable: true,
      featured: false,
    },
    {
      slug: 'oliver',
      name: 'Oliver',
      photo: '/images/placeholder.jpg',
      role: 'Tattoo Artist',
      roleIcon: 'Pen',
      specialties: ['Geometric', 'Blackwork', 'Minimalist'],
      experience: '5+ Jahre',
      instagram: '@oli_medusa',
      bookable: true,
      featured: false,
    },
    {
      slug: 'elena',
      name: 'Elena',
      photo: '/images/placeholder.jpg',
      role: 'Tattoo Artist',
      roleIcon: 'Pen',
      specialties: ['Color', 'New School', 'Custom Design'],
      experience: '7+ Jahre',
      instagram: '@elena_medusa',
      bookable: true,
      featured: false,
    },
    {
      slug: 'max',
      name: 'Max',
      photo: '/images/placeholder.jpg',
      role: 'Piercing Artist',
      roleIcon: 'Target',
      specialties: ['Surface', 'Microdermal', 'Body Modifications'],
      experience: '9+ Jahre',
      instagram: '@max_medusa',
      bookable: true,
      featured: false,
    },
    {
      slug: 'sophia',
      name: 'Sophia',
      photo: '/images/placeholder.jpg',
      role: 'Tattoo Artist',
      roleIcon: 'Pen',
      specialties: ['Fine Line', 'Script', 'Ornamental'],
      experience: '4+ Jahre',
      instagram: '@sophia_medusa',
      bookable: true,
      featured: false,
    },
    {
      slug: 'leo',
      name: 'Leo',
      photo: '/images/placeholder.jpg',
      role: 'Tattoo Artist',
      roleIcon: 'Pen',
      specialties: ['Dark Art', 'Horror', 'Biomechanical'],
      experience: '6+ Jahre',
      instagram: '@leo_medusa',
      bookable: true,
      featured: false,
    },
  ];
  const [artists, setArtists] = useState<Artist[]>([]);
  const [renderCount, setRenderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  useEffect(() => {
    // Fetch team data from public directory
    const loadTeamData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/team.json');
        const teamData: TeamData = await response.json();

        // Convert from the team.json data format to our component format
        const artistsData: Artist[] = teamData.team.map((member: TeamMember) => ({
          slug: member.slug,
          name: member.name,
          fullName: member.fullName,
          photo: member.photo,
          role: member.role,
          roleIcon:
            member.category === 'tattoo'
              ? 'Pen'
              : member.category === 'piercing'
                ? 'Target'
                : 'User',
          specialties: member.specialties,
          experience: member.experience,
          instagram: member.instagram,
          bookable: member.bookable,
          featured: member.featured,
          bio: typeof member.bio === 'string' ? undefined : member.bio,
        }));

        // Sort: featured artists first, then by order in JSON
        artistsData.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });

        if (artistsData.length > 0) {
          setArtists(artistsData);
        } else {
          // fallback to default 8 cards
          setArtists(defaultArtists);
        }
      } catch (error) {
        console.error('Error loading team data:', error);
        // Fallback to default 8 cards if fetch fails
        setArtists(defaultArtists);
      } finally {
        setLoading(false);
      }
    };

    loadTeamData();

    // Update render count for tracking rerenders
    setRenderCount((prev) => prev + 1);

    // Cleanup function
    return () => {
      const marker = document.getElementById('teamgrid-render-marker');
      if (marker) {
        marker.remove();
      }
    };
  }, []);

  return (
    <Section
      bg='none'
      className='py-16 lg:py-24'
      containerSize={containerSize}
      aria-label='Artist Team'
    >
      <div className='team-heading'>
        <h2>Unser Meisterteam</h2>
        {/* Add data attributes for verification */}
        {process.env.NODE_ENV === 'development' && (
          <small
            className='render-info team-render-timestamp'
            data-timestamp={RENDER_TIMESTAMP}
            data-render-count={renderCount}
          >
            Updated: {new Date().toLocaleTimeString()}
          </small>
        )}
      </div>
      <div className='team-grid'>
        {loading ? (
          <div className='text-center py-8'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold flex flex-col h-full'></div>
            <p className='mt-0 text-brand-chrome'>Loading team members...</p>
          </div>
        ) : artists.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-brand-chrome'>No team members found.</p>
          </div>
        ) : (
          artists.map((artist, index) => {
            // Hide action buttons for non-artist roles (manager/info)
            const HIDE_ACTIONS_FOR = new Set<string>(['oliver', 'sascha', 'Oliver', 'Sascha']);
            const hideActions =
              HIDE_ACTIONS_FOR.has(artist.slug) || HIDE_ACTIONS_FOR.has(artist.name);
            return (
              <div key={artist.slug || index} className='team-card-wrap'>
                <div
                  onClick={() => setSelectedArtist(artist)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedArtist(artist)}
                  role='button'
                  tabIndex={0}
                  aria-label={`View ${artist.name}'s biography`}
                  style={{ cursor: 'pointer' }}
                >
                  <ArtistCard
                    name={artist.name}
                    role={{ name: artist.role, icon: 'pen-icon.svg' }}
                    imageUrl={artist.photo}
                    specialties={artist.specialties}
                    experience={artist.experience}
                    instagramHandle={artist.instagram}
                  />
                </div>
                {!hideActions && (
                  <div className='team-card-actions'>
                    {artist.bookable && (
                      <Button variant='gold' asChild className='flex-1'>
                        <a
                          href={`/booking?artist=${encodeURIComponent(artist.name)}`}
                          className='no-underline'
                        >
                          Jetzt Buchen
                        </a>
                      </Button>
                    )}
                    <Button variant='outlineGold' asChild className='flex-1'>
                      <a href={`/gallery#${artist.slug}`} className='no-underline'>
                        Galerie
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Artist Biography Modal */}
      {selectedArtist && (
        <ArtistBioModal artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
      )}
    </Section>
  );
};

export default TeamGrid;
