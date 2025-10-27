import { createContext, useContext, useEffect, useState, useRef, useMemo } from 'react';
import { useMedusaDesignSystem } from './MedusaDesignSystemProvider';

// ==========================================
// RESPONSIVE CORE v2.0
// Advanced Container Queries & Fluid Design System
// ==========================================

// RESPONSIVE TYPES
export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type DeviceCategory = 'mobile' | 'tablet' | 'desktop' | 'tv';
export type OrientationType = 'portrait' | 'landscape';
export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid';

export interface BreakpointDefinition {
  name: BreakpointName;
  minWidth: number;
  maxWidth?: number;
  device: DeviceCategory;
  cols: number;
  margin: number;
  gutter: number;
}

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
}

export interface ContainerQueryState {
  width: number;
  height: number;
  aspectRatio: number;
  orientation: OrientationType;
  size: ContainerSize;
  canUseContainerQueries: boolean;
}

export interface FluidScaling {
  min: number;
  max: number;
  minViewport: number;
  maxViewport: number;
  unit: 'px' | 'rem' | 'em' | 'vw' | 'vh';
}

// ENHANCED BREAKPOINT SYSTEM
const breakpointDefinitions: BreakpointDefinition[] = [
  { name: 'xs', minWidth: 0, maxWidth: 479, device: 'mobile', cols: 4, margin: 16, gutter: 12 },
  { name: 'sm', minWidth: 480, maxWidth: 767, device: 'mobile', cols: 4, margin: 20, gutter: 16 },
  { name: 'md', minWidth: 768, maxWidth: 1023, device: 'tablet', cols: 8, margin: 32, gutter: 20 },
  { name: 'lg', minWidth: 1024, maxWidth: 1279, device: 'desktop', cols: 12, margin: 48, gutter: 24 },
  { name: 'xl', minWidth: 1280, maxWidth: 1535, device: 'desktop', cols: 12, margin: 64, gutter: 32 },
  { name: 'xxl', minWidth: 1536, device: 'tv', cols: 12, margin: 80, gutter: 40 },
];

// RESPONSIVE CONTEXT
interface ResponsiveContextValue {
  // Current state
  currentBreakpoint: BreakpointDefinition;
  breakpointName: BreakpointName;
  device: DeviceCategory;
  orientation: OrientationType;
  viewportSize: { width: number; height: number };
  
  // Breakpoint utilities
  isBreakpoint: (name: BreakpointName) => boolean;
  isBreakpointOrAbove: (name: BreakpointName) => boolean;
  isBreakpointOrBelow: (name: BreakpointName) => boolean;
  isBetweenBreakpoints: (min: BreakpointName, max: BreakpointName) => boolean;
  
  // Responsive value resolution
  resolveResponsiveValue: <T>(value: ResponsiveValue<T> | T) => T;
  getResponsiveSpacing: (spacing: ResponsiveValue<number> | number) => string;
  getResponsiveTypography: (size: ResponsiveValue<string> | string) => string;
  
  // Fluid scaling
  createFluidValue: (config: FluidScaling) => string;
  createFluidSpacing: (minPx: number, maxPx: number, minVw?: number, maxVw?: number) => string;
  createFluidTypography: (minPx: number, maxPx: number, minVw?: number, maxVw?: number) => string;
  
  // Container queries
  supportsContainerQueries: boolean;
  createContainerQuery: (property: string, value: string) => string;
  
  // Grid system
  getGridColumns: () => number;
  getGridGutter: () => number;
  getGridMargin: () => number;
  calculateGridWidth: (columns: number, totalColumns?: number) => string;
}

const ResponsiveContext = createContext<ResponsiveContextValue | null>(null);

// CUSTOM HOOK
export function useResponsive() {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within ResponsiveProvider');
  }
  return context;
}

