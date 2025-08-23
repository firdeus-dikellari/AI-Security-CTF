/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ctf-blue': '#1e40af',
        'ctf-green': '#059669',
        'ctf-red': '#dc2626',
        'ctf-yellow': '#d97706',
      }
    },
  },
  plugins: [],
}
