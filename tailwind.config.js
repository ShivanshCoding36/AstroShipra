/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "!./src/pages/no-Tailwind/**/*" 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia'],
      },
      colors: {
        vedic: {
          cream: '#FBF4E8',
          brown: '#3E2A1A',
          gold: '#D4A24C',
          goldLight: '#EAD2A2',
          cosmic: '#2E4A7D',
          paper: '#F2E8D5',
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4A24C 0%, #B8860B 100%)',
        'gradient-cosmic': 'linear-gradient(135deg, #2E4A7D 0%, #1A2B4A 100%)',
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'spin-reverse': 'spin 45s linear infinite reverse',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}