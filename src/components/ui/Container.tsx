import React from 'react';

export type ContainerSize = 'full' | 'wide' | 'default' | 'narrow' | 'form';

export interface ContainerProps extends Readonly<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * Inner content
   */
  readonly children: React.ReactNode;

  /**
   * Size variant for container max-width
   * - full: 100vw (no max-width, fluid)
   * - wide: 1600px (galleries, card grids, footer)
   * - default: 1440px (mixed content, general)
   * - narrow: 1024px (text-heavy, articles)
   * - form: 800px (forms, focused actions)
   */
  readonly size?: ContainerSize;
}

/**
 * Container
 *
 * - Centers content with mx-auto
 * - Responsive padding (Tailwind utilities only):
 *   - default (mobile): px-4 (16px)
 *   - md (tablet):     md:px-6 (24px)
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
    full: 'max-w-full',
    wide: 'max-w-[1600px]',
    default: 'max-w-[1440px]',
    narrow: 'max-w-[1024px]',
    form: 'max-w-[800px]',
  };

  const classes = [
    'w-full',
    sizeClassMap[size],
    'mx-auto',
    'px-6', // mobile: 24px
    'md:px-8', // tablet: 32px
    'lg:px-12', // desktop: 48px
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
 * <Container size="full">Full width (100vw)</Container>
 * <Container size="wide">Wide (1600px) - galleries, cards</Container>
 * <Container>Default (1440px) - general content</Container>
 * <Container size="narrow">Narrow (1024px) - text-heavy</Container>
 * <Container size="form">Form (800px) - forms</Container>
 */
