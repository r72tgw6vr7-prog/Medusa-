import React, { HTMLAttributes, memo } from "react";
import Container, { ContainerSize } from "./Container";

export type SectionBg = "none" | "dark" | "darker" | "darkest";

type SectionElement = "section" | "article" | "div" | "main" | "aside";

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, 'as'> {
  /**
   * Section content
   */
  children: React.ReactNode;
  
  /**
   * Background variant:
   * - dark:    bg-[#1A1A1A]
   * - darker:  bg-[#0F0F0F]
   * - darkest: bg-black
   * - none:    transparent
   */
  bg?: SectionBg;
  
  /**
   * Controls inner Container size
   */
  containerSize?: ContainerSize;
  
  /**
   * Element to render (section/article/div...)
   */
  as?: SectionElement;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Section
 *
 * - Wraps a Container automatically
 * - Handles background variants (Tailwind utility classes used)
 * - Handles vertical padding:
 *   - mobile: py-16 (128px)
 *   - tablet: md:py-20 (160px)
 *   - desktop: lg:py-24 (192px)
 * - Accepts containerSize to control the inner Container
 * - Supports className overrides and additional HTML attributes
 */
const Section: React.FC<SectionProps> = ({
  children,
  bg = "none",
  containerSize = "default",
  as: Component = "section",
  className = "",
  ...props
}) => {
  const bgClassMap: Record<SectionBg, string> = {
    none: "bg-transparent",
    dark: "bg-[#1A1A1A]",
    darker: "bg-[#0F0F0F]",
    darkest: "bg-black",
  };

  const classes = [
    "w-full",
    bgClassMap[bg],
    "py-16",        // 128px on mobile
    "md:py-20",     // 160px on tablet
    "lg:py-24",     // 192px on desktop
    "relative z-10", // Ensure section content is above texture background
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Add data-texture-bg attribute when section has a background color
  const needsTextureStretch = bg !== 'none';
  
  return (
    <Component 
      className={classes} 
      {...props}
      {...(needsTextureStretch ? { 'data-texture-bg': true } : {})}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </Component>
  );
};

export default memo(Section);

/**
 * Example usages:
 *
 * // dark background, default (1280px) container
 * <Section bg="dark">
 *   <h2>Section title</h2>
 * </Section>
 *
 * // darker background, narrow container (960px)
 * <Section bg="darker" containerSize="narrow">
 *   <p>Content constrained to 960px</p>
 * </Section>
 *
 * // darkest background, wide container (1600px)
 * <Section bg="darkest" containerSize="wide">
 *   <div>Wide content</div>
 * </Section>
 *
 * // transparent background, full container (edge-to-edge)
 * <Section bg="none" containerSize="full">
 *   <div>Full width content with inner padding</div>
 * </Section>
 */