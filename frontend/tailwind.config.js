/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navbar': '#254853'
      },
      animation: {
        "spin-slow": 'spin 4s linear infinite'
      },
    },
  },
  plugins: [],
}