# ArtistCard Component

The definitive ArtistCard component for the Medusa-Web project. This component displays artist information with a modern, accessible design that follows the project's design system.

## Features

- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Full keyboard navigation and screen reader support
- **Interactive States**: Hover, focus, and selection states
- **Flexible Actions**: Support for booking and gallery buttons
- **Design System Integration**: Uses project's CSS variables and design tokens
- **Image Positioning**: Customizable image positioning for optimal face placement

## Props

```typescript
interface ArtistRole {
  name: string;
  icon: string;
}

interface ArtistProps {
  name: string;                    // Artist's display name
  role: ArtistRole;               // Role with name and icon
  specialties: string[];          // Array of specialties
  experience: string;             // Experience description
  instagramHandle: string;        // Instagram handle
  imageUrl: string;              // Artist's photo URL
  className?: string;            // Additional CSS classes
  onClick?: () => void;          // Card click handler
  onBookClick?: () => void;      // Booking button handler
  onGalleryClick?: () => void;   // Gallery button handler
  imagePosition?: string;        // CSS object-position value
  isSelected?: boolean;          // Selection state
}
```

## Usage Examples

### Basic Artist Card
```tsx
<ArtistCard
  name="Maria Schmidt"
  role={{ name: "Tattoo Artist", icon: "pen-icon.svg" }}
  specialties={["Black & Gray", "Realism"]}
  experience="5+ Jahre"
  instagramHandle="@maria_tattoo"
  imageUrl="/path/to/maria-image.jpg"
  onBookClick={() => handleBooking()}
  onGalleryClick={() => handleGallery()}
/>
```

### Selected State
```tsx
<ArtistCard
  name="Alex Mueller"
  role={{ name: "Piercing Specialist", icon: "piercing-icon.svg" }}
  specialties={["Ear Piercing", "Body Piercing"]}
  experience="8+ Jahre"
  instagramHandle="@alex_piercing"
  imageUrl="/path/to/alex-image.jpg"
  isSelected={true}
  onBookClick={() => handleBooking()}
/>
```

### Interactive Card (Clickable)
```tsx
<ArtistCard
  name="Sarah Weber"
  role={{ name: "Nail Artist", icon: "nail-icon.svg" }}
  specialties={["Gel Nails", "Nail Art"]}
  experience="3+ Jahre"
  instagramHandle="@sarah_nails"
  imageUrl="/path/to/sarah-image.jpg"
  onClick={() => handleCardClick()}
  imagePosition="center 30%"
/>
```

## Styling

The component uses CSS custom properties from the design system:

- `--color-brand-gold`: Primary brand color
- `--color-brand-gold-hover`: Hover state color
- `--shadow-gold-md`: Gold glow shadow
- `--space-*`: Spacing tokens (8px grid)
- `--font-family-primary`: Primary font family

## Accessibility

- **Keyboard Navigation**: Tab navigation with Enter/Space activation
- **Screen Readers**: Comprehensive aria-label with artist info
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Meets WCAG guidelines

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Safari 9+ (with webkit prefixes for backdrop-filter)
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

```
Card/
├── ArtistCard.tsx           # Main component
├── ArtistCard.css           # Component styles
├── ArtistCard.module.css    # CSS modules version
├── ArtistCard.example.tsx   # Usage examples
└── ArtistCard.README.md     # This documentation
```

## Design System Integration

The component follows the Medusa Design System:
- 8px spacing grid
- Brand color palette
- Typography scale
- Shadow tokens
- Border radius tokens

## Security

✅ **Snyk Scan Passed**: No security vulnerabilities detected in component code.

## Performance

- Optimized CSS with hardware acceleration
- Minimal re-renders with React.memo potential
- Efficient hover/focus transitions
- Lazy loading compatible (external implementation)
