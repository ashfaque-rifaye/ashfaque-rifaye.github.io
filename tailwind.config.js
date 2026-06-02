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
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', 'serif'],
      },
      colors: {
        /* ----------------------------------------------------------------
           Custom cinematic palette — "Ember & Gold on warm obsidian".
           (Token keys kept stable; values are a fully redesigned, original
           palette — no longer the literal Claude brand hex codes.)
        ---------------------------------------------------------------- */
        claude: {
          cream: '#f5f1e8',     // light page background (warm ivory)
          paper: '#fffdf8',     // light raised surface / cards
          sand: '#ebe4d5',      // light secondary surface
          line: '#e0d8c7',      // light border
          ink: '#1c1813',       // light primary text (warm near-black)
          muted: '#6b6455',     // light secondary text
          espresso: '#13110d',  // dark page background (warm obsidian)
          bark: '#1d1a14',      // dark raised surface / cards
          stump: '#28241c',     // dark secondary surface
          ash: '#f3eee2',       // dark primary text (warm off-white)
          subtle: '#a79e8c',    // dark secondary text
          linedark: '#363026',  // dark border
        },
        // Primary accent — warm ember (vivid amber-orange), full ramp
        coral: {
          DEFAULT: '#da6a30',
          50: '#fcf4ee',
          100: '#f8e3d2',
          200: '#f1c4a0',
          300: '#e9a06e',
          400: '#e2814a',
          500: '#da6a30',
          600: '#be521d',
          700: '#9b4018',
          800: '#793216',
          900: '#5a2713',
        },
        // Secondary accent — warm gold (for cinematic duotone gradients/highlights)
        gold: {
          DEFAULT: '#e0a23b',
          200: '#f6dca8',
          300: '#f2ce7e',
          400: '#ebba56',
          500: '#e0a23b',
          600: '#c9852a',
          700: '#a3681f',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(19,17,13,0.05), 0 6px 20px -6px rgba(19,17,13,0.10)',
        lift: '0 2px 4px rgba(19,17,13,0.06), 0 18px 44px -12px rgba(19,17,13,0.24)',
        glow: '0 12px 40px -10px rgba(190,82,29,0.45)',
        'glow-lg': '0 18px 60px -12px rgba(218,106,48,0.55)',
        ring: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
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
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -5%)' },
          '20%': { transform: 'translate(-10%, 5%)' },
          '30%': { transform: 'translate(5%, -10%)' },
          '40%': { transform: 'translate(-5%, 12%)' },
          '50%': { transform: 'translate(-10%, 5%)' },
          '60%': { transform: 'translate(12%, 0%)' },
          '70%': { transform: 'translate(0%, 8%)' },
          '80%': { transform: 'translate(-12%, 0%)' },
          '90%': { transform: 'translate(8%, 5%)' },
        },
        'bg-pan': {
          '0%, 100%': { 'background-position': '0% 0%' },
          '50%': { 'background-position': '100% 100%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'slide-in': 'slide-in 0.5s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'aurora-slow': 'aurora 20s ease-in-out infinite',
        gradient: 'gradient 6s ease infinite',
        shimmer: 'shimmer 2s infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        grain: 'grain 8s steps(10) infinite',
        'bg-pan': 'bg-pan 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
