/**
 * Unified Team/Artist Data Types
 * 
 * This is the single source of truth for artist/team member data structure.
 * All components should use these interfaces to ensure consistency.
 * 
 * Data source: /public/team.json
 */

export interface TeamMember {
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
  bio: {
    de: string;
    en: string;
  } | string;
  experience: string;
  instagram: string;
  certifications?: string[];
}

export interface TeamData {
  team: TeamMember[];
}

// Component prop interfaces
export interface ArtistCardProps {
  artist: TeamMember;
  className?: string;
  onClick?: () => void;
  onBookClick?: () => void;
  onGalleryClick?: () => void;
  bookHref?: string;
  galleryHref?: string;
  imagePosition?: string;
  isSelected?: boolean;
}

export interface TeamGridProps {
  containerSize?: 'default' | 'narrow' | 'wide';
  showFeaturedOnly?: boolean;
  category?: 'tattoo' | 'piercing' | 'all';
}

export interface ArtistBioModalProps {
  artist: TeamMember;
  isOpen: boolean;
  onClose: () => void;
  language: 'de' | 'en';
}

// Utility types
export type ArtistCategory = TeamMember['category'];
export type ArtistRole = TeamMember['role'];
