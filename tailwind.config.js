/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9C27B0',
        secondary: '#26A69A',
        accent: '#1976D2',
        dark: '#1D1D1D',
        'dark-page': '#121212',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037',
      },
    },
  },
  plugins: [],
  prefix: 'tw-',
}

