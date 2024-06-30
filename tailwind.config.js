/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      sans: ['roboto', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },

    extend: {
      colors:{
        'dark-primary': '#111214',
        'dark-secondery':'#282F35',
        'dark-text-primary':'#F5FFF4'
      },
      fontFamily:{
        "roboto":"Roboto, sans-serif"
      },
      animation:{
        'alert-in': 'alertIn 0.5s ease-out forwards',
        'disappearr': 'disappear 0.3s  ease-out  forwards',
        'slideDown': "slideDown 0.15s ease-out forwards"
      }

    },
  },
  plugins: [],
}

