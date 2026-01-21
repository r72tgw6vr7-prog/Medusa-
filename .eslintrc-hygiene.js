/*
  Hygiene ESLint Rules (copy/paste)

  Repo note:
  - This repo currently runs ESLint via `eslint.config.js` (Flat Config).
  - This file is intentionally provided as a *copy/paste rule bundle*.

  Integration options:
  - Flat config: import this file and spread `rules` into the relevant config block.
  - Legacy config: merge `rules` into an `.eslintrc.*`.
*/

module.exports = {
  rules: {
    // =========================
    // Import hygiene
    // =========================

    // Ban deep relative imports; require `@/` aliases for cross-tree imports.
    // Keeps refactors safe and prevents "../../../../" spaghetti.
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          '../../../*',
          '../../../../*',
          '../../../../../*',
          '../../../../../../*',
          '../../../../../../../*',
          '../../../../../../../../*'
        ]
      }
    ],

    // Optional but strongly recommended: fail fast on cycles at lint-time too.
    // Madge remains the authoritative check.
    'import/no-cycle': ['error', { maxDepth: 1 }],

    // Enforce that you don’t import deep internal modules (barrel import discipline).
    // Tune `allow` as you migrate to the Phase 2 structure.
    'import/no-internal-modules': [
      'error',
      {
        forbid: [
          // Disallow deep imports inside components (enforce barrels)
          '@/components/**/**',
          // Disallow deep imports inside services/utils (enforce public surface)
          '@/services/**/**',
          '@/utils/**/**'
        ],
        allow: [
          // Allow single-level feature imports like `@/components/ui/button`
          '@/components/*/*',
          '@/services/*',
          '@/utils/*',
          '@/hooks/*',
          '@/types/*'
        ]
      }
    ],

    // =========================
    // File size / maintainability
    // =========================

    // Enforce the "300 LOC" policy (warn by default; escalate to error when ready).
    // To justify a large file, use: `/* eslint-disable max-lines *\/` plus folder README rationale.
    'max-lines': [
      'warn',
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true
      }
    ]
  }
};
