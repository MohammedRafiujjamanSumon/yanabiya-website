/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f7fbf2',
          100: '#eef6e4',
          200: '#cfe5a4',
          accent: '#9ec73a',
          accentDark: '#7da42a',
          ink: '#0a2818',
          deep: '#0f3a23',
          900: '#0a2818',
          800: '#0f3a23',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
