// Badge primitive: small status or label indicator.
export * from './Badge/Badge';
// Button primitive: primary CTA and secondary actions.
export { default as Button } from './Button/Button';
// Icon primitive: SVG-based icons.
export * from './Icon/Icon';
// InputField primitive (text input).
export * from './Input/InputField';
// Alias: Input (canonical import for text input).
export { InputField as Input } from './Input/InputField';
// FormInput helpers and types.
export * from './Input/FormInput';
// TextArea primitive (multiline input).
export * from './TextArea';
// Alias: Textarea (canonical import for multiline input).
export { TextArea as Textarea } from './TextArea';
// Container layout primitive (max-width and horizontal padding).
export * from './Container';
// AccessibleButton: button with a11y affordances.
export * from './AccessibleButton';
// ErrorBoundary removed (not exported).
// Grid layout utilities.
export * from './Grid';
// ImageWithFallback disabled (using native <img> with fallbacks).
// MicroInteractions: small animations and transitions helpers.
export * from './MicroInteractions';
// PlaceholderImage: safe placeholder visuals.
export * from './PlaceholderImage';
// Section layout primitive (vertical rhythm + background variants).
export * from './Section';
// TrustBadge: small trust indicator icon+label.
export * from './TrustBadge';
// PageBackground: themed background surfaces.
export * from './PageBackground';
export * from './PageTitle';
// GalleryImage: responsive image for galleries.
export * from './GalleryImage';
// ImageWithLoader: image with loading state.
export * from './ImageWithLoader';
// ResponsiveImage: size-adaptive image component.
export * from './ResponsiveImage';
// SafeImage: robust image loader with error handling.
export * from './SafeImage';
// UniversalTextureBackground: reusable textured backgrounds.
export * from './UniversalTextureBackground';

// Atoms wrappers for legacy UI replacements (canonical import path)
// PageHeader: standard page header with eyebrow/title/subtitle.
export * from './PageHeader';
// Select: styled HTML select input.
export * from './Select';
// Carousel: minimal carousel surface (content, items, controls).
export * from './Carousel';
// MedusaInput: labeled input with optional leading icon.
export { default as MedusaInput } from './MedusaInput';
