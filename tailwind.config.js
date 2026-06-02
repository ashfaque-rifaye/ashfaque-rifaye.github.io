/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Inter everywhere (original site font). "serif" is aliased to Inter
        // so existing font-serif class usages still render Inter — no serif.
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        /* ----------------------------------------------------------------
           All colors are driven by CSS variables (channel triplets) so the
           live palette switcher can re-grade the whole site at runtime.
           Defined in src/index.css under :root + [data-palette="..."].
        ---------------------------------------------------------------- */
        claude: {
          cream: 'rgb(var(--cream) / <alpha-value>)',
          paper: 'rgb(var(--paper) / <alpha-value>)',
          sand: 'rgb(var(--sand) / <alpha-value>)',
          line: 'rgb(var(--line) / <alpha-value>)',
          ink: 'rgb(var(--ink) / <alpha-value>)',
          muted: 'rgb(var(--muted) / <alpha-value>)',
          espresso: 'rgb(var(--espresso) / <alpha-value>)',
          bark: 'rgb(var(--bark) / <alpha-value>)',
          stump: 'rgb(var(--stump) / <alpha-value>)',
          ash: 'rgb(var(--ash) / <alpha-value>)',
          subtle: 'rgb(var(--subtle) / <alpha-value>)',
          linedark: 'rgb(var(--linedark) / <alpha-value>)',
        },
        // Primary accent ramp (light->dark: 300 lightest … 700 darkest)
        coral: {
          DEFAULT: 'rgb(var(--accent-500) / <alpha-value>)',
          300: 'rgb(var(--accent-300) / <alpha-value>)',
          400: 'rgb(var(--accent-400) / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
          700: 'rgb(var(--accent-700) / <alpha-value>)',
        },
        // Secondary accent (palette's "alt" highlight) for duotone gradients
        gold: {
          DEFAULT: 'rgb(var(--alt-500) / <alpha-value>)',
          400: 'rgb(var(--alt-400) / <alpha-value>)',
          500: 'rgb(var(--alt-500) / <alpha-value>)',
          600: 'rgb(var(--alt-600) / <alpha-value>)',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.05), 0 6px 20px -6px rgba(0,0,0,0.10)',
        lift: '0 2px 4px rgba(0,0,0,0.06), 0 18px 44px -12px rgba(0,0,0,0.28)',
        glow: '0 12px 40px -10px rgb(var(--accent-500) / 0.45)',
        'glow-lg': '0 18px 60px -12px rgb(var(--accent-500) / 0.55)',
        ring: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(4%,-5%) scale(1.08)' },
          '66%': { transform: 'translate(-4%,3%) scale(0.95)' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'bg-pan': {
          '0%, 100%': { 'background-position': '0% 0%' },
          '50%': { 'background-position': '100% 100%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.22,1,0.36,1) both',
        'slide-in': 'slide-in 0.5s ease-out both',
        float: 'float 7s ease-in-out infinite',
        'aurora-slow': 'aurora 22s ease-in-out infinite',
        gradient: 'gradient 6s ease infinite',
        shimmer: 'shimmer 2s infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'bg-pan': 'bg-pan 20s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
