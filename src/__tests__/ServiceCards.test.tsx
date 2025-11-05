import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServiceCards } from '../components/ServiceCards';

describe('ServiceCards Component', () => {
  it('renders service cards section', () => {
    render(<ServiceCards />);
    const heading = screen.getByText(/Alle Services Entdecken/i);
    expect(heading).toBeDefined();
  });

  it('renders tattoo and piercing cards', () => {
    render(<ServiceCards />);
    const tattooCard = screen.getByText(/Permanent Kunst/i);
    const piercingCard = screen.getByText(/Luxury Schmuck/i);
    expect(tattooCard).toBeDefined();
    expect(piercingCard).toBeDefined();
  });
});
