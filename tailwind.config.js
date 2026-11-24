/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F7F5F0',
          50: '#FDFCFB',
          100: '#F7F5F0',
          200: '#EFECE3',
          300: '#E3DDD0',
        },
        champagne: {
          light: '#F3EFE8',
          DEFAULT: '#E8DFD2',
          gold: '#B99B70',
          darkGold: '#9A7D54',
          subtle: '#FAF7F2',
        },
        charcoal: {
          DEFAULT: '#292929',
          light: '#3D3D3D',
          dark: '#1A1A1A',
          deep: '#121212',
        },
        mutedGrey: {
          DEFAULT: '#85817A',
          light: '#A39F98',
          dark: '#5C5852',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        editorial: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.28em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(41, 41, 41, 0.05)',
        'luxury-hover': '0 25px 50px -12px rgba(185, 155, 112, 0.15)',
        'drawer': '-10px 0 30px rgba(0, 0, 0, 0.08)',
        'modal': '0 25px 60px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
