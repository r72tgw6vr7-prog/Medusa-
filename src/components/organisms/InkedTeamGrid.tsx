import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowRight } from 'lucide-react';

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
  bio: {
    de: string;
    en: string;
  } | string;
  experience: string;
  instagram: string;
  certifications?: string[];
}

interface TeamData {
  team: TeamMember[];
}

export const InkedTeamGrid: React.FC = () => {
  const [artists, setArtists] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Strict allowlist: only allow relative paths under /images with safe characters
  const sanitizeImageSrc = (src?: string): string => {
    const fallback = '/images/placeholder-artist.jpg';
    if (typeof src !== 'string') return fallback;
    const s = src.trim();
    // Allow only /images/... with safe characters; everything else falls back
    const isSafe = /^\/images\/[a-zA-Z0-9\/_\-.]+$/.test(s);
    return isSafe ? s : fallback;
  };

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/team.json');
        const teamData: TeamData = await response.json();
        setArtists(teamData.team || []);
      } catch (error) {
        console.error('Error loading team data:', error);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeamData();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-sm text-white/60 uppercase tracking-wider font-medium mb-8">
            Meet the Team
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 uppercase tracking-wide">
            Our Tattoo Experts
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Skilled artists dedicated to bringing your vision to life with precision, creativity, and care
          </p>
        </motion.div>

        {/* Artists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Artist Card */}
              <div className="relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:scale-105 flex flex-col h-full">
                
                {/* Artist Image */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={sanitizeImageSrc(artist.photo)}
                    alt={artist.photoAlt || `${artist.name}, ${artist.role}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder-artist.jpg';
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 flex flex-col h-full" />
                  
                  {/* Role Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-0 py-0 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white uppercase tracking-wider border border-white/20 flex flex-col h-full">
                      {artist.role}
                    </span>
                  </div>

                  {/* Instagram Link */}
                  {artist.instagram && (
                    <div className="absolute top-4 right-4">
                      <a
                        href={`https://instagram.com/${encodeURIComponent(artist.instagram.replace('@', '').replace(/[^a-zA-Z0-9._]/g, ''))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300 flex-col h-full"
                        aria-label={`Follow ${artist.name} on Instagram`}
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-xl font-bold text-white mb-0">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-white/80 mb-0">
                      {artist.experience} Experience
                    </p>
                    
                    {/* Specialties */}
                    <div className="flex flex-wrap gap-0 mb-8">
                      {artist.specialties.slice(0, 2).map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-0 py-0 bg-white/10 backdrop-blur-sm rounded text-xs text-white/90 flex flex-col h-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {artist.specialties.length > 2 && (
                        <span className="px-0 py-0 bg-white/10 backdrop-blur-sm rounded text-xs text-white/70 flex flex-col h-full">
                          +{artist.specialties.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-8 space-y-0">
                  {artist.bookable && (
                    <a
                      href={`/booking?artist=${encodeURIComponent(artist.name)}`}
                      className="w-full bg-white text-black py-0 px-8 rounded-full font-medium text-center hover:bg-white/90 transition-colors duration-300 flex items-center justify-center gap-0 group/btn flex-col h-full"
                    >
                      Book Session
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </a>
                  )}
                  
                  <a
                    href={`/gallery#${artist.slug}`}
                    className="w-full border border-white/30 text-white py-0 px-8 rounded-full font-medium text-center hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-0 group/btn flex-col h-full"
                  >
                    View Portfolio
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-8">
            Ready to work with our talented team?
          </p>
          <a
            href="/booking"
            className="inline-flex items-center gap-0 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-8 rounded-full font-medium transition-all duration-300 group"
          >
            Book Your Consultation
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InkedTeamGrid;
