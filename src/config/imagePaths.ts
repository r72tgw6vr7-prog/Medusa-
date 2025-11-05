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
    eli: '/assets/images/photos/artists/picture.webp',
    aaron: '/assets/images/photos/artists/aaron.webp',
    oliver: '/assets/images/photos/artists/oliver.webp',
    vive: '/assets/images/photos/artists/vivi.webp',
    angie: '/assets/images/photos/artists/picture.webp',
    debi: '/assets/images/photos/artists/debi.webp',
    loui: '/assets/images/photos/artists/loui@1200w.webp',
    sasha: '/assets/images/photos/artists/picture.webp',
  },

  // Studio interior photos
  studio: {
    interior1: '/assets/images/photos/studio/img3876.webp',
    interior2: '/assets/images/photos/studio/img3914.webp',
    interior3: '/assets/images/photos/studio/img3947.webp',
  },

  // Service card backgrounds
  services: {
    tattoo: '/assets/images/photos/backgrounds/tattoo-card-bg.webp',
    piercing: '/assets/images/photos/backgrounds/piercing-card-bg.webp',
  },

  // Icons and logos
  icons: {
    crown: '/assets/images/icons/crown.svg',
    diamond: '/assets/images/icons/Diamond.png',
  },

  // Hero section
  hero: {
    background: '/assets/images/photos/hero/medusatattooartwork.webp',
    trustBadge1: '/assets/images/svg/Container_2.svg',
    trustBadge2: '/assets/images/svg/Container_3.svg',
    trustBadge3: '/assets/images/svg/Container_4.svg',
    trustBadge4: '/assets/images/svg/Container.svg',
  },

  // Partners logos
  partners: {
    nannybag: '/assets/images/photos/partners/nannybag-logo.svg',
    iamrobot: '/assets/images/photos/partners/iamrobot-logo.svg',
    partner3: '/assets/images/photos/partners/partner3-logo.svg',
    bqla: '/assets/images/photos/partners/bqla-logo.svg',
  },

  // Fallback images
  fallback: {
    placeholder: '/assets/images/icons/placeholder.svg',
    artist: '/assets/images/photos/artists/picture.webp',
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