// CONTAINER QUERY HOOK
export function useContainerQuery(): [React.RefObject<HTMLElement>, ContainerQueryState] {
  const containerRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<ContainerQueryState>({
    width: 0,
    height: 0,
    aspectRatio: 1,
    orientation: 'landscape',
    size: 'sm',
    canUseContainerQueries: false,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for container query support
    const supportsContainerQueries = 'container' in document.documentElement.style;

    const updateContainerState = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const aspectRatio = width / height;
      const orientation: OrientationType = width > height ? 'landscape' : 'portrait';

      // Determine container size category
      let size: ContainerSize = 'xs';
      if (width >= 1536) size = 'xxl';
      else if (width >= 1280) size = 'xl';
      else if (width >= 1024) size = 'lg';
      else if (width >= 768) size = 'md';
      else if (width >= 480) size = 'sm';

      setState({
        width,
        height,
        aspectRatio,
        orientation,
        size,
        canUseContainerQueries: supportsContainerQueries,
      });
    };

    // Initial measurement
    updateContainerState();

    // Use ResizeObserver for container queries
    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(updateContainerState);
      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', updateContainerState);
      return () => window.removeEventListener('resize', updateContainerState);
    }
  }, []);

  return [containerRef, state];
}

// RESPONSIVE PROVIDER
interface ResponsiveProviderProps {
  children: React.ReactNode;
}

