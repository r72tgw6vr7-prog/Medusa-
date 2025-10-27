
import { 
  MedusaDesignSystemProvider,
  useMedusaDesignSystem,
  useMedusaResponsive 
} from './MedusaDesignSystemProvider';
import {
  ResponsiveContainer,
  Grid,
  GridItem,
  Section,
  Typography,
  Button,
  Card,
  Flex,
  Show,
  MotionWrapper,
  Input,
  Spacing
} from './MedusaUtilityComponents';

// ==========================================
// MEDUSA STYLE GUIDE & COMPONENT SHOWCASE
// Complete implementation examples for developers
// ==========================================

function StyleGuideContent() {
  const { tokens, device, language, setLanguage } = useMedusaDesignSystem();
  const responsive = useMedusaResponsive();

  return (
    <div className="min-h-screen bg-brand-background">
      {/* Header */}
      <Section spacing="lg" background="glassmorphic">
        <ResponsiveContainer>
          <Flex direction="column" alignItems="center" gap="lg">
            <Typography variant="headlineXl" color="gold" align="center">
              Medusa Design System
            </Typography>
            <Typography variant="bodyLarge" color="chrome" align="center">
              Production-ready components with strict brand compliance
            </Typography>
            
            {/* Language Toggle */}
            <Flex gap="sm" alignItems="center">
              <Button 
                variant={language === 'DE' ? 'primary' : 'secondary'}
                onClick={() => setLanguage('DE')}
              >
                Deutsch
              </Button>
              <Button 
                variant={language === 'EN' ? 'primary' : 'secondary'}
                onClick={() => setLanguage('EN')}
              >
                English
              </Button>
            </Flex>
          </Flex>
        </ResponsiveContainer>
      </Section>

      {/* Device Information */}
      <Section spacing="lg">
        <ResponsiveContainer>
          <Typography variant="headlineLg" color="gold" className="mb-8">
            Current Device State
          </Typography>
          
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 4 }} gap="md">
            <GridItem>
              <Card variant="luxury" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Device Type
                </Typography>
                <Typography variant="bodyLarge" color="white">
                  {device.device}
                </Typography>
                <Typography variant="bodySmall" color="chrome">
                  {device.width} × {device.height}
                </Typography>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="elevated" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Capabilities
                </Typography>
                <Typography variant="body" color="white">
                  Touch: {device.hasTouch ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body" color="white">
                  Hover: {device.hasHover ? 'Yes' : 'No'}
                </Typography>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="default" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Accessibility
                </Typography>
                <Typography variant="body" color="white">
                  Reduced Motion: {device.prefersReducedMotion ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body" color="white">
                  High Contrast: {device.prefersHighContrast ? 'Yes' : 'No'}
                </Typography>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="glassmorphic" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Settings
                </Typography>
                <Typography variant="body" color="white">
                  Language: {language}
                </Typography>
                <Typography variant="body" color="white">
                  DPR: {device.dpr}
                </Typography>
              </Card>
            </GridItem>
          </Grid>
        </ResponsiveContainer>
      </Section>

      {/* Typography Scale Demo */}
      <Section spacing="lg">
        <ResponsiveContainer>
          <Typography variant="headlineLg" color="gold" className="mb-8">
            Responsive Typography ({device.device})
          </Typography>
          
          <Grid columns={{ mobile: 1, tablet: 1, desktop: 2 }} gap="lg">
            <GridItem>
              <Card variant="luxury" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Headlines (Playfair Display)
                </Typography>
                <div className="space-y-8">
                  <div>
                    <Typography variant="headlineXl" color="white">
                      Headline XL
                    </Typography>
                    <Typography variant="bodySmall" color="chrome">
                      {responsive.typography.headlineXl} • Max: {device.device === 'mobile' ? '32px' : device.device === 'tablet' ? '40px' : '72px'}
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="headlineLg" color="white">
                      Headline Large
                    </Typography>
                    <Typography variant="bodySmall" color="chrome">
                      {responsive.typography.headlineLg}
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="headlineMd" color="white">
                      Headline Medium
                    </Typography>
                    <Typography variant="bodySmall" color="chrome">
                      {responsive.typography.headlineMd}
                    </Typography>
                  </div>
                </div>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="elevated" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Body Text (Inter)
                </Typography>
                <div className="space-y-8">
                  <div>
                    <Typography variant="bodyLarge" color="white">
                      Body Large Text
                    </Typography>
                    <Typography variant="bodySmall" color="chrome">
                      {responsive.typography.bodyLarge}
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="body" color="white">
                      Standard Body Text
                    </Typography>
                    <Typography variant="bodySmall" color="chrome">
                      {responsive.typography.body}
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="bodySmall" color="white">
                      Small Body Text
                    </Typography>
                    <Typography variant="bodySmall" color="chrome">
                      {responsive.typography.bodySmall}
                    </Typography>
                  </div>
                </div>
              </Card>
            </GridItem>
          </Grid>
        </ResponsiveContainer>
      </Section>

      {/* Brand Colors Demo */}
      <Section spacing="lg">
        <ResponsiveContainer>
          <Typography variant="headlineLg" color="gold" className="mb-8">
            Brand Color Palette
          </Typography>
          
          <Grid columns={{ mobile: 2, tablet: 4, desktop: 4 }} gap="md">
            <GridItem>
              <Card variant="default" padding="lg">
                <div 
                  className="w-full h-16 mb-8 rounded-lg border border-brand-chrome"
                  style={{ backgroundColor: tokens.colors.brand.background }}
                />
                <Typography variant="body" color="white" className="mb-0">
                  Background
                </Typography>
                <Typography variant="bodySmall" color="chrome">
                  {tokens.colors.brand.background}
                </Typography>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="default" padding="lg">
                <div 
                  className="w-full h-16 mb-8 rounded-lg border border-brand-chrome"
                  style={{ backgroundColor: tokens.colors.brand.white }}
                />
                <Typography variant="body" color="white" className="mb-0">
                  White
                </Typography>
                <Typography variant="bodySmall" color="chrome">
                  {tokens.colors.brand.white}
                </Typography>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="luxury" padding="lg">
                <div 
                  className="w-full h-16 mb-8 rounded-lg"
                  style={{ 
                    backgroundColor: tokens.colors.brand.gold,
                    boxShadow: tokens.effects.shadows.goldGlowSubtle 
                  }}
                />
                <Typography variant="body" color="white" className="mb-0">
                  Gold
                </Typography>
                <Typography variant="bodySmall" color="chrome">
                  {tokens.colors.brand.gold}
                </Typography>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="default" padding="lg">
                <div 
                  className="w-full h-16 mb-8 rounded-lg"
                  style={{ backgroundColor: tokens.colors.brand.chrome }}
                />
                <Typography variant="body" color="white" className="mb-0">
                  Chrome
                </Typography>
                <Typography variant="bodySmall" color="chrome">
                  {tokens.colors.brand.chrome}
                </Typography>
              </Card>
            </GridItem>
          </Grid>
        </ResponsiveContainer>
      </Section>

      {/* Spacing System Demo */}
      <Section spacing="lg">
        <ResponsiveContainer>
          <Typography variant="headlineLg" color="gold" className="mb-8">
            8px Base Spacing System ({device.device})
          </Typography>
          
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap="lg">
            {(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map((size) => (
              <GridItem key={size}>
                <Card variant="default" padding="md">
                  <Typography variant="body" color="gold" className="mb-0">
                    {size.toUpperCase()} - {responsive.spacing[size]}
                  </Typography>
                  <div 
                    className="bg-brand-gold/20 rounded"
                    style={{ height: responsive.spacing[size] }}
                  />
                </Card>
              </GridItem>
            ))}
          </Grid>
        </ResponsiveContainer>
      </Section>

      {/* Button Variants Demo */}
      <Section spacing="lg">
        <ResponsiveContainer>
          <Typography variant="headlineLg" color="gold" className="mb-8">
            WCAG 2.1 AA Compliant Buttons
          </Typography>
          
          <Grid columns={{ mobile: 1, tablet: 3, desktop: 3 }} gap="lg">
            <GridItem>
              <Card variant="default" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Primary Buttons
                </Typography>
                <Flex direction="column" gap="md">
                  <Button variant="primary" size="minimum">
                    Minimum (44px)
                  </Button>
                  <Button variant="primary" size="mobile">
                    Mobile (48px)
                  </Button>
                  <Button variant="primary" size="large">
                    Large (52px)
                  </Button>
                </Flex>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="default" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Secondary Buttons
                </Typography>
                <Flex direction="column" gap="md">
                  <Button variant="secondary" size="minimum">
                    Minimum
                  </Button>
                  <Button variant="secondary" size="mobile">
                    Mobile
                  </Button>
                  <Button variant="secondary" size="large">
                    Large
                  </Button>
                </Flex>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="default" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Ghost Buttons
                </Typography>
                <Flex direction="column" gap="md">
                  <Button variant="ghost" size="minimum">
                    Minimum
                  </Button>
                  <Button variant="ghost" size="mobile">
                    Mobile
                  </Button>
                  <Button variant="ghost" size="large">
                    Large
                  </Button>
                </Flex>
              </Card>
            </GridItem>
          </Grid>
        </ResponsiveContainer>
      </Section>

      {/* Card Variants Demo */}
      <Section spacing="lg">
        <ResponsiveContainer>
          <Typography variant="headlineLg" color="gold" className="mb-8">
            Glassmorphic Card Variants
          </Typography>
          
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 4 }} gap="md">
            <GridItem>
              <Card variant="default" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-0">
                  Default
                </Typography>
                <Typography variant="body" color="white">
                  Standard glassmorphic card with subtle styling
                </Typography>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="elevated" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-0">
                  Elevated
                </Typography>
                <Typography variant="body" color="white">
                  Enhanced shadow for depth and hierarchy
                </Typography>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="luxury" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-0">
                  Luxury
                </Typography>
                <Typography variant="body" color="white">
                  Premium styling with gold accents and glow
                </Typography>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="glassmorphic" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-0">
                  Pure Glass
                </Typography>
                <Typography variant="body" color="white">
                  Clean glassmorphic effect without extras
                </Typography>
              </Card>
            </GridItem>
          </Grid>
        </ResponsiveContainer>
      </Section>

      {/* Grid System Demo */}
      <Section spacing="lg">
        <ResponsiveContainer>
          <Typography variant="headlineLg" color="gold" className="mb-8">
            12-Column Responsive Grid System
          </Typography>
          
          <Card variant="default" padding="lg" className="mb-8">
            <Typography variant="headlineMd" color="gold" className="mb-8">
              Current Configuration
            </Typography>
            <Grid columns={{ mobile: 2, tablet: 4, desktop: 6 }} gap="sm">
              <GridItem><Typography variant="body" color="chrome">Mobile: 2 cols</Typography></GridItem>
              <GridItem><Typography variant="body" color="chrome">Tablet: 4 cols</Typography></GridItem>
              <GridItem><Typography variant="body" color="chrome">Desktop: 6 cols</Typography></GridItem>
              <GridItem><Typography variant="body" color="chrome">Auto-responsive</Typography></GridItem>
              <GridItem><Typography variant="body" color="chrome">8px base spacing</Typography></GridItem>
              <GridItem><Typography variant="body" color="chrome">Fluid layout</Typography></GridItem>
            </Grid>
          </Card>
          
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 4 }} gap="md">
            {Array.from({ length: 12 }, (_, i) => (
              <GridItem key={i}>
                <Card variant="default" padding="sm">
                  <Typography variant="bodySmall" color="gold" align="center">
                    Column {i + 1}
                  </Typography>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </ResponsiveContainer>
      </Section>

      {/* Form Components Demo */}
      <Section spacing="lg">
        <ResponsiveContainer>
          <Typography variant="headlineLg" color="gold" className="mb-8">
            Form Components
          </Typography>
          
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap="lg">
            <GridItem>
              <Card variant="luxury" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Input Fields
                </Typography>
                <Flex direction="column" gap="md">
                  <Input 
                    type="text" 
                    placeholder="Name" 
                    aria-label="Your name"
                  />
                  <Input 
                    type="email" 
                    placeholder="Email address" 
                    aria-label="Your email"
                  />
                  <Input 
                    type="tel" 
                    placeholder="Phone number" 
                    aria-label="Your phone"
                  />
                </Flex>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="elevated" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Interactive Elements
                </Typography>
                <Flex direction="column" gap="md">
                  <Button variant="primary">
                    Submit Form
                  </Button>
                  <Button variant="secondary">
                    Cancel
                  </Button>
                  <Typography variant="bodySmall" color="chrome">
                    All inputs are WCAG 2.1 AA compliant with proper focus management
                  </Typography>
                </Flex>
              </Card>
            </GridItem>
          </Grid>
        </ResponsiveContainer>
      </Section>

      {/* Responsive Display Demo */}
      <Section spacing="lg">
        <ResponsiveContainer>
          <Typography variant="headlineLg" color="gold" className="mb-8">
            Device-Aware Rendering
          </Typography>
          
          <Grid columns={{ mobile: 1, tablet: 3, desktop: 3 }} gap="md">
            <GridItem>
              <Card variant="luxury" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Mobile Only
                </Typography>
                <Show on={['mobile']}>
                  <Typography variant="body" color="white">
                    ✅ This content is only visible on mobile devices
                  </Typography>
                </Show>
                <Show on={['tablet', 'desktop']}>
                  <Typography variant="body" color="chrome">
                    📱 You're viewing this on a larger screen
                  </Typography>
                </Show>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="luxury" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Tablet Only
                </Typography>
                <Show on={['tablet']}>
                  <Typography variant="body" color="white">
                    ✅ This content is only visible on tablet devices
                  </Typography>
                </Show>
                <Show on={['mobile', 'desktop']}>
                  <Typography variant="body" color="chrome">
                    💻 You're viewing this on a different device
                  </Typography>
                </Show>
              </Card>
            </GridItem>
            
            <GridItem>
              <Card variant="luxury" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Desktop Only
                </Typography>
                <Show on={['desktop']}>
                  <Typography variant="body" color="white">
                    ✅ This content is only visible on desktop devices
                  </Typography>
                </Show>
                <Show on={['mobile', 'tablet']}>
                  <Typography variant="body" color="chrome">
                    🖥️ You're viewing this on a smaller screen
                  </Typography>
                </Show>
              </Card>
            </GridItem>
          </Grid>
        </ResponsiveContainer>
      </Section>

      {/* Motion and Accessibility Demo */}
      <Section spacing="lg">
        <ResponsiveContainer>
          <Typography variant="headlineLg" color="gold" className="mb-8">
            Motion & Accessibility
          </Typography>
          
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap="lg">
            <GridItem>
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card variant="luxury" padding="lg">
                  <Typography variant="headlineMd" color="gold" className="mb-8">
                    Motion Wrapper
                  </Typography>
                  <Typography variant="body" color="white" className="mb-8">
                    This card animates on load but respects reduced motion preferences
                  </Typography>
                  <Typography variant="bodySmall" color="chrome">
                    Reduced Motion: {device.prefersReducedMotion ? 'Disabled' : 'Enabled'}
                  </Typography>
                </Card>
              </MotionWrapper>
            </GridItem>
            
            <GridItem>
              <Card variant="elevated" padding="lg">
                <Typography variant="headlineMd" color="gold" className="mb-8">
                  Accessibility Features
                </Typography>
                <Flex direction="column" gap="sm">
                  <Typography variant="body" color="white">
                    ✅ WCAG 2.1 AA Compliant
                  </Typography>
                  <Typography variant="body" color="white">
                    ✅ 44px+ Touch Targets
                  </Typography>
                  <Typography variant="body" color="white">
                    ✅ Semantic HTML
                  </Typography>
                  <Typography variant="body" color="white">
                    ✅ Focus Management
                  </Typography>
                  <Typography variant="body" color="white">
                    ✅ Screen Reader Support
                  </Typography>
                  <Typography variant="body" color="white">
                    ✅ Reduced Motion Support
                  </Typography>
                </Flex>
              </Card>
            </GridItem>
          </Grid>
        </ResponsiveContainer>
      </Section>

      {/* Implementation Guide */}
      <Section spacing="lg">
        <ResponsiveContainer>
          <Typography variant="headlineLg" color="gold" className="mb-8">
            Implementation Guide
          </Typography>
          
          <Card variant="luxury" padding="lg">
            <Typography variant="headlineMd" color="gold" className="mb-8">
              Quick Start
            </Typography>
            
            <div className="space-y-8">
              <div>
                <Typography variant="body" color="white" weight="semibold" className="mb-0">
                  1. Wrap your app with MedusaDesignSystemProvider:
                </Typography>
                <Card variant="default" padding="md">
                  <Typography variant="bodySmall" color="chrome" className="font-mono">
                    {`<MedusaDesignSystemProvider initialLanguage="DE" debugMode={true}>`}
                    <br />
                    {`  <YourApp />`}
                    <br />
                    {`</MedusaDesignSystemProvider>`}
                  </Typography>
                </Card>
              </div>
              
              <div>
                <Typography variant="body" color="white" weight="semibold" className="mb-0">
                  2. Use design system hooks:
                </Typography>
                <Card variant="default" padding="md">
                  <Typography variant="bodySmall" color="chrome" className="font-mono">
                    {`const { tokens, device, language } = useMedusaDesignSystem();`}
                    <br />
                    {`const { isMobile, spacing } = useMedusaResponsive();`}
                  </Typography>
                </Card>
              </div>
              
              <div>
                <Typography variant="body" color="white" weight="semibold" className="mb-0">
                  3. Build with utility components:
                </Typography>
                <Card variant="default" padding="md">
                  <Typography variant="bodySmall" color="chrome" className="font-mono">
                    {`<Section spacing="lg">`}
                    <br />
                    {`  <Grid columns={{ mobile: 1, desktop: 3 }}>`}
                    <br />
                    {`    <Card variant="luxury">`}
                    <br />
                    {`      <Typography variant="headlineMd" color="gold">`}
                    <br />
                    {`        Perfect!`}
                    <br />
                    {`      </Typography>`}
                    <br />
                    {`    </Card>`}
                    <br />
                    {`  </Grid>`}
                    <br />
                    {`</Section>`}
                  </Typography>
                </Card>
              </div>
            </div>
          </Card>
        </ResponsiveContainer>
      </Section>

      <Spacing size="xxl" />
    </div>
  );
}

// Export the complete style guide
export default function MedusaStyleGuide() {
  return (
    <MedusaDesignSystemProvider 
      initialLanguage="EN"
      debugMode={true}
      enableMetrics={true}
    >
      <StyleGuideContent />
    </MedusaDesignSystemProvider>
  );
}