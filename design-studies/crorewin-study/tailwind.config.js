/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        ink:    '#0b0f1a',
        panel:  '#121829',
        panel2: '#1a2236',
        gold:   '#f5b301',
        gold2:  '#ffd35c',
        neon:   '#16c784',
        accent: '#7b5cff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(245,179,1,.25), 0 10px 40px -10px rgba(245,179,1,.35)',
        card: '0 12px 40px -16px rgba(0,0,0,.7)',
      },
      keyframes: {
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        fadeup: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        ticker: 'ticker 28s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        fadeup: 'fadeup .6s ease both',
      },
    },
  },
  plugins: [],
};