export function ResponsiveProvider({ children }: ResponsiveProviderProps) {
  const { device } = useMedusaDesignSystem();
  
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointDefinition>(breakpointDefinitions[0]);
  const [supportsContainerQueries, setSupportsContainerQueries] = useState(false);

  // Initialize and handle viewport changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check container query support
    setSupportsContainerQueries('container' in document.documentElement.style);

    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewportSize({ width, height });
      
      // Find current breakpoint
      const breakpoint = breakpointDefinitions
        .slice()
        .reverse()
        .find(bp => width >= bp.minWidth && (!bp.maxWidth || width <= bp.maxWidth)) 
        || breakpointDefinitions[0];
      
      setCurrentBreakpoint(breakpoint);
    };

    // Initial update
    updateViewport();

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewport, 100);
    };

    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  // BREAKPOINT UTILITIES
  const isBreakpoint = (name: BreakpointName): boolean => {
    return currentBreakpoint.name === name;
  };

  const isBreakpointOrAbove = (name: BreakpointName): boolean => {
    const targetIndex = breakpointDefinitions.findIndex(bp => bp.name === name);
    const currentIndex = breakpointDefinitions.findIndex(bp => bp.name === currentBreakpoint.name);
    return currentIndex >= targetIndex;
  };

  const isBreakpointOrBelow = (name: BreakpointName): boolean => {
    const targetIndex = breakpointDefinitions.findIndex(bp => bp.name === name);
    const currentIndex = breakpointDefinitions.findIndex(bp => bp.name === currentBreakpoint.name);
    return currentIndex <= targetIndex;
  };

  const isBetweenBreakpoints = (min: BreakpointName, max: BreakpointName): boolean => {
    return isBreakpointOrAbove(min) && isBreakpointOrBelow(max);
  };

  // RESPONSIVE VALUE RESOLUTION
  const resolveResponsiveValue = <T,>(value: ResponsiveValue<T> | T): T => {
    if (typeof value !== 'object' || value === null) {
      return value as T;
    }

    const responsiveValue = value as ResponsiveValue<T>;
    
    // Find the best matching value based on current breakpoint
    const breakpointOrder: BreakpointName[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint.name);
    
    // Look for exact match first
    if (responsiveValue[currentBreakpoint.name] !== undefined) {
      return responsiveValue[currentBreakpoint.name]!;
    }
    
    // Look for the closest smaller breakpoint
    for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
      const breakpoint = breakpointOrder[i];
      if (responsiveValue[breakpoint] !== undefined) {
        return responsiveValue[breakpoint]!;
      }
    }
    
    // Look for the closest larger breakpoint
    for (let i = currentIndex - 1; i >= 0; i--) {
      const breakpoint = breakpointOrder[i];
      if (responsiveValue[breakpoint] !== undefined) {
        return responsiveValue[breakpoint]!;
      }
    }
    
    // Fallback to any available value
    const availableValue = Object.values(responsiveValue).find(v => v !== undefined);
    return availableValue as T;
  };

  // RESPONSIVE SPACING
  const getResponsiveSpacing = (spacing: ResponsiveValue<number> | number): string => {
    const resolvedValue = resolveResponsiveValue(spacing);
    return typeof resolvedValue === 'number' ? `${resolvedValue}px` : String(resolvedValue);
  };

  // RESPONSIVE TYPOGRAPHY
  const getResponsiveTypography = (size: ResponsiveValue<string> | string): string => {
    return resolveResponsiveValue(size);
  };

  // FLUID VALUE CREATION
  const createFluidValue = (config: FluidScaling): string => {
    const { min, max, minViewport, maxViewport, unit } = config;
    
    // Calculate the slope and y-intercept for the linear function
    const slope = (max - min) / (maxViewport - minViewport);
    const yAxisIntersection = -minViewport * slope + min;
    
    return `clamp(${min}${unit}, ${yAxisIntersection}${unit} + ${slope * 100}vw, ${max}${unit})`;
  };

  const createFluidSpacing = (
    minPx: number, 
    maxPx: number, 
    minVw: number = 320, 
    maxVw: number = 1440
  ): string => {
    return createFluidValue({
      min: minPx,
      max: maxPx,
      minViewport: minVw,
      maxViewport: maxVw,
      unit: 'px',
    });
  };

  const createFluidTypography = (
    minPx: number, 
    maxPx: number, 
    minVw: number = 320, 
    maxVw: number = 1440
  ): string => {
    // Convert to rem for better accessibility
    const minRem = minPx / 16;
    const maxRem = maxPx / 16;
    
    return createFluidValue({
      min: minRem,
      max: maxRem,
      minViewport: minVw,
      maxViewport: maxVw,
      unit: 'rem',
    });
  };

  // CONTAINER QUERY CREATION
  const createContainerQuery = (property: string, value: string): string => {
    if (!supportsContainerQueries) {
      // Fallback for browsers without container query support
      return `@media (min-width: ${value})`;
    }
    return `@container (${property}: ${value})`;
  };

  // GRID UTILITIES
  const getGridColumns = (): number => currentBreakpoint.cols;
  const getGridGutter = (): number => currentBreakpoint.gutter;
  const getGridMargin = (): number => currentBreakpoint.margin;

  const calculateGridWidth = (columns: number, totalColumns?: number): string => {
    const total = totalColumns || currentBreakpoint.cols;
    const gutterWidth = currentBreakpoint.gutter;
    const columnWidth = (100 - (gutterWidth * (total - 1))) / total;
    const width = columnWidth * columns + gutterWidth * (columns - 1);
    return `${width}%`;
  };

  // Context value
  const contextValue: ResponsiveContextValue = {
    currentBreakpoint,
    breakpointName: currentBreakpoint.name,
    device: currentBreakpoint.device,
    orientation: viewportSize.width > viewportSize.height ? 'landscape' : 'portrait',
    viewportSize,
    isBreakpoint,
    isBreakpointOrAbove,
    isBreakpointOrBelow,
    isBetweenBreakpoints,
    resolveResponsiveValue,
    getResponsiveSpacing,
    getResponsiveTypography,
    createFluidValue,
    createFluidSpacing,
    createFluidTypography,
    supportsContainerQueries,
    createContainerQuery,
    getGridColumns,
    getGridGutter,
    getGridMargin,
    calculateGridWidth,
  };

  return (
    <ResponsiveContext.Provider value={contextValue}>
      {children}
    </ResponsiveContext.Provider>
  );
}

// RESPONSIVE COMPONENTS
interface ResponsiveProps {
  children: React.ReactNode;
  show?: ResponsiveValue<boolean>;
  hide?: ResponsiveValue<boolean>;
}

export function Responsive({ children, show, hide }: ResponsiveProps) {
  const { resolveResponsiveValue } = useResponsive();
  
  const shouldShow = show ? resolveResponsiveValue(show) : true;
  const shouldHide = hide ? resolveResponsiveValue(hide) : false;
  
  if (!shouldShow || shouldHide) {
    return null;
  }
  
  return <>{children}</>;
}

// FLUID CONTAINER COMPONENT
interface FluidContainerProps {
  children: React.ReactNode;
  className?: string;
  minWidth?: number;
  maxWidth?: number;
  padding?: ResponsiveValue<number>;
  margin?: ResponsiveValue<number>;
}

