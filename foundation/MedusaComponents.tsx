import { forwardRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMedusaDesignSystem, useMedusaResponsive } from './MedusaDesignSystem';

// ==========================================
// MEDUSA DESIGN SYSTEM UTILITY COMPONENTS
// Mobile-first, 12-column grid, WCAG 2.1 AA compliant
// ==========================================

// Grid System Types
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridSpan = 'auto' | GridColumns | 'full';
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type TypographyVariant = 'headline-xl' | 'headline-lg' | 'headline-md' | 'body-large' | 'body' | 'body-small';
export type ColorVariant = 'gold' | 'white' | 'chrome' | 'background';
export type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

// Responsive Container Component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'mobile' | 'tablet' | 'desktop' | 'wide' | 'full';
  padding?: boolean;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
}

export const ResponsiveContainer = forwardRef<HTMLDivElement, ResponsiveContainerProps>(({
  children,
  className = '',
  maxWidth = 'desktop',
  padding = true,
  as: Component = 'div',
  id,
}, ref) => {
  const { tokens, breakpoint, getContainerPadding, registerComponent, generateComponentId } = useMedusaDesignSystem();
  
  useEffect(() => {
    const componentId = generateComponentId('responsive-container');
    registerComponent({
      id: componentId,
      type: 'ResponsiveContainer',
      device: breakpoint.device,
      timestamp: Date.now(),
      props: { maxWidth, padding },
    });
  }, [maxWidth, padding, breakpoint.device, generateComponentId, registerComponent]);
  
  const maxWidthClasses = {
    mobile: 'max-w-sm',
    tablet: 'max-w-4xl',
    desktop: 'style={{ maxWidth: "1433px" }}',
    wide: 'max-w-screen-2xl',
    full: 'max-w-none',
  };
  
  const paddingValue = padding ? getContainerPadding() : '0';
  
  const containerClasses = [
    'w-full mx-auto',
    maxWidthClasses[maxWidth],
    className
  ].filter(Boolean).join(' ');

  const style = padding ? {
    paddingLeft: paddingValue,
    paddingRight: paddingValue,
  } : undefined;

  return (
    <Component 
      ref={ref} 
      id={id}
      className={containerClasses}
      style={style}
    >
      {children}
    </Component>
  );
});

ResponsiveContainer.displayName = 'ResponsiveContainer';

// 12-Column Grid System
interface GridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    mobile?: GridColumns;
    tablet?: GridColumns;
    desktop?: GridColumns;
  };
  gap?: SpacingSize;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  as?: keyof JSX.IntrinsicElements;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(({
  children,
  className = '',
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  alignItems = 'stretch',
  justifyContent = 'start',
  as: Component = 'div',
}, ref) => {
  const { breakpoint, getSpacing, registerComponent, generateComponentId } = useMedusaDesignSystem();
  
  useEffect(() => {
    const componentId = generateComponentId('grid');
    registerComponent({
      id: componentId,
      type: 'Grid',
      device: breakpoint.device,
      timestamp: Date.now(),
      props: { columns, gap, alignItems, justifyContent },
    });
  }, [columns, gap, alignItems, justifyContent, breakpoint.device, generateComponentId, registerComponent]);
  
  const gridClasses = [
    'grid',
    `grid-cols-${columns.mobile || 1}`,
    breakpoint.isTablet && `md:grid-cols-${columns.tablet || columns.mobile || 2}`,
    breakpoint.isDesktop && `lg:grid-cols-${columns.desktop || columns.tablet || columns.mobile || 3}`,
    alignItems !== 'stretch' && `items-${alignItems}`,
    justifyContent !== 'start' && `justify-${justifyContent}`,
    className
  ].filter(Boolean).join(' ');

  const gapValue = getSpacing(gap);

  return (
    <Component 
      ref={ref} 
      className={gridClasses}
      style={{ gap: gapValue }}
    >
      {children}
    </Component>
  );
});

Grid.displayName = 'Grid';

