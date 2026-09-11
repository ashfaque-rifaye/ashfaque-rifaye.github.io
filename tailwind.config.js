/** @type {import('tailwindcss').Config} */

/* Every color is an OKLCH channel triplet defined in src/styles.css,
   so opacity modifiers (e.g. bg-accent/10) keep working. */
const token = (name) => `oklch(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: token('bg'), 2: token('bg-2'), 3: token('bg-3') },
        line: { DEFAULT: token('line'), 2: token('line-2') },
        ink: { DEFAULT: token('ink'), 2: token('ink-2'), 3: token('ink-3'), 4: token('ink-4') },
        accent: { DEFAULT: token('accent'), hi: token('accent-hi'), ink: token('accent-ink') },
      },
      fontFamily: {
        sans: ['"Archivo Variable"', 'Archivo', 'system-ui', '-apple-system', '"Segoe UI"', 'Arial', 'sans-serif'],
        mono: ['"Martian Mono Variable"', 'ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        quart: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      zIndex: { header: '40', overlay: '50', dialog: '60', toast: '70' },
      maxWidth: { measure: '68ch', lead: '60ch' },
      borderRadius: { DEFAULT: '4px' },
    },
  },
  plugins: [],
};
