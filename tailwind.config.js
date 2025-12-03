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
        'brand-primary': '#AB1604',
        'brand-primary-hover': '#8B1203',
        'brand-primary-light': 'rgba(171, 22, 4, 0.1)',
        'brand-secondary': '#FF4500',
      },
    },
  },
  plugins: [],
};