export function FluidContainer({
  children,
  className = '',
  minWidth = 320,
  maxWidth = 1440,
  padding,
  margin,
}: FluidContainerProps) {
  const { createFluidSpacing, resolveResponsiveValue } = useResponsive();
  
  const containerStyle: React.CSSProperties = {
    width: '100%',
    minWidth: `${minWidth}px`,
    maxWidth: `${maxWidth}px`,
    marginLeft: 'auto',
    marginRight: 'auto',
    ...(padding && {
      paddingLeft: getResponsiveSpacing(padding),
      paddingRight: getResponsiveSpacing(padding),
    }),
    ...(margin && {
      marginTop: getResponsiveSpacing(margin),
      marginBottom: getResponsiveSpacing(margin),
    }),
  };

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  );
}

// RESPONSIVE GRID COMPONENT
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: ResponsiveValue<number>;
  gap?: ResponsiveValue<number>;
  minItemWidth?: number;
  autoFit?: boolean;
}

export function ResponsiveGrid({
  children,
  className = '',
  columns,
  gap,
  minItemWidth,
  autoFit = false,
}: ResponsiveGridProps) {
  const { resolveResponsiveValue, getResponsiveSpacing } = useResponsive();
  
  const getGridTemplateColumns = () => {
    if (autoFit && minItemWidth) {
      return `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))`;
    }
    
    if (columns) {
      const resolvedColumns = resolveResponsiveValue(columns);
      return `repeat(${resolvedColumns}, 1fr)`;
    }
    
    return 'repeat(auto-fit, minmax(250px, 1fr))';
  };
  
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: getGridTemplateColumns(),
    gap: gap ? getResponsiveSpacing(gap) : '1rem',
  };

  return (
    <div className={className} style={gridStyle}>
      {children}
    </div>
  );
}

// ASPECT RATIO CONTAINER
interface AspectRatioContainerProps {
  children: React.ReactNode;
  ratio?: number | string;
  className?: string;
}

export function AspectRatioContainer({
  children,
  ratio = '16/9',
  className = '',
}: AspectRatioContainerProps) {
  const aspectRatioValue = typeof ratio === 'number' ? ratio : ratio;
  
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: aspectRatioValue,
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={{ position: 'absolute', inset: 0 }}>
        {children}
      </div>
    </div>
  );
}

// UTILITY FUNCTIONS
export function useResponsiveSpacing(spacing: ResponsiveValue<number> | number): string {
  const { getResponsiveSpacing } = useResponsive();
  return useMemo(() => getResponsiveSpacing(spacing), [getResponsiveSpacing, spacing]);
}

export function createResponsiveValue<T>(
  mobile: T,
  tablet?: T,
  desktop?: T
): ResponsiveValue<T> {
  return {
    xs: mobile,
    sm: mobile,
    md: tablet || mobile,
    lg: desktop || tablet || mobile,
    xl: desktop || tablet || mobile,
    xxl: desktop || tablet || mobile,
  };
}

// RESPONSIVE UTILITIES
export const responsiveUtils = {
  // Create fluid typography scale
  createFluidScale: (minSize: number, maxSize: number, minVw = 320, maxVw = 1440) => {
    const minRem = minSize / 16;
    const maxRem = maxSize / 16;
    const slope = (maxRem - minRem) / (maxVw - minVw);
    const yAxisIntersection = -minVw * slope + minRem;
    return `clamp(${minRem}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxRem}rem)`;
  },

  // Create responsive spacing
  createSpacingScale: (minPx: number, maxPx: number, minVw = 320, maxVw = 1440) => {
    const slope = (maxPx - minPx) / (maxVw - minVw);
    const yAxisIntersection = -minVw * slope + minPx;
    return `clamp(${minPx}px, ${yAxisIntersection}px + ${slope * 100}vw, ${maxPx}px)`;
  },

  // Media query helpers
  mediaQuery: {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    desktop: '(min-width: 1024px)',
    hover: '(hover: hover)',
    touch: '(pointer: coarse)',
    reducedMotion: '(prefers-reduced-motion: reduce)',
    highContrast: '(prefers-contrast: high)',
  },
};

export { breakpointDefinitions };