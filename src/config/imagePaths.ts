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
    eli: '/assets/images/icons/placeholder.svg',
    aaron: '/assets/images/icons/placeholder.svg',
    oliver: '/assets/images/icons/placeholder.svg',
    vive: '/assets/images/icons/placeholder.svg',
    angie: '/assets/images/icons/placeholder.svg',
    debi: '/assets/images/icons/placeholder.svg',
    loui: '/assets/images/icons/placeholder.svg',
    sasha: '/assets/images/icons/placeholder.svg',
  },

  // Studio interior photos
  studio: {
    // Use existing placeholder for now to ensure something is displayed
    interior1: '/assets/images/icons/placeholder.svg',
    interior2: '/assets/images/icons/placeholder.svg',
    interior3: '/assets/images/icons/placeholder.svg',
    // Original paths (currently empty files)
    // interior1: '/images/studio/studio-interior-1.jpg',
    // interior2: '/images/studio/studio-interior-2.jpg',
    // interior3: '/images/studio/studio-interior-3.jpg',
  },

  // Service card backgrounds
  services: {
    tattoo: '/assets/images/icons/placeholder.svg',
    piercing: '/assets/images/icons/placeholder.svg',
  },

  // Icons and logos
  icons: {
    crown: '/assets/images/icons/crown.svg',
    diamond: '/assets/images/icons/Diamond.png',
  },

  // Hero section
  hero: {
    background: '/assets/images/icons/placeholder.svg',
    trustBadge1: '/assets/images/svg/Container_2.svg',
    trustBadge2: '/assets/images/svg/Container_3.svg',
    trustBadge3: '/assets/images/svg/Container_4.svg',
    trustBadge4: '/assets/images/svg/Container.svg',
  },

  // Partners logos
  partners: {
    nannybag: '/assets/images/icons/placeholder.svg',
    iamrobot: '/assets/images/icons/placeholder.svg',
    partner3: '/assets/images/icons/placeholder.svg',
    bqla: '/assets/images/icons/placeholder.svg',
  },

  // Fallback images
  fallback: {
    placeholder: '/assets/images/icons/placeholder.svg',
    artist: '/assets/images/icons/placeholder.svg',
  },
} as const;

// Type-safe image path getter
export type ImageCategory = keyof typeof IMAGE_PATHS;
export type ImageKey<T extends ImageCategory> = keyof (typeof IMAGE_PATHS)[T];

export function getImagePath<T extends ImageCategory>(category: T, key: ImageKey<T>): string {
  return IMAGE_PATHS[category][key] as string;
}

// Type for all possible image paths in our system
type ImagePathValue = string;

// Validate that an image path exists (client-side check)
export function isValidImagePath(path: string): boolean {
  // Get all image paths as a flattened array of strings
  const allImagePaths = Object.values(IMAGE_PATHS)
    .flatMap((category) => Object.values(category)) as ImagePathValue[];
  
  // Check if the given path exists in our defined paths
  return allImagePaths.includes(path);
}
