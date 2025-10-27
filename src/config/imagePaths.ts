/**
 * CENTRALIZED IMAGE PATH CONFIGURATION
 * =====================================
 * Single source of truth for all image paths in the application.
 *
 * RULES:
 * 1. ALL paths must be lowercase
 * 2. Use hyphens for multi-word names (studio-interior-1.jpg)
 * 3. Never use spaces or underscores
 * 4. Always include file extension
 * 5. Paths are relative to /public directory
 */

export const IMAGE_PATHS = {
  // Artist team photos
  artists: {
    eli: '/images/artists/team-bio/headshots/luz.webp',
    aaron: '/images/artists/team-bio/headshots/aaron.webp',
    oliver: '/images/artists/team-bio/headshots/oli.webp',
    vive: '/images/artists/team-bio/headshots/vivi.webp',
    angie: '/images/artists/team-bio/headshots/angie.webp',
    debi: '/images/artists/team-bio/headshots/debi.webp',
    loui: '/images/artists/team-bio/headshots/loui.webp',
    sasha: '/images/artists/team-bio/headshots/sascha.webp',
  },

  // Studio interior photos
  studio: {
    interior1: '/images/studio/studio-interior-1.webp',
    interior2: '/images/studio/studio-interior-2.webp',
    interior3: '/images/studio/studio-interior-3.webp',
  },

  // Service card backgrounds
  services: {
    tattoo: '/images/tattoo-card-bg.jpg',
    piercing: '/images/piercing-card-bg.jpg',
  },

  // Icons and logos
  icons: {
    crown: '/icons/crown.svg',
    diamond: '/icons/diamond.png',
  },

  // Hero section
  hero: {
    background: '/hero/Medusa_tattoo_artwork.png',
    trustBadge1: '/hero/Container_2.svg',
    trustBadge2: '/hero/Container_3.svg',
    trustBadge3: '/hero/Container_4.svg',
    trustBadge4: '/hero/Container.svg',
  },

  // Partners logos
  partners: {
    nannybag: '/images/partners/nannybag-logo.svg',
    iamrobot: '/images/partners/iamrobot-logo.svg',
    partner3: '/images/partners/partner3-logo.svg',
    bqla: '/images/partners/bqla-logo.svg',
  },

  // Fallback images
  fallback: {
    placeholder: '/images/placeholder.svg',
    artist: '/images/artists/team-bio/picture.webp',
  },
} as const;

// Type-safe image path getter
export type ImageCategory = keyof typeof IMAGE_PATHS;
export type ImageKey<T extends ImageCategory> = keyof (typeof IMAGE_PATHS)[T];

export function getImagePath<T extends ImageCategory>(category: T, key: ImageKey<T>): string {
  return IMAGE_PATHS[category][key] as string;
}

// Validate that an image path exists (client-side check)
export function isValidImagePath(path: string): boolean {
  return Object.values(IMAGE_PATHS)
    .flatMap((category) => Object.values(category))
    .includes(path as any);
}
