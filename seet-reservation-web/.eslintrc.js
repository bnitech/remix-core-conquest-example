/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'airbnb',
    `prettier`,
  ],
  rules: {
    // 'react/prefer-stateless-function': 0,
    // 'react/jsx-filename-extension': 0,
    // 'react/jsx-one-expression-per-line': 0,
  },
};
