/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      fontFamily: {
      sans: ['Roboto', 'sans-serif'],
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
        'border-1': 'var(--color-border-1)',
        'border-2': 'var(--color-border-2)',
        'border-3': 'var(--color-border-3)',
        'optinal-1': 'var(--color-optinal-1)',
        'text--option-1': 'var(--color-text-option-1)',
        'opacity-overflow': 'var(--color-overflow)',
      },
      fontFamily: {
        "roboto": "Roboto, sans-serif",
      },
      animation: {
        'alert-in': 'alertIn 0.5s ease-out forwards',
        'disappear': 'disappear 0.3s ease-out forwards',
        'slideDown': "slideDown 0.15s ease-out forwards",
      },
      boxShadow: {
        'soft': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'deep': '0 6px 12px rgba(0, 0, 0, 0.3)',
        'neumorphism': '0px 2px 4px rgba(0, 0, 0, 0.2),0px -1px 2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 10px rgba(0, 255, 0, 0.7)',
        'floating': '0 8px 16px rgba(0, 0, 0, 0.2)',
        'card': '0 4px 8px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.12)',
      },
      clipPath: {
        'custom-1': 'polygon(50% 0%, 0% 100%, 100% 100%)',
        'custom-2': 'circle(50% at 50% 50%)',
        'custom-3': 'circle(50% at 50% 50%)',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['group-hover', 'group-focus'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.clip-custom-1': {
          'clip-path': 'polygon(0 0, 100% 0, 100% 50%, 0 70%)'
        },
        '.clip-custom-2': {
          'clip-path': 'circle(50% at 50% 50%)'
        }
      }

      addUtilities(newUtilities)
    }
  ]
}
