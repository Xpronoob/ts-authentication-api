// @ts-check

import url from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
// import tseslintInternalPlugin from '@typescript-eslint/eslint-plugin-internal';
// import deprecationPlugin from 'eslint-plugin-deprecation';
// import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
// import eslintPluginPlugin from 'eslint-plugin-eslint-plugin';
// import importPlugin from 'eslint-plugin-import';
// import jestPlugin from 'eslint-plugin-jest';
// import jsdocPlugin from 'eslint-plugin-jsdoc';
// import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
// import reactPlugin from 'eslint-plugin-react';
// import reactHooksPlugin from 'eslint-plugin-react-hooks';
// import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
// import unicornPlugin from 'eslint-plugin-unicorn';
// import globals from 'globals';
import tseslint from 'typescript-eslint'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
// const compat = new FlatCompat({ baseDirectory: __dirname });

export default tseslint.config(
  // register all of the plugins up-front
  {
    // note - intentionally uses computed syntax to make it easy to sort the keys
    plugins: {
      ['@typescript-eslint']: tseslint.plugin,
      // ['@typescript-eslint/internal']: tseslintInternalPlugin,
      // ['deprecation']: deprecationPlugin,
      // ['eslint-comments']: eslintCommentsPlugin,
      // ['eslint-plugin']: eslintPluginPlugin,
      // ['import']: importPlugin,
      // ['jest']: jestPlugin,
      // ['jsdoc']: jsdocPlugin,
      // ['jsx-a11y']: jsxA11yPlugin,
      // ['react-hooks']: reactHooksPlugin,
      // ['react']: reactPlugin,
      // ['simple-import-sort']: simpleImportSortPlugin,
      // ['unicorn']: unicornPlugin,
    },
  },
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: [
      '**/jest.config.js',
      '**/node_modules/**',
      '**/dist/**',
      '**/fixtures/**',
      '**/coverage/**',
      '**/__snapshots__/**',
      '**/.docusaurus/**',
      '**/build/**',
      // Files copied as part of the build
      'packages/types/src/generated/**/*.ts',
      // Playground types downloaded from the web
      'packages/website/src/vendor',
      // see the file header in eslint-base.test.js for more info
      'packages/rule-tester/tests/eslint-base',
    ],
  },

  // extends ...
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  // jsdocPlugin.configs['flat/recommended-typescript-error'],
)
