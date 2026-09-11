/** @type {import('tailwindcss').Config} */

/* Every color is an OKLCH channel triplet defined in src/styles.css, and
   each token switches with [data-theme], so components need no dark:
   variants for their base palette. Opacity modifiers keep working. */
const token = (name) => `oklch(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: token('bg'), 2: token('bg-2'), 3: token('bg-3') },
        line: { DEFAULT: token('line'), 2: token('line-2') },
        ink: { DEFAULT: token('ink'), 2: token('ink-2'), 3: token('ink-3'), 4: token('ink-4') },
        accent: { DEFAULT: token('accent'), hi: token('accent-hi'), ink: token('accent-ink') },
        /* The spectrum, for small colour-coded details (status dots, icons, tints). */
        tone: {
          orange: token('g-1'),
          pink: token('g-2'),
          violet: token('g-3'),
          blue: token('g-4'),
          cyan: token('g-5'),
          amber: token('g-6'),
          emerald: token('g-7'),
        },
      },
      fontFamily: {
        sans: ['"Archivo Variable"', 'Archivo', 'system-ui', '-apple-system', '"Segoe UI"', 'Arial', 'sans-serif'],
        mono: ['"Martian Mono Variable"', 'ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        quart: 'cubic-bezier(0.25, 1, 0.5, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        card: '0 1px 2px oklch(var(--shadow) / 0.05), 0 12px 32px -18px oklch(var(--shadow) / 0.18)',
        lift: '0 2px 6px oklch(var(--shadow) / 0.06), 0 30px 60px -24px oklch(var(--shadow) / 0.35)',
        glow: '0 14px 40px -14px oklch(var(--g-3) / 0.7)',
      },
      zIndex: { header: '40', launcher: '45', overlay: '50', dialog: '60', toast: '70' },
      maxWidth: { measure: '68ch', lead: '60ch' },
      borderRadius: { DEFAULT: '10px', sm: '6px' },
    },
  },
  plugins: [],
};
