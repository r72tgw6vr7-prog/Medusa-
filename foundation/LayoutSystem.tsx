import { forwardRef, ElementType } from 'react';
import { useDesignSystem, useResponsive } from './DesignSystem';

// ==========================================
// RESPONSIVE LAYOUT SYSTEM
// ==========================================

// Grid System Types
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridSpan = 'auto' | GridColumns | 'full';
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

// Responsive Grid Props
interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    mobile?: GridColumns;
    tablet?: GridColumns;
    desktop?: GridColumns;
  };
  gap?: {
    mobile?: GridGap;
    tablet?: GridGap;
    desktop?: GridGap;
  } | GridGap;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  as?: keyof JSX.IntrinsicElements;
}

// 12-Column Responsive Grid
export const Grid = forwardRef(({
  children,
  className = '',
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  alignItems = 'stretch',
  justifyContent = 'start',
  as: Component = 'div',
}, ref: React.Ref<HTMLElement>) => {
  const { breakpoint } = useDesignSystem();
  
  // Resolve gap values
  const gapConfig = typeof gap === 'string' 
    ? { mobile: gap, tablet: gap, desktop: gap }
    : { mobile: 'md', tablet: 'md', desktop: 'md', ...gap };
  
  // Generate responsive classes
  const columnClasses = [
    `grid`,
    `grid-cols-${columns.mobile || 1}`,
    breakpoint.isTablet && `md:grid-cols-${columns.tablet || columns.mobile || 2}`,
    breakpoint.isDesktop && `lg:grid-cols-${columns.desktop || columns.tablet || columns.mobile || 3}`,
  ].filter(Boolean).join(' ');
  
  const gapClasses = [
    gapConfig.mobile && `gap-${gapConfig.mobile}`,
    gapConfig.tablet && `md:gap-${gapConfig.tablet}`,
    gapConfig.desktop && `lg:gap-${gapConfig.desktop}`,
  ].filter(Boolean).join(' ');
  
  const alignmentClasses = [
    alignItems !== 'stretch' && `items-${alignItems}`,
    justifyContent !== 'start' && `justify-${justifyContent}`,
  ].filter(Boolean).join(' ');
  
  const finalClasses = [
    columnClasses,
    gapClasses,
    alignmentClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={finalClasses}>
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
  // Resolve span values
  const spanConfig = typeof span === 'string' || typeof span === 'number'
    ? { mobile: span, tablet: span, desktop: span }
    : { mobile: 'auto', tablet: 'auto', desktop: 'auto', ...span };
  
  // Generate span classes
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
  
  // Generate start position classes if provided
  const startClasses = start ? [
    start.mobile && `col-start-${start.mobile}`,
    start.tablet && `md:col-start-${start.tablet}`,
    start.desktop && `lg:col-start-${start.desktop}`,
  ].filter(Boolean).join(' ') : '';
  
  const finalClasses = [
    spanClasses,
    startClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={finalClasses}>
      {children}
    </Component>
  );
});

GridItem.displayName = 'GridItem';

// Flex Container Component
interface FlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: {
    mobile?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
    tablet?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
    desktop?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  } | 'row' | 'col' | 'row-reverse' | 'col-reverse';
  gap?: GridGap;
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
  // Resolve direction values
  const directionConfig = typeof direction === 'string'
    ? { mobile: direction, tablet: direction, desktop: direction }
    : { mobile: 'row', tablet: 'row', desktop: 'row', ...direction };
  
  const directionClasses = [
    `flex`,
    directionConfig.mobile && `flex-${directionConfig.mobile}`,
    directionConfig.tablet && `md:flex-${directionConfig.tablet}`,
    directionConfig.desktop && `lg:flex-${directionConfig.desktop}`,
  ].filter(Boolean).join(' ');
  
  const utilityClasses = [
    gap && `gap-${gap}`,
    alignItems !== 'stretch' && `items-${alignItems}`,
    justifyContent !== 'start' && `justify-${justifyContent}`,
    wrap && 'flex-wrap',
  ].filter(Boolean).join(' ');
  
  const finalClasses = [
    directionClasses,
    utilityClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={finalClasses}>
      {children}
    </Component>
  );
});

Flex.displayName = 'Flex';

// Section Container with responsive spacing
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: {
    mobile?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    tablet?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    desktop?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  } | 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'mobile' | 'tablet' | 'desktop' | 'wide' | 'full';
  background?: 'transparent' | 'primary' | 'glassmorphic';
  as?: keyof JSX.IntrinsicElements;
  id?: string;
}

export const Section = forwardRef(({
  children,
  className = '',
  spacing = 'md',
  maxWidth = 'desktop',
  background = 'transparent',
  as: Component = 'section',
  id,
}, ref: React.Ref<any>) => {
  const { getSpacing } = useDesignSystem();
  
  // Resolve spacing values
  const spacingConfig = typeof spacing === 'string'
    ? { mobile: spacing, tablet: spacing, desktop: spacing }
    : { mobile: 'md', tablet: 'md', desktop: 'md', ...spacing };
  
  const spacingClasses = [
    spacingConfig.mobile && `py-${spacingConfig.mobile}`,
    spacingConfig.tablet && `md:py-${spacingConfig.tablet}`,
    spacingConfig.desktop && `lg:py-${spacingConfig.desktop}`,
  ].filter(Boolean).join(' ');
  
  const maxWidthClasses = {
    mobile: 'max-w-sm',
    tablet: 'max-w-4xl',
    desktop: 'style={{ maxWidth: "1433px" }}', 
    wide: 'max-w-screen-2xl',
    full: 'max-w-none',
  };
  
  const backgroundClasses = {
    transparent: '',
    primary: 'bg-brand-background',
    glassmorphic: 'glassmorphic-bg',
  };
  
  const containerClasses = [
    'w-full mx-auto px-4 sm:px-6 lg:px-8',
    maxWidthClasses[maxWidth],
  ].join(' ');
  
  const finalClasses = [
    spacingClasses,
    backgroundClasses[background],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component ref={ref} id={id} className={finalClasses}>
      <div className={containerClasses}>
        {children}
      </div>
    </Component>
  );
});

