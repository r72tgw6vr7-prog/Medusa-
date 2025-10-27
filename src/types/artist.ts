export interface PortfolioImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  tags?: string[];
  featured?: boolean;
}

export interface SocialMedia {
  platform: 'instagram' | 'facebook' | 'twitter' | 'pinterest' | 'website';
  url: string;
  username?: string;
}

export interface Availability {
  day: string;
  times: string[];
  available: boolean;
}

export interface Artist {
  id: string;
  name: string;
  slug: string;
  specialty: 'Tattoo' | 'Piercing' | 'Both';
  bio: string;
  image: string;
  coverImage?: string;
  yearsOfExperience: number;
  style: string[];
  portfolio: string[];
  portfolioImages?: PortfolioImage[];
  socialMedia: SocialMedia[];
  availability: Availability[];
  featured: boolean;
  rating?: number;
  reviewCount?: number;
  languages: string[];
  certifications?: string[];
  basePrice?: number;
  bookingUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArtistCardProps {
  artist: Omit<Artist, 'portfolio' | 'availability' | 'socialMedia'>;
  className?: string;
  onClick?: () => void;
}

export interface ArtistGridProps {
  artists: Artist[];
  loading?: boolean;
  error?: string | null;
  onArtistClick?: (artistId: string) => void;
  className?: string;
}

export interface ArtistDetailProps {
  artist: Artist;
  loading?: boolean;
  error?: string | null;
  onBack?: () => void;
  onBookNow?: () => void;
}

export interface ArtistFilter {
  specialty?: 'Tattoo' | 'Piercing' | 'Both';
  style?: string[];
  minExperience?: number;
  availableThisWeek?: boolean;
  sortBy?: 'featured' | 'rating' | 'experience' | 'name';
  searchQuery?: string;
}

export interface ArtistFilterProps {
  filters: ArtistFilter;
  onFilterChange: (filters: ArtistFilter) => void;
  availableStyles: string[];
  className?: string;
}

export interface ArtistBookingProps {
  artist: Pick<Artist, 'id' | 'name' | 'availability'>;
  onSuccess?: (bookingId: string) => void;
  onError?: (error: Error) => void;
  className?: string;
}

export interface ArtistSocialProofProps {
  artist: Pick<Artist, 'rating' | 'reviewCount'>;
  className?: string;
}
