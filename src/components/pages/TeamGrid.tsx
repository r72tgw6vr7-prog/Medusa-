import React, { useState, useEffect, useRef } from 'react';
import './TeamGrid.css';
import { ArtistCard, type Artist as ArtistCardType } from '../cards/ArtistCard';
import { ArtistBioModal } from '../molecules/ArtistBioModal';
import { PageHeading } from '../PageHeading';

interface TeamMember {
  id: string;
  slug: string;
  name: string;
  fullName?: string;
  role: string;
  category: 'tattoo' | 'piercing';
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
  category: 'tattoo' | 'piercing';
  bio?: {
    de: string;
    en: string;
  };
}

const TeamGrid: React.FC = () => {
  const defaultArtists: Artist[] = [
    {
      slug: 'aaron',
      name: 'Aaron',
      photo: '/assets/images/icons/placeholder.svg',
      role: 'Piercing Artist',
      roleIcon: 'Target',
      specialties: ['Dermal', 'Industrial', 'Complex Piercings'],
      experience: '10+ Jahre',
      instagram: '@aaron_medusa',
      bookable: true,
      featured: false,
      category: 'piercing',
    },
    {
      slug: 'angie',
      name: 'Angie',
      photo: '/assets/images/icons/placeholder.svg',
      role: 'Tattoo Artist',
      roleIcon: 'Pen',
      specialties: ['Traditional', 'Neo-Traditional', 'Japanese'],
      experience: '6+ Jahre',
      instagram: '@angie_medusa',
      bookable: true,
      featured: false,
      category: 'tattoo',
    },
    {
      slug: 'loui',
      name: 'Loui',
      photo: '/assets/images/icons/placeholder.svg',
      role: 'Tattoo Artist',
      roleIcon: 'Pen',
      specialties: ['Black & Gray', 'Realism', 'Watercolor', 'Portrait'],
      experience: '8+ Jahre',
      instagram: '@loui_medusa',
      bookable: true,
      featured: false,
      category: 'tattoo',
    },
    {
      slug: 'oliver',
      name: 'Oliver',
      photo: '/assets/images/icons/placeholder.svg',
      role: 'Tattoo Artist',
      roleIcon: 'Pen',
      specialties: ['Geometric', 'Blackwork', 'Minimalist'],
      experience: '5+ Jahre',
      instagram: '@oli_medusa',
      bookable: true,
      featured: false,
      category: 'tattoo',
    },
  ];

  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch team data
  useEffect(() => {
    const loadTeamData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/team.json');
        const teamData: TeamData = await response.json();

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
          category: member.category,
          bio: typeof member.bio === 'string' ? undefined : member.bio,
        }));

        // Sort alphabetically by first name (name field)
        artistsData.sort((a, b) => a.name.localeCompare(b.name));

        setArtists(artistsData.length > 0 ? artistsData : defaultArtists);
      } catch (error) {
        console.error('Error loading team data:', error);
        setArtists(defaultArtists);
      } finally {
        setLoading(false);
      }
    };

    loadTeamData();
  }, []);

  // IntersectionObserver for scroll-reveal with staggered delays
  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setRevealedIndices((prev) => new Set(prev).add(index));
              }, index * 200);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-50px',
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [artists.length]);

  // Convert Artist to ArtistCard format
  const toArtistCardFormat = (artist: Artist, index: number): ArtistCardType => {
    const description = artist.bio?.en
      ? artist.bio.en.split('\n')[0]
      : `Specializing in ${artist.specialties.join(', ')}. ${artist.experience} of professional experience.`;

    return {
      id: artist.slug || String(index),
      name: artist.fullName || artist.name,
      discipline: artist.role,
      description,
      image_url: artist.photo,
      display_order: index,
      category: artist.category,
    };
  };

  return (
    <section
      className="min-h-screen bg-luxury-bg-dark section-padding"
      style={{ marginTop: 'var(--first-section-offset)' }}
    >
      <div className="responsive-container safe-area-padding">
        <div className="mx-auto w-full max-w-7xl">
          {/* Section header - exact template structure */}
          <div className="mb-32">
            <PageHeading 
              eyebrow="Medusa München"
              title="Our Artists" 
              subtitle="Treffen Sie unser erfahrenes Team von Tätowierern und Piercern"
            />
          </div>

          {/* Artist cards with alternating layout */}
          <div className="space-y-40">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-luxury-text-inverse/40"></div>
                <p className="mt-4 text-luxury-text-inverse/50">Loading team members...</p>
              </div>
            ) : artists.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-luxury-text-inverse/50">No team members found.</p>
              </div>
            ) : (
              artists.map((artist, index) => (
                <div
                  key={artist.slug || index}
                  ref={(el) => {
                    observerRefs.current[index] = el;
                  }}
                  className="relative"
                >
                  <ArtistCard
                    artist={toArtistCardFormat(artist, index)}
                    isRevealed={revealedIndices.has(index)}
                    index={index}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Artist Biography Modal */}
      {selectedArtist && (
        <ArtistBioModal artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
      )}
    </section>
  );
};

export default TeamGrid;
