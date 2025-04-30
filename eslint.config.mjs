import js from '@eslint/js';
import globals from 'globals';
import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import vitestPlugin from 'eslint-plugin-vitest';
import checkFilePlugin from 'eslint-plugin-check-file';

export default [
  // Base configuration for all files
  {
    ignores: [
      'node_modules/*',
      'public/mockServiceWorker.js',
      'generators/*',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  // Next.js specific configuration
  {
    files: ['**/*.js', '**/*.mjs', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...(nextPlugin.configs?.['core-web-vitals']?.rules || {}),
      '@next/next/no-img-element': 'off',
    },
  },
  // TypeScript configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      'testing-library': testingLibraryPlugin,
      'jest-dom': jestDomPlugin,
      vitest: vitestPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      // Import rules
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // disables cross-feature imports
            {
              target: './src/features/auth',
              from: './src/features',
              except: ['./auth'],
            },
            {
              target: './src/features/comments',
              from: './src/features',
              except: ['./comments'],
            },
            {
              target: './src/features/discussions',
              from: './src/features',
              except: ['./discussions'],
            },
            {
              target: './src/features/teams',
              from: './src/features',
              except: ['./teams'],
            },
            {
              target: './src/features/users',
              from: './src/features',
              except: ['./users'],
            },
            // enforce unidirectional codebase
            {
              target: './src/features',
              from: './src/app',
            },
            {
              target: [
                './src/components',
                './src/hooks',
                './src/lib',
                './src/types',
                './src/utils',
              ],
              from: ['./src/features', './src/app'],
            },
          ],
        },
      ],
      'import/no-cycle': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // Accessibility rules
      'jsx-a11y/anchor-is-valid': 'off',
      
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      
      // Style rules
      'linebreak-style': ['error', 'unix'],
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },
  // File naming conventions
  {
    files: ['src/**/*'],
    plugins: {
      'check-file': checkFilePlugin,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          '!(src/app)/**/*': 'KEBAB_CASE',
          '!(**/__tests__)/**/*': 'KEBAB_CASE',
        },
      ],
    },
  },
];