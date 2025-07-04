/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lubrifont: [' "WDXL Lubrifont SC" ', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif', 'Roboto mono'],

      },
      animation: {
      fadeIn: 'fadeIn 0.4s ease-in-out',
    },
    keyframes: {
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    },
    },
  },
  plugins: [],
}

