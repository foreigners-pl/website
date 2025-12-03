// Import theme values from our single source of truth
const { theme: appTheme } = require('./lib/theme.ts');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pull colors directly from theme.ts
        'brand-primary': appTheme.colors.primary,
        'brand-primary-hover': appTheme.colors.primaryHover,
        'brand-primary-light': appTheme.colors.primaryLight,
        'brand-secondary': appTheme.colors.secondary,
      },
    },
  },
  plugins: [],
};