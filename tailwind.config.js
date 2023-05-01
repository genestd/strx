/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./app/**/*.{js,jsx,ts,tsx}"],
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#555258",
        secondary: "#FFBD00",
        orange: "#ff9514",
        gray: "#8a888c",
        yellow: "#ffd270"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
// LIGHT GRAY: #8a888c
// LIGHT YELLOW: #ffd270