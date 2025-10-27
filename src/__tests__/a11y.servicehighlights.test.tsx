import React from 'react';
import { render } from '@testing-library/react';
import { toHaveNoViolations, axe } from 'jest-axe';
import { ServiceHighlights } from '../components/organisms/ServiceHighlights';

expect.extend(toHaveNoViolations);

test('ServiceHighlights has no basic accessibility violations', async () => {
  const { container } = render(<ServiceHighlights onServiceClick={() => {}} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
