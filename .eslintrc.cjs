/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  "root": true,
  "globals": {
    "defineProps": "readonly"
  },
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest/globals": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 2021
  },
  "plugins": ['jest'],
  "rules": {
    "@typescript-eslint/no-namespace": "off"
  }
}
