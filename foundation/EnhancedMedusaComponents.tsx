import { forwardRef, useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMedusaDesignSystem, useMedusaResponsive, useMedusaComponent } from './MedusaDesignSystemProvider';

// ==========================================
// ENHANCED MEDUSA COMPONENTS v2.0
// Production-Ready with Advanced Accessibility & Responsive Features
// ==========================================

// ENHANCED TYPES
export type ContainerQuery = 'inline-size' | 'block-size' | 'aspect-ratio';
export type FocusManagement = 'auto' | 'manual' | 'trap';
export type MotionPreference = 'respect' | 'force' | 'disable';

// ==========================================
// ENHANCED RESPONSIVE CONTAINER WITH CONTAINER QUERIES
// ==========================================

interface EnhancedContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'mobile' | 'tablet' | 'desktop' | 'wide' | 'full';
  padding?: boolean | 'responsive';
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  containerQuery?: ContainerQuery;
  minHeight?: string;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const EnhancedContainer = forwardRef<HTMLDivElement, EnhancedContainerProps>((props, ref) => {
  const {
    children,
    className = '',
    maxWidth = 'desktop',
    padding = true,
    as: Component = 'div',
    id,
    containerQuery,
    minHeight,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  } = props;

  const { getContainerMaxWidth, getContainerPadding, tokens } = useMedusaDesignSystem();
  const { device: _device, isMobile: _isMobile, isTablet: _isTablet, isDesktop: _isDesktop } = useMedusaResponsive();
  const componentId = useMedusaComponent('EnhancedContainer', { maxWidth, padding, containerQuery });
  
  const maxWidthMap = {
    mobile: '100%',
    tablet: '1024px',
    desktop: '1440px',
    wide: '1920px',
    full: 'none',
  };

  // Enhanced responsive padding
  const getPaddingValue = () => {
    if (padding === false) return undefined;
    if (padding === 'responsive') {
      return {
        paddingLeft: tokens.layout.grid.margins[device],
        paddingRight: tokens.layout.grid.margins[device],
      };
    }
    return {
      paddingLeft: getContainerPadding(),
      paddingRight: getContainerPadding(),
    };
  };
  
  const containerStyle: React.CSSProperties = {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: maxWidthMap[maxWidth],
    minHeight,
    ...getPaddingValue(),
    // Container query support
    ...(containerQuery && {
      containerType: containerQuery,
      containerName: `medusa-${containerQuery}`,
    }),
  };

  return (
    <Component 
      ref={ref} 
      id={id}
      className={className}
      style={containerStyle}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      data-component-id={componentId}
      data-device={device}
      data-container-query={containerQuery}
    >
      {children}
    </Component>
  );
});

EnhancedContainer.displayName = 'EnhancedContainer';

// ==========================================
// ENHANCED BUTTON WITH ADVANCED FOCUS MANAGEMENT
// ==========================================

interface EnhancedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'luxury';
  size?: 'minimum' | 'mobile' | 'large' | 'auto';
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  focusManagement?: FocusManagement;
  motionPreference?: MotionPreference;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-pressed'?: boolean;
}

