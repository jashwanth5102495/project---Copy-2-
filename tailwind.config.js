/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        crimson: {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#f83b3b',
          600: '#e51d1d',
          700: '#c11414',
          800: '#8B0000', // Deep crimson
          900: '#861717',
          950: '#500909',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#006400', // Deep emerald green
          900: '#064e3b',
          950: '#022c22',
        },
        sapphire: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#191970', // Sapphire blue
          900: '#1e1b4b',
          950: '#0f0f2d',
        },
        gold: '#D4AF37',
        silver: '#C0C0C0',
      },
      backgroundImage: {
        'marigold-pattern': "url('path-to-marigold-pattern')",
        'silk-texture': "url('path-to-silk-texture')",
      },
    },
  },
  plugins: [],
};