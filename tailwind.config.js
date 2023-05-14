/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    screens: {
      tablet: { max: '1280px' },
      mobile: { max: '1000px' },
    },
  },
  plugins: [],
};
