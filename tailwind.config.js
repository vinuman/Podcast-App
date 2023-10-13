/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        theme: "var(--theme)",
        blue: "var(--blue)",
        white: "var(--white)",
        grey: "var(--grey)",
        purple: "var(--purple-grey)",
      },
    },
  },
  plugins: [],
};
