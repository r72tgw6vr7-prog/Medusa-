import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '@/components/atoms/Button/Button';

describe('Button Component', () => {
  it('renders button with correct text', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeDefined();
    expect(buttonElement.textContent).toContain('Click Me');
  });
});
