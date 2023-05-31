/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'navbar': '#254853',
        'darkWhite': '#E9E9E9',
        'betterGray': '#3D3D3F',
        'profile-grid': '#ECE6E0',
        'darkWhite': '#E9E9E9',
        'betterGray': '#3D3D3F',
        'profile-grid': '#ECE6E0'
      },
      animation: {
        "spin-slow": 'spin 4s linear infinite'
      },
      transitionProperty: {
        'width': 'width'
      }
    },
  },
  plugins: [],
}