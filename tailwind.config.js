/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffe9a0",
        secondary: "#ff6e6c",
        background: "#242526",
        contrast: "#67568c",
        headline: "#1f1235",
      },
    },
  },
  plugins: [],
};
