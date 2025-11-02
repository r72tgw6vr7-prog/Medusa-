import { forwardRef, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMedusaDesignSystem, useMedusaResponsive } from './MedusaDesignSystem';

// ==========================================
// MEDUSA UTILITY COMPONENTS
// Production-Ready Components with Strict Brand Compliance
// ==========================================

// COMPONENT TYPES
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridSpan = 'auto' | GridColumns | 'full';
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'section' | 'component';
export type TypographyVariant = 'headlineXl' | 'headlineLg' | 'headlineMd' | 'bodyLarge' | 'body' | 'bodySmall';
export type ColorVariant = 'gold' | 'white' | 'chrome' | 'background';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'minimum' | 'mobile' | 'large';
export type CardVariant = 'default' | 'elevated' | 'luxury' | 'glassmorphic';

// ==========================================
// LAYOUT COMPONENTS
// ==========================================

// RESPONSIVE CONTAINER
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
  const { getContainerMaxWidth, getContainerPadding } = useMedusaDesignSystem();
  const componentId = useMedusaComponent('ResponsiveContainer', { maxWidth, padding });
  
  const maxWidthMap = {
    mobile: '100%',
    tablet: '1024px',
    desktop: '1440px',
    wide: '1920px',
    full: 'none',
  };
  
  const containerStyle: React.CSSProperties = {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: maxWidthMap[maxWidth],
    ...(padding && {
      paddingLeft: getContainerPadding(),
      paddingRight: getContainerPadding(),
    }),
  };

  return (
    <Component 
      ref={ref} 
      id={id}
      className={className}
      style={containerStyle}
      data-component-id={componentId}
    >
      {children}
    </Component>
  );
});

ResponsiveContainer.displayName = 'ResponsiveContainer';

// 12-COLUMN GRID SYSTEM
interface GridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    mobile?: GridColumns;
    tablet?: GridColumns;
    desktop?: GridColumns;
  };
  gap?: SpacingSize;
  as?: keyof JSX.IntrinsicElements;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(({
  children,
  className = '',
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  as: Component = 'div',
}, ref) => {
  const { getSpacing, getGridGutter } = useMedusaDesignSystem();
  const { device } = useMedusaResponsive();
  const componentId = useMedusaComponent('Grid', { columns, gap });
  
  const currentColumns = columns[device] || columns.mobile || 1;
  const gapValue = getSpacing(gap);
  
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
    gap: gapValue,
  };

  return (
    <Component 
      ref={ref} 
      className={className}
      style={gridStyle}
      data-component-id={componentId}
    >
      {children}
    </Component>
  );
});

Grid.displayName = 'Grid';

// GRID ITEM
interface GridItemProps {
  children: React.ReactNode;
  className?: string;
  span?: {
    mobile?: GridSpan;
    tablet?: GridSpan;
    desktop?: GridSpan;
  } | GridSpan;
  as?: keyof JSX.IntrinsicElements;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(({
  children,
  className = '',
  span = 1,
  as: Component = 'div',
}, ref) => {
  const { device } = useMedusaResponsive();
  const componentId = useMedusaComponent('GridItem', { span });
  
  const spanConfig = typeof span === 'object' ? span : { mobile: span, tablet: span, desktop: span };
  const currentSpan = spanConfig[device] || spanConfig.mobile || 1;
  
  const gridItemStyle: React.CSSProperties = 
    currentSpan === 'full' ? { gridColumn: '1 / -1' } :
    currentSpan === 'auto' ? { gridColumn: 'auto' } :
    { gridColumn: `span ${currentSpan}` };

  return (
    <Component 
      ref={ref} 
      className={className}
      style={gridItemStyle}
      data-component-id={componentId}
    >
      {children}
    </Component>
  );
});

GridItem.displayName = 'GridItem';

// SECTION WRAPPER
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
  const { getSpacing, getGlassmorphicStyle } = useMedusaDesignSystem();
  const componentId = useMedusaComponent('Section', { spacing, background });
  
  const spacingValue = getSpacing(spacing);
  
  const backgroundStyles = {
    transparent: {},
    primary: { backgroundColor: 'var(--brand-background)' },
    glassmorphic: getGlassmorphicStyle(),
  };
  
  const sectionStyle: React.CSSProperties = {
    paddingTop: spacingValue,
    paddingBottom: spacingValue,
    ...backgroundStyles[background],
  };

  return (
    <Component 
      ref={ref}
      id={id}
      className={className}
      style={sectionStyle}
      data-component-id={componentId}
    >
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </Component>
  );
});

Section.displayName = 'Section';

// FLEX CONTAINER
interface FlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  gap?: SpacingSize;
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
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
  const componentId = useMedusaComponent('Flex', { direction, gap, alignItems, justifyContent, wrap });
  
  const flexStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    gap: getSpacing(gap),
    alignItems: alignItems === 'start' ? 'flex-start' : alignItems === 'end' ? 'flex-end' : alignItems,
    justifyContent: justifyContent === 'start' ? 'flex-start' : 
                   justifyContent === 'end' ? 'flex-end' :
                   justifyContent === 'between' ? 'space-between' :
                   justifyContent === 'around' ? 'space-around' :
                   justifyContent === 'evenly' ? 'space-evenly' : justifyContent,
    flexWrap: wrap ? 'wrap' : 'nowrap',
  };

  return (
    <Component 
      ref={ref} 
      className={className}
      style={flexStyle}
      data-component-id={componentId}
    >
      {children}
    </Component>
  );
});

