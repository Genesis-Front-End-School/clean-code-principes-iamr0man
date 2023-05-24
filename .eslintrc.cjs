/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  globals: {
    defineProps: 'readonly',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/base',
    '@vue/typescript/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
  },
  plugins: ['vue', 'html', 'jest', 'import', '@typescript-eslint'],
  rules: {
    'no-param-reassign': [2, { props: false }],
    'import/no-unresolved': 'error',
    /**
     * @desc Disallow custom TypeScript modules and namespaces.
     * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-namespace.md
     */
    '@typescript-eslint/no-namespace': 'off',

    /**
     * @link https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
     * @desc
     * Forbid the import of external modules that are not declared in the package.json's dependencies, devDependencies, optionalDependencies,
     * peerDependencies, or bundledDependencies. The closest parent package.json will be used. If no package.json is found, the rule will not lint anything.
     * This behavior can be changed with the rule option packageDir.
     */
    'import/no-extraneous-dependencies': 'off',

    /**
     * @link https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
     * @desc
     * Some file resolve algorithms allow you to omit the file extension within the import source path.
     * For example the node resolver can resolve ./foo/bar to the absolute path /User/someone/foo/bar.js because the .js extension is resolved automatically by default.
     * Depending on the resolver you can configure more extensions to get resolved automatically.
     */
    'import/extensions': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
};
