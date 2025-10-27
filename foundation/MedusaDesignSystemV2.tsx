/**
 * MEDUSA DESIGN SYSTEM V2.0
 * Complete design system implementation based on brand-tokens.json
 * 
 * Features:
 * - Token-based design system
 * - Mobile-first responsive design
 * - WCAG AA accessibility compliance
 * - Glassmorphism effects
 * - Component primitives
 * - Utility classes
 */

import { createContext, useContext, useEffect, useState } from 'react';
import brandTokens from '../brand-tokens.json';

// ===========================================
// DESIGN SYSTEM TYPES
// ===========================================

interface DesignTokens {
  colors: typeof brandTokens.medusa.colors;
  typography: typeof brandTokens.medusa.typography;
  spacing: typeof brandTokens.medusa.spacing;
  layout: typeof brandTokens.medusa.layout;
  effects: typeof brandTokens.medusa.effects;
  zIndex: typeof brandTokens.medusa.zIndex;
  transitions: typeof brandTokens.medusa.transitions;
  accessibility: typeof brandTokens.medusa.accessibility;
}

interface MedusaDesignSystemContext {
  tokens: DesignTokens;
  breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide';
  language: 'DE' | 'EN';
  setLanguage: (lang: 'DE' | 'EN') => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

// ===========================================
// DESIGN SYSTEM CONTEXT
// ===========================================

const MedusaContext = createContext<MedusaDesignSystemContext | undefined>(undefined);

export function useMedusaDesignSystem() {
  const context = useContext(MedusaContext);
  if (!context) {
    throw new Error('useMedusaDesignSystem must be used within a MedusaDesignSystemProvider');
  }
  return context;
}

// ===========================================
// DESIGN SYSTEM PROVIDER
// ===========================================

interface MedusaDesignSystemProviderProps {
  children: React.ReactNode;
  initialLanguage?: 'DE' | 'EN';
  initialTheme?: 'dark' | 'light';
}

export function MedusaDesignSystemProvider({ 
  children, 
  initialLanguage = 'DE',
  initialTheme = 'dark'
}: MedusaDesignSystemProviderProps) {
  const [language, setLanguage] = useState<'DE' | 'EN'>(initialLanguage);
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop' | 'wide'>('mobile');

  // Breakpoint detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1441) {
        setBreakpoint('wide');
      } else if (width >= 1024) {
        setBreakpoint('desktop');
      } else if (width >= 768) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('mobile');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    const tokens = brandTokens.medusa;
    
    // Color tokens
    root.style.setProperty('--medusa-color-gold', tokens.colors.primary.gold.value);
    root.style.setProperty('--medusa-color-black', tokens.colors.primary.black.value);
    root.style.setProperty('--medusa-color-off-white', tokens.colors.primary['off-white'].value);
    
    // Semantic colors
    root.style.setProperty('--medusa-bg-primary', tokens.colors.semantic.background.primary);
    root.style.setProperty('--medusa-bg-secondary', tokens.colors.semantic.background.secondary);
    root.style.setProperty('--medusa-text-primary', tokens.colors.semantic.text.primary);
    root.style.setProperty('--medusa-text-secondary', tokens.colors.semantic.text.secondary);
    root.style.setProperty('--medusa-accent-primary', tokens.colors.semantic.accent.primary);
    root.style.setProperty('--medusa-accent-hover', tokens.colors.semantic.accent.hover);
    
    // Typography tokens
    root.style.setProperty('--medusa-font-heading', tokens.typography.fonts.heading.family);
    root.style.setProperty('--medusa-font-body', tokens.typography.fonts.body.family);
    
    // Responsive typography
    const currentScale = tokens.typography.scale[breakpoint];
    Object.entries(currentScale).forEach(([key, value]) => {
      root.style.setProperty(`--medusa-text-${key}`, value);
    });
    
    // Spacing tokens
    Object.entries(tokens.spacing.scale).forEach(([key, value]) => {
      root.style.setProperty(`--medusa-space-${key}`, value);
    });
    
    // Effects tokens
    root.style.setProperty('--medusa-glass-bg', tokens.effects.glassmorphism.background);
    root.style.setProperty('--medusa-glass-blur', tokens.effects.glassmorphism.blur);
    root.style.setProperty('--medusa-glass-border', tokens.effects.glassmorphism.border);
    
