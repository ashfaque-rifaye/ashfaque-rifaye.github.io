# Design System

Visual language for ashfaque-rifaye.github.io. Strategy and audience live in [PRODUCT.md](PRODUCT.md).

## Theme

**"The spec sheet."** A graphite drafting sheet with warm paper-white ink and a single signal-orange mark. The motifs come from Ashfaque's own path (mechanical engineering → software → AI products): title blocks, figure numbers, hairline rules, dimensioned diagrams. Calm, exact, readable. Dark only, by design.

Named reference: *Leica / instrument-faceplate restraint* (graphite, warm white, one signal color used like a status LED), not SaaS-dark-neon and not editorial serif.

## Color

OKLCH throughout. Neutrals are tinted very slightly toward the accent hue. Tokens are defined as channel triplets in `src/styles.css` and exposed to Tailwind with `<alpha-value>`.

| Token | OKLCH | Role |
| --- | --- | --- |
| `bg` | `0.145 0.004 60` | Page ground (near-black graphite) |
| `bg-2` | `0.178 0.005 60` | Raised surface (panels, cards) |
| `bg-3` | `0.215 0.006 60` | Highest surface (hover, inputs) |
| `line` | `0.285 0.007 60` | Hairline borders and rules |
| `line-2` | `0.38 0.008 60` | Emphasised hairlines, diagram strokes |
| `ink` | `0.945 0.011 80` | Primary text (warm paper-white) |
| `ink-2` | `0.80 0.010 75` | Secondary text (≈ 10:1 on `bg`) |
| `ink-3` | `0.655 0.010 70` | Metadata (≈ 5.9:1 on `bg`, AA for body) |
| `ink-4` | `0.50 0.008 65` | Decorative only, never for text |
| `accent` | `0.705 0.185 42` | Signal orange (≈ 6.9:1 on `bg`) |
| `accent-hi` | `0.78 0.155 48` | Accent hover |
| `accent-ink` | `0.16 0.02 42` | Text on accent fills |

**Strategy: Restrained.** Accent covers ≤ 10% of any view: the primary CTA, active nav marker, figure numbers, focus rings, one emphasised phrase per page, diagram signal paths. Metrics are set in `ink`, not accent. No gradient text anywhere.

## Typography

Two families, self-hosted via Fontsource (no third-party font requests):

- **Archivo Variable** (wght 100–900, wdth 62–125). One family carries display and body; hierarchy comes from *width* as well as size and weight. Display runs expanded (`font-stretch: 108–118%`), body runs at 100%.
- **Martian Mono Variable** for technical labels only: figure captions, title-block keys, dates, diagram node labels. Never for paragraphs or section eyebrows.

| Role | Size | Leading | Weight / width | Notes |
| --- | --- | --- | --- | --- |
| Display (hero h1) | `clamp(2.5rem, 1.6rem + 3.6vw, 4.75rem)` | 1.02 | 540 / 108% | `-0.035em`, `text-wrap: balance` |
| H1 (page) | `clamp(2.25rem, 1.5rem + 3vw, 4rem)` | 1.04 | 540 / 110% | |
| H2 (section) | `clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem)` | 1.08 | 540 / 110% | |
| H3 | `clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)` | 1.2 | 600 / 104% | |
| Lead | `1.25rem` | 1.55 | 400 | max 60ch |
| Body | `1.0625rem` | 1.7 | 410 | max 68ch, `+0.005em` (light-on-dark compensation) |
| Small | `0.9375rem` | 1.6 | 420 | |
| Label (mono) | `0.75rem` | 1.4 | 450 / 90% | uppercase, `0.08em`, ≤ 4 words |
| Numeral | `clamp(2.25rem, 1.7rem + 2.4vw, 3.75rem)` | 1 | 520 / 118% | `tabular-nums`, `-0.03em` |

## Layout

- Container: `max-width: 1240px`, gutter `clamp(1.25rem, 4vw, 3rem)`.
- Section rhythm: `clamp(5rem, 3rem + 6vw, 9rem)` between sections; tight groupings (8–16px) inside.
- Grid: 12 columns on desktop, content blocks span asymmetric ranges (e.g. 5/7, 4/8). Stacks on mobile.
- Radius: `4px` on panels and buttons (drafted, not pill-shaped). Pills are not used.
- Borders over shadows: depth comes from surface lightness and 1px hairlines.
- Z-index scale: `header 40` → `overlay 50` → `dialog 60` → `toast 70`.

## Components

- **Title block**: key/value metadata grid in hairline cells (hero, case-study header).
- **Readout**: a metric with its numeral, label and source line. Used in the impact band and case-study measurement.
- **Figure**: framed diagram on a faint drafting grid, with a mono `Fig. n.n` caption and a text equivalent.
- **Case section**: numbered heading (the case-study structure is a true sequence, so numbers carry meaning there only).
- **Decision block**: Decision / Why / Trade-off, set as a three-row ledger, not a card grid.
- **Buttons**: primary (accent fill, `accent-ink` text), secondary (hairline outline), text link with arrow. Verb + object labels.
- **Dev placeholder**: dashed box, rendered only in `vite dev`; production omits it. All open items are listed in the local, git-ignored `CONTENT-TODO.md`.

## Motion

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for entrances, `cubic-bezier(0.25, 1, 0.5, 1)` for state changes. No bounce.
- Signature moment: the hero headline lines rise out of a clip mask (700ms, 70ms stagger) on first load.
- Diagrams draw their connectors once when scrolled into view (stroke-dashoffset, 900ms).
- Hover: hairline brightens, arrow nudges 3px, surface steps up one level (150–200ms).
- Route change: content fades up 8px over 320ms.
- Ambient: one slow accent glow drift in the hero (40s loop), paused off-screen.
- `prefers-reduced-motion: reduce` turns all of the above into instant state changes. Content is visible by default; motion only enhances it.
