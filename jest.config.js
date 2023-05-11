module.exports = {
  // we can actually use "@/components/item.vue" to access components in a simple way
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // the file types we want jest to accept
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    // tell Jest to handle `*.vue` files
    'vue',
  ],
  // transformations we want jest to apply
  transform: {
    // process `*.vue` files with `vue-jest`
    '.*\\.(vue)$': '@vue/vue3-jest',
    '.*\\.(ts)$': 'ts-jest',
    // process js files with jest
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  // we will use this to create snapshot __tests__
  snapshotSerializers: ['jest-serializer-vue'],
  // used for jsdom to mimic a real browser with a real url
  testURL: 'http://localhost/',
  // we should collect coverage
  collectCoverage: true,
  // set a directory for coverage cache
  coverageDirectory: '<rootDir>/__coverage__',
  // set patterns to ignore for coverate (["/node_modules/"]) is the default value
  coveragePathIgnorePatterns: ['/node_modules/'],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};