    // Shadow tokens
    root.style.setProperty('--medusa-shadow-gold-subtle', tokens.effects.shadows.gold.subtle);
    root.style.setProperty('--medusa-shadow-gold-medium', tokens.effects.shadows.gold.medium);
    root.style.setProperty('--medusa-shadow-gold-strong', tokens.effects.shadows.gold.strong);
    
    // Z-index tokens
    Object.entries(tokens.zIndex).forEach(([key, value]) => {
      root.style.setProperty(`--medusa-z-${key}`, value.toString());
    });
    
    // Accessibility tokens
    root.style.setProperty('--medusa-touch-target', tokens.accessibility.touchTarget.minimum);
    root.style.setProperty('--medusa-focus-width', tokens.accessibility.focus.width);
    root.style.setProperty('--medusa-focus-color', tokens.accessibility.focus.color);
    
  }, [breakpoint]);

  const value: MedusaDesignSystemContext = {
    tokens: brandTokens.medusa as DesignTokens,
    breakpoint,
    language,
    setLanguage,
    theme,
    setTheme
  };

  return (
    <MedusaContext.Provider value={value}>
      <div className="medusa-design-system" data-theme={theme} data-language={language}>
        {children}
      </div>
    </MedusaContext.Provider>
  );
}

// ===========================================
// DESIGN SYSTEM COMPONENTS
// ===========================================

// Typography Components
export const Typography = {
  Headline: ({ 
    level = 'lg', 
    children, 
    className = '',
    ...props 
  }: {
    level?: 'xl' | 'lg' | 'md' | 'sm';
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLHeadingElement>) => {
    const Tag = level === 'xl' ? 'h1' : level === 'lg' ? 'h2' : level === 'md' ? 'h3' : 'h4';
    return (
      <Tag 
        className={`medusa-headline medusa-headline-${level} ${className}`}
        {...props}
      >
        {children}
      </Tag>
    );
  },

  Body: ({ 
    size = 'md', 
    children, 
    className = '',
    ...props 
  }: {
    size?: 'xl' | 'lg' | 'md' | 'sm';
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={`medusa-body medusa-body-${size} ${className}`}
      {...props}
    >
      {children}
    </p>
  ),

  Caption: ({ 
    children, 
    className = '',
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLSpanElement>) => (
    <span 
      className={`medusa-caption ${className}`}
      {...props}
    >
      {children}
    </span>
  )
};

// Button Components
export const Button = {
  Primary: ({ 
    children, 
    className = '',
    disabled = false,
    loading = false,
    size = 'md',
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    size?: 'sm' | 'md' | 'lg';
  } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
      className={`medusa-btn medusa-btn-primary medusa-btn-${size} ${className}`}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="medusa-btn-loading" aria-hidden="true">
          <span className="medusa-spinner"></span>
        </span>
      ) : null}
      <span className={loading ? 'medusa-btn-content-loading' : 'medusa-btn-content'}>
        {children}
      </span>
    </button>
  ),

  Secondary: ({ 
    children, 
    className = '',
    disabled = false,
    loading = false,
    size = 'md',
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    size?: 'sm' | 'md' | 'lg';
  } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
      className={`medusa-btn medusa-btn-secondary medusa-btn-${size} ${className}`}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="medusa-btn-loading" aria-hidden="true">
          <span className="medusa-spinner"></span>
        </span>
      ) : null}
      <span className={loading ? 'medusa-btn-content-loading' : 'medusa-btn-content'}>
        {children}
      </span>
    </button>
  ),

  Ghost: ({ 
    children, 
    className = '',
    disabled = false,
    loading = false,
    size = 'md',
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    size?: 'sm' | 'md' | 'lg';
  } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
      className={`medusa-btn medusa-btn-ghost medusa-btn-${size} ${className}`}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="medusa-btn-loading" aria-hidden="true">
          <span className="medusa-spinner"></span>
        </span>
      ) : null}
      <span className={loading ? 'medusa-btn-content-loading' : 'medusa-btn-content'}>
        {children}
      </span>
    </button>
  )
};

