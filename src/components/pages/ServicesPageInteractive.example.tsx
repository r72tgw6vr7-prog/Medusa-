// ============================================
// EXAMPLE: ServicesPageInteractive Usage
// ============================================
// This example shows how to integrate the ServicesPageInteractive component
// into your existing page structure

import React from 'react';
import { ServicesPageInteractive } from '../pages/ServicesPageInteractive';
import { AppProvider } from '../../../core/state/AppContext';

// Example 1: Standalone Services Page
export function ServicesPage() {
  return (
    <div className='min-h-screen bg-[#1A1A1A]'>
      {/* Your existing navigation component */}
      {/* <MainNavigation /> */}

      {/* Services Interactive Section */}
      <ServicesPageInteractive />

      {/* Your existing footer component */}
      {/* <Footer /> */}
    </div>
  );
}

// Example 2: As part of a larger page with other sections
export function HomePage() {
  return (
    <div className='min-h-screen bg-[#1A1A1A]'>
      {/* Hero Section */}
      <section className='py-24'>
        <h1>Welcome to Medusa Tattoo</h1>
      </section>

      {/* Services Section */}
      <ServicesPageInteractive className='mt-16' />

      {/* Other sections */}
      <section className='py-24'>
        <h2>About Us</h2>
      </section>
    </div>
  );
}

// Example 3: With App Context Provider (Required for booking functionality)
export function App() {
  return (
    <AppProvider initialLanguage='DE'>
      <div className='min-h-screen bg-[#1A1A1A]'>
        <ServicesPageInteractive />

        {/* Booking Flow Modal will be handled by AppContext */}
        {/* Add your booking modal component here if needed */}
      </div>
    </AppProvider>
  );
}

// Example 4: Custom styling and positioning
export function CustomServicesSection() {
  return (
    <div className='relative'>
      {/* Custom background or decorative elements */}
      <div className='absolute inset-0 bg-linear-to-b from-transparent to-black/20' />

      {/* Services component with custom styling */}
      <ServicesPageInteractive className='relative z-10 py-32' />
    </div>
  );
}

export default ServicesPage;
