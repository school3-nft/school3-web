/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#72ccff",
        "primary-dark": "#3da9fc",
        secondary: "#094067",
        background: "#ffffff",
        contrast: "#ef4565",
        newGray: "#e8e8e8",
        txt: "#5f6c7b",
      },
      keyframes: {
        comeFromTop: {
          "0%": {
            transform: "translateY(1500px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