Flex.displayName = 'Flex';

// ==========================================
// TYPOGRAPHY COMPONENT
// ==========================================

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
  const { getTypography, getColorVariant, tokens } = useMedusaDesignSystem();
  const componentId = useMedusaComponent('Typography', { variant, color, align, weight });
  
  const defaultElements = {
    headlineXl: 'h1',
    headlineLg: 'h2',
    headlineMd: 'h3',
    bodyLarge: 'p',
    body: 'p',
    bodySmall: 'span',
  } as const;
  
  const Component = as || defaultElements[variant];
  const isHeadline = variant.startsWith('headline');
  const fontFamily = isHeadline ? tokens.typography.fonts.headline : tokens.typography.fonts.body;
  const defaultWeight = isHeadline ? 'bold' : 'normal';
  const finalWeight = weight || defaultWeight;
  
  const typographyStyle: React.CSSProperties = {
    fontFamily,
    fontSize: getTypography(variant),
    fontWeight: tokens.typography.weights[finalWeight],
    lineHeight: isHeadline ? tokens.typography.lineHeights.tight : tokens.typography.lineHeights.loose,
    color: getColorVariant(color),
    textAlign: align,
    margin: 0,
  };

  return (
    <Component 
      ref={ref} 
      className={className}
      style={typographyStyle}
      data-component-id={componentId}
    >
      {children}
    </Component>
  );
});

Typography.displayName = 'Typography';

