/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'navbar': '#254853',
        'darkWhite': '#E9E9E9',
        'betterGray': '#3D3D3F'
      },
      animation: {
        "spin-slow": 'spin 4s linear infinite'
      },
    },
  },
  plugins: [],
}