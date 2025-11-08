import React, { useState, useEffect } from 'react';
import styles from './TeamGrid.module.css';
import Section from '../ui/Section';
import { ArtistCard } from '../molecules';

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

const TeamGrid = () => {
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

        setArtists(artistsData);
      } catch (error) {
        console.error('Error loading team data:', error);
        // Fallback to empty array if fetch fails
        setArtists([]);
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
      className="py-16 lg:py-24 relative z-10"
      containerSize="default"
      aria-label='Artist Team'
      data-texture-bg
    >
      <div className={styles['team-heading']}>
        <h2>Unser Meisterteam</h2>
        {/* Add data attributes for verification */}
        <small
          className={`${styles['render-info']} ${styles['team-render-timestamp']}`}
          data-timestamp={RENDER_TIMESTAMP}
          data-render-count={renderCount}
        >
          Updated: {new Date().toLocaleTimeString()}
        </small>
      </div>
      <div className={styles['team-grid']}>
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
          artists.map((artist, index) => (
            <ArtistCard
              key={index}
              artist={{
                name: artist.name,
                role: artist.role,
                photo: artist.photo,
                specialties: artist.specialties,
                experience: artist.experience,
                instagram: artist.instagram,
                bookable: artist.bookable,
                roleIcon: artist.roleIcon,
              }}
              variant="full"
            />
          ))
        )}
      </div>
    </Section>
  );
};

export default TeamGrid;