export const EnhancedButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, EnhancedButtonProps>((props, ref) => {
  const {
    children,
    variant = 'primary',
    size = 'mobile',
    className = '',
    onClick,
    onKeyDown,
    disabled = false,
    loading = false,
    type = 'button',
    as: Component = 'button',
    href,
    target,
    rel,
    focusManagement = 'auto',
    motionPreference = 'respect',
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    'aria-pressed': ariaPressed,
  } = props;

  const { 
    getTouchTarget, 
    getTransition, 
    shouldReduceMotion, 
    tokens,
    getGoldGlowStyle,
    announceToScreenReader
  } = useMedusaDesignSystem();
  const { hasTouch, prefersHighContrast } = useMedusaResponsive();
  const componentId = useMedusaComponent('EnhancedButton', { variant, size, disabled, loading });
  
  const [isPressed, setIsPressed] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  // Enhanced touch target sizing
  const getTouchTargetSize = () => {
    if (size === 'auto') return 'auto';
    const baseSize = getTouchTarget(size);
    return hasTouch ? Math.max(parseInt(baseSize), 44) + 'px' : baseSize;
  };

  const touchTargetSize = getTouchTargetSize();
  
  // Enhanced variant styles with accessibility considerations
  const getVariantStyles = () => {
    const base = {
      backgroundColor: 'transparent',
      color: tokens.colors.brand.white,
      border: 'none',
    };

    const styles = {
      primary: {
        backgroundColor: tokens.colors.brand.gold,
        color: tokens.colors.brand.background,
        border: 'none',
        ...getGoldGlowStyle('subtle'),
      },
      secondary: {
        backgroundColor: 'transparent',
        color: tokens.colors.brand.chrome,
        border: `2px solid ${tokens.colors.brand.chrome}`,
      },
      ghost: {
        ...base,
      },
      luxury: {
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        color: tokens.colors.brand.gold,
        border: `1px solid ${tokens.colors.brand.gold}`,
        ...getGoldGlowStyle('subtle'),
      },
    };

    // High contrast mode adjustments
    if (prefersHighContrast) {
      return {
        ...styles[variant],
        borderWidth: '2px',
        outline: `2px solid ${tokens.colors.brand.gold}`,
        outlineOffset: '2px',
      };
    }

    return styles[variant];
  };
  
  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: touchTargetSize,
    minWidth: touchTargetSize === 'auto' ? 'auto' : touchTargetSize,
    paddingLeft: size === 'auto' ? '0.75rem' : '1.5rem',
    paddingRight: size === 'auto' ? '0.75rem' : '1.5rem',
    fontFamily: tokens.typography.fonts.body,
    fontWeight: tokens.typography.weights.medium,
    fontSize: tokens.typography.scales.mobile.body, // Will be responsive
    borderRadius: '8px',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    userSelect: 'none',
    position: 'relative',
    overflow: 'hidden',
    transition: motionPreference !== 'disable' && !shouldReduceMotion 
      ? getTransition('luxury', 'normal') 
      : 'none',
    opacity: disabled ? 0.5 : loading ? 0.8 : 1,
    transform: isPressed && !disabled && !loading ? 'scale(0.98)' : 'scale(1)',
    ...getVariantStyles(),
    // Enhanced focus styles
    ...(focusVisible && {
      outline: `3px solid ${tokens.colors.brand.gold}`,
      outlineOffset: '2px',
      zIndex: 1,
    }),
  };

  // Enhanced event handlers
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }
    
    // Announce state changes to screen readers
    if (ariaPressed !== undefined) {
      announceToScreenReader(
        ariaPressed ? 'Button deactivated' : 'Button activated'
      );
    }
    
    onClick?.(event);
  }, [disabled, loading, onClick, ariaPressed, announceToScreenReader]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Enhanced keyboard interaction
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsPressed(true);
      if (!disabled && !loading) {
        handleClick(event as any);
      }
    }
    onKeyDown?.(event);
  }, [handleClick, onKeyDown, disabled, loading]);

  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsPressed(false);
    }
  }, []);

  // Focus management
  const handleFocus = useCallback((event: React.FocusEvent) => {
    // Only show focus outline for keyboard navigation
    if (focusManagement !== 'manual') {
      setFocusVisible(true);
    }
  }, [focusManagement]);

  const handleBlur = useCallback(() => {
    setFocusVisible(false);
    setIsPressed(false);
  }, []);

  // Mouse interaction handlers
  const handleMouseDown = useCallback(() => {
    if (!disabled && !loading) {
      setIsPressed(true);
      setFocusVisible(false); // Hide focus outline for mouse interaction
    }
  }, [disabled, loading]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPressed(false);
  }, []);

  // Loading indicator
  const LoadingSpinner = () => (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div 
        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        style={{
          animation: shouldReduceMotion ? 'none' : 'spin 1s linear infinite',
        }}
      />
    </motion.div>
  );

  const commonProps = {
    ref: ref as React.Ref<HTMLButtonElement | HTMLAnchorElement>,
    className,
    style: buttonStyle,
    disabled: disabled || loading,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    'aria-pressed': ariaPressed,
    'aria-busy': loading,
    'data-component-id': componentId,
    'data-variant': variant,
    'data-size': size,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
  };

  if (Component === 'a') {
    return (
      <a
        {...commonProps}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        role="button"
        tabIndex={0}
      >
        <span style={{ opacity: loading ? 0 : 1 }}>
          {children}
        </span>
        <AnimatePresence>
          {loading && <LoadingSpinner />}
        </AnimatePresence>
      </a>
    );
  }

  return (
    <button
      {...commonProps}
      type={type}
    >
      <span style={{ opacity: loading ? 0 : 1 }}>
        {children}
      </span>
      <AnimatePresence>
        {loading && <LoadingSpinner />}
      </AnimatePresence>
    </button>
  );
});

EnhancedButton.displayName = 'EnhancedButton';

