module.exports = {
  extends: [
    './index.js',
  ],
  
  rules: {
    'no-new': 'off',

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'objectLiteralProperty',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
    ],
  },
};

