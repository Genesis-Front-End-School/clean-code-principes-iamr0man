/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    babelOptions: {
      parserOpts: {
        plugins: ['jsx'],
      },
    },
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'prettier',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-typescript',
  ],
};