// ==========================================
// BUTTON COMPONENT - WCAG 2.1 AA COMPLIANT
// ==========================================

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
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
  variant = 'primary',
  size = 'mobile',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  as: Component = 'button',
  href,
  target,
  'aria-label': ariaLabel,
}, ref) => {
  const { 
    getTouchTarget, 
    getTransition, 
    shouldReduceMotion, 
    tokens,
    getGoldGlowStyle
  } = useMedusaDesignSystem();
  const componentId = useMedusaComponent('Button', { variant, size, disabled });
  
  const touchTargetSize = getTouchTarget(size);
  
  const variantStyles = {
    primary: {
      backgroundColor: tokens.colors.brand.gold,
      color: tokens.colors.brand.background,
      border: 'none',
      ...getGoldGlowStyle('subtle'),
    },
    secondary: {
      backgroundColor: 'transparent',
      color: tokens.colors.brand.chrome,
      border: `1px solid ${tokens.colors.brand.chrome}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: tokens.colors.brand.white,
      border: 'none',
    },
  };
  
  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: touchTargetSize,
    minWidth: touchTargetSize,
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    fontFamily: tokens.typography.fonts.body,
    fontWeight: tokens.typography.weights.medium,
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    transition: shouldReduceMotion ? 'none' : getTransition('luxury', 'normal'),
    opacity: disabled ? 0.5 : 1,
    ...variantStyles[variant],
  };
  
  const hoverStyle = !disabled && !shouldReduceMotion ? {
    transform: 'translateY(-1px)',
    ...(variant === 'primary' && getGoldGlowStyle('normal')),
  } : {};

  const commonProps = {
    className,
    style: buttonStyle,
    disabled,
    'aria-label': ariaLabel,
    onClick,
    'data-component-id': componentId,
    onMouseEnter: (e: React.MouseEvent) => {
      if (!disabled && !shouldReduceMotion) {
        Object.assign(e.currentTarget.style, hoverStyle);
      }
    },
    onMouseLeave: (e: React.MouseEvent) => {
      if (!disabled && !shouldReduceMotion) {
        Object.assign(e.currentTarget.style, buttonStyle);
      }
    },
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

// ==========================================
// CARD COMPONENT
// ==========================================

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  padding?: SpacingSize;
  onClick?: () => void;
  interactive?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  variant = 'default',
  className = '',
  padding = 'lg',
  onClick,
  interactive = false,
  as: Component = 'div',
}, ref) => {
  const { 
    getSpacing, 
    getTransition, 
    shouldReduceMotion, 
    tokens,
    getGlassmorphicStyle,
    getGoldGlowStyle
  } = useMedusaDesignSystem();
  const componentId = useMedusaComponent('Card', { variant, padding, interactive });
  
  const paddingValue = getSpacing(padding);
  
  const variantStyles = {
    default: {
      ...getGlassmorphicStyle(),
    },
    elevated: {
      ...getGlassmorphicStyle(),
      boxShadow: tokens.effects.shadows.elevation2,
    },
    luxury: {
      ...getGlassmorphicStyle(),
      border: `1px solid rgba(212, 175, 55, 0.2)`,
      ...getGoldGlowStyle('subtle'),
    },
    glassmorphic: {
      ...getGlassmorphicStyle(),
    },
  };
  
  const cardStyle: React.CSSProperties = {
    borderRadius: '12px',
    overflow: 'hidden',
    padding: paddingValue,
    cursor: interactive ? 'pointer' : 'default',
    transition: shouldReduceMotion ? 'none' : getTransition('luxury', 'normal'),
    ...variantStyles[variant],
  };
  
  const hoverStyle = interactive && !shouldReduceMotion ? {
    ...getGoldGlowStyle('normal'),
    transform: 'translateY(-2px)',
  } : {};

  return (
    <Component 
      ref={ref}
      className={className}
      style={cardStyle}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      data-component-id={componentId}
      onMouseEnter={(e) => {
        if (interactive && !shouldReduceMotion) {
          Object.assign(e.currentTarget.style, { ...cardStyle, ...hoverStyle });
        }
      }}
      onMouseLeave={(e) => {
        if (interactive && !shouldReduceMotion) {
          Object.assign(e.currentTarget.style, cardStyle);
        }
      }}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

// ==========================================
// UTILITY COMPONENTS
// ==========================================

// SPACING COMPONENT
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
  const componentId = useMedusaComponent('Spacing', { size, direction });
  
  const spacingValue = getSpacing(size);
  
  const spacingStyle = {
    vertical: { marginTop: spacingValue, marginBottom: spacingValue },
    horizontal: { marginLeft: spacingValue, marginRight: spacingValue },
    all: { margin: spacingValue },
  };
  
  return (
    <div 
      ref={ref}
      className={className}
      style={spacingStyle[direction]}
      aria-hidden="true"
      data-component-id={componentId}
    />
  );
});

Spacing.displayName = 'Spacing';

// SHOW/HIDE RESPONSIVE COMPONENT
interface ShowProps {
  children: React.ReactNode;
  on?: ('mobile' | 'tablet' | 'desktop')[];
  above?: 'mobile' | 'tablet';
  below?: 'tablet' | 'desktop';
}

export function Show({ children, on, above, below }: ShowProps) {
  const { device } = useMedusaResponsive();
  const componentId = useMedusaComponent('Show', { on, above, below });
  
  let shouldShow = true;
  
  if (on) {
    shouldShow = on.includes(device);
  } else if (above) {
    const order = { mobile: 0, tablet: 1, desktop: 2 };
    shouldShow = order[device] > order[above];
  } else if (below) {
    const order = { mobile: 0, tablet: 1, desktop: 2 };
    shouldShow = order[device] < order[below];
  }
  
  return shouldShow ? <div data-component-id={componentId}>{children}</div> : null;
}

// MOTION WRAPPER WITH REDUCED MOTION SUPPORT
interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  initial?: React.CSSProperties | string | string[];
  animate?: React.CSSProperties | string | string[];
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    [key: string]: string | number | number[] | undefined;
  };
  whileHover?: React.CSSProperties | string | string[];
  whileTap?: React.CSSProperties | string | string[];
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
  const componentId = useMedusaComponent('MotionWrapper');
  
  if (shouldReduceMotion) {
    return <div className={className} data-component-id={componentId}>{children}</div>;
  }
  
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={whileHover}
      whileTap={whileTap}
      data-component-id={componentId}
    >
      {children}
    </motion.div>
  );
}

// FOCUS TRAP FOR ACCESSIBILITY
interface FocusTrapProps {
  children: React.ReactNode;
  isActive: boolean;
}

export function FocusTrap({ children, isActive }: FocusTrapProps) {
  const trapRef = useRef<HTMLDivElement>(null);
  const componentId = useMedusaComponent('FocusTrap', { isActive });

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
    <div ref={trapRef} className="contents" data-component-id={componentId}>
      {children}
    </div>
  );
}

// INPUT COMPONENT
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  'aria-label'?: string;
  id?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  'aria-label': ariaLabel,
  id,
}, ref) => {
  const { 
    getTouchTarget, 
    getTransition, 
    shouldReduceMotion, 
    tokens,
    getGlassmorphicStyle
  } = useMedusaDesignSystem();
  const componentId = useMedusaComponent('Input', { type, disabled, required });
  
  const inputStyle: React.CSSProperties = {
    ...getGlassmorphicStyle(),
    minHeight: getTouchTarget(),
    padding: '0 1rem',
    fontFamily: tokens.typography.fonts.body,
    color: tokens.colors.brand.white,
    border: `2px solid ${tokens.colors.brand.chrome}`,
    borderRadius: '8px',
    transition: shouldReduceMotion ? 'none' : getTransition('standard', 'fast'),
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      required={required}
      className={className}
      style={inputStyle}
      aria-label={ariaLabel}
      id={id}
      data-component-id={componentId}
      onFocus={(e) => {
        e.target.style.borderColor = tokens.colors.brand.gold;
        e.target.style.boxShadow = tokens.effects.shadows.goldGlowSubtle;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = tokens.colors.brand.chrome;
        e.target.style.boxShadow = 'none';
      }}
    />
  );
});

Input.displayName = 'Input';