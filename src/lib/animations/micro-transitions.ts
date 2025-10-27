/**
 * Micro-transitions System
 *
 * This module provides standardized micro-transitions for consistent interactive behavior
 * across all components in the Medusa Tattoo website.
 *
 * Features:
 * - Standardized durations
 * - Predefined easing functions
 * - Tailwind transition classes
 * - Preset combinations for common use cases
 * - Utility functions for combining transitions
 */

// Duration constants (milliseconds)
export const TRANSITION_DURATIONS = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// Easing functions
export const TRANSITION_EASINGS = {
  smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Material Design standard
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  linear: 'linear',
  easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
} as const;

// Tailwind transition classes
export const TRANSITIONS = {
  // Hover effects
  hover: {
    scale: 'transition-transform duration-200 ease-smooth hover:scale-105',
    scaleSubtle: 'transition-transform duration-200 ease-smooth hover:scale-102',
    goldGlow: 'transition-shadow duration-300 ease-smooth hover:shadow-gold-subtle',
    goldGlowMedium: 'transition-shadow duration-300 ease-smooth hover:shadow-gold-medium',
    goldGlowStrong: 'transition-shadow duration-300 ease-smooth hover:shadow-gold-strong',
    chromeGlow: 'transition-shadow duration-300 ease-smooth hover:shadow-chrome-subtle',
    chromeGlowMedium: 'transition-shadow duration-300 ease-smooth hover:shadow-chrome-medium',
    brightness: 'transition-all duration-200 ease-smooth hover:brightness-110',
    brightnessSubtle: 'transition-all duration-200 ease-smooth hover:brightness-105',
    opacity: 'transition-opacity duration-200 ease-smooth hover:opacity-90',
  },

  // Focus effects
  focus: {
    goldRing:
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 transition-shadow duration-200',
    chromeRing:
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-chrome focus-visible:ring-offset-2 transition-shadow duration-200',
    goldGlow: 'focus-visible:shadow-gold-subtle transition-shadow duration-200 ease-smooth',
    chromeGlow: 'focus-visible:shadow-chrome-subtle transition-shadow duration-200 ease-smooth',
  },

  // Active/tap effects
  active: {
    scale: 'active:scale-95 transition-transform duration-100 ease-smooth',
    scaleSubtle: 'active:scale-98 transition-transform duration-100 ease-smooth',
    opacity: 'active:opacity-80 transition-opacity duration-100 ease-smooth',
  },

  // Color transitions
  color: {
    goldToChrome:
      'transition-colors duration-300 ease-smooth text-brand-gold hover:text-brand-chrome',
    chromeToGold:
      'transition-colors duration-300 ease-smooth text-brand-chrome hover:text-brand-gold',
    goldToChromeBackground:
      'transition-colors duration-300 ease-smooth bg-brand-gold hover:bg-brand-chrome',
    chromeToDark:
      'transition-colors duration-300 ease-smooth text-brand-chrome hover:text-brand-dark',
    darkToGold: 'transition-colors duration-300 ease-smooth text-brand-dark hover:text-brand-gold',
    bgDarkToLight: 'transition-colors duration-300 ease-smooth bg-brand-dark hover:bg-brand-light',
  },

  // Other transitions
  other: {
    fadeIn: 'transition-opacity duration-300 ease-smooth',
    fadeOut: 'transition-opacity duration-300 ease-smooth',
    growWidth: 'transition-width duration-300 ease-smooth',
    growHeight: 'transition-height duration-300 ease-smooth',
    spin: 'transition-transform duration-1000 ease-linear hover:rotate-360',
  },
} as const;

/**
 * Combines multiple transition classes into a single string
 * @param transitions - Array of transition class strings
 * @returns Combined class string with duplicates removed
 */
export const combineTransitions = (...transitions: string[]): string => {
  // Split all transitions into individual classes
  const allClasses = transitions.join(' ').split(' ');

  // Remove duplicates
  const uniqueClasses = Array.from(new Set(allClasses));

  // Join back into a single string
  return uniqueClasses.join(' ');
};

/**
 * Preset combinations for common use cases
 */
