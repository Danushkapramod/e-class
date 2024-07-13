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
      colors: {
        'dark-primary': '#111214',
        'dark-secondary': '#282F35',
        'dark-text-primary': '#F5FFF4',
        'bg--primary-100': 'var(--color-primary-100)',
        'bg--primary-200': 'var(--color-primary-200)',
        'bg--primary-300': 'var(--color-primary-300)',
        'bg--primary-400': 'var(--color-primary-400)',
        'bg--primary-500': 'var(--color-primary-500)',

        'bg--secondery-1': 'var(--color-secondery-1)',
        'bg--secondery-2': 'var(--color-secondery-2)',
        'bg--secondery-3': 'var(--color-secondery-3)',
        'bg--secondery-4': 'var(--color-secondery-4)',
        'bg--secondery-5': 'var(--color-secondery-5)',

         'text--primary': 'var(--color-text-primary)',
         'text--secondery': 'var(--color-text-secondary)',
         'text--muted': 'var(--color-text-muted)',

         'text--option-1':'var(--color-text-option-1)',

         'opacity-overflow':'var(--color-overflow)'
       


        
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