// Grid Item Component
interface GridItemProps {
  children: React.ReactNode;
  className?: string;
  span?: {
    mobile?: GridSpan;
    tablet?: GridSpan;
    desktop?: GridSpan;
  } | GridSpan;
  start?: {
    mobile?: GridColumns;
    tablet?: GridColumns;
    desktop?: GridColumns;
  };
  as?: keyof JSX.IntrinsicElements;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(({
  children,
  className = '',
  span = 'auto',
  start,
  as: Component = 'div',
}, ref) => {
  const { breakpoint } = useMedusaDesignSystem();
  
  const spanConfig = typeof span === 'string' || typeof span === 'number'
    ? { mobile: span, tablet: span, desktop: span }
    : { mobile: 'auto', tablet: 'auto', desktop: 'auto', ...span };
  
  const spanClasses = [
    spanConfig.mobile === 'full' ? 'col-span-full' :
    spanConfig.mobile === 'auto' ? 'col-auto' :
    typeof spanConfig.mobile === 'number' ? `col-span-${spanConfig.mobile}` : '',
    
    spanConfig.tablet === 'full' ? 'md:col-span-full' :
    spanConfig.tablet === 'auto' ? 'md:col-auto' :
    typeof spanConfig.tablet === 'number' ? `md:col-span-${spanConfig.tablet}` : '',
    
    spanConfig.desktop === 'full' ? 'lg:col-span-full' :
    spanConfig.desktop === 'auto' ? 'lg:col-auto' :
    typeof spanConfig.desktop === 'number' ? `lg:col-span-${spanConfig.desktop}` : '',
  ].filter(Boolean).join(' ');
  
  const startClasses = start ? [
    start.mobile && `col-start-${start.mobile}`,
    start.tablet && `md:col-start-${start.tablet}`,
    start.desktop && `lg:col-start-${start.desktop}`,
  ].filter(Boolean).join(' ') : '';
  
  const finalClasses = [spanClasses, startClasses, className].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={finalClasses}>
      {children}
    </Component>
  );
});

GridItem.displayName = 'GridItem';

// Typography Component
interface TypographyProps {
  children: React.ReactNode;
  variant: TypographyVariant;
  color?: ColorVariant;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(({
  children,
  variant,
  color = 'white',
  className = '',
  as,
  align = 'left',
  weight,
}, ref) => {
  const { tokens, getFontSize, registerComponent, generateComponentId, breakpoint } = useMedusaDesignSystem();
  
  useEffect(() => {
    const componentId = generateComponentId('typography');
    registerComponent({
      id: componentId,
      type: 'Typography',
      device: breakpoint.device,
      timestamp: Date.now(),
      props: { variant, color, align, weight },
    });
  }, [variant, color, align, weight, breakpoint.device, generateComponentId, registerComponent]);
  
  const defaultElements = {
    'headline-xl': 'h1',
    'headline-lg': 'h2',
    'headline-md': 'h3',
    'body-large': 'p',
    'body': 'p',
    'body-small': 'span',
  } as const;
  
  const Component = as || defaultElements[variant];
  
  const colorClasses = {
    gold: 'text-brand-gold',
    white: 'text-brand-white',
    chrome: 'text-brand-chrome',
    background: 'text-brand-background',
  };
  
  const isHeadline = variant.startsWith('headline');
  const fontFamily = isHeadline ? tokens.typography.fontFamilies.headline : tokens.typography.fontFamilies.body;
  const defaultWeight = isHeadline ? 'bold' : 'normal';
  const finalWeight = weight || defaultWeight;
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const lineHeightClasses = {
    'headline-xl': 'leading-tight',
    'headline-lg': 'leading-tight',
    'headline-md': 'leading-normal',
    'body-large': 'leading-relaxed',
    'body': 'leading-loose',
    'body-small': 'leading-relaxed',
  };
  
  const letterSpacingClasses = {
    'headline-xl': 'tracking-tight',
    'headline-lg': 'tracking-tight',
    'headline-md': 'tracking-normal',
    'body-large': 'tracking-normal',
    'body': 'tracking-normal',
    'body-small': 'tracking-normal',
  };
  
  const classes = [
    colorClasses[color],
    alignClasses[align],
    weightClasses[finalWeight],
    lineHeightClasses[variant],
    letterSpacingClasses[variant],
    className
  ].filter(Boolean).join(' ');

  const fontSize = getFontSize(variant);

  return (
    <Component 
      ref={ref} 
      className={classes}
      style={{ 
        fontFamily,
        fontSize,
      }}
    >
      {children}
    </Component>
  );
});

Typography.displayName = 'Typography';

// Section Component with spacing
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: SpacingSize;
  background?: 'transparent' | 'primary' | 'glassmorphic';
  as?: keyof JSX.IntrinsicElements;
  id?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  className = '',
  spacing = 'section',
  background = 'transparent',
  as: Component = 'section',
  id,
}, ref) => {
  const { getSpacing, registerComponent, generateComponentId, breakpoint } = useMedusaDesignSystem();
  
  useEffect(() => {
    const componentId = generateComponentId('section');
    registerComponent({
      id: componentId,
      type: 'Section',
      device: breakpoint.device,
      timestamp: Date.now(),
      props: { spacing, background },
    });
  }, [spacing, background, breakpoint.device, generateComponentId, registerComponent]);
  
  const backgroundClasses = {
    transparent: '',
    primary: 'bg-brand-background',
    glassmorphic: 'bg-brand-background/80 backdrop-blur-lg',
  };
  
  const spacingValue = getSpacing(spacing);
  
  const classes = [
    backgroundClasses[background],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component 
      ref={ref}
      id={id}
      className={classes}
      style={{
        paddingTop: spacingValue,
        paddingBottom: spacingValue,
      }}
    >
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </Component>
  );
});

