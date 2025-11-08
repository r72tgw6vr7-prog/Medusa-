import React, { useState, useEffect } from 'react';
import './TeamGrid.css';
import Section from '../ui/Section';
import { Button } from '../ui/button';
import type { ContainerSize } from '../ui/Container';
import ArtistCard from '../molecules/Card/ArtistCard';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  photo: string;
  specialties: string[];
  bookable: boolean;
  featured: boolean;
  bio: string;
  experience: string;
  instagram: string;
}

interface TeamData {
  team: TeamMember[];
}

// Add render timestamp for verification
const RENDER_TIMESTAMP = Date.now();

interface Artist {
  name: string;
  photo: string;
  role: string;
  roleIcon: string;
  specialties: string[];
  experience: string;
  instagram: string;
  bookable: boolean;
}

type TeamGridProps = { containerSize?: ContainerSize };

const TeamGrid: React.FC<TeamGridProps> = ({ containerSize = 'default' }) => {
  // Fallback: show 8 cards if team.json is empty or missing
  const defaultArtists: Artist[] = [
    { name: 'Loui', photo: '/images/placeholder.jpg', role: 'Tattoo Artist', roleIcon: 'Pen', specialties: ['Black & Gray', 'Realism', 'Watercolor', 'Portrait'], experience: '8+ Jahre', instagram: '@loui_medusa', bookable: true },
    { name: 'Angie', photo: '/images/placeholder.jpg', role: 'Tattoo Artist', roleIcon: 'Pen', specialties: ['Traditional', 'Neo-Traditional', 'Japanese'], experience: '6+ Jahre', instagram: '@angie_medusa', bookable: true },
    { name: 'Aaron', photo: '/images/placeholder.jpg', role: 'Piercing Artist', roleIcon: 'Target', specialties: ['Dermal', 'Industrial', 'Complex Piercings'], experience: '10+ Jahre', instagram: '@aaron_medusa', bookable: true },
    { name: 'Oliver', photo: '/images/placeholder.jpg', role: 'Tattoo Artist', roleIcon: 'Pen', specialties: ['Geometric', 'Blackwork', 'Minimalist'], experience: '5+ Jahre', instagram: '@oli_medusa', bookable: true },
    { name: 'Elena', photo: '/images/placeholder.jpg', role: 'Tattoo Artist', roleIcon: 'Pen', specialties: ['Color', 'New School', 'Custom Design'], experience: '7+ Jahre', instagram: '@elena_medusa', bookable: true },
    { name: 'Max', photo: '/images/placeholder.jpg', role: 'Piercing Artist', roleIcon: 'Target', specialties: ['Surface', 'Microdermal', 'Body Modifications'], experience: '9+ Jahre', instagram: '@max_medusa', bookable: true },
    { name: 'Sophia', photo: '/images/placeholder.jpg', role: 'Tattoo Artist', roleIcon: 'Pen', specialties: ['Fine Line', 'Script', 'Ornamental'], experience: '4+ Jahre', instagram: '@sophia_medusa', bookable: true },
    { name: 'Leo', photo: '/images/placeholder.jpg', role: 'Tattoo Artist', roleIcon: 'Pen', specialties: ['Dark Art', 'Horror', 'Biomechanical'], experience: '6+ Jahre', instagram: '@leo_medusa', bookable: true },
  ];
  const [artists, setArtists] = useState<Artist[]>([]);
  const [renderCount, setRenderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch team data from public directory
    const loadTeamData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/team.json');
        const teamData: TeamData = await response.json();

        // Convert from the team.json data format to our component format
        const artistsData: Artist[] = teamData.team.map((member: TeamMember) => ({
          name: member.name,
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
        }));

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
      bg="none" 
      className="py-16 lg:py-24"
      containerSize={containerSize}
      aria-label='Artist Team'
    >
      <div className='team-heading'>
        <h2>Unser Meisterteam</h2>
        {/* Add data attributes for verification */}
        <small
          className='render-info team-render-timestamp'
          data-timestamp={RENDER_TIMESTAMP}
          data-render-count={renderCount}
        >
          Updated: {new Date().toLocaleTimeString()}
        </small>
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
            const slug = artist.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={index} className="team-card-wrap">
                <ArtistCard
                  name={artist.name}
                  role={{ name: artist.role, icon: 'pen-icon.svg' }}
                  imageUrl={artist.photo}
                  specialties={artist.specialties}
                  experience={artist.experience}
                  instagramHandle={artist.instagram}
                />
                <div className="team-card-actions">
                  {artist.bookable && (
                    <Button variant="gold" asChild className="flex-1">
                      <a href={`/booking?artist=${encodeURIComponent(artist.name)}`} className="no-underline">
                        Jetzt Buchen
                      </a>
                    </Button>
                  )}
                  <Button variant="outlineGold" asChild className="flex-1">
                    <a href={`/gallery#${slug}`} className="no-underline">
                      Galerie
                    </a>
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Section>
  );
};

export default TeamGrid;
