// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Asegúrate de que esta línea esté así
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}