// Layout Components
export const Layout = {
  Container: ({ 
    children, 
    className = '',
    size = 'default',
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
  } & React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`medusa-container medusa-container-${size} ${className}`}
      {...props}
    >
      {children}
    </div>
  ),

  Grid: ({ 
    children, 
    className = '',
    columns = 12,
    gap = 'md',
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
    columns?: number | 'auto';
    gap?: 'sm' | 'md' | 'lg';
  } & React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`medusa-grid medusa-grid-${columns} medusa-gap-${gap} ${className}`}
      {...props}
    >
      {children}
    </div>
  ),

  Stack: ({ 
    children, 
    className = '',
    direction = 'vertical',
    gap = 'md',
    align = 'stretch',
    justify = 'start',
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
    direction?: 'vertical' | 'horizontal';
    gap?: 'sm' | 'md' | 'lg';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  } & React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`medusa-stack medusa-stack-${direction} medusa-gap-${gap} medusa-align-${align} medusa-justify-${justify} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
};

// Card Components
export const Card = {
  Base: ({ 
    children, 
    className = '',
    variant = 'default',
    interactive = false,
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'elevated';
    interactive?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`medusa-card medusa-card-${variant} ${interactive ? 'medusa-card-interactive' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  ),

  Header: ({ 
    children, 
    className = '',
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`medusa-card-header ${className}`}
      {...props}
    >
      {children}
    </div>
  ),

  Content: ({ 
    children, 
    className = '',
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`medusa-card-content ${className}`}
      {...props}
    >
      {children}
    </div>
  ),

  Footer: ({ 
    children, 
    className = '',
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={`medusa-card-footer ${className}`}
      {...props}
    >
      {children}
    </div>
  )
};

// Input Components
export const Input = {
  Text: ({ 
    label,
    error,
    helperText,
    className = '',
    size = 'md',
    ...props 
  }: {
    label?: string;
    error?: string;
    helperText?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
  } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className={`medusa-input-group ${className}`}>
      {label && (
        <label className="medusa-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input 
        className={`medusa-input medusa-input-${size} ${error ? 'medusa-input-error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
        {...props}
      />
      {error && (
        <span className="medusa-input-error-text" id={`${props.id}-error`} role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span className="medusa-input-helper-text" id={`${props.id}-helper`}>
          {helperText}
        </span>
      )}
    </div>
  ),

  Textarea: ({ 
    label,
    error,
    helperText,
    className = '',
    size = 'md',
    ...props 
  }: {
    label?: string;
    error?: string;
    helperText?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <div className={`medusa-input-group ${className}`}>
      {label && (
        <label className="medusa-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <textarea 
        className={`medusa-textarea medusa-textarea-${size} ${error ? 'medusa-input-error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
        {...props}
      />
      {error && (
        <span className="medusa-input-error-text" id={`${props.id}-error`} role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span className="medusa-input-helper-text" id={`${props.id}-helper`}>
          {helperText}
        </span>
      )}
    </div>
  )
};

// Navigation Components
export const Navigation = {
  Nav: ({ 
    children, 
    className = '',
    variant = 'glass',
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
    variant?: 'glass' | 'solid';
  } & React.HTMLAttributes<HTMLElement>) => (
    <nav 
      className={`medusa-nav medusa-nav-${variant} ${className}`}
      {...props}
    >
      {children}
    </nav>
  ),

  Item: ({ 
    children, 
    className = '',
    active = false,
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
    active?: boolean;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
      className={`medusa-nav-item ${active ? 'medusa-nav-item-active' : ''} ${className}`}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      {children}
    </button>
  )
};

// Utility Hooks
export const useResponsive = () => {
  const { breakpoint } = useMedusaDesignSystem();
  
  return {
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop' || breakpoint === 'wide',
    isWide: breakpoint === 'wide',
    breakpoint
  };
};

export const useTokens = () => {
  const { tokens } = useMedusaDesignSystem();
  return tokens;
};

// ===========================================
// CSS UTILITIES GENERATOR
// ===========================================

export const generateUtilityCSS = () => {
  const tokens = brandTokens.medusa;
  
  return `
    /* Design System Utilities */
    .medusa-design-system {
      /* CSS Custom Properties from Tokens */
      --medusa-color-gold: ${tokens.colors.primary.gold.value};
      --medusa-color-black: ${tokens.colors.primary.black.value};
      --medusa-color-off-white: ${tokens.colors.primary['off-white'].value};
      
      /* Base Styles */
      font-family: var(--medusa-font-body);
      color: var(--medusa-text-primary);
      background-color: var(--medusa-bg-primary);
    }
  `;
};

export default MedusaDesignSystemProvider;