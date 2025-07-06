/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",         // CRA uses /public
    "./src/**/*.{js,jsx,ts,tsx}",  // all React files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
