# ServicesPageInteractive Component

## Overview

The `ServicesPageInteractive` component is a sophisticated, fully interactive service showcase designed for the Medusa Tattoo München website. It features a 4-category selection interface that dynamically displays detailed service cards with smooth animations and professional booking integration.

## Key Features

### 🎯 Interactive Design
- **4 Category Cards**: Top row with clickable category selection (Tattoo, Piercing, Products, Plasma)
- **3 Detail Cards**: Bottom row showing relevant services for the selected category
- **Smooth Animations**: Framer Motion powered transitions between categories
- **Responsive Layout**: Mobile-first design that adapts to all screen sizes

### 🎨 Visual Design
- **Brand Compliant**: Uses established Medusa design tokens and color system
- **Gold Accent System**: Consistent gold highlights and hover states
- **Professional Cards**: High-quality service images with overlay information
- **Interactive States**: Hover, focus, and active states for accessibility

### 🔧 Technical Features
- **Foundation Integration**: Built using Medusa foundation components
- **State Management**: Connected to global AppContext for booking flow
- **Performance Optimized**: Memoized service lookups and animation controls
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels

## Component Structure

```
ServicesPageInteractive/
├── Category Selection (Top Row)
│   ├── 4 Cards in responsive grid
│   ├── Icon + Title + Description
│   └── Active/Hover states
├── Service Details (Bottom Row)
│   ├── 3 Cards per category
│   ├── Image + Content + Features
│   └── Booking CTA buttons
└── Animation System
    ├── Category transitions
    ├── Card staggered entrance
    └── Smooth state changes
```

## Usage

### Basic Implementation

```tsx
import { ServicesPageInteractive } from './components/pages/ServicesPageInteractive';

function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <ServicesPageInteractive />
    </div>
  );
}
```

### With App Context (Required for Booking)

```tsx
import { AppProvider } from './core/state/AppContext';
import { ServicesPageInteractive } from './components/pages/ServicesPageInteractive';

function App() {
  return (
    <AppProvider initialLanguage="DE">
      <ServicesPageInteractive />
    </AppProvider>
  );
}
```

### Custom Styling

```tsx
<ServicesPageInteractive className="py-32 my-custom-class" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes to apply to the component |

## Data Structure

### Categories
Each category contains:
- `id`: Unique identifier
- `title`: Display name
- `icon`: Lucide React icon component
- `description`: Brief description
- `imageSrc`: WebP image path
- `imageFallback`: JPEG fallback image

### Services
Each service contains:
- `id`: Unique identifier
- `title`: Service name
- `description`: Detailed description
- `priceFrom`: Starting price (number)
- `priceUnit`: Price unit/suffix
- `duration`: Time estimate (optional)
- `features`: Array of feature strings
- `imageSrc`: WebP service image
- `imageFallback`: JPEG fallback
- `cta`: Call-to-action button text

## Responsive Behavior

### Breakpoints
- **Mobile** (< 768px): Single column layout for both categories and services
- **Tablet** (768px - 1023px): 2×2 grid for categories, 2-column for services
- **Desktop** (≥ 1024px): 4-column categories, 3-column services

### Container Sizes
- Uses `ResponsiveContainer` with `maxWidth="desktop"`
- Automatic padding based on screen size
- Maximum content width: 1104px

## Animation Details

### Category Transitions
```typescript
// Exit animation
exit={{ opacity: 0, y: -20 }}

// Enter animation  
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Timing
transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
```

### Service Card Stagger
```typescript
// Each card animates with 100ms delay
transition={{ delay: index * 0.1, duration: 0.4 }}
```

### Interactive States
- **Hover**: `scale-[1.02]` + border color change
- **Active**: Enhanced gold glow shadow
- **Focus**: WCAG compliant focus rings

## Styling System

### Colors
- **Background**: `#1A1A1A` (page), `#0F0F0F` (cards)
- **Text**: `#FFFFFF` (primary), `#C0C0C0` (secondary), `#888888` (tertiary)
- **Borders**: `rgba(212,175,55,0.35)` default, `rgba(212,175,55,0.85)` selected
- **Gold**: `#D4AF37` primary, `#C19B26` hover

