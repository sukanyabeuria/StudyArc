/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zinc: {
          750: '#232936',
          850: '#141820'
        },
        focus: {
          950: '#0a0c10',
          900: '#0f1218',
          850: '#141820',
          800: '#1b202a',
          750: '#232936',
          700: '#2b3343',
          orange: {
            light: '#ffedd5',
            DEFAULT: '#f97316',
            hover: '#ea580c',
            dim: 'rgba(249, 115, 22, 0.12)',
            glow: 'rgba(249, 115, 22, 0.35)'
          }
        }
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(249, 115, 22, 0.25)',
        'glow': '0 0 25px rgba(249, 115, 22, 0.35)',
        'glow-lg': '0 0 40px rgba(249, 115, 22, 0.45)',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
