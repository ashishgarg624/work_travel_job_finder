/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFC800',
        'primary-50': '#fffcf3',
      },
      fontFamily: {
        barlow: ['Barlow Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
