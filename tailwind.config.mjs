/**
 * MEDUSA DESIGN SYSTEM - TAILWIND CONFIGURATION
 * Version: v3.0 (19 January 2026)
 * 
 * SINGLE SOURCE OF TRUTH: src/styles/design-system.css
 * 
 * This config extends Tailwind with component patterns and utility classes.
 * All design tokens (colors, spacing, shadows, motion) live in design-system.css
 * and are loaded via Tailwind v4's @config directive in index.css.
 * 
 * DO NOT add token definitions here - edit design-system.css instead.
 * 
 * ARCHITECTURE:
 * - design-system.css: All CSS custom properties (tokens)
 * - tailwind.config.mjs: Component patterns, safelist, plugins
 * - index.css: @config "design-system.css" imports tokens
 * 
 * SEO PROJECT NOTE:
 * medusa-tattoo-seo/ has its own independent design system (light theme).
 * DO NOT sync tokens between projects - they serve different purposes.
 */

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './01-components-library/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    // Text colors
    'text-brand-chrome',
    'text-brand-accent',
    'text-brand-white',
    'text-brand-background',
    'text-brand-primary',
    'text-brand-grey',
    // Background colors
    'bg-brand-accent',
    'bg-brand-accent-hover',
    'bg-brand-white',
    'bg-brand-primary',
    'bg-brand-surface',
    'bg-overlay-subtle',
    'bg-overlay-medium',
    'bg-overlay-heavy',
    // Hover states
    'hover:bg-brand-accent',
    'hover:bg-brand-accent-hover',
    'hover:shadow-chrome-glow',
    // Border colors
    'border-brand-accent',
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
    // Luxury color system (ma spacing + luxury tokens)
    {
      pattern: /^(p|m|gap|py|px|my|mx|pt|pb|pl|pr|mt|mb|ml|mr)-(ma-(xs|sm|md|lg|xl))$/,
    },
    {
      pattern: /^(bg|text|border)-luxury-/,
    },
    {
      pattern: /^shadow-(luxury|chrome)/,
    },
  ],
  theme: {
    extend: {
      // All tokens now in design-system.css via CSS custom properties
      // These Tailwind extensions provide utility class patterns only
      colors: {
        // ========================================
        // TIER 1: PRIMITIVES (never use directly)
        // ========================================
        primitive: {
          black: '#0a0a0a',        // Universal deep black
          white: '#FFFFFF',
          surface: '#F3F3F3',
          chrome: '#C0C0C0',       // ⚠️ DARK BACKGROUNDS ONLY
          'chrome-safe': '#767676', // WCAG AAA on light (7:1 ratio)
        },

        // ========================================
        // TIER 2: SEMANTIC TOKENS (use these)
        // ========================================
        luxury: {
          // 60% - Backgrounds
          bg: {
            base: '#FFFFFF',           // Pure white base
            surface: '#F3F3F3',        // Cards, elevated sections
            elevated: '#FAFAFA',       // Hover states on cards
            dark: '#0a0a0a',           // Universal deep black page bg
            'dark-elevated': '#1a1a1c', // Charcoal surfaces/cards
            'dark-hover': '#252528',   // Hover on dark sections
            chrome: '#C0C0C0',         // Chrome as surface (footer, premium sections)
          },

          // 30% - Text
          text: {
            primary: '#0a0a0a',        // AAA on white/surface (21:1)
            secondary: '#1a1a1a',      // Hierarchy tier 2
            tertiary: '#525252',       // Subtle labels
            muted: '#666666',          // Disabled states
            inverse: '#FFFFFF',        // On dark backgrounds
            'inverse-muted': 'rgba(255, 255, 255, 0.8)', // Secondary on dark
          },

          // 10% - Accents (CRITICAL USAGE RULES)
          accent: {
            // ✅ USE ON DARK (#0a0a0a) ONLY - 12.5:1 contrast
            chrome: '#C0C0C0',
            'chrome-hover': '#E8E8E8',
            'chrome-glow': 'rgba(192, 192, 192, 0.4)',
            
            // ✅ USE ON LIGHT (#F3F3F3/#FFF) - 4.54:1 contrast
            'chrome-safe': '#767676',
            'chrome-safe-hover': '#525252',
            
            // Metallic gradient stops (for buttons on dark)
            'metal-dark': '#999999',
            'metal-bright': '#DDDDDD',
          },

          // Borders with warm undertones (wabi-sabi)
          border: {
            subtle: 'hsl(30, 3%, 92%)',    // Barely visible dividers
            light: 'hsl(30, 3%, 88%)',     // Standard borders on light
            medium: 'hsl(30, 3%, 70%)',    // Emphasized borders
            dark: 'hsl(30, 3%, 20%)',      // Strong contrast on light
            'on-dark': 'hsl(30, 3%, 50%)', // Borders on dark backgrounds
            chrome: '#C0C0C0',             // Chrome borders (dark bg only)
          },
        },

        // ========================================
        // DEPRECATED (for migration)
        // ========================================
        deprecated: {
          gold: '#D4AF37',      // Remove by Q2 2026
          'gold-hover': '#C19B26',
        },
        
        // Legacy brand colors (keeping for backwards compatibility)
        brand: {
          primary: '#2a2a2c',   // Warm charcoal (was #171717)
          grey: {
            DEFAULT: '#666666',
            light: '#A8A8A8',
            dark: '#4A4A4A',
          },
          surface: '#F3F3F3',
          'true-white': '#FFFFFF',
        },
        // Brand colors using CSS variables - the SINGLE SOURCE OF TRUTH
        'brand-background': 'var(--deep-black)',
        'brand-white': 'var(--base-white)',
        'brand-chrome': 'var(--chrome-silver)',
        'brand-accent': 'var(--brand-accent)',           // Chrome silver accent via CSS var
        'brand-accent-hover': 'var(--brand-accent-hover)', // Hover state
        'brand-chrome-30': 'rgba(192, 192, 192, 0.3)',
        'brand-chrome-10': 'rgba(192, 192, 192, 0.1)',
        'brand-chrome-20': 'rgba(192, 192, 192, 0.2)',
        'deep-black': 'var(--deep-black)',
        'base-white': 'var(--base-white)',
        'text-primary': 'var(--base-white)',
        'text-secondary': 'rgba(255, 255, 255, 0.8)',
        'text-tertiary': 'rgba(255, 255, 255, 0.6)',
        'accent-primary': 'var(--chrome-silver)',
        'accent-hover': '#A8A8A8',
        'accent-active': '#4A4A4A',
        'chrome-primary': 'var(--chrome-silver)',
        'chrome-hover': '#A8A8A8',
        'border-default': 'rgba(192, 192, 192, 0.15)',
        'border-hover': 'rgba(192, 192, 192, 0.4)',
        'border-focus': 'var(--chrome-silver)',
        'border-navigation': 'rgba(192, 192, 192, 0.1)',
        'ring-ring': 'var(--chrome-silver)',
      },
      
      // Background overlay tokens for universal texture system
      backgroundColor: {
        'overlay-subtle': 'rgba(0, 0, 0, 0.2)',  // 20% - subtle darkening
        'overlay-medium': 'rgba(0, 0, 0, 0.4)',  // 40% - medium darkening
        'overlay-heavy': 'rgba(0, 0, 0, 0.6)',   // 60% - heavy darkening
      },
      
      // Spacing scale - defined in design-system.css via CSS vars
      // These patterns extend Tailwind with Ma (間) spacing vocabulary
      spacing: {
        // Ma (間) - intentional negative space
        'ma-xs': '1.5rem',   // 24px - breathing room
        'ma-sm': '3rem',     // 48px - contemplative pause
        'ma-md': '6rem',     // 96px - section breaks
        'ma-lg': '9rem',     // 144px - dramatic separation
        'ma-xl': '12rem',    // 192px - hero spacing
      },
      // On 8px grid: 0, 1(4px), 2(8px), 4(16px), 6(24px), 8(32px), 12(48px), 16(64px), 20(80px), 24(96px), 32(128px)
      
      // Standard component widths
      width: {
        'dropdown': '200px',  // For dropdown menus
        'dropdown-sm': '150px', // For smaller dropdown menus
        'dropdown-lg': '250px', // For larger dropdown menus
        'container': '1140px',  // Standard container
        'container-main': '1104px', // Main container from design system
        'container-sm': '768px', // Small container
        'container-lg': '1320px', // Large container
        'container-xl': '1433px', // Extra large container (matches Figma)
        'modal': '640px',      // Standard modal width
        'modal-lg': '768px',   // Large modal
        'card': '280px',       // Standard card width
        'card-sm': '340px',    // Small card width (ReviewCard)
        'card-md': '400px',    // Medium card width (PriceCard)
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
        '112': '448px',          // h-112 for tall cards (based on 4px unit * 112)
      },

      // Standard component max-heights
      maxHeight: {
        'dropdown': '300px',     // Standard dropdown max height
        'dropdown-lg': '400px',  // Large dropdown max height
        'modal': '90vh',         // Modal max height
        'card': '420px',         // Card max height
      },

      // Standard component max-widths
      maxWidth: {
        'container-main': '1104px',
      },

      // Standard component min-widths
      minWidth: {
        'dropdown': '150px',     // Standard dropdown min width
        'dropdown-lg': '200px',  // Large dropdown min width
        'button': '48px',        // Button min width
        'input': '48px',         // Input min width
        'modal': '320px',        // Modal min width
      },
      
      // Standard component min-heights
      minHeight: {
        'service': '360px',      // Service card min height
      },

      // Custom font sizes
      fontSize: {
        'sm-15': '15px',         // Between sm(14px) and base(16px)
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
        // Bokashi technique - layered shadows
        'luxury-sm': '0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075)',
        'luxury': '0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075)',
        'luxury-lg': '0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)',
        'luxury-xl': '0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075), 0 32px 32px hsl(0deg 0% 0% / 0.075)',
        
        // Chrome effects (dark backgrounds only)
        'chrome-glow': '0 0 20px rgba(192, 192, 192, 0.4), 0 0 40px rgba(192, 192, 192, 0.2)',
        'chrome-lift': '0 4px 8px hsl(0deg 0% 0% / 0.1), 0 0 20px rgba(192, 192, 192, 0.3)',
        
        // Legacy chrome glows (keeping for backwards compatibility)
        'chrome-glow-subtle': '0 0 10px rgba(192, 192, 192, 0.2)',
        'chrome-glow-strong': '0 0 30px rgba(192, 192, 192, 0.4)',
        'chrome-glow-medium': '0 4px 20px rgba(192, 192, 192, 0.3)',
        // Utility shadows
        'sm': '0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.12), 0 4px 6px rgba(0, 0, 0, 0.08)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.12), 0 10px 10px rgba(0, 0, 0, 0.08)',
        'focus-ring': '0 0 0 3px rgba(192, 192, 192, 0.4)',
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
        'modal': 10000,
        'toast': 1100,
      },
      
      // Animation definitions (motion tokens in design-system.css)
      animation: {
        'scroll-badges': 'scroll 20s linear infinite',
        'modal-enter': 'fadeIn 0.3s',
        'scroll-infinite': 'scroll 30s linear infinite',
        'scroll-trust-badges': 'scrollBadges 30s linear infinite',
        'scrollBadges': 'scrollBadges 30s linear infinite',
        // New luxury animations
        'shine': 'shine 3s ease-in-out infinite',
        'lift': 'lift 0.3s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
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
        // New luxury keyframes
        shine: {
          '0%, 100%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '50%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        lift: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-4px) scale(1.02)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(192, 192, 192, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(192, 192, 192, 0.5)' },
        },
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
