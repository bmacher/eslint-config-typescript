const baseConfig = require('./index');

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  rules: baseConfig.rules,
  overrides: baseConfig.overrides,
};
