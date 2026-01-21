# Component Catalog

## Design System

### Color System
- **Primary background token**: --deep-black (#003342 navy)
- **Surface tokens**:
  - --surface-card-bg
  - --surface-card-border
  - --surface-card-shadow
  - --surface-card-shadow-featured
- **Text primary/secondary/tertiary**: --brand-white (#fafafa), --brand-chrome, --brand-accent (#E87171)
- **Accent/chrome token**: --brand-accent (#E87171 orange/coral)

### Spacing System (Ma / spacing scale)
- **Section padding**: 32px 24px (card default), 16px, 24px, 48px, 64px
- **Vertical rhythm**: 8px, 16px, 24px, 32px, 48px, 64px
- **Grid**: 4px, 8px, 16px, 24px, 32px, 48px, 64px

### Typography System
- **Heading scale**: H1 52px, H2 42px, H3 34px, H4 27px
- **Body style**: 16px
- **Label/eyebrow style**: 14px small
- **Line height**: headings ~1.2, body 1.6

### Component Primitives + States
- **Borders**: border-2, border-[var(--brand-accent)]/30
- **Dividers/lines**: border-t border-brand-accent/20
- **Buttons**: chrome variant bg-[var(--brand-accent)], outlineChrome border border-[var(--brand-accent)]
- **Hover/active/focus**: focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)], hover:bg-[var(--brand-accent)]/10

### Motion System
- **Easing**: ease-out
- **Duration**: 200ms, 300ms
- **Reduced motion**: not implemented (prefers-reduced-motion not found)

## Component Catalog

### Atoms

#### Card
- **Path**: src/components/ui/Card.tsx
- **Responsibilities**: Provides a basic card container with variants for default, featured, elevated, and sizes.
- **Props**: variant ('default' | 'featured' | 'elevated'), size ('default' | 'sm' | 'lg'), className (string), asChild (boolean), extends React.HTMLAttributes<HTMLDivElement>
- **Variants**: variant: default, featured, elevated; size: default, sm, lg
- **Styling Method**: Tailwind CSS with class-variance-authority (cva)
- **Tokens Used**: --surface-card-bg, --surface-card-border, --surface-card-shadow, --surface-card-shadow-featured, --shadow-md, --shadow-lg, --brand-accent, --deep-black
- **Motion**: transition-all duration-300
- **Accessibility**: focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--deep-black)]
- **Dependencies**: React, cva from class-variance-authority, cn from @/lib/utils
- **Usages**: src/__tests__/ServiceCards.test.tsx, src/components/PreFooterBookingCTA.tsx, src/components/layout-grid-demo.tsx, src/components/layout/Footer.tsx, src/components/molecules/Card/ArtistCard.tsx, src/components/molecules/ContactInfoCard.tsx, src/components/molecules/CookieConsentBanner.tsx, src/components/molecules/ReviewCard.tsx, src/components/organisms/TestimonialsCarousel.tsx, src/components/pages/Footer.tsx, src/components/pages/ServicesPageInteractive.tsx, src/components/pages/TeamGrid.tsx, src/components/sections/ArtistsSection.tsx, src/components/seo/FAQSection.tsx, src/components/seo/LocationSection.tsx, src/pages/AftercarePage.tsx, src/pages/ContactPage.tsx, src/pages/DatenschutzPage.tsx, src/pages/FAQPageNew.tsx, src/pages/LegalPage.tsx, src/sections/ArtistSection.tsx, src/sections/BeforeAfterSection.tsx, src/sections/ServicesSection.tsx, src/sections/TrustSignalsSection.tsx
- **Surface**: Yes, bg-[var(--surface-card-bg)] border-[var(--surface-card-border)] rounded-[24px] border-2 shadow-[var(--surface-card-shadow)] p-8 (default size)

