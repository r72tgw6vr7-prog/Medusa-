import React from 'react';
import { render, screen } from '@testing-library/react';
import { StudioShowcase } from '../../components/StudioShowcase';
import { SalonCarousel } from '../../components/organisms/SalonCarousel';
import { describe, it, expect, vi } from 'vitest';

// Mock the foundation hooks as they might not be available in the test environment
vi.mock('../../foundation', () => ({
  useBusinessDesignSystem: () => ({
    language: 'EN',
    theme: 'dark',
    tokens: {}
  })
}));

describe('StudioShowcase Component', () => {
  it('renders without crashing', () => {
    render(<StudioShowcase />);
    // Check that the main sections are rendered
    expect(screen.getByText('Satisfied Customers')).toBeDefined();
    expect(screen.getByText('Years of Experience')).toBeDefined();
    expect(screen.getByText('Tattoos & Artworks Collection')).toBeDefined();
  });

  it('accepts a custom heading prop', () => {
    render(<StudioShowcase heading="CUSTOM" />);
    expect(screen.getByText('CUSTOM')).toBeDefined();
  });
  
  // Test for compatibility between components that might be using the same resources
  it('does not conflict with SalonCarousel when rendered together', () => {
    render(
      <>
        <div data-testid="studio-showcase">
          <StudioShowcase heading="STUDIO" />
        </div>
        <div data-testid="salon-carousel">
          <SalonCarousel heading="SALON" />
        </div>
      </>
    );
    
    // Verify both components rendered their headers
    expect(screen.getByText('STUDIO')).toBeDefined();
    expect(screen.getByText('SALON')).toBeDefined();
    
    // Check that the containers were rendered properly
    expect(screen.getByTestId('studio-showcase')).toBeDefined();
    expect(screen.getByTestId('salon-carousel')).toBeDefined();
  });
});
