/**
 * MEDUSA DESIGN SYSTEM V2.0 - USAGE GUIDE & EXAMPLES
 * Complete implementation examples and best practices
 */


import { 
  MedusaDesignSystemProvider, 
  Typography, 
  Button, 
  Layout, 
  Card, 
  Input, 
  Navigation,
  useMedusaDesignSystem,
  useResponsive,
  useTokens
} from './MedusaDesignSystemV2';

// ===========================================
// COMPONENT EXAMPLES
// ===========================================

export function DesignSystemExamples() {
  const { language, setLanguage, breakpoint } = useMedusaDesignSystem();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const tokens = useTokens();

  return (
    <div className="medusa-design-system">
      {/* Typography Examples */}
      <Layout.Container size="lg" className="medusa-p-8">
        <Layout.Stack direction="vertical" gap="lg">
          
          {/* Headlines */}
          <div>
            <Typography.Headline level="xl">
              Medusa Tattoo München
            </Typography.Headline>
            <Typography.Headline level="lg">
              Luxury Tattoo Artistry Since 1998
            </Typography.Headline>
            <Typography.Headline level="md">
              Premium Services
            </Typography.Headline>
            <Typography.Headline level="sm">
              Our Master Artists
            </Typography.Headline>
          </div>

          {/* Body Text */}
          <div>
            <Typography.Body size="xl">
              Welcome to Munich's premier luxury tattoo studio, where artistry meets 
              precision in an atmosphere of uncompromising quality and elegance.
            </Typography.Body>
            <Typography.Body size="lg">
              Our master artists combine traditional techniques with contemporary 
              innovation to create timeless pieces that tell your unique story.
            </Typography.Body>
            <Typography.Body size="md">
              Experience the difference that comes from working with true professionals 
              who understand that your tattoo is more than art—it's a statement.
            </Typography.Body>
            <Typography.Body size="sm">
              Book your consultation today and begin your journey to extraordinary ink.
            </Typography.Body>
            <Typography.Caption>
              All work guaranteed with complimentary touch-ups within 30 days.
            </Typography.Caption>
          </div>

          {/* Buttons */}
          <Layout.Stack direction={isMobile ? "vertical" : "horizontal"} gap="md">
            <Button.Primary size="lg">
              Book Consultation
            </Button.Primary>
            <Button.Secondary size="lg">
              View Portfolio
            </Button.Secondary>
            <Button.Ghost size="lg">
              Learn More
            </Button.Ghost>
          </Layout.Stack>

          {/* Cards */}
          <Layout.Grid 
            columns={isMobile ? 1 : isTablet ? 2 : 3} 
            gap="lg"
          >
            <Card.Base variant="glass" interactive>
              <Card.Header>
                <Typography.Headline level="sm">
                  Realistic Tattoos
                </Typography.Headline>
              </Card.Header>
              <Card.Content>
                <Typography.Body size="md">
                  Hyperrealistic portraits and photo-quality tattoos with 
                  incredible attention to detail and artistic precision.
                </Typography.Body>
              </Card.Content>
              <Card.Footer>
                <Button.Primary size="sm">
                  Book Now
                </Button.Primary>
              </Card.Footer>
            </Card.Base>

            <Card.Base variant="elevated" interactive>
              <Card.Header>
                <Typography.Headline level="sm">
                  Traditional Style
                </Typography.Headline>
              </Card.Header>
              <Card.Content>
                <Typography.Body size="md">
                  Classic old school and neo-traditional designs that honor 
                  the rich heritage of tattoo artistry.
                </Typography.Body>
              </Card.Content>
              <Card.Footer>
                <Button.Secondary size="sm">
                  View Gallery
                </Button.Secondary>
              </Card.Footer>
            </Card.Base>

            <Card.Base variant="default" interactive>
              <Card.Header>
                <Typography.Headline level="sm">
                  Minimalist Art
                </Typography.Headline>
              </Card.Header>
              <Card.Content>
                <Typography.Body size="md">
                  Elegant fine line work and minimalistic designs that 
                  make a powerful statement through simplicity.
                </Typography.Body>
              </Card.Content>
              <Card.Footer>
                <Button.Ghost size="sm">
                  Learn More
                </Button.Ghost>
              </Card.Footer>
            </Card.Base>
          </Layout.Grid>

          {/* Forms */}
          <Card.Base variant="glass" className="medusa-p-6">
            <Typography.Headline level="md" className="medusa-m-4">
              Book Your Consultation
            </Typography.Headline>
            
            <Layout.Grid columns={isMobile ? 1 : 2} gap="md">
              <Input.Text
                id="name"
                label="Full Name"
                placeholder="Enter your full name"
                size="md"
              />
              <Input.Text
                id="email"
                label="Email Address"
                placeholder="your.email@example.com"
                type="email"
                size="md"
              />
              <Input.Text
                id="phone"
                label="Phone Number"
                placeholder="+49 xxx xxx xxxx"
                type="tel"
                size="md"
              />
              <Input.Text
                id="style"
                label="Preferred Style"
                placeholder="e.g., Realistic, Traditional"
                size="md"
              />
            </Layout.Grid>
            
            <Input.Textarea
              id="description"
              label="Describe Your Vision"
              placeholder="Tell us about your tattoo idea, size, placement, and any specific details..."
              rows={4}
              size="md"
              className="medusa-m-4"
            />
            
            <Layout.Stack direction="horizontal" justify="end" gap="md" className="medusa-m-4">
              <Button.Ghost>
                Save Draft
              </Button.Ghost>
              <Button.Primary>
                Submit Request
              </Button.Primary>
            </Layout.Stack>
          </Card.Base>

          {/* Navigation Example */}
          <Navigation.Nav variant="glass" className="medusa-p-4">
            <Layout.Stack direction="horizontal" justify="between" align="center">
              <Typography.Headline level="md">
                MEDUSA
              </Typography.Headline>
              
              <Layout.Stack direction="horizontal" gap="md">
                <Navigation.Item active>
                  Home
                </Navigation.Item>
                <Navigation.Item>
                  Services
                </Navigation.Item>
                <Navigation.Item>
                  Artists
                </Navigation.Item>
                <Navigation.Item>
                  Gallery
                </Navigation.Item>
                <Navigation.Item>
                  Contact
                </Navigation.Item>
              </Layout.Stack>
              
              <Layout.Stack direction="horizontal" gap="sm">
                <Button.Ghost 
                  size="sm"
                  onClick={() => setLanguage(language === 'DE' ? 'EN' : 'DE')}
                >
                  {language}
                </Button.Ghost>
                <Button.Primary size="sm">
                  Book Now
                </Button.Primary>
              </Layout.Stack>
            </Layout.Stack>
          </Navigation.Nav>

          {/* Responsive Information */}
          <Card.Base variant="default" className="medusa-p-6">
            <Typography.Headline level="md" className="medusa-m-4">
              Current Breakpoint: {breakpoint}
            </Typography.Headline>
            <Layout.Stack direction="vertical" gap="sm">
              <Typography.Body>
                Mobile: {isMobile ? '✓' : '✗'}
              </Typography.Body>
              <Typography.Body>
                Tablet: {isTablet ? '✓' : '✗'}
              </Typography.Body>
              <Typography.Body>
                Desktop: {isDesktop ? '✓' : '✗'}
              </Typography.Body>
            </Layout.Stack>
          </Card.Base>

        </Layout.Stack>
      </Layout.Container>
    </div>
  );
}

