import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind classes
 * @param inputs - Class names to be combined
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates variant-based class names
 * @param variant - The variant type
 * @param variantMap - Mapping of variants to their respective class names
 * @returns The corresponding class names for the variant
 */
export function getVariantClasses<T extends string>(
  variant: T,
  variantMap: Record<T, string>,
  defaultVariant: T,
) {
  return variantMap[variant] || variantMap[defaultVariant];
}

/**
 * Generates size-based class names
 * @param size - The size type
 * @param sizeMap - Mapping of sizes to their respective class names
 * @returns The corresponding class names for the size
 */
export function getSizeClasses<T extends string>(
  size: T,
  sizeMap: Record<T, string>,
  defaultSize: T,
) {
  return sizeMap[size] || sizeMap[defaultSize];
}

/**
 * Handles the "as" prop pattern for polymorphic components
 * @param Component - The component or HTML element to render
 * @param props - The component props
 * @returns The component with forwarded ref and props
 */
export function asChild<T, P extends React.HTMLAttributes<T>>(
  Component: React.ElementType,
  props: P & { asChild?: boolean; as?: React.ElementType },
) {
  const { asChild: _, as: As, ...rest } = props;
  const ComponentToUse = As || Component;

  return {
    Component: ComponentToUse,
    props: rest,
  };
}