#### Button
- **Path**: src/components/ui/button.tsx
- **Responsibilities**: Provides a button component with multiple variants and sizes.
- **Props**: variant ('default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'chrome' | 'outlineChrome' | 'ghostChrome' | 'gold' | 'outlineGold' | 'ghostGold'), size ('default' | 'sm' | 'lg' | 'icon'), className (string), asChild (boolean), extends React.ButtonHTMLAttributes<HTMLButtonElement>
- **Variants**: variant: default, destructive, outline, secondary, ghost, link, chrome, outlineChrome, ghostChrome, gold (deprecated), outlineGold (deprecated), ghostGold (deprecated); size: default, sm, lg, icon
- **Styling Method**: Tailwind CSS with class-variance-authority (cva)
- **Tokens Used**: --primary, --primary-foreground, --destructive, --destructive-foreground, --muted, --muted-foreground, --accent, --accent-foreground, --background, --brand-accent, --deep-black, --brand-accent-hover
- **Motion**: transition-colors
- **Accessibility**: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
- **Dependencies**: React, Slot from @radix-ui/react-slot, cva from class-variance-authority, cn from ../../lib/utils
- **Usages**: src/__tests__/Button.test.tsx, src/components/PreFooterBookingCTA.tsx, src/components/booking/steps/ConfirmationStep.tsx, src/components/booking/steps/FeedbackStates.tsx, src/components/booking/steps/PaymentStep.tsx, src/components/booking/steps/ServiceSelectionStep.tsx, src/components/layout/Footer.tsx, src/components/molecules/Card/ServiceCards.tsx, src/components/pages/ServicesPageInteractive.tsx, src/components/ui/LuxuryButton.tsx, src/pages/ColorTestPage.tsx, src/pages/ContactPage.tsx, src/sections/BookingSection.tsx
- **Surface**: No

### Molecules

#### ArtistCardJapanese
- **Path**: src/components/cards/ArtistCardJapanese.tsx
- **Responsibilities**: Display artist information with booking/gallery actions, using Japanese-inspired design.
- **Props**: name (string), role (ArtistRole), specialties (string[]), experience (string), instagramHandle (string), imageUrl (string), className? (string), onClick? (() => void), onBookClick? (() => void), onGalleryClick? (() => void), bookHref? (string), galleryHref? (string), imagePosition? (string), isSelected? (boolean), variant? ('light' | 'dark')
- **Variants**: variant: light, dark
- **Styling Method**: Tailwind CSS with static variant classes
- **Tokens Used**: luxury-text-primary, luxury-text-secondary, luxury-text-tertiary, luxury-bg-surface, luxury-border-subtle, luxury-bg-base, luxury-bg-dark-elevated, luxury-border-on-dark, luxury-bg-dark, luxury-text-inverse, luxury-text-inverse-muted, luxury-accent-chrome, luxury-accent-chrome-hover, luxury-bg-dark-hover, luxury-bg-elevated, luxury-border-medium, luxury-border-chrome, luxury-border-light, luxury-accent-chrome-safe, luxury-bg-dark, luxury-accent-chrome
- **Motion**: None
- **Accessibility**: aria-label, semantic elements, handleKeyDown for keyboard navigation
- **Dependencies**: React, ArtistRole
- **Usages**: Usage search needed
- **Surface**: Yes, bg-luxury-bg-surface border-luxury-border-subtle (light variant), bg-luxury-bg-dark-elevated border-luxury-border-on-dark (dark variant)

#### CookieConsentBanner
- **Path**: src/components/molecules/CookieConsentBanner.tsx
- **Responsibilities**: Manages cookie consent with banner and preferences dialog.
- **Props**: onNavigate ((page: PageType) => void)
- **Variants**: None
- **Styling Method**: Tailwind CSS
- **Tokens Used**: --color-surface-dark, --brand-accent, --brand-accent-hover, --brand-chrome, --brand-white, --brand-background, --deep-black
- **Motion**: transition-colors transition duration-200 ease-out
- **Accessibility**: aria-label on close button
- **Dependencies**: React, useState, useEffect, Dialog from @radix-ui/react-dialog, X from lucide-react, Card from ../ui/Card
- **Usages**: Usage search needed
- **Surface**: Yes, bg-[var(--color-surface-dark)]/95 backdrop-blur border-t border-brand-accent/20

#### ReviewCard
- **Path**: src/components/molecules/ReviewCard.tsx
- **Responsibilities**: Displays customer reviews with rating stars.
- **Props**: rating (number), content (string), author (string), source (string), className? (string)
- **Variants**: None
- **Styling Method**: Tailwind CSS
- **Tokens Used**: --brand-accent
- **Motion**: None
- **Accessibility**: aria-label on stars
- **Dependencies**: React, Star from lucide-react, Card from ../ui/Card
- **Usages**: Usage search needed
- **Surface**: No

#### ContactInfoCard
- **Path**: src/components/molecules/ContactInfoCard.tsx
- **Responsibilities**: Displays contact information with icon.
- **Props**: icon (string), title (string), value (string), href? (string), className? (string)
- **Variants**: None
- **Styling Method**: Tailwind CSS
- **Tokens Used**: --brand-accent, --brand-chrome
- **Motion**: transition-opacity duration-200 ease-out
- **Accessibility**: target='_blank' rel='noopener noreferrer'
- **Dependencies**: React, Icon from ../atoms/Icon, Card from ../ui/Card
- **Usages**: Usage search needed
- **Surface**: No

#### ServiceCard
- **Path**: src/components/molecules/ServiceCard.tsx
- **Responsibilities**: Displays service offerings with features and CTA button.
- **Props**: title (string), subtitle? (string), description (string), price? (string), duration? (string), features? (ServiceFeature[] | string[]), buttonText? (string), onButtonClick? (() => void), highlighted? (boolean), popular? (boolean), className? (string), backgroundImage? (string), backgroundImageAlt? (string), icon? (React.ComponentType<{ size?: number; className?: string }> ), accentColor? ('chrome' | 'gold'), animationDelay? (number), isVisible? (boolean), isHovered? (boolean), onMouseEnter? (() => void), onMouseLeave? (() => void), iconUrl? (string), ctaText? (string), onCtaClick? (() => void)
- **Variants**: accentColor: chrome, gold
- **Styling Method**: Tailwind CSS with static variant map
- **Tokens Used**: --brand-accent, --brand-chrome, --brand-background, --brand-accent-hover, --shadow-chrome-glow, --text-primary, --text-secondary
- **Motion**: transition-all duration-300, scale on hover
- **Accessibility**: role='group', role='button', tabIndex, onKeyDown
- **Dependencies**: React
- **Usages**: Usage search needed
- **Surface**: Yes, bg-black/60 backdrop-blur border border-[var(--brand-accent)]/30 shadow-chrome-glow

## Duplicate Components
- **Card**: Exists in src/components/ui/Card.tsx and src/components/molecules/Card/Card.tsx
- **Button**: Exists in src/components/ui/button.tsx and potentially others (LuxuryButton.tsx imports it)

## Component Graph
- Card is used by: CookieConsentBanner, ReviewCard, ContactInfoCard, ServiceCard, etc.
- Button is used by: ServiceCard, booking steps, etc.
