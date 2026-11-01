/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover-rgb) / <alpha-value>)',
          /* Static dark amber — hover bg for solid buttons with white text,
             keeps ≥4.5:1 contrast in BOTH themes (accent-hover lightens on dark). */
          deep: '#9a3f04',
          light: '#f59e0b',
          subtle: 'rgb(var(--accent-subtle-rgb) / <alpha-value>)',
        },
        navy: {
          DEFAULT: 'rgb(var(--navy-rgb) / <alpha-value>)',
          light: '#2c4f7c',
          subtle: '#e8eef5',
        },
        success: {
          DEFAULT: 'rgb(var(--success-rgb) / <alpha-value>)',
          subtle: '#d1fae5',
        },
        surface: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        },
        ink: {
          primary: '#1a1a19',
          secondary: '#5c5c5a',
          muted: '#8a8a85',
        },
        warm: {
          border: '#e5e3de',
        },
        night: {
          base: '#0f0f0e',
          panel: '#191817',
          card: '#222120',
          elevated: '#2a2926',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        display: ['4rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['5rem', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0,0,0,0.06)',
        card: '0 1px 4px rgba(0,0,0,0.08)',
        lift: '0 12px 40px rgba(0,0,0,0.12)',
        glow: '0 0 40px rgba(217,119,6,0.25)',
      },
      keyframes: {
        'fade-in-word': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      backgroundImage: {
        'mesh-hero':
          "radial-gradient(ellipse 60% 50% at 70% 10%, rgba(217,119,6,0.14), transparent), radial-gradient(ellipse 40% 40% at 15% 40%, rgba(245,158,11,0.10), transparent), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(30,58,95,0.08), transparent)",
      },
    },
  },
  plugins: [],
};