Section.displayName = 'Section';

// Stack Component for vertical/horizontal stacking
interface StackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: GridGap;
  align?: AlignItems;
  direction?: 'vertical' | 'horizontal';
  as?: keyof JSX.IntrinsicElements;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(({
  children,
  className = '',
  spacing = 'md',
  align = 'stretch',
  direction = 'vertical',
  as: Component = 'div',
}, ref) => {
  const isVertical = direction === 'vertical';
  
  const stackClasses = [
    'flex',
    isVertical ? 'flex-col' : 'flex-row',
    `gap-${spacing}`,
    align !== 'stretch' && `items-${align}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={stackClasses}>
      {children}
    </Component>
  );
});

Stack.displayName = 'Stack';

// Aspect Ratio Container
interface AspectRatioProps {
  children: React.ReactNode;
  className?: string;
  ratio?: '1:1' | '4:3' | '16:9' | '3:2' | '21:9' | number;
  as?: keyof JSX.IntrinsicElements;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(({
  children,
  className = '',
  ratio = '16:9',
  as: Component = 'div',
}, ref) => {
  const aspectRatioClasses = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
    '3:2': 'aspect-[3/2]',
    '21:9': 'aspect-[21/9]',
  };
  
  const ratioClass = typeof ratio === 'number' 
    ? `aspect-[${ratio}]`
    : aspectRatioClasses[ratio] || 'aspect-video';
  
  const finalClasses = [
    'relative overflow-hidden',
    ratioClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={finalClasses}>
      {children}
    </Component>
  );
});

AspectRatio.displayName = 'AspectRatio';

// Center Component for centering content
interface CenterProps {
  children: React.ReactNode;
  className?: string;
  axis?: 'both' | 'horizontal' | 'vertical';
  as?: keyof JSX.IntrinsicElements;
}

export const Center = forwardRef<HTMLDivElement, CenterProps>(({
  children,
  className = '',
  axis = 'both',
  as: Component = 'div',
}, ref) => {
  const centerClasses = {
    both: 'flex items-center justify-center',
    horizontal: 'flex justify-center',
    vertical: 'flex items-center',
  };
  
  const finalClasses = [
    centerClasses[axis],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component ref={ref} className={finalClasses}>
      {children}
    </Component>
  );
});

Center.displayName = 'Center';

// Responsive Show/Hide Components
interface ShowProps {
  children: React.ReactNode;
  on?: ('mobile' | 'tablet' | 'desktop')[];
  above?: 'mobile' | 'tablet';
  below?: 'tablet' | 'desktop';
}

export function Show({ children, on, above, below }: ShowProps) {
  const { breakpoint } = useDesignSystem();
  
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

// Layout Utilities Hook
export function useLayout() {
  const responsive = useResponsive();
  const { tokens } = useDesignSystem();
  
  return {
    ...responsive,
    // Grid utilities
    getGridClass: (columns: GridColumns) => `grid-cols-${columns}`,
    getSpanClass: (span: GridSpan) => 
      span === 'full' ? 'col-span-full' :
      span === 'auto' ? 'col-auto' :
      `col-span-${span}`,
    
    // Spacing utilities  
    getGapClass: (gap: GridGap) => `gap-${gap}`,
    getPaddingClass: (size: keyof typeof tokens.spacing.mobile) => {
      const spacing = tokens.spacing[responsive.device];
      return {
        paddingTop: spacing[size],
        paddingBottom: spacing[size],
        paddingLeft: spacing[size],
        paddingRight: spacing[size],
      };
    },
    
    // Responsive utilities
    getResponsiveClass: (
      mobile: string,
      tablet?: string,
      desktop?: string
    ) => [
      mobile,
      tablet && `md:${tablet}`,
      desktop && `lg:${desktop}`,
    ].filter(Boolean).join(' '),
    
    // Container utilities
    getContainerMaxWidth: () => {
      if (responsive.isDesktop) return '1440px';
      if (responsive.isTablet) return '1024px';
      return '100%';
    },
    
    getContainerPadding: () => {
      if (responsive.isDesktop) return '64px';
      if (responsive.isTablet) return '32px';  
      return '20px';
    },
  };
}

// Layout Debug Component (development only)
export function LayoutDebug() {
  const { breakpoint } = useDesignSystem();
  
  if (process.env.NODE_ENV === 'production') return null;
  
  return (
    <div className="fixed bottom-4 left-4 bg-brand-background/95 backdrop-blur-lg border border-brand-chrome/20 rounded-lg p-8 text-xs font-mono z-[9999]">
      <div className="text-brand-chrome font-bold mb-0">Layout Debug</div>
      <div className="space-y-0 text-brand-chrome">
        <div>Device: {breakpoint.device}</div>
        <div>Width: {breakpoint.width}px</div>
        <div>Height: {breakpoint.height}px</div>
        <div className="grid grid-cols-12 gap-0 mt-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-2 bg-brand-gold/20 rounded-sm flex flex-col h-full" />
          ))}
        </div>
        <div className="text-xs text-brand-chrome/70">12-column grid</div>
      </div>
    </div>
  );
}