Section.displayName = 'Section';

// Flex Container
interface FlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  gap?: SpacingSize;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  wrap?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(({
  children,
  className = '',
  direction = 'row',
  gap = 'md',
  alignItems = 'stretch',
  justifyContent = 'start',
  wrap = false,
  as: Component = 'div',
}, ref) => {
  const { getSpacing } = useMedusaDesignSystem();
  
  const classes = [
    'flex',
    `flex-${direction}`,
    alignItems !== 'stretch' && `items-${alignItems}`,
    justifyContent !== 'start' && `justify-${justifyContent}`,
    wrap && 'flex-wrap',
    className
  ].filter(Boolean).join(' ');

  const gapValue = getSpacing(gap);

  return (
    <Component 
      ref={ref} 
      className={classes}
      style={{ gap: gapValue }}
    >
      {children}
    </Component>
  );
});

Flex.displayName = 'Flex';

// Button Component (WCAG 2.1 AA compliant)
interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'minimum' | 'mobile' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  'aria-label'?: string;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
  children,
  className = '',
  variant = 'primary',
  size = 'mobile',
  onClick,
  disabled = false,
  type = 'button',
  as: Component = 'button',
  href,
  target,
  'aria-label': ariaLabel,
}, ref) => {
  const { tokens, getTouchTargetSize, getTransition, shouldReduceMotion, registerComponent, generateComponentId, breakpoint } = useMedusaDesignSystem();
  
  useEffect(() => {
    const componentId = generateComponentId('button');
    registerComponent({
      id: componentId,
      type: 'Button',
      device: breakpoint.device,
      timestamp: Date.now(),
      props: { variant, size, disabled },
    });
  }, [variant, size, disabled, breakpoint.device, generateComponentId, registerComponent]);
  
  const variantClasses = {
    primary: 'bg-brand-gold text-brand-background hover:bg-brand-gold-hover shadow-gold-glow-subtle hover:shadow-gold-glow',
    secondary: 'bg-transparent text-brand-chrome border border-brand-chrome hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/10',
    ghost: 'bg-transparent text-brand-white hover:text-brand-gold hover:bg-brand-gold/10',
  };
  
  const touchTargetSize = getTouchTargetSize(size);
  const transition = shouldReduceMotion ? 'transition-colors' : getTransition('luxury', 'normal');
  
  const classes = [
    'inline-flex items-center justify-center text-center font-body font-medium rounded-lg cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-background',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none',
    !shouldReduceMotion && 'hover:transform hover:-translate-y-0.5 active:transform active:translate-y-0 active:scale-98',
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  const style = {
    minHeight: touchTargetSize,
    minWidth: touchTargetSize,
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    transition,
  };

  const commonProps = {
    className: classes,
    style,
    disabled,
    'aria-label': ariaLabel,
    onClick,
  };

  if (Component === 'a') {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      {...commonProps}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

// Card Component with glassmorphic styling
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'luxury';
  padding?: SpacingSize;
  as?: keyof JSX.IntrinsicElements;
  onClick?: () => void;
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className = '',
  variant = 'default',
  padding = 'lg',
  as: Component = 'div',
  onClick,
  interactive = false,
}, ref) => {
  const { getSpacing, getTransition, shouldReduceMotion, registerComponent, generateComponentId, breakpoint } = useMedusaDesignSystem();
  
  useEffect(() => {
    const componentId = generateComponentId('card');
    registerComponent({
      id: componentId,
      type: 'Card',
      device: breakpoint.device,
      timestamp: Date.now(),
      props: { variant, padding, interactive },
    });
  }, [variant, padding, interactive, breakpoint.device, generateComponentId, registerComponent]);
  
  const variantClasses = {
    default: 'bg-brand-background/95 backdrop-blur-lg border border-brand-chrome/20',
    elevated: 'bg-brand-background/95 backdrop-blur-lg border border-brand-chrome/20 shadow-elevation2',
    luxury: 'bg-brand-background/95 backdrop-blur-lg border border-brand-gold/20 shadow-gold-glow-subtle',
  };
  
  const paddingValue = getSpacing(padding);
  const transition = shouldReduceMotion ? 'transition-colors' : getTransition('luxury', 'normal');
  
  const classes = [
    'rounded-xl overflow-hidden',
    variantClasses[variant],
    interactive && 'cursor-pointer hover:border-brand-gold/40 hover:shadow-gold-glow',
    !shouldReduceMotion && interactive && 'hover:transform hover:-translate-y-1',
    className
  ].filter(Boolean).join(' ');

  const style = {
    padding: paddingValue,
    transition,
  };

  return (
    <Component 
      ref={ref}
      className={classes}
      style={style}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

// Spacing Component for consistent gaps
interface SpacingProps {
  size: SpacingSize;
  direction?: 'vertical' | 'horizontal' | 'all';
  className?: string;
}

export const Spacing = forwardRef<HTMLDivElement, SpacingProps>(({
  size,
  direction = 'vertical',
  className = '',
}, ref) => {
  const { getSpacing } = useMedusaDesignSystem();
  
  const spacingValue = getSpacing(size);
  
  const style = {
    vertical: { marginTop: spacingValue, marginBottom: spacingValue },
    horizontal: { marginLeft: spacingValue, marginRight: spacingValue },
    all: { margin: spacingValue },
  };
  
  return (
    <div 
      ref={ref}
      className={className}
      style={style[direction]}
      aria-hidden="true"
    />
  );
});

Spacing.displayName = 'Spacing';

// Show/Hide Component for responsive display
interface ShowProps {
  children: React.ReactNode;
  on?: ('mobile' | 'tablet' | 'desktop')[];
  above?: 'mobile' | 'tablet';
  below?: 'tablet' | 'desktop';
}

export function Show({ children, on, above, below }: ShowProps) {
  const { breakpoint } = useMedusaDesignSystem();
  
  let shouldShow = true;
  
  if (on) {
    shouldShow = on.includes(breakpoint.device);
  } else if (above) {
    const breakpointOrder = { mobile: 0, tablet: 1, desktop: 2 };
    const currentOrder = breakpointOrder[breakpoint.device];
    const aboveOrder = breakpointOrder[above];
    shouldShow = currentOrder > aboveOrder;
  } else if (below) {
    const breakpointOrder = { mobile: 0, tablet: 1, desktop: 2 };
    const currentOrder = breakpointOrder[breakpoint.device];
    const belowOrder = breakpointOrder[below];
    shouldShow = currentOrder < belowOrder;
  }
  
  return shouldShow ? <>{children}</> : null;
}

// Motion wrapper with reduced motion support
interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
}

export function MotionWrapper({
  children,
  className = '',
  initial,
  animate,
  transition,
  whileHover,
  whileTap,
}: MotionWrapperProps) {
  const { shouldReduceMotion } = useMedusaDesignSystem();
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </motion.div>
  );
}

// Focus trap for accessibility
interface FocusTrapProps {
  children: React.ReactNode;
  isActive: boolean;
}

export function FocusTrap({ children, isActive }: FocusTrapProps) {
  const trapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !trapRef.current) return;

    const focusableElements = trapRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  return (
    <div ref={trapRef} className="contents">
      {children}
    </div>
  );
}