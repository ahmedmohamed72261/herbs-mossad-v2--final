/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Refined brand tokens for Herbiva
        herba: {
          dark: '#0E1D18',
          light: '#FAF8F5',
          yellow: '#C6A15B',
          green: '#7E9E2C',
          darker: '#091410',
        },
        // Template design tokens
        leaf: {
          DEFAULT: '#7E9E2C',
          light: '#93B533',
          neon: '#A8CC39',
        },
        ink: {
          DEFAULT: '#0F221B',
          soft: '#253830',
          muted: '#4A5B53',
        },
        line: '#E2E8E3',
        cream: '#FAF8F5',
        dim: '#F4F6F2',
        gold: '#C6A15B',
        sale: '#E03131',
      },
      fontFamily: {
        sans: ['Manrope', 'Cairo', 'Inter', 'sans-serif'],
        display: ['Anybody', 'Cairo', 'Manrope', 'sans-serif'],
        stat: ['Kanit', 'Cairo', 'Anybody', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
