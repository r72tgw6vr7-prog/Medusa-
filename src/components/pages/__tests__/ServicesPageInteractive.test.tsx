import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppProvider } from '../../../../core/state/AppContext';
import { ServicesPageInteractive } from '../ServicesPageInteractive';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react');

  return {
    motion: {
      div: (props) => React.createElement('div', props),
      button: (props) => React.createElement('button', props),
      article: (props) => React.createElement('article', props),
    },
    AnimatePresence: ({ children }) => children,
  };
});

// Mock the foundation components
jest.mock('../../../../foundation/MedusaUtilityComponents', () => {
  const React = require('react');
  return {
    ResponsiveContainer: ({ children }) =>
      React.createElement('div', { 'data-testid': 'responsive-container' }, children),
    Grid: ({ children }) => React.createElement('div', { 'data-testid': 'grid' }, children),
    GridItem: ({ children }) =>
      React.createElement('div', { 'data-testid': 'grid-item' }, children),
    Typography: ({ children, variant, className }) =>
      React.createElement(
        'span',
        { 'data-testid': `typography-${variant || 'default'}`, className },
        children,
      ),
    Button: ({ children, onClick, className }) =>
      React.createElement(
        'button',
        { onClick, className, 'data-testid': 'medusa-button' },
        children,
      ),
  };
});

// Mock the useApp hook
const mockOpenBooking = jest.fn();
const mockUseApp = jest.fn(() => ({
  openBooking: mockOpenBooking,
  language: 'DE',
}));

jest.mock('../../../../core/state/AppContext', () => {
  const React = require('react');
  return {
    AppProvider: ({ children }) => React.createElement('div', null, children),
    useApp: () => mockUseApp(),
  };
});

// Test wrapper (using mocked AppProvider)
const TestWrapper = ({ children }) => React.createElement('div', null, children);

describe('ServicesPageInteractive', () => {
  beforeEach(() => {
    // Clear any previous DOM state
    document.body.innerHTML = '';
    // Reset mocks
    mockOpenBooking.mockClear();
    mockUseApp.mockClear();
  });

  test('renders without crashing', () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    expect(screen.getByText('Unsere Services')).toBeInTheDocument();
  });

  test('displays all category cards', () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    // Check for all category titles
    expect(screen.getByText('Unsere Services')).toBeInTheDocument(); // Page title
    expect(screen.getByText('Piercing')).toBeInTheDocument();
    expect(screen.getByText('Produkte')).toBeInTheDocument();
    expect(screen.getByText('Plasma Therapie')).toBeInTheDocument();
  });

  test('displays default tattoo services', () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    // Check for default tattoo services
    expect(screen.getByText('Individuelle Tattoos')).toBeInTheDocument();
    expect(screen.getByText('Cover-Up Tattoos')).toBeInTheDocument();
    expect(screen.getByText('Design-Beratung')).toBeInTheDocument();
  });

  test('switches categories when clicked', async () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    // Click on piercing category
    const piercingButton = screen.getByRole('button', { name: /Select Piercing category/i });
    fireEvent.click(piercingButton);

    // Wait for transition and check piercing services appear
    await waitFor(() => {
      expect(screen.getByText('Body Piercing')).toBeInTheDocument();
      expect(screen.getByText('Intim Piercing')).toBeInTheDocument();
      expect(screen.getByText('Schmuckwechsel')).toBeInTheDocument();
    });
  });

  test('handles category button states correctly', () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    // Check that tattoo button is initially active
    const tattooButton = screen.getByRole('button', { name: /Select Tattoos category/i });
    expect(tattooButton).toHaveAttribute('aria-pressed', 'true');

    // Check that other buttons are not active
    const piercingButton = screen.getByRole('button', { name: /Select Piercing category/i });
    expect(piercingButton).toHaveAttribute('aria-pressed', 'false');
  });

  test('booking buttons trigger booking flow', () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    // Find and click a booking button
    const bookingButtons = screen.getAllByTestId('medusa-button');
    fireEvent.click(bookingButtons[0]);

    // Verify booking was triggered
    expect(mockOpenBooking).toHaveBeenCalledWith({ service: 'custom-tattoo' });
  });

  test('handles image loading errors gracefully', () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    // Find service images
    const images = screen.getAllByRole('img');

    // Simulate image error
    fireEvent.error(images[0]);

    // Check that the image source was changed to placeholder
    expect(images[0]).toHaveAttribute('src', '/images/services/placeholder-service.jpg');
  });

  test('applies custom className', () => {
    const customClass = 'my-custom-class';
    render(
      React.createElement(
        TestWrapper,
        null,
        React.createElement(ServicesPageInteractive, { className: customClass }),
      ),
    );

    // Check that the custom class is applied to the main section
    const section = document.querySelector('section');
    expect(section).toHaveClass(customClass);
  });

  test('has proper accessibility attributes', () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    // Check for ARIA attributes
    const categoryButtons = screen.getAllByRole('button');
    categoryButtons.forEach((button) => {
      expect(button).toHaveAttribute('aria-pressed');
      expect(button).toHaveAttribute('aria-label');
    });

    // Check for live region
    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });

  test('prevents rapid category switching', async () => {
    render(
      React.createElement(TestWrapper, null, React.createElement(ServicesPageInteractive, null)),
    );

    const piercingButton = screen.getByRole('button', { name: /Select Piercing category/i });
    const productsButton = screen.getByRole('button', { name: /Select Produkte category/i });

    // Click rapidly between categories
    fireEvent.click(piercingButton);
    fireEvent.click(productsButton);

    // Should only process the first click during animation
    await waitFor(() => {
      expect(screen.getByText('Body Piercing')).toBeInTheDocument();
    });
  });
});
