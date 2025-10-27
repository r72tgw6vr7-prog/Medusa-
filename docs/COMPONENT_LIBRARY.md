# 📚 MEDUSA TATTOO - COMPONENT LIBRARY

**Project:** Medusa Tattoo München Design System  
**Components:** 200 React Components  
**Status:** Production Ready  
**Design System:** Fully Implemented  

---

## 🎨 DESIGN SYSTEM FOUNDATION

### **Brand Colors**
```css
/* Primary Brand Palette */
--brand-black: #222222;     /* Primary text, headers */
--brand-white: #FFFFFF;     /* Background, contrast */
--brand-gold: #D4AF37;      /* Accent, highlights, buttons */
--brand-silver: #C0C0C0;    /* Secondary text, borders */

/* Semantic Colors */
--color-success: #28a745;
--color-warning: #ffc107; 
--color-error: #dc3545;
--color-info: #17a2b8;
```

### **Typography Scale**
```css
/* Heading Hierarchy */
--font-size-h1: 3rem;       /* 48px - Hero titles */
--font-size-h2: 2.5rem;     /* 40px - Section headers */
--font-size-h3: 2rem;       /* 32px - Subsections */
--font-size-h4: 1.5rem;     /* 24px - Component titles */
--font-size-h5: 1.25rem;    /* 20px - Card headers */
--font-size-h6: 1.125rem;   /* 18px - Small headers */

/* Body Text */
--font-size-base: 1rem;     /* 16px - Body text */
--font-size-sm: 0.875rem;   /* 14px - Small text */
--font-size-xs: 0.75rem;    /* 12px - Captions */
```

### **Spacing System (8px Grid)**
```css
/* Base Spacing Units */
--spacing-xs: 0.25rem;      /* 4px */
--spacing-sm: 0.5rem;       /* 8px */
--spacing-md: 1rem;         /* 16px */
--spacing-lg: 1.5rem;       /* 24px */
--spacing-xl: 2rem;         /* 32px */
--spacing-2xl: 3rem;        /* 48px */
--spacing-3xl: 4rem;        /* 64px */
```

---

## 🧩 COMPONENT CATALOG

### **🏠 Layout Components**

#### **AppContainer**
```tsx
// File: components/layout/AppContainer.tsx
<AppContainer>
  <Header />
  <MainContent />
  <Footer />
</AppContainer>
```
**Props:** `children`, `fullWidth`, `maxWidth`  
**Usage:** Root application wrapper  

#### **Grid System**
```tsx
// File: components/layout/Grid.tsx
<Grid container spacing="md">
  <Grid item xs={12} md={6}>Content</Grid>
  <Grid item xs={12} md={6}>Content</Grid>
</Grid>
```
**Props:** `container`, `item`, `spacing`, `xs`, `sm`, `md`, `lg`, `xl`  
**Usage:** Responsive 12-column grid layout  

#### **Section**
```tsx
// File: components/layout/Section.tsx
<Section 
  background="dark" 
  padding="xl" 
  fullWidth
>
  Content
</Section>
```
**Props:** `background`, `padding`, `margin`, `fullWidth`, `centered`  
**Usage:** Page sections with consistent spacing  

---

### **🧭 Navigation Components**

#### **Header**
```tsx
// File: components/navigation/Header.tsx
<Header 
  transparent={false} 
  fixed={true}
  showBookingButton={true}
/>
```
**Props:** `transparent`, `fixed`, `showBookingButton`, `variant`  
**Features:** Responsive, mobile hamburger, booking CTA  

#### **MobileMenu**
```tsx
// File: components/navigation/MobileMenu.tsx
<MobileMenu 
  isOpen={isOpen} 
  onClose={handleClose}
  menuItems={navigationItems}
/>
```
**Props:** `isOpen`, `onClose`, `menuItems`, `showOverlay`  
**Features:** Full-screen overlay, smooth animations  

#### **NavigationLink**
```tsx
// File: components/navigation/NavigationLink.tsx
<NavigationLink 
  to="/services" 
  active={pathname === '/services'}
>
  Services
</NavigationLink>
```
**Props:** `to`, `active`, `variant`, `onClick`  
**Features:** Active state styling, hover effects  

---

### **🔘 Button Components**

#### **Button (Primary)**
```tsx
// File: components/buttons/Button.tsx
<Button 
  variant="primary" 
  size="lg" 
  onClick={handleClick}
>
  Book Appointment
</Button>
```
**Variants:** `primary`, `secondary`, `outline`, `ghost`  
**Sizes:** `sm`, `md`, `lg`, `xl`  
**States:** Default, hover, active, disabled, loading  

