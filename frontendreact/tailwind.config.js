/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:
        { 'semiColor': 'rgba(0, 0, 0, 0.7)' },
      keyframes: {
        'slide-right': {
          '0%' : {
            '-webkit-transform': 'translateX(-100%)',
                    transform: 'translateX(-100%)'
          },
          '100%' : {
            '-webkit-transform': 'translateX(0)',
                    transform: 'translateX(0)'
          }
        },
        'fadeIn' : {
          '0%' : {
            '-webkit-opacity': 0,
                opacity: 0
          },
          '100%' : {
            '-webkit-opacity': 1,
                opacity: 1
          }
        }
      },
      animation: {
        'right' : 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'fadeIn': 'fadeIn 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
      }
    },
  },
  plugins: [],
}