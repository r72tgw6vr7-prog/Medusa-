/**
 * MEDUSA DESIGN SYSTEM - TAILWIND CONFIGURATION
 * Version: v2.0 (23 October 2025)
 * 
 * This configuration file defines all design tokens for the Medusa Design System.
 * It's the single source of truth for design tokens in the application.
 * 
 * KEY FEATURES:
 * - Comprehensive color system with opacity variants
 * - 8px spacing grid system
 * - Standardized shadow tokens with brand colors
 * - Typography with responsive sizing
 * - Border radius aligned to design system
 * - Z-index management
 * - Animation tokens
 * 
 * USAGE DOCUMENTATION:
 * See DESIGN_SYSTEM_USAGE_GUIDE.md for detailed usage instructions
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse the design tokens
const tokensPath = join(__dirname, 'design-tokens.tokens.json');
const tokens = JSON.parse(readFileSync(tokensPath, 'utf-8'));

// Helper function to extract and format colors from token structure
function extractColors(colorTokens) {
  const colors = {};
  for (const [name, data] of Object.entries(colorTokens)) {
    // Clean the name: replace spaces with hyphens, remove special chars
    const cleanName = name.replace(/ /g, '-').replace(/%/g, 'pct').replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
    colors[cleanName] = data.value;
  }
  return colors;
}

// Helper function to extract spacing/dimension values
function extractSpacing(spacingTokens) {
  const spacing = {};
  // Extract width values
  if (spacingTokens.width) {
    for (const [key, data] of Object.entries(spacingTokens.width)) {
      spacing[key] = `${data.value}px`;
    }
  }
  // Extract height values with 'h-' prefix to avoid conflicts
  if (spacingTokens.height) {
    for (const [key, data] of Object.entries(spacingTokens.height)) {
      spacing[`h-${key}`] = `${data.value}px`;
    }
  }
  return spacing;
}

// Helper to extract font sizes from typography tokens
function extractFontSizes(fontTokens) {
  const fontSizes = {};
  for (const [familyKey, familyData] of Object.entries(fontTokens)) {
    if (typeof familyData === 'object') {
      for (const [styleKey, styleData] of Object.entries(familyData)) {
        if (styleData.value && styleData.value.fontSize) {
          const name = `${familyKey}-${styleKey}`.replace(/ /g, '-').toLowerCase();
          const { fontSize, lineHeight, fontWeight, letterSpacing } = styleData.value;
          fontSizes[name] = [
            `${fontSize}px`,
            {
              lineHeight: `${lineHeight}px`,
              fontWeight: fontWeight,
              letterSpacing: `${letterSpacing}px`
            }
          ];
        }
      }
    }
  }
  return fontSizes;
}

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './01-components-library/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    'text-brand-gold',
    'hover:bg-brand-gold-hover',
    'hover:shadow-gold-glow',
    'border-white/10',
    'border-white/15',
    'border-white/25',
    'text-white/70',
    'text-white/80',
    'text-white/85',
  ],
  theme: {
    extend: {
      // Import all colors from Figma
      colors: {
        ...extractColors(tokens.color['www.figma.com']),
        // Brand colors for easy access
        'brand-background': '#222222',
        'brand-white': '#FFFFFF',
        'brand-gold': '#D4AF37',
        'brand-chrome': '#C0C0C0',
        'brand-gold-hover': '#C19B26',
        'brand-gold-30': 'rgba(212, 175, 55, 0.3)',
        'brand-chrome-30': 'rgba(192, 192, 192, 0.3)',
        'brand-gold-10': 'rgba(212, 175, 55, 0.1)',
        'brand-gold-20': 'rgba(212, 175, 55, 0.2)',
        'brand-gold-40': 'rgba(212, 175, 55, 0.4)',
        'brand-chrome-10': 'rgba(192, 192, 192, 0.1)',
        'brand-chrome-20': 'rgba(192, 192, 192, 0.2)',
        'antique-gold': '#D4AF37',
        'deep-black': '#222222',
        'base-white': '#FFFFFF',
        'antique-gold-hover': '#C19B26',
        // Text colors
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255, 255, 255, 0.8)',
        'text-tertiary': 'rgba(255, 255, 255, 0.6)',
        // Accent colors
        'accent-primary': '#D4AF37',
        'accent-hover': '#C19B26',
        'accent-active': '#A8821A',
        // Chrome colors
        'chrome-primary': '#C0C0C0',
        'chrome-hover': '#A8A8A8',
        // Border colors
        'border-default': 'rgba(192, 192, 192, 0.15)',
        'border-hover': 'rgba(212, 175, 55, 0.4)',
        'border-focus': '#D4AF37',
        'border-navigation': 'rgba(212, 175, 55, 0.1)',
      },
      // Import spacing values from Figma
      spacing: extractSpacing(tokens['www.figma.com']),
      // On 8px grid: 0, 1(4px), 2(8px), 4(16px), 6(24px), 8(32px), 12(48px), 16(64px), 20(80px), 24(96px), 32(128px)
      
      // Font families from your design system
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'headline': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      
      // Custom box shadows
      boxShadow: {
        // Brand glows
        'gold-glow-subtle': '0 0 10px rgba(212, 175, 55, 0.2)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-glow-strong': '0 0 30px rgba(212, 175, 55, 0.4)',
        'gold-glow-medium': '0 4px 20px rgba(212, 175, 55, 0.3)',
        'chrome-glow': '0 0 15px rgba(192, 192, 192, 0.3)',
        // Utility shadows
        'sm': '0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.12), 0 4px 6px rgba(0, 0, 0, 0.08)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.12), 0 10px 10px rgba(0, 0, 0, 0.08)',
        'gold': '0 4px 12px rgba(212, 175, 55, 0.3)',
        'gold-hover': '0 6px 16px rgba(212, 175, 55, 0.4)',
        'gold-active': '0 2px 8px rgba(212, 175, 55, 0.5)',
        'focus-ring': '0 0 0 3px rgba(212, 175, 55, 0.4)',
      },
      
      // Border radius values
      borderRadius: {
        'xs': '4px',
        'sm': '4px', 
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
      
      // Z-index values
      zIndex: {
        'base': 1,
        'above': 10,
        'elevated': 20,
        'sticky': 100,
        'dropdown': 200,
        'modal': 1000,
        'toast': 1100,
      },
      
      // Font sizes with line heights from Figma
      fontSize: extractFontSizes(tokens.font['www.figma.com']),
      animation: {
        'scroll-badges': 'scroll 20s linear infinite',
        'modal-enter': 'fadeIn 0.3s',
        'scroll-infinite': 'scroll 30s linear infinite',
        'scroll-trust-badges': 'scrollBadges 30s linear infinite',
        'scrollBadges': 'scrollBadges 30s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50%))' },
        },
        scrollBadges: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50%))' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      zIndex: {
        modal: 10000,
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.pause-animation': {
          'animation-play-state': 'paused',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
