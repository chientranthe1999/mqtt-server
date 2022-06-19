/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        pc: '897px'
      }
    },

    colors: {
      main: '#498d3d',
      'black-50': '#e5e5e5'
    }
  },
  plugins: []
}
