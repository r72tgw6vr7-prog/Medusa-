/**
 * BREAKPOINT TOKENS
 * 
 * Defines responsive breakpoints for the design system.
 * Uses a mobile-first approach with min-width media queries.
 */

// Breakpoint values in pixels
const breakpointValues = {
  // Small devices (landscape phones, 576px and up)
  sm: 576,
  // Medium devices (tablets, 768px and up)
  md: 768,
  // Large devices (desktops, 992px and up)
  lg: 992,
  // Extra large devices (large desktops, 1200px and up)
  xl: 1200,
  // Extra extra large devices (larger desktops, 1400px and up)
  '2xl': 1400,
} as const;

// Convert pixel values to ems (1em = 16px)
const breakpoints = Object.entries(breakpointValues).reduce((acc, [key, value]) => ({
  ...acc,
  [key]: `${value / 16}em`,
}), {} as Record<keyof typeof breakpointValues, string>);

// Media query utilities
const mediaQueries = {
  up: (breakpoint: keyof typeof breakpoints) => 
    `@media (min-width: ${breakpoints[breakpoint]})`,
  down: (breakpoint: keyof typeof breakpoints) => {
    // For the down breakpoint, we subtract 0.02px to avoid overlap
    const breakpointValue = breakpointValues[breakpoint];
    return `@media (max-width: ${(breakpointValue - 0.02) / 16}em)`;
  },
  between: (min: keyof typeof breakpoints, max: keyof typeof breakpoints) => 
    `@media (min-width: ${breakpoints[min]}) and (max-width: ${(breakpointValues[max] - 0.02) / 16}em)`,
};

// Generate CSS variables
const breakpointVariables = {
  '--breakpoint-sm': breakpoints.sm,
  '--breakpoint-md': breakpoints.md,
  '--breakpoint-lg': breakpoints.lg,
  '--breakpoint-xl': breakpoints.xl,
  '--breakpoint-2xl': breakpoints['2xl'],
} as const;

// Export types
export type Breakpoint = keyof typeof breakpoints;

// Export everything
export { breakpointVariables, mediaQueries };

export default breakpoints;