// ==========================================
// ENHANCED MOTION WRAPPER WITH COMPREHENSIVE ACCESSIBILITY
// ==========================================

interface EnhancedMotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  initial?: React.CSSProperties | string | string[];
  animate?: React.CSSProperties | string | string[];
  exit?: React.CSSProperties | string | string[];
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    [key: string]: string | number | number[] | undefined;
  };
  whileHover?: React.CSSProperties | string | string[];
  whileTap?: React.CSSProperties | string | string[];
  whileFocus?: React.CSSProperties | string | string[];
  whileInView?: React.CSSProperties | string | string[];
  viewport?: {
    once?: boolean;
    amount?: 'some' | 'all' | number;
    margin?: string;
    [key: string]: string | number | boolean | undefined;
  };
  motionPreference?: MotionPreference;
  reduceMotionFallback?: 'static' | 'simplified' | 'fade';
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-hidden'?: boolean;
}

export function EnhancedMotionWrapper(props: EnhancedMotionWrapperProps) {
  const {
    children,
    className = '',
    initial,
    animate,
    exit,
    transition,
    whileHover,
    whileTap,
    whileFocus,
    whileInView,
    viewport,
    motionPreference = 'respect',
    reduceMotionFallback = 'static',
    'aria-live': ariaLive,
    'aria-hidden': ariaHidden,
  } = props;

  const { shouldReduceMotion, getTransition } = useMedusaDesignSystem();
  const componentId = useMedusaComponent('EnhancedMotionWrapper', { motionPreference, reduceMotionFallback });
  
  // Motion preference logic
  const useMotion = motionPreference === 'force' || 
    (motionPreference === 'respect' && !shouldReduceMotion);

  // Reduced motion fallbacks
  const getReducedMotionProps = () => {
    switch (reduceMotionFallback) {
      case 'simplified':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.2 },
        };
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.1 },
        };
      default:
        return {}; // Static - no animation
    }
  };

  if (!useMotion) {
    const fallbackProps = reduceMotionFallback !== 'static' ? getReducedMotionProps() : {};
    
    return (
      <motion.div
        className={className}
        {...fallbackProps}
        aria-live={ariaLive}
        aria-hidden={ariaHidden}
        data-component-id={componentId}
        data-motion-reduced="true"
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      whileHover={whileHover}
      whileTap={whileTap}
      whileFocus={whileFocus}
      whileInView={whileInView}
      viewport={viewport}
      aria-live={ariaLive}
      aria-hidden={ariaHidden}
      data-component-id={componentId}
      data-motion-enabled="true"
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// ENHANCED FOCUS TRAP WITH ADVANCED FEATURES
// ==========================================

interface EnhancedFocusTrapProps {
  children: React.ReactNode;
  isActive: boolean;
  restoreFocus?: boolean;
  initialFocus?: string | HTMLElement;
  onEscape?: () => void;
  className?: string;
}

export function EnhancedFocusTrap(props: EnhancedFocusTrapProps) {
  const {
    children,
    isActive,
    restoreFocus = true,
    initialFocus,
    onEscape,
    className = '',
  } = props;

  const trapRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const componentId = useMedusaComponent('EnhancedFocusTrap', { isActive, restoreFocus });

  // Enhanced focusable element selector
  const focusableSelector = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
    'audio[controls]',
    'video[controls]',
    'details > summary',
  ].join(', ');

  useEffect(() => {
    if (!isActive || !trapRef.current) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    const focusableElements = Array.from(
      trapRef.current.querySelectorAll(focusableSelector)
    ) as HTMLElement[];
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus initial element
    if (initialFocus) {
      const target = typeof initialFocus === 'string' 
        ? trapRef.current.querySelector(initialFocus) as HTMLElement
        : initialFocus;
      target?.focus();
    } else {
      firstElement?.focus();
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

      if (e.shiftKey) {
        // Shift + Tab
        if (currentIndex <= 0) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (currentIndex >= focusableElements.length - 1) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape?.();
      }
    };

    // Enhanced click outside detection
    const handleClickOutside = (e: MouseEvent) => {
      if (!trapRef.current?.contains(e.target as Node)) {
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
      
      // Restore focus if requested
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive, initialFocus, onEscape, restoreFocus, focusableSelector]);

  return (
    <div 
      ref={trapRef} 
      className={`contents ${className}`}
      data-component-id={componentId}
      data-focus-trap-active={isActive}
    >
      {children}
    </div>
  );
}

// ==========================================
// ENHANCED GLASSMORPHIC CARD WITH IMPROVED EFFECTS
// ==========================================

interface EnhancedGlassmorphicCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'luxury' | 'premium';
  intensity?: 'subtle' | 'normal' | 'strong';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  glow?: 'none' | 'gold' | 'chrome';
  as?: keyof JSX.IntrinsicElements;
  role?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const EnhancedGlassmorphicCard = forwardRef<HTMLDivElement, EnhancedGlassmorphicCardProps>((props, ref) => {
  const {
    children,
    variant = 'default',
    intensity = 'normal',
    padding = 'lg',
    className = '',
    onClick,
    interactive = false,
    glow = 'none',
    as: Component = 'div',
    role,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
  } = props;

  const { 
    getSpacing, 
    getTransition, 
    shouldReduceMotion, 
    tokens,
    getGlassmorphicStyle,
    getGoldGlowStyle
  } = useMedusaDesignSystem();
  const { prefersHighContrast } = useMedusaResponsive();
  const componentId = useMedusaComponent('EnhancedGlassmorphicCard', { variant, intensity, interactive, glow });
  
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Enhanced glassmorphic effects
  const getIntensityStyles = () => {
    const baseStyle = getGlassmorphicStyle();
    
    const intensityMap = {
      subtle: {
        ...baseStyle,
        background: 'rgba(34, 34, 34, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      },
      normal: baseStyle,
      strong: {
        ...baseStyle,
        background: 'rgba(34, 34, 34, 0.95)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
      },
    };

    return intensityMap[intensity];
  };

  // Enhanced variant styles
  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: '16px',
      overflow: 'hidden',
      position: 'relative' as const,
      ...getIntensityStyles(),
    };

    const variants = {
      default: baseStyles,
      elevated: {
        ...baseStyles,
        boxShadow: `${tokens.effects.shadows.elevation2}, ${tokens.effects.shadows.goldGlowSubtle}`,
      },
      luxury: {
        ...baseStyles,
        border: `1px solid rgba(212, 175, 55, 0.3)`,
        ...getGoldGlowStyle('subtle'),
      },
      premium: {
        ...baseStyles,
        border: `2px solid rgba(212, 175, 55, 0.4)`,
        background: 'linear-gradient(145deg, rgba(34, 34, 34, 0.98), rgba(34, 34, 34, 0.92))',
        ...getGoldGlowStyle('normal'),
      },
    };

    return variants[variant];
  };

  // Enhanced glow effects
  const getGlowStyles = () => {
    if (glow === 'none') return {};
    
    const glowMap = {
      gold: getGoldGlowStyle(isHovered || isFocused ? 'normal' : 'subtle'),
      chrome: {
        boxShadow: `0 0 ${isHovered || isFocused ? '24px' : '12px'} rgba(192, 192, 192, ${isHovered || isFocused ? '0.4' : '0.2'})`,
      },
    };

    return glowMap[glow] || {};
  };

  const paddingMap = {
    none: '0',
    sm: getSpacing('sm'),
    md: getSpacing('md'),
    lg: getSpacing('lg'),
    xl: getSpacing('xl'),
  };
  
  const cardStyle: React.CSSProperties = {
    ...getVariantStyles(),
    ...getGlowStyles(),
    padding: paddingMap[padding],
    cursor: interactive ? 'pointer' : 'default',
    transition: shouldReduceMotion ? 'none' : getTransition('luxury', 'normal'),
    transform: isHovered && interactive && !shouldReduceMotion ? 'translateY(-2px)' : 'none',
    // High contrast mode adjustments
    ...(prefersHighContrast && {
      border: `2px solid ${tokens.colors.brand.gold}`,
      outline: `1px solid ${tokens.colors.brand.white}`,
      outlineOffset: '2px',
    }),
  };

  const handleMouseEnter = () => {
    if (interactive) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (interactive) setIsHovered(false);
  };

  const handleFocus = () => {
    if (interactive) setIsFocused(true);
  };

  const handleBlur = () => {
    if (interactive) setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <Component 
      ref={ref}
      className={className}
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      role={interactive ? 'button' : role}
      tabIndex={interactive ? 0 : undefined}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      data-component-id={componentId}
      data-variant={variant}
      data-interactive={interactive}
      data-hovered={isHovered}
      data-focused={isFocused}
    >
      {children}
      
      {/* Enhanced glass overlay effect */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
          opacity: isHovered || isFocused ? 1 : 0.5,
          transition: shouldReduceMotion ? 'none' : 'opacity 0.3s ease',
        }}
        aria-hidden="true"
      />
    </Component>
  );
});

EnhancedGlassmorphicCard.displayName = 'EnhancedGlassmorphicCard';

// ==========================================
// ENHANCED INPUT WITH COMPREHENSIVE ACCESSIBILITY
// ==========================================

interface EnhancedInputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  className?: string;
  id?: string;
  name?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
  hideLabel?: boolean;
}

