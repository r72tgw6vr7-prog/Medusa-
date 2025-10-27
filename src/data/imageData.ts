// Central image repository - Single source of truth
export const portfolioImages = [
  {
    id: 'tattoo-1',
    src: '/images/placeholder.svg',
    alt: 'Black and gray tattoo artwork',
    category: 'tattoo' as const,
    featured: true,
    artist: 'Sasha',
    style: 'Blackwork',
  },
  {
    id: 'tattoo-2',
    src: '/images/placeholder.svg',
    alt: 'Geometric tattoo design',
    category: 'tattoo' as const,
    featured: true,
    artist: 'Aaron',
    style: 'Geometric',
  },
  {
    id: 'tattoo-3',
    src: '/images/placeholder.svg',
    alt: 'Traditional tattoo artwork',
    category: 'tattoo' as const,
    featured: false,
    artist: 'Vive',
    style: 'Traditional',
  },
  {
    id: 'tattoo-4',
    src: '/images/placeholder.svg',
    alt: 'Realistic portrait tattoo',
    category: 'tattoo' as const,
    featured: false,
    artist: 'Loui',
    style: 'Realism',
  },
  {
    id: 'piercing-1',
    src: '/images/placeholder.svg',
    alt: 'Professional piercing work',
    category: 'piercing' as const,
    featured: true,
    artist: 'Angie',
    style: 'Ear Curation',
  },
  {
    id: 'piercing-2',
    src: '/images/placeholder.svg',
    alt: 'Premium piercing jewelry',
    category: 'piercing' as const,
    featured: true,
    artist: 'Debi',
    style: 'Body Piercing',
  },
  {
    id: 'piercing-3',
    src: '/images/placeholder.svg',
    alt: 'Facial piercing setup',
    category: 'piercing' as const,
    featured: false,
    artist: 'Angie',
    style: 'Facial Piercing',
  },
  {
    id: 'piercing-4',
    src: '/images/placeholder.svg',
    alt: 'Luxury piercing collection',
    category: 'piercing' as const,
    featured: false,
    artist: 'Debi',
    style: 'Jewelry',
  },
];

export type PortfolioImage = (typeof portfolioImages)[0];
export type ImageCategory = 'tattoo' | 'piercing';

export const getFeaturedPortfolio = () => portfolioImages.filter((img) => img.featured);

export const getPortfolioByCategory = (category: ImageCategory) =>
  portfolioImages.filter((img) => img.category === category);

export const getAllPortfolio = () => portfolioImages;

export const getPortfolioById = (id: string) => portfolioImages.find((img) => img.id === id);

export const getPortfolioByArtist = (artist: string) =>
  portfolioImages.filter((img) => img.artist.toLowerCase() === artist.toLowerCase());
