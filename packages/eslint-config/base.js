import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      turbo: turboPlugin,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // External packages (library imports - anything that doesn't start with . or @)
            ['^(?!@|\\.)'],
            // Source code imports (path aliases like @/)
            ['^@/'],
            // Internal packages (workspace packages starting with @shotly)
            ['^@shotly/'],
            // Relative imports (relative paths like ./ or ../)
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'turbo/no-undeclared-env-vars': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.turbo/**',
      '.env/**',
      '.env.local/**',
      '.env.development.local/**',
      '.env.test.local/**',
      '.env.production.local/**',
    ],
  },
];