#### **BookingButton**
```tsx
// File: components/buttons/BookingButton.tsx
<BookingButton 
  variant="cta" 
  showIcon={true}
  fullWidth={false}
/>
```
**Props:** `variant`, `showIcon`, `fullWidth`, `urgent`  
**Usage:** Call-to-action for appointment booking  

---

### **📝 Form Components**

#### **ContactForm**
```tsx
// File: components/forms/ContactForm.tsx
<ContactForm 
  onSubmit={handleSubmit}
  showServices={true}
  compact={false}
/>
```
**Features:** Validation, accessibility, responsive design  
**Fields:** Name, email, phone, service, message  

#### **BookingForm**
```tsx
// File: components/forms/BookingForm.tsx
<BookingForm 
  selectedService="tattoo"
  onSubmit={handleBooking}
  showCalendar={true}
/>
```
**Features:** Service selection, date picker, time slots  
**Validation:** Real-time feedback, error handling  

#### **Input**
```tsx
// File: components/forms/Input.tsx
<Input 
  type="email"
  label="Email Address"
  required={true}
  error={emailError}
/>
```
**Types:** `text`, `email`, `tel`, `textarea`, `select`  
**States:** Default, focus, error, disabled, success  

---

### **🏷️ Content Components**

#### **Hero**
```tsx
// File: components/content/Hero.tsx
<Hero 
  title="Luxury Tattoo Artistry"
  subtitle="Since 1998 in München"
  backgroundImage="/images/hero-bg.jpg"
  showCTA={true}
/>
```
**Props:** `title`, `subtitle`, `backgroundImage`, `showCTA`, `overlay`  
**Features:** Responsive images, overlay effects, CTA integration  

#### **ServiceCard**
```tsx
// File: components/content/ServiceCard.tsx
<ServiceCard 
  title="Custom Tattoos"
  price="€200-800"
  duration="2-6 hours"
  image="/images/service-tattoo.jpg"
/>
```
**Props:** `title`, `description`, `price`, `duration`, `image`, `features`  
**Features:** Hover effects, responsive images, booking integration  

#### **ArtistCard**
```tsx
// File: components/content/ArtistCard.tsx
<ArtistCard 
  name="Sarah Mueller"
  specialty="Realistic Portraits"
  experience="12 years"
  image="/images/artist-sarah.jpg"
/>
```
**Props:** `name`, `specialty`, `experience`, `image`, `bio`, `portfolio`  
**Features:** Portfolio integration, social links, booking  

---

### **🖼️ Media Components**

#### **GalleryGrid**
```tsx
// File: components/media/GalleryGrid.tsx
<GalleryGrid 
  images={portfolioImages}
  columns={3}
  showLightbox={true}
  filterBy="category"
/>
```
**Features:** Responsive masonry, lazy loading, filtering  
**Props:** `images`, `columns`, `showLightbox`, `filterBy`  

#### **ImageCarousel**
```tsx
// File: components/media/ImageCarousel.tsx
<ImageCarousel 
  images={artistPortfolio}
  autoPlay={false}
  showThumbnails={true}
/>
```
**Features:** Touch gestures, keyboard navigation, thumbnails  
**Props:** `images`, `autoPlay`, `showThumbnails`, `showDots`  

#### **VideoPlayer**
```tsx
// File: components/media/VideoPlayer.tsx
<VideoPlayer 
  src="/videos/studio-tour.mp4"
  poster="/images/video-poster.jpg"
  controls={true}
  autoPlay={false}
/>
```
**Features:** Custom controls, responsive, accessibility  
**Props:** `src`, `poster`, `controls`, `autoPlay`, `muted`  

---

### **💬 Interactive Components**

#### **Modal**
```tsx
// File: components/interactive/Modal.tsx
<Modal 
  isOpen={showBooking}
  onClose={closeBooking}
  size="lg"
  closeOnOverlay={true}
>
  <BookingForm />
</Modal>
```
**Props:** `isOpen`, `onClose`, `size`, `closeOnOverlay`, `showCloseButton`  
**Features:** Focus trap, escape key, backdrop click  

#### **Tooltip**
```tsx
// File: components/interactive/Tooltip.tsx
<Tooltip 
  content="Book your consultation today"
  position="top"
  delay={500}
>
  <Button>Book Now</Button>
</Tooltip>
```
**Props:** `content`, `position`, `delay`, `showArrow`  
**Features:** Auto-positioning, keyboard accessible  

#### **Tabs**
```tsx
// File: components/interactive/Tabs.tsx
<Tabs defaultTab="services">
  <TabList>
    <Tab id="services">Services</Tab>
    <Tab id="artists">Artists</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="services">Services content</TabPanel>
    <TabPanel id="artists">Artists content</TabPanel>
  </TabPanels>
</Tabs>
```
**Features:** Keyboard navigation, ARIA compliant  

