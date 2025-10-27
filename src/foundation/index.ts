/**
 * Foundation module exports
 *
 * This file serves as the entry point for the foundation module, making it easier to import
 * design system components and tokens throughout the application.
 */

import {
  SimpleMedusaProvider,
  useMedusaDesignSystem,
  designSystemTokens,
} from './SimpleMedusaProvider';

// Re-export design tokens
export { designTokens } from '../design-tokens';

// Export everything
export { SimpleMedusaProvider, useMedusaDesignSystem, designSystemTokens };

// Re-export for convenience and backward compatibility
export const MedusaDesignSystemProvider = SimpleMedusaProvider;
