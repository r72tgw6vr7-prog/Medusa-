import React, { useState, useEffect } from 'react';
import { PenTool, Target, UserIcon, Palette, Clock, Instagram } from 'lucide-react';
import './TeamGrid.css';

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
    <section aria-label='Artist Team' className='team-section'>
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
          artists.map((artist, index) => (
            <div key={index} className='team-card-wrap'>
              <article className='team-card' data-artist-name={artist.name}>
                <img
                  src={artist.photo}
                  alt={artist.name}
                  className='team-card-image'
                  loading='lazy'
                  decoding='async'
                  sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 360px) 50vw, 100vw'
                  onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
                />
                <div className='team-card-overlay'></div>

                <div className='team-card-name-top'>{artist.name}</div>

                <div className='team-role-badge'>
                  {artist.roleIcon === 'Pen' && <PenTool size={16} className='icon' />}
                  {artist.roleIcon === 'Target' && <Target size={16} className='icon' />}
                  {artist.roleIcon === 'User' && <UserIcon size={16} className='icon' />}
                  {artist.roleIcon === 'Palette' && <Palette size={16} className='icon' />}
                  {artist.role}
                </div>

                <div className='team-card-content'>
                  <p className='team-card-specialties'>{artist.specialties.join(', ')}</p>

                  <div className='team-card-bottom-info'>
                    <div className='team-card-experience'>
                      <Clock size={16} className='icon' />
                      <span>{artist.experience}</span>
                    </div>

                    <div className='team-card-social'>
                      <Instagram size={16} className='icon' />
                      <a
                        href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {artist.instagram}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
              {/* Actions moved outside the card to match previous design */}
              {artist.bookable && (
                <div className='team-card-actions'>
                  <a
                    href={`/booking?artist=${encodeURIComponent(artist.name)}`}
                    className='team-card-button team-card-button-primary'
                  >
                    Jetzt Buchen
                  </a>
                  <a
                    href={`/gallery#${artist.name.toLowerCase()}`}
                    className='team-card-button team-card-button-secondary'
                  >
                    Galerie
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TeamGrid;