export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>((props, ref) => {
  const {
    type = 'text',
    placeholder,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    disabled = false,
    required = false,
    readOnly = false,
    autoComplete,
    autoFocus = false,
    className = '',
    id,
    name,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    'aria-required': ariaRequired,
    error = false,
    errorMessage,
    helperText,
    label,
    hideLabel = false,
  } = props;

  const { 
    getTouchTarget, 
    getTransition, 
    shouldReduceMotion, 
    tokens,
    getGlassmorphicStyle,
    announceToScreenReader
  } = useMedusaDesignSystem();
  const { prefersHighContrast } = useMedusaResponsive();
  const componentId = useMedusaComponent('EnhancedInput', { type, disabled, required, error });
  
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(value || defaultValue));
  const inputId = id || `medusa-input-${componentId}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  // Enhanced styling with accessibility considerations
  const inputStyle: React.CSSProperties = {
    ...getGlassmorphicStyle(),
    minHeight: getTouchTarget(),
    padding: '0 1rem',
    fontFamily: tokens.typography.fonts.body,
    fontSize: tokens.typography.scales.mobile.body,
    color: tokens.colors.brand.white,
    backgroundColor: isFocused 
      ? 'rgba(34, 34, 34, 0.95)' 
      : 'rgba(34, 34, 34, 0.8)',
    border: `2px solid ${
      error 
        ? tokens.colors.brand.white 
        : isFocused 
          ? tokens.colors.brand.gold 
          : tokens.colors.brand.chrome
    }`,
    borderRadius: '8px',
    transition: shouldReduceMotion 
      ? 'none' 
      : getTransition('standard', 'fast'),
    opacity: disabled ? 0.5 : 1,
    outline: 'none',
    // High contrast mode adjustments
    ...(prefersHighContrast && {
      borderWidth: '3px',
      outline: isFocused ? `2px solid ${tokens.colors.brand.gold}` : 'none',
      outlineOffset: '2px',
    }),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHasValue(Boolean(newValue));
    onChange?.(newValue, e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
    
    // Announce validation errors to screen readers
    if (error && errorMessage) {
      announceToScreenReader(`Error: ${errorMessage}`);
    }
  };

  const describedBy = [
    ariaDescribedBy,
    helperText && helperId,
    error && errorMessage && errorId,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`medusa-input-wrapper ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`block font-body text-sm text-brand-white mb-2 ${
            hideLabel ? 'sr-only' : ''
          }`}
          style={{
            fontWeight: tokens.typography.weights.medium,
          }}
        >
          {label}
          {required && (
            <span className="text-brand-gold ml-0" aria-label="required">*</span>
          )}
        </label>
      )}

      {/* Input */}
      <input
        ref={ref}
        type={type}
        id={inputId}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        style={inputStyle}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        aria-invalid={ariaInvalid || error}
        aria-required={ariaRequired || required}
        data-component-id={componentId}
        data-focused={isFocused}
        data-has-value={hasValue}
        data-error={error}
      />

      {/* Helper Text */}
      {helperText && !error && (
        <div
          id={helperId}
          className="mt-0 text-sm text-brand-chrome"
          style={{
            fontFamily: tokens.typography.fonts.body,
            fontSize: tokens.typography.scales.mobile.bodySmall,
          }}
        >
          {helperText}
        </div>
      )}

      {/* Error Message */}
      {error && errorMessage && (
        <div
          id={errorId}
          className="mt-0 text-sm text-brand-white flex items-center"
          style={{
            fontFamily: tokens.typography.fonts.body,
            fontSize: tokens.typography.scales.mobile.bodySmall,
          }}
          role="alert"
          aria-live="polite"
        >
          <span className="mr-0" aria-hidden="true">⚠</span>
          {errorMessage}
        </div>
      )}
    </div>
  );
});

EnhancedInput.displayName = 'EnhancedInput';

// Export all enhanced components
export {
  EnhancedContainer as ResponsiveContainer,
  EnhancedButton as Button,
  EnhancedMotionWrapper as MotionWrapper,
  EnhancedFocusTrap as FocusTrap,
  EnhancedGlassmorphicCard as GlassmorphicCard,
  EnhancedInput as Input,
};