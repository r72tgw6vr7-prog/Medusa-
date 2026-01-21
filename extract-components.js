const fs = require('fs');
const path = require('path');

const componentFiles = [
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/AnalyticsProvider.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/GoogleMap.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/JapanesePrinciples.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/LazySection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/Meta.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/PageHeading.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/PreFooterBookingCTA.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/PricingSection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/RadialStat.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/ScrollToTop.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/SectionHeading.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/accessibility/SkipLink.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/accessibility/VisuallyHidden.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/atoms/Icon/Icon.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/atoms/TrustBadge.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/booking/BookingModalMobile.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/booking/steps/ConfirmationStep.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/booking/steps/FeedbackStates.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/booking/steps/PaymentStep.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/booking/steps/PersonalInfoStep.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/booking/steps/ServiceSelectionStep.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/cards/ArtistCard.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/cards/ArtistCardJapanese.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/layout-grid-demo.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/layout/ErrorBoundary.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/layout/Footer.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/ArtistBioModal.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/BeforeAfterCard.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/Card/ArtistCard.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/Card/ServiceCards.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/ContactInfoCard.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/CookieConsentBanner.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/FAQItem.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/FocusTrap.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/GDPRCompliance.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/LanguageToggle.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/MainNavigation.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/NewsletterForm.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/PriceCard.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/ProcessStepCard.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/ReviewCard.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/ServiceCard.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/StatsBar.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/TrustBadgeCarousel.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/TrustBadgesBar.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/TrustBadgesMarquee.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/molecules/TrustSignals.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/organisms/ServicesPage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/organisms/StudioCarousel.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/organisms/TestimonialsCarousel.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/pages/Footer.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/pages/ServicesPageInteractive.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/pages/TeamGrid.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/sections/ArtistsSection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/seo/FAQSection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/seo/LocationSection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/ui/BladeAccordion.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/ui/Card.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/ui/Container.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/ui/LuxuryButton.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/ui/Section.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/ui/button.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/ui/hero-parallax.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/ui/input/MedusaInput.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/components/ui/layout-grid.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/sections/ArtistSection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/sections/BeforeAfterSection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/sections/BookingSection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/sections/ContactSection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/sections/GallerySection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/sections/PartnersAndTestimonialsSection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/sections/ProcessTimeline/ProcessTimeline.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/sections/ServicesSection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/sections/TrustBadges.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/sections/TrustSignalsSection.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/AGBPage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/AftercarePage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/ArtistsPage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/BookingPage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/ColorTestPage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/ContactPage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/DatenschutzPage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/FAQPageNew.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/GalleryPage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/HomePage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/ImpressumPage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/LegalPage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/pages/NotFoundPage.tsx',
  '/Volumes/Untitled 2/Work/CascadeProjects/Websites/archive /medusa/src/app/playground/page.tsx'
];

function extractComponentInfo(filePath, content) {
  const components = [];
  
  // Find interface/type definitions for props
  const propsInterfaceRegex = /(?:export\s+)?(?:interface|type)\s+(\w+Props)\s*(?:extends[^{]+)?\{([^}]+)\}/gs;
  const propsMap = {};
  let match;
  
  while ((match = propsInterfaceRegex.exec(content)) !== null) {
    const propsName = match[1];
    const propsBody = match[2];
    const props = propsBody
      .split(';')
      .map(p => p.trim())
      .filter(p => p && !p.startsWith('//') && !p.startsWith('/*'))
      .map(p => p.replace(/\/\*.*?\*\//g, '').trim());
    propsMap[propsName] = props;
  }
  
  // Find default exports
  const defaultExportRegex = /export\s+default\s+(?:function\s+)?(\w+)/;
  const defaultMatch = defaultExportRegex.exec(content);
  const defaultExport = defaultMatch ? defaultMatch[1] : null;
  
  // Find named function components
  const namedFunctionRegex = /export\s+(?:const|function)\s+(\w+)(?:\s*[:=]\s*(?:React\.FC|forwardRef|(?:\([^)]*\)\s*=>)))/g;
  while ((match = namedFunctionRegex.exec(content)) !== null) {
    const componentName = match[1];
    const propsName = `${componentName}Props`;
    const props = propsMap[propsName] || [];
    
    // Extract description from JSDoc or comment above component
    const lines = content.substring(0, match.index).split('\n');
    let description = '';
    for (let i = lines.length - 1; i >= Math.max(0, lines.length - 10); i--) {
      const line = lines[i].trim();
      if (line.includes('PURPOSE:') || line.includes('@description') || line.startsWith('*')) {
        description = line.replace(/[*\/]/g, '').replace(/PURPOSE:|@description/g, '').trim();
        if (description) break;
      }
    }
    
    components.push({
      name: componentName,
      filePath,
      exportType: componentName === defaultExport ? 'default' : 'named',
      props,
      description: description || `${componentName} component`
    });
  }
  
  return components;
}

const allComponents = [];

componentFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const components = extractComponentInfo(filePath, content);
    allComponents.push(...components);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log(JSON.stringify(allComponents, null, 2));
