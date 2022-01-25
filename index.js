/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      impliedStrict: true,
      classes: true,
    },
    sourceType: 'module',
  },

  extends: [
    'airbnb-typescript/base',
  ],

  plugins: [
    'import',
    '@typescript-eslint',
    'prettier',
  ],

  env: {
    node: true,
  },

  settings: {
    'import/resolver': {
      typescript: {
        // To resolve local dependencies under paths: {}
        project: '.',
      },
      // To resolve @types like aws-lambda
      node: {
        extensions: ['.js', '.ts', '.tsx', '.d.ts'],
        paths: ['node_modules/', 'node_modules/@types/'],
      },
    },
  },

  rules: {
    'import/prefer-default-export': 'off',
    'max-params': ['error', 3],
    'no-console': 'off',

    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true,
        },
      },
    ],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^(?![I][A-Z])',
          match: true,
        },
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'function',
        format: ['camelCase'],
      },
      {
        selector: 'classProperty',
        format: ['camelCase'],
      },
      {
        selector: 'objectLiteralProperty',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
    ],
  },
  overrides: [
    {
      files: 'scripts/**/*.js',
      rules: {
        // To import dev dependencies in scripts/*
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: '**/*.(spec|test).ts',
      rules: {
        // To import dev dependencies in tests (e.g. @jest/globals)
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
};