export const TRANSITION_PRESETS = {
  // Button transitions
  button: combineTransitions(
    TRANSITIONS.hover.scaleSubtle,
    TRANSITIONS.active.scale,
    TRANSITIONS.focus.goldRing,
  ),

  buttonGold: combineTransitions(
    TRANSITIONS.hover.scaleSubtle,
    TRANSITIONS.active.scale,
    TRANSITIONS.focus.goldRing,
    TRANSITIONS.hover.goldGlow,
  ),

  buttonChrome: combineTransitions(
    TRANSITIONS.hover.scaleSubtle,
    TRANSITIONS.active.scale,
    TRANSITIONS.focus.chromeRing,
    TRANSITIONS.hover.chromeGlow,
  ),

  // Card transitions
  card: combineTransitions(TRANSITIONS.hover.goldGlow, TRANSITIONS.hover.scaleSubtle),

  cardGold: combineTransitions(
    TRANSITIONS.hover.goldGlowMedium,
    TRANSITIONS.hover.scaleSubtle,
    TRANSITIONS.hover.brightnessSubtle,
  ),

  cardChrome: combineTransitions(
    TRANSITIONS.hover.chromeGlowMedium,
    TRANSITIONS.hover.scaleSubtle,
    TRANSITIONS.hover.brightnessSubtle,
  ),

  // Link transitions
  link: combineTransitions(TRANSITIONS.color.chromeToGold, TRANSITIONS.hover.brightness),

  linkGold: combineTransitions(TRANSITIONS.color.darkToGold, TRANSITIONS.hover.brightness),

  linkChrome: combineTransitions(TRANSITIONS.color.goldToChrome, TRANSITIONS.hover.brightness),

  // Image transitions
  image: combineTransitions(TRANSITIONS.hover.brightness, TRANSITIONS.hover.scaleSubtle),

  imageZoom: combineTransitions(TRANSITIONS.hover.scale, TRANSITIONS.hover.brightness),

  // Icon transitions
  icon: combineTransitions(
    TRANSITIONS.hover.scaleSubtle,
    TRANSITIONS.hover.brightness,
    TRANSITIONS.active.opacity,
  ),

  iconSpin: combineTransitions(TRANSITIONS.other.spin, TRANSITIONS.hover.brightness),

  // Form element transitions
  formElement: combineTransitions(TRANSITIONS.focus.goldRing, TRANSITIONS.hover.brightnessSubtle),
} as const;

/**
 * Creates CSS custom properties for transition durations and easings
 * to be used with inline styles or CSS-in-JS solutions
 */
export const createTransitionVars = (): Record<string, string> => {
  const vars: Record<string, string> = {};

  // Add duration variables
  Object.entries(TRANSITION_DURATIONS).forEach(([key, value]) => {
    vars[`--transition-duration-${key}`] = `${value}ms`;
  });

  // Add easing variables
  Object.entries(TRANSITION_EASINGS).forEach(([key, value]) => {
    vars[`--transition-easing-${key}`] = value;
  });

  return vars;
};

/**
 * Creates a complete transition string for use in inline styles or CSS-in-JS
 * @param property - CSS property to transition (e.g., 'transform', 'opacity')
 * @param duration - Duration key from TRANSITION_DURATIONS
 * @param easing - Easing key from TRANSITION_EASINGS
 * @returns Complete transition string
 */
export const createTransitionStyle = (
  property: string,
  duration: keyof typeof TRANSITION_DURATIONS = 'normal',
  easing: keyof typeof TRANSITION_EASINGS = 'smooth',
): string => {
  return `${property} ${TRANSITION_DURATIONS[duration]}ms ${TRANSITION_EASINGS[easing]}`;
};

/**
 * Respect user's motion preferences
 * @returns Classes to respect prefers-reduced-motion
 */
export const respectMotionPreferences = (): string => {
  return 'motion-safe:transition-all motion-reduce:transition-none';
};

// Export type definitions for TypeScript
export type TransitionDuration = keyof typeof TRANSITION_DURATIONS;
export type TransitionEasing = keyof typeof TRANSITION_EASINGS;
export type TransitionPreset = keyof typeof TRANSITION_PRESETS;