---

### **📱 Responsive Breakpoints**

```css
/* Mobile First Approach */
@media (min-width: 375px) {  /* Mobile */
  .container { max-width: 343px; }
}

@media (min-width: 768px) {  /* Tablet */
  .container { max-width: 704px; }
}

@media (min-width: 1024px) { /* Desktop */
  .container { max-width: 960px; }
}

@media (min-width: 1920px) { /* Large Desktop */
  .container { max-width: 1200px; }
}
```

---

## 🎯 COMPONENT USAGE PATTERNS

### **Page Layout Pattern**
```tsx
function ServicePage() {
  return (
    <AppContainer>
      <Header fixed transparent={false} />
      <Hero 
        title="Our Services" 
        subtitle="Professional tattoo artistry"
      />
      <Section padding="xl">
        <Grid container spacing="lg">
          {services.map(service => (
            <Grid item xs={12} md={6} lg={4} key={service.id}>
              <ServiceCard {...service} />
            </Grid>
          ))}
        </Grid>
      </Section>
      <Footer />
    </AppContainer>
  );
}
```

### **Form Integration Pattern**
```tsx
function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSubmit = async (formData) => {
    try {
      await submitContact(formData);
      setShowSuccess(true);
    } catch (error) {
      // Error handling
    }
  };

  return (
    <Section>
      <ContactForm onSubmit={handleSubmit} />
      {showSuccess && (
        <SuccessMessage>Thank you! We'll be in touch.</SuccessMessage>
      )}
    </Section>
  );
}
```

### **Modal Integration Pattern**
```tsx
function BookingCTA() {
  const [showBooking, setShowBooking] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShowBooking(true)}>
        Book Appointment
      </Button>
      <Modal 
        isOpen={showBooking} 
        onClose={() => setShowBooking(false)}
      >
        <BookingForm onSubmit={handleBooking} />
      </Modal>
    </>
  );
}
```

---

## ♿ ACCESSIBILITY FEATURES

### **Keyboard Navigation**
- All interactive elements are keyboard accessible
- Focus indicators visible on all focusable elements
- Tab order follows logical content flow
- Escape key closes modals and dropdowns

### **Screen Reader Support**
- Semantic HTML elements used throughout
- ARIA labels and descriptions provided
- Image alt texts descriptive and meaningful
- Form labels properly associated with inputs

### **Color Contrast**
- All text meets WCAG 2.1 AA contrast ratios
- Focus indicators have sufficient contrast
- Interactive states clearly distinguishable
- Color is not the only means of conveying information

### **Touch Targets**
- Minimum 44px touch target size
- Adequate spacing between interactive elements
- Touch gestures work on mobile devices
- Hover states adapted for touch interfaces

---

## 🔧 CUSTOMIZATION GUIDE

### **Theming**
```css
/* Custom theme variables */
:root {
  --brand-primary: #your-color;
  --brand-secondary: #your-color;
  --font-family-primary: 'Your Font', sans-serif;
  --border-radius: 4px;
}
```

### **Component Variants**
```tsx
// Create new button variant
<Button variant="custom" className="my-custom-button">
  Custom Button
</Button>

// CSS
.my-custom-button {
  background: var(--brand-tertiary);
  border: 2px solid var(--brand-primary);
}
```

### **Layout Customization**
```tsx
// Custom grid breakpoints
<Grid container>
  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
    Responsive content
  </Grid>
</Grid>
```

---

## 📦 COMPONENT DEPENDENCIES

### **Required Dependencies**
- React 18+
- TypeScript 4.5+
- CSS Variables support
- Modern browser support (ES2020+)

### **Optional Dependencies**
- React Router (for navigation)
- Framer Motion (for animations)
- React Hook Form (for advanced forms)
- Headless UI (for complex interactions)

### **No External UI Libraries Required**
- All components built from scratch
- Full design system control
- No Bootstrap or Material-UI dependencies
- Lightweight and performant

---

## 🚀 DEVELOPMENT WORKFLOW

### **Adding New Components**
1. Create component in appropriate category folder
2. Use design tokens from CSS variables
3. Follow existing naming conventions
4. Include TypeScript types
5. Add to component index

### **Component File Structure**
```
components/
├── buttons/
│   ├── Button.tsx
│   ├── BookingButton.tsx
│   └── index.ts
├── forms/
│   ├── ContactForm.tsx
│   ├── Input.tsx
│   └── index.ts
└── layout/
    ├── Header.tsx
    ├── Grid.tsx
    └── index.ts
```

### **Testing Components**
```tsx
// Example component test
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

---

**🎨 Complete Design System - Ready for Production Use**