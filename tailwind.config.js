/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sailec: ["TBC Sailec", "sans-serif"],
        helveticaGeo: ["Helvetica Neue LT GEO", "sans-serif"],
    },
    },
  },
  plugins: [],
}

