import React from 'react';

export type ContainerSize = 'default' | 'narrow' | 'wide' | 'full';

export interface ContainerProps extends Readonly<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * Inner content
   */
  readonly children: React.ReactNode;

  /**
   * Size variant for container max-width
   * - default: 1280px
   * - narrow: 960px
   * - wide: 1600px
   * - full: no max-width (fluid)
   */
  readonly size?: ContainerSize;
}

/**
 * Container
 *
 * - Centers content with mx-auto
 * - Responsive padding (Tailwind utilities only):
 *   - default (mobile): px-4 (16px)
 *   - sm (tablet):     sm:px-6 (24px)
 *   - lg (desktop):    lg:px-8 (32px)
 * - Size variants control max-width via Tailwind arbitrary values
 *
 * Note: preserves any additional className passed in.
 */
const Container: React.FC<ContainerProps> = ({
  children,
  size = 'default',
  className = '',
  ...props
}) => {
  const sizeClassMap: Record<ContainerSize, string> = {
    default: 'max-w-[1440px]',
    narrow: 'max-w-[960px]',
    wide: 'max-w-[1600px]',
    full: 'max-w-full',
  };

  const classes = [
    'w-full',
    sizeClassMap[size],
    'mx-auto',
    'px-4', // mobile: 16px
    'sm:px-6', // tablet: 24px
    'lg:px-8', // desktop: 32px
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default React.memo(Container);

/**
 * Example usage:
 *
 * <Container>Default (1440px)</Container>
 * <Container size="narrow">Narrow (960px)</Container>
 * <Container size="wide">Wide (1600px)</Container>
 * <Container size="full">Full width (no max)</Container>
 */
