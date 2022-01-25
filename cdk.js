const baseConfig = require('./index');

/**
 * @type {import("eslint").Linter.Config}
 */
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

      // Rules will not be merged, therefore we have to reapply the
      // conventions from base config, but omit 'error' at index 0
      ...baseConfig.rules['@typescript-eslint/naming-convention'].slice(1)
    ],
  },
};

