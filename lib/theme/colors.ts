/**
 * BRAND COLORS - SINGLE SOURCE OF TRUTH
 * Updated: January 2026
 *
 * 60-30-10 Rule:
 * - 60% Primary (#171717) - backgrounds, body text
 * - 30% Surface (#F3F3F3) - cards, sections
 * - 10% Grey (#666666) + Chrome accent (#C0C0C0)
 */

export const BRAND_COLORS = {
  primary: '#171717',
  surface: '#F3F3F3',
  grey: {
    base: '#666666', // AA-compliant: 4.52:1 on #F3F3F3
    light: '#A8A8A8',
    dark: '#4A4A4A',
  },
  accent: '#C0C0C0', // Chrome silver
  accentHover: '#A8A8A8',
  trueWhite: '#FFFFFF',
} as const;

/**
 * Retrieve a brand color by path, e.g. `grey.light` → `#A8A8A8`.
 */
export const getBrandColor = (path: string): string => {
  return path.split('.').reduce((obj: any, key) => obj?.[key], BRAND_COLORS as any) || '';
};

export type BrandColor = typeof BRAND_COLORS;