### Typography
- **Page Title**: Playfair Display, 48/40/32px responsive
- **Category Cards**: Playfair Display, 24/20px
- **Service Titles**: Playfair Display, 28/24/20px
- **Body Text**: Inter, 16/18px, leading-7
- **Price**: Inter, 22/20px, bold

## Integration Points

### Booking System
- Uses `useApp()` hook from AppContext
- Calls `openBooking({ service: serviceId })` on CTA button click
- Integrates with existing booking flow modal

### Image Assets
Service images should be placed in:
```
/public/images/services/
├── category-tattoo.webp
├── category-piercing.webp
├── category-products.webp
├── category-plasma.webp
├── detail-custom-tattoo.webp
├── detail-coverup.webp
├── detail-consultation.webp
└── ... (all service detail images)
```

## Accessibility Features

### WCAG 2.1 AA Compliance
- **Focus Management**: Visible focus rings on all interactive elements
- **ARIA Labels**: Proper labeling for screen readers
- **Live Regions**: `aria-live="polite"` for dynamic content updates
- **Touch Targets**: Minimum 44px touch targets
- **Contrast**: All text meets WCAG AA contrast requirements

### Keyboard Navigation
- Tab navigation through all interactive elements
- Enter/Space activation for category buttons
- Focus trapping within modal when booking opens

## Performance Optimizations

### Memoization
```typescript
const currentServices = useMemo(() => serviceDetails[activeCategory], [activeCategory]);
```

### Animation Control
```typescript
const [isAnimating, setIsAnimating] = useState(false);
// Prevents rapid category switching during transitions
```

### Image Optimization
- WebP format with JPEG fallbacks
- Lazy loading with `loading="lazy"`
- Async decoding with `decoding="async"`
- Error handling with placeholder fallbacks

## Browser Support

- **Modern Browsers**: Full feature support
- **Safari**: WebP fallback to JPEG
- **Older Browsers**: Graceful degradation of animations
- **Mobile**: Touch-optimized interactions

## Development Notes

### Foundation Dependencies
- `ResponsiveContainer`: Layout wrapper
- `Grid`/`GridItem`: Responsive grid system
- `Typography`: Text rendering with design tokens
- `Button`: Branded button component

### External Dependencies
- `framer-motion`: Animation system
- `lucide-react`: Icon components
- React 18+ for modern hooks

## Customization

### Adding New Categories
1. Add category object to `categories` array
2. Add service data to `serviceDetails` object
3. Update `CategoryId` type
4. Add corresponding images

### Modifying Animations
Edit the motion configuration objects:
```typescript
transition={{ 
  duration: 0.4, 
  ease: [0.25, 0.46, 0.45, 0.94] 
}}
```

### Styling Customization
Override CSS classes or extend the design system:
```typescript
<ServicesPageInteractive className="custom-bg custom-spacing" />
```

## Testing

### Manual Testing Checklist
- [ ] Category switching works smoothly
- [ ] All animations complete properly
- [ ] Booking buttons trigger openBooking()
- [ ] Responsive design works on all screen sizes
- [ ] Images load correctly with fallbacks
- [ ] Keyboard navigation functions
- [ ] Screen reader compatibility

### Error Scenarios
- Missing images: Fallback to placeholder
- Network issues: Graceful loading states
- Context unavailable: Error boundaries

## Future Enhancements

### Potential Improvements
- [ ] Add search/filter functionality
- [ ] Implement service comparison feature
- [ ] Add testimonials per service
- [ ] Include availability indicators
- [ ] Add video previews for services

### Planned Features
- [ ] Multi-language service descriptions
- [ ] Dynamic pricing based on complexity
- [ ] Artist specialization indicators
- [ ] Real-time booking availability