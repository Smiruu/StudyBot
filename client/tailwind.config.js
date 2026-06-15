/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'dashboard-bg': '#5c5470',
        'dashboard-card': '#403b54',
        'dashboard-accent': '#fcc824',
        'dashboard-icon-bg': '#2f2b40',
        'dashboard-text-secondary': '#c3bfcf',
        'dashboard-cyan': '#1ec198',
        'primary': '#cdbff1',
        'on-primary': '#342a52',
        'secondary': '#66d9cc',
        'tertiary': '#f3c01a',
        'on-tertiary': '#3e2e00',
        'surface': '#141316',
        'on-surface': '#e6e1e5',
        'on-surface-variant': '#cac4cf',
        'surface-container-lowest': '#0f0e11',
        'surface-container': '#201f22',
        'surface-container-high': '#2b292d',
        'surface-container-highest': '#363437',
        'outline': '#938f99',
        'outline-variant': '#48454e'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-up-delayed': 'slideUp 0.8s ease-out 0.2s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