// ===========================================
// BEST PRACTICES GUIDE
// ===========================================

export const BestPracticesGuide = () => (
  <Layout.Container size="lg" className="medusa-p-8">
    <Typography.Headline level="xl" className="medusa-m-6">
      Medusa Design System V2.0 - Best Practices
    </Typography.Headline>

    <Layout.Stack direction="vertical" gap="xl">
      
      {/* Typography Best Practices */}
      <Card.Base variant="glass" className="medusa-p-6">
        <Typography.Headline level="lg" className="medusa-m-4">
          Typography Guidelines
        </Typography.Headline>
        
        <Layout.Stack direction="vertical" gap="md">
          <div>
            <Typography.Headline level="md">Font Usage</Typography.Headline>
            <Typography.Body>
              • Use Cormorant Garamond for all headlines and display text
            </Typography.Body>
            <Typography.Body>
              • Use Inter for body text, captions, and UI elements
            </Typography.Body>
            <Typography.Body>
              • Maintain proper hierarchy with headline levels (xl, lg, md, sm)
            </Typography.Body>
          </div>

          <div>
            <Typography.Headline level="md">Responsive Typography</Typography.Headline>
            <Typography.Body>
              • Font sizes automatically adjust based on breakpoint
            </Typography.Body>
            <Typography.Body>
              • Mobile: Smaller, tighter spacing for better readability
            </Typography.Body>
            <Typography.Body>
              • Desktop: Larger, more dramatic scaling for impact
            </Typography.Body>
          </div>
        </Layout.Stack>
      </Card.Base>

      {/* Color System */}
      <Card.Base variant="glass" className="medusa-p-6">
        <Typography.Headline level="lg" className="medusa-m-4">
          Color System
        </Typography.Headline>
        
        <Layout.Grid columns={3} gap="md">
          <div className="medusa-bg-gold medusa-p-4 medusa-text-inverse">
            <Typography.Body>Gold (var(--brand-gold))</Typography.Body>
            <Typography.Caption>Primary brand color</Typography.Caption>
          </div>
          <div className="medusa-bg-primary medusa-p-4 medusa-text-primary" style={{ border: '1px solid #333' }}>
            <Typography.Body>Black (#0A0A0A)</Typography.Body>
            <Typography.Caption>Background color</Typography.Caption>
          </div>
          <div className="medusa-bg-secondary medusa-p-4 medusa-text-primary">
            <Typography.Body>Off-White (#F5F5F0)</Typography.Body>
            <Typography.Caption>Text color</Typography.Caption>
          </div>
        </Layout.Grid>
      </Card.Base>

      {/* Spacing System */}
      <Card.Base variant="glass" className="medusa-p-6">
        <Typography.Headline level="lg" className="medusa-m-4">
          Spacing System (4px base unit)
        </Typography.Headline>
        
        <Layout.Grid columns={4} gap="sm">
          {[1, 2, 3, 4, 5, 6, 8, 12].map(space => (
            <div key={space} className="medusa-p-2" style={{ border: '1px solid #333' }}>
              <div 
                className="medusa-bg-gold" 
                style={{ height: `${space * 4}px`, width: '100%' }}
              />
              <Typography.Caption className="medusa-text-primary">
                Space {space} ({space * 4}px)
              </Typography.Caption>
            </div>
          ))}
        </Layout.Grid>
      </Card.Base>

      {/* Accessibility Guidelines */}
      <Card.Base variant="glass" className="medusa-p-6">
        <Typography.Headline level="lg" className="medusa-m-4">
          Accessibility Standards
        </Typography.Headline>
        
        <Layout.Stack direction="vertical" gap="md">
          <div>
            <Typography.Headline level="md">WCAG AA Compliance</Typography.Headline>
            <Typography.Body>• Minimum contrast ratio of 4.5:1 maintained</Typography.Body>
            <Typography.Body>• Touch targets minimum 44px for mobile accessibility</Typography.Body>
            <Typography.Body>• Focus states with 2px gold outline on all interactive elements</Typography.Body>
          </div>

          <div>
            <Typography.Headline level="md">Keyboard Navigation</Typography.Headline>
            <Typography.Body>• All interactive elements are keyboard accessible</Typography.Body>
            <Typography.Body>• Clear focus indicators with gold glow effect</Typography.Body>
            <Typography.Body>• Proper tab order and skip links implemented</Typography.Body>
          </div>

          <div>
            <Typography.Headline level="md">Screen Reader Support</Typography.Headline>
            <Typography.Body>• Semantic HTML structure with proper ARIA labels</Typography.Body>
            <Typography.Body>• Alternative text for all images and icons</Typography.Body>
            <Typography.Body>• Form labels and error messages properly associated</Typography.Body>
          </div>
        </Layout.Stack>
      </Card.Base>

      {/* Component Usage */}
      <Card.Base variant="glass" className="medusa-p-6">
        <Typography.Headline level="lg" className="medusa-m-4">
          Component Usage Patterns
        </Typography.Headline>
        
        <Layout.Stack direction="vertical" gap="md">
          <div>
            <Typography.Headline level="md">Button Hierarchy</Typography.Headline>
            <Typography.Body>• Primary: Main CTAs (Book Now, Submit)</Typography.Body>
            <Typography.Body>• Secondary: Alternative actions (View More, Cancel)</Typography.Body>
            <Typography.Body>• Ghost: Tertiary actions (Settings, Info)</Typography.Body>
          </div>

          <div>
            <Typography.Headline level="md">Card Variants</Typography.Headline>
            <Typography.Body>• Glass: Featured content with glassmorphism</Typography.Body>
            <Typography.Body>• Elevated: Important content with subtle shadow</Typography.Body>
            <Typography.Body>• Default: Standard content containers</Typography.Body>
          </div>

          <div>
            <Typography.Headline level="md">Layout Principles</Typography.Headline>
            <Typography.Body>• Use Container for consistent max-widths</Typography.Body>
            <Typography.Body>• Grid for structured layouts (1-12 columns)</Typography.Body>
            <Typography.Body>• Stack for simple vertical/horizontal arrangements</Typography.Body>
          </div>
        </Layout.Stack>
      </Card.Base>

    </Layout.Stack>
  </Layout.Container>
);

// ===========================================
// DESIGN SYSTEM IMPLEMENTATION EXAMPLE
// ===========================================

export function MedusaAppExample() {
  return (
    <MedusaDesignSystemProvider initialLanguage="DE" initialTheme="dark">
      <div className="medusa-design-system">
        {/* Import the design system CSS */}
        <link rel="stylesheet" href="/styles/design-system.css" />
        
        {/* Your app content */}
        <DesignSystemExamples />
        <BestPracticesGuide />
      </div>
    </MedusaDesignSystemProvider>
  );
}

// ===========================================
// IMPLEMENTATION CHECKLIST
// ===========================================

export const ImplementationChecklist = [
  {
    category: "Setup",
    items: [
      "Import brand-tokens.json",
      "Include design-system.css in your project",
      "Wrap app with MedusaDesignSystemProvider",
      "Add Cormorant Garamond and Inter fonts"
    ]
  },
  {
    category: "Components",
    items: [
      "Replace generic buttons with Button components",
      "Use Typography components for all text",
      "Implement Card components for content containers",
      "Use Layout components for structured layouts"
    ]
  },
  {
    category: "Accessibility",
    items: [
      "Test with keyboard navigation",
      "Verify color contrast ratios",
      "Add proper ARIA labels",
      "Test with screen readers"
    ]
  },
  {
    category: "Responsive Design",
    items: [
      "Test on mobile (320px-767px)",
      "Test on tablet (768px-1023px)", 
      "Test on desktop (1024px+)",
      "Verify touch targets on mobile"
    ]
  },
  {
    category: "Performance",
    items: [
      "Optimize font loading",
      "Test reduced motion preferences",
      "Verify high contrast mode",
      "Check for color blindness accessibility"
    ]
  }
];

export default {
  MedusaDesignSystemProvider,
  DesignSystemExamples,
  BestPracticesGuide,
  MedusaAppExample,
  ImplementationChecklist
};