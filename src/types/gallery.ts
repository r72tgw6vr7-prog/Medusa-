/**
 * Unified Gallery Data Types
 * 
 * This is the single source of truth for gallery image data structure.
 * All gallery components should use these interfaces.
 * 
 * Data source: /src/data/gallery-index.json
 */

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  artist: string;
  category: 'tattoo' | 'piercing';
  style: string;
  date: string;
  featured: boolean;
  fileSize: number;
  lastModified: string;
  alt: string;
}

export interface GalleryStats {
  totalImages: number;
  byArtist: Record<string, number>;
  byCategory: Record<string, number>;
  byDate: Record<string, number>;
  featured: number;
  totalSize: number;
  lastGenerated: string;
}

export interface GalleryIndex {
  version: string;
  generatedAt: string;
  stats: GalleryStats;
  categories: string[];
  styles: string[];
  images: GalleryImage[];
}

// Component prop interfaces
export interface GalleryGridProps {
  images: GalleryImage[];
  loading?: boolean;
  error?: string | null;
  onImageClick?: (image: GalleryImage) => void;
  className?: string;
}

export interface GalleryFilterProps {
  categories: string[];
  styles: string[];
  artists: string[];
  selectedCategory?: string;
  selectedStyle?: string;
  selectedArtist?: string;
  onFilterChange: (filters: GalleryFilters) => void;
}

export interface GalleryFilters {
  category?: string;
  style?: string;
  artist?: string;
  featured?: boolean;
  sortBy?: 'date' | 'title' | 'artist';
  sortOrder?: 'asc' | 'desc';
}

// Utility types
export type GalleryCategory = GalleryImage['category'];
export type GalleryStyle = GalleryImage['style'];
