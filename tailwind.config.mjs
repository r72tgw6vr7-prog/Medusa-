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
    // Text colors
    'text-brand-gold',
    'text-brand-white',
    'text-brand-chrome',
    'text-brand-background',
    // Background colors
    'bg-brand-gold',
    'bg-brand-white',
    'bg-brand-chrome',
    'bg-brand-background',
    'bg-overlay-subtle',
    'bg-overlay-medium',
    'bg-overlay-heavy',
    // Hover states
    'hover:bg-brand-gold-hover',
    'hover:bg-brand-gold',
    'hover:shadow-gold-glow',
    'hover:shadow-gold-glow-medium',
    'hover:shadow-gold-glow-strong',
    // Border colors
    'border-brand-gold',
    'border-brand-chrome',
    'border-white/10',
    'border-white/15',
    'border-white/25',
    // Text with opacity
    'text-white/70',
    'text-white/80',
    'text-white/85',
    // Width and height classes
    'w-dropdown',
    'w-dropdown-sm',
    'min-w-dropdown',
    'min-w-dropdown-lg',
    'max-h-dropdown',
    'max-h-dropdown-lg',
    'h-button',
    'h-button-lg',
  ],
  theme: {
    extend: {
      // Import all colors from Figma
      colors: {
        ...extractColors(tokens.color['www.figma.com']),
        // Brand colors using CSS variables - the SINGLE SOURCE OF TRUTH
        'brand-background': 'var(--deep-black)', // #222222
        'brand-white': 'var(--base-white)', // #FFFFFF
        'brand-gold': 'var(--brand-gold)', // #D4AF37
        'brand-chrome': 'var(--chrome-silver)', // #C0C0C0
        'brand-gold-hover': 'var(--brand-gold-hover)', // #C19B26
        'brand-gold-30': 'rgba(212, 175, 55, 0.3)',
        'brand-chrome-30': 'rgba(192, 192, 192, 0.3)',
        'brand-gold-10': 'rgba(212, 175, 55, 0.1)',
        'brand-gold-20': 'rgba(212, 175, 55, 0.2)',
        'brand-gold-40': 'rgba(212, 175, 55, 0.4)',
        'brand-chrome-10': 'rgba(192, 192, 192, 0.1)',
        'brand-chrome-20': 'rgba(192, 192, 192, 0.2)',
        // Semantic brand colors
        'antique-gold': 'var(--brand-gold)', // #D4AF37
        'deep-black': 'var(--deep-black)', // #222222
        'base-white': 'var(--base-white)', // #FFFFFF
        'antique-gold-hover': 'var(--brand-gold-hover)', // #C19B26
        // Text colors
        'text-primary': 'var(--base-white)', // #FFFFFF
        'text-secondary': 'rgba(255, 255, 255, 0.8)',
        'text-tertiary': 'rgba(255, 255, 255, 0.6)',
        // Accent colors
        'accent-primary': 'var(--brand-gold)', // #D4AF37
        'accent-hover': 'var(--brand-gold-hover)', // #C19B26
        'accent-active': '#A8821A',
        // Chrome colors
        'chrome-primary': 'var(--chrome-silver)', // #C0C0C0
        'chrome-hover': '#A8A8A8',
        // Border colors
        'border-default': 'rgba(192, 192, 192, 0.15)',
        'border-hover': 'rgba(212, 175, 55, 0.4)',
        'border-focus': 'var(--brand-gold)', // #D4AF37
        'border-navigation': 'rgba(212, 175, 55, 0.1)',
      },
      
      // Background overlay tokens for universal texture system
      backgroundColor: {
        'overlay-subtle': 'rgba(0, 0, 0, 0.2)',  // 20% - subtle darkening
        'overlay-medium': 'rgba(0, 0, 0, 0.4)',  // 40% - medium darkening
        'overlay-heavy': 'rgba(0, 0, 0, 0.6)',   // 60% - heavy darkening
      },
      
      // Import spacing values from Figma
      spacing: extractSpacing(tokens['www.figma.com']),
      // On 8px grid: 0, 1(4px), 2(8px), 4(16px), 6(24px), 8(32px), 12(48px), 16(64px), 20(80px), 24(96px), 32(128px)
      
      // Standard component widths
      width: {
        'dropdown': '200px',  // For dropdown menus
        'dropdown-sm': '150px', // For smaller dropdown menus
        'dropdown-lg': '250px', // For larger dropdown menus
        'container': '1140px',  // Standard container
        'container-sm': '768px', // Small container
        'container-lg': '1320px', // Large container
        'container-xl': '1433px', // Extra large container (matches Figma)
        'modal': '640px',      // Standard modal width
        'modal-lg': '768px',   // Large modal
        'card': '280px',       // Standard card width
        'form-field': '100%',  // Standard form field width
      },
      
      // Standard component heights
      height: {
        'dropdown': '48px',     // Standard dropdown height
        'dropdown-item': '40px', // Dropdown item height
        'nav': '80px',          // Navigation height
        'button': '48px',        // Standard button height
        'button-lg': '56px',     // Large button height
        'input': '48px',         // Standard input height
        'card': '320px',         // Standard card height
        'modal': '90vh',         // Standard modal max height
        'hero': '70vh',          // Hero section height
      },
      
      // Standard component max-heights
      maxHeight: {
        'dropdown': '300px',     // Standard dropdown max height
        'dropdown-lg': '400px',  // Large dropdown max height
        'modal': '90vh',         // Modal max height
        'card': '420px',         // Card max height
      },
      
      // Standard component min-widths
      minWidth: {
        'dropdown': '150px',     // Standard dropdown min width
        'dropdown-lg': '200px',  // Large dropdown min width
        'button': '48px',        // Button min width
        'input': '48px',         // Input min width
        'modal': '320px',        // Modal min width
      },
      
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
