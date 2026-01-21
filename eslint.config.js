import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import medusaPlugin from './eslint-plugin-medusa.js';

const HYGIENE = process.env.HYGIENE === '1';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'import': importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'medusa': medusaPlugin
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': HYGIENE ? 'off' : 'warn',
      '@typescript-eslint/no-unused-vars': HYGIENE
        ? 'off'
        : [
            'warn',
            {
              argsIgnorePattern: '^_',
              varsIgnorePattern: '^_'
            }
          ],
      
      // React rules
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': HYGIENE ? 'off' : 'warn',
      
      // Import rules
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/default': 'error',
      'import/namespace': 'error',
      
      // Accessibility rules
      'jsx-a11y/anchor-is-valid': HYGIENE ? 'off' : 'warn',
      'jsx-a11y/click-events-have-key-events': HYGIENE ? 'off' : 'warn',
      'jsx-a11y/no-static-element-interactions': HYGIENE ? 'off' : 'warn',
      'jsx-a11y/aria-props': 'off', // Allow boolean expressions in ARIA attributes
      
      // General rules
      'no-console': HYGIENE ? 'off' : ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': HYGIENE ? 'off' : 'warn',
      
      // Medusa Design System Enforcement
      'medusa/enforce-8px-spacing': 'error',
      'medusa/enforce-card-layout': 'error',
      'medusa/enforce-transitions': 'error',
      'medusa/enforce-no-arbitrary-values': HYGIENE ? 'off' : 'warn'
    }
  },
  {
    // Hygiene: enforce stricter module boundaries on new/critical code paths only.
    // This keeps `npm run hygiene` green while you migrate legacy folders incrementally.
    files: [
      'src/components/features/**/*.{ts,tsx}',
      'src/utils/**/*.{ts,tsx}',
      'src/services/**/*.{ts,tsx}',
      'src/hooks/**/*.{ts,tsx}'
    ],
    ignores: [
      // Legacy large files (tracked by audit; migrate/split later)
      'src/utils/analytics.ts',
      'src/hooks/useKeyboardNav.ts',
      'src/services/paymentService.ts',
      'src/services/integrationTesting.ts',
      'src/services/emailService.ts',
      'src/services/zohoCRMService.ts'
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '../../../*',
            '../../../../*',
            '../../../../../*',
            '../../../../../../*'
          ]
        }
      ],
      'import/no-internal-modules': [
        'error',
        {
          allow: ['**']
        }
      ],
      'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }]
    }
  },
  {
    // Override for test files - relax import rules since testing library exports aren't properly resolved
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      'import/named': 'off',
      'import/default': 'off',
      'import/namespace': 'off',
      'no-restricted-imports': 'off'
    }
  }
];