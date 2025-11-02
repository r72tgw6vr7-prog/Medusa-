import React from "react";
import Container, { ContainerSize } from "./Container";

export type SectionBg = "none" | "dark" | "darker" | "darkest";

export interface SectionProps {
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
  as?: "section" | "article" | "div" | "main" | "aside";
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional HTML attributes
   */
  [key: string]: any;
}

/**
 * Section
 *
 * - Wraps a Container automatically
 * - Handles background variants (Tailwind utility classes used)
 * - Handles vertical padding:
 *   - mobile: py-16
 *   - desktop: lg:py-24
 * - Accepts containerSize to control the inner Container
 * - Supports className overrides and additional HTML attributes
 */
export default function Section({
  children,
  bg = "none",
  containerSize = "default",
  as: Component = "section",
  className = "",
  ...props
}: SectionProps) {
  const bgClassMap: Record<SectionBg, string> = {
    none: "bg-transparent",
    dark: "bg-[#1A1A1A]",
    darker: "bg-[#0F0F0F]",
    darkest: "bg-black",
  };

  const classes = [
    "w-full",
    bgClassMap[bg],
    "py-16",
    "lg:py-24",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component className={classes} {...props}>
      <Container size={containerSize}>{children}</Container>
    </Component>
  );
}

/**
 * Example usages:
 *
 * // dark background, default (1440px) container
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