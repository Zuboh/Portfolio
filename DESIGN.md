# Design system

Dark-only, Geist-style. Quiet, typographic, high contrast. Hairlines instead of cards.

## Tokens (`src/app/globals.css`)

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#0a0a0a` | page |
| `--bg2` | `#101010` | hover and raised rows |
| `--tx` | `#ededed` | primary text |
| `--tx2` | `#a3a3a3` | body and secondary text |
| `--tx3` | `#8d8d8d` | metadata (5.8:1 on `--bg`) |
| `--bd` | `#222222` | hairlines |
| `--bd2` | `#363636` | borders on controls and badges |
| `--acc` | `oklch(78% 0.13 150)` | the one accent (mint) |
| `--acc-dim` | `oklch(78% 0.13 150 / 0.14)` | accent tint |

One accent only. It marks the surname, hover and link states, the live dot and focus rings.

## Type

- Geist for text, Geist Mono for metadata, dates and badges (`next/font/google`).
- Display headings are weight 600 with tight tracking (`-0.04em` to `-0.058em`).
- Body is 16px / 1.55. Never below 12px.
- Use `text-wrap: pretty` on paragraphs.

## Layout

- Container: `max-w-[1080px]` with a `clamp(20px, 4vw, 40px)` gutter (`ui/Container`).
- Sections use `.section`: 136px top padding (96px under 860px). Titles use `ui/SectionHeader`.
- Lists are rows with hairline dividers, not card grids. Two-column rows use a 200px label column.

## Components

- `ui/Badge`: pill with a local logo from `public/icons` (`data/tech.ts`), text-only when no logo.
- `ui/Icon`: small inline-SVG set (mail, download, arrow, github, linkedin). Icons appear only on buttons and contact links, never in the header or section titles.
- `.btn` and `.btn-primary` (globals.css): 44px high controls.
- `ui/Flow`: numbered vertical step chain for architecture and loops in case studies.

## Motion

- Hover and focus transitions at 150 to 200ms, plus a short `rise` entrance on the hero.
- Everything respects `prefers-reduced-motion` (durations collapse in `globals.css`).
- No scroll-hijacking, parallax or 3D.

## Content rules

- No claim without a source in the repo or the résumé. No metrics, client names or availability promises.
- Case studies (`data/case-studies.ts`) come only from each project's README and docs.
- Activity is live GitHub data (`lib/github.ts`); never hard-code entries.

## Accessibility

- Skip link, one `h1` per page, labelled landmarks, visible 2px accent focus ring.
- Interactive targets at least 44px high.
- Text contrast at least 4.5:1.
