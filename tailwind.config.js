/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        'calc': 'calc(100% - 208px)',
        'calc100': 'calc(100% - 96px)',
        'calc1': 'calc(100% - 10px)',
      },
      height:{
        'calc': 'calc(100% - 136px)',
        '10%': '10%',
        '90%': '90%'
      },
      maxHeight:{
        'calc': 'calc(100% - 136px)'
      },
      minWidth:{
        '150px': '150px',
      },
      maxWidth:{
        '150px': '150px',
      }

    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded','dark']
  }
}