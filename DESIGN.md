# Design system

## Direction

**Colourful, gradient-rich, light and dark.** This is the owner's explicit direction (September 2026), replacing an earlier restrained, dark-only, single-accent system. The brand spectrum runs amber → orange → pink → violet → blue → cyan, keeping the amber and teal of the original site. Colour is used generously but always in service of reading: gradients carry headlines, numbers, primary actions and ambient light; body text stays solid ink.

Structure stays calm: generous space, a clear type scale, framed diagrams on a faint grid, and title blocks for key facts (from Ashfaque's mechanical-engineering roots).

## Themes

- **Dark is the default.** Light is one click away (header toggle, ⌘K palette, or ask the AI Twin). The choice persists in `localStorage` under `theme`.
- `index.html` sets `data-theme` on `<html>` before first paint, so there is no flash; `<html data-theme="dark">` is the no-JS default.
- Every colour is a token that switches with `[data-theme]`, so components never need `dark:` variants for the base palette.

## Colour tokens

OKLCH channel triplets in `src/styles.css`, exposed to Tailwind with `<alpha-value>` (`bg-bg-2`, `text-ink-3`, `bg-tone-violet/10`, …).

| Token | Use |
| --- | --- |
| `bg`, `bg-2`, `bg-3` | Page, cards, insets and hovers (cool indigo neutrals) |
| `line`, `line-2` | Hairlines and stronger borders |
| `ink`, `ink-2`, `ink-3`, `ink-4` | Text: primary, secondary, tertiary, decorative only |
| `accent`, `accent-hi`, `accent-ink` | Solid signal colour (orange) for small details |
| `--g-1` … `--g-7` (`tone-*` in Tailwind) | The spectrum: orange, pink, violet, blue, cyan, amber, emerald |

Light mode uses deeper stops (600–700 level) so coloured text and gradient headings pass contrast on white; dark mode uses luminous 400-level stops.

### Gradients

| Variable / class | Stops | Use |
| --- | --- | --- |
| `--grad-brand` · `.text-grad`, `.bg-grad-brand` | orange → pink → violet | Headline keywords, large numerals, rules, bullets |
| `--grad-ai` · `.text-grad-ai`, `.bg-grad-ai` | violet → blue → cyan | AI and agent elements, secondary numerals |
| `--grad-spectrum` · `.text-grad-spectrum`, `.ring-grad` | amber → … → cyan | The hero phrase, gradient borders, top bars |
| `--grad-cta` · `.btn-primary`, `.bg-grad-cta` | deep orange → magenta → violet | Primary buttons, chat bubbles, the AI Twin orb |

`--grad-cta` uses 700-level stops so white text passes 4.5:1 on every part of the button.

### Ambient colour

- `.mesh` (four blurred blobs) behind the hero, every page header and feature panels; `.mesh-soft` for inner pages. Intensity is the `--mesh-o` token (lower on narrow screens and chosen so body text keeps ≥ 4.5:1), and the mesh fades out at the bottom so it never ends in a hard edge.
- `.dot-grid` for texture in the hero; `.band` for a tinted section.

## Contrast rules

- Body text is solid `ink`/`ink-2`, never gradient. Gradient text is for large type (≥ 24px) and numerals only.
- Small coloured text (status badges, action confirmations) uses tones that pass 4.5:1 in both themes.
- Focus is a 2px violet outline with offset on every interactive element.

## Typography

- **Archivo** (variable width and weight) for everything; **Martian Mono** for labels, keyboard hints, tool names and figure numbers. Both self-hosted.
- Scale: `.t-display`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-lead`, `.t-body`, `.t-small`, `.t-label`, `.t-num`, `.t-num-sm` (the last two are gradient numerals).

## Shape and depth

- Radii: buttons 14px, cards 20px (feature panels 24–32px), chips full.
- `.panel` cards with a soft shadow; `.card-lift` raises a card and tints its border on hover; `.glass` for floating surfaces.

## Components

- **Buttons:** `.btn-primary` (gradient, glow), `.btn-secondary` (glass outline), `.btn-ai` + `.ring-grad` (spectrum ring, for AI actions).
- **Header:** logo mark, nav (Work, AI Lab, About, Contact), ⌘K search box, theme toggle, résumé button. Demos are folded into the AI Lab (its "Watch first" row links to `/demos/`), and the Hiring Agent is deliberately not a tab; the home page, AI Lab, Contact, footer, search and the AI Twin lead to it.
- **Search palette (⌘K / Ctrl K):** pages, case studies, demos (play directly), AI Lab, agent samples and actions; any query can go to the AI Twin.
- **AI Twin:** floating orb with Ashfaque's 3D avatar inside a gradient ring, and a one-time greeting; a non-modal panel that answers, shows the model, and runs allowlisted actions (with a visible "done" trace).
- **Demo cards and player:** poster, gradient play orb, duration chip; full-screen player for YouTube (privacy-enhanced) or self-hosted MP4.
- **Hiring Agent:** plan and live trace timeline, gradient score ring, strong / partial / gap badges, requirement map, action panel.
- **Figures and title blocks:** framed diagrams on a faint grid with a colour wash; title blocks with a spectrum top bar.
- **Avatar:** one 3D render cut into `public/media/avatar-card*.webp` (3:2; heads the hero title block and the About panel) and `avatar-face.webp` (the AI Twin's face).
- **Skills spec sheet (home):** ruled rows of competency, proof with its figures in bold, and skill chips, under a spectrum top bar; certifications and education close it.
- **Dev placeholder:** dashed box rendered only in `vite dev`; open items live in the local, git-ignored `CONTENT-TODO.md`.

## Motion

- Hero words rise in once; blocks below the fold fade up once; diagram connectors draw in. The mesh drifts slowly; the AI Twin orb shifts hue; play orbs pulse.
- Entrance motion runs only for a visible tab and is cleared after 3 seconds. `prefers-reduced-motion` disables all of it; content is never hidden behind an animation.
