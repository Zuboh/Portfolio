---
name: zubo.dev
description: Portfolio of a frontend & AI engineer — precise, handcrafted, direct.
colors:
  page-surface: "oklch(97.2% 0.008 75)"
  surface-raised: "oklch(93.5% 0.007 75)"
  surface-sunken: "oklch(88% 0.006 75)"
  ink: "oklch(14% 0.012 255)"
  ink-mid: "oklch(44% 0.010 255)"
  ink-faint: "oklch(62% 0.008 255)"
  edit-mark: "oklch(46% 0.11 145)"
  ruling-line: "oklch(84% 0.005 75)"
  card-leaf: "oklch(95.5% 0.007 75)"
typography:
  display:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(40px, 6.5vw, 58px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.04em"
  mono:
    fontFamily: "DM Mono, Courier New, monospace"
    fontSize: "11px"
    fontWeight: 400
rounded:
  none: "0px"
  focus: "2px"
  tag: "3px"
  pill: "99px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "56px"
components:
  text-link:
    textColor: "{colors.ink-faint}"
    typography: "{typography.label}"
    padding: "0 0 2px 0"
  text-link-hover:
    textColor: "{colors.edit-mark}"
  tag-tech:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink-faint}"
    rounded: "{rounded.tag}"
    padding: "2px 7px"
  tag-status-shipped:
    backgroundColor: "oklch(46% 0.11 145 / 0.1)"
    textColor: "{colors.edit-mark}"
    rounded: "{rounded.focus}"
    padding: "1px 6px"
  accordion-row:
    backgroundColor: "transparent"
    typography: "{typography.body}"
    padding: "18px 4px"
  accordion-row-hover:
    backgroundColor: "{colors.surface-raised}"
---

# Design System: zubo.dev

## 1. Overview

**Creative North Star: "The Engineer's Taccuino"**

A personal notebook carried in a coat pocket: structured enough to find things, informal enough to feel personal. The system looks authored, not assembled. It rewards the reader who lingers — a small typographic choice here, a detail in the margin there — without ever announcing itself. The grid is real; the columns align; but the human hand is legible in every line weight and spacing decision.

This is not a showcase of capabilities. It is evidence. The design defers to the work it carries. Every element that does not contribute to reading, navigating, or trusting the work is removed. Hierarchy comes from weight and rhythm, not from size and color. The accent is rare by doctrine, functional when it appears, and never decorative.

The system rejects the generic SaaS template (hero metrics, blue gradient CTAs, Framer-starter energy), corporate formality (navy and gold, professional-services whitespace, stock lifestyle imagery), and creative-developer overload (WebGL canvases, particle fields, scroll-hijacking). Creativity here means the unexpected detail, not the overwhelming effect.

**Key Characteristics:**
- Dual-hue neutral system: warm amber surfaces (75°) against blue-gray ink (255°) — unusual pairing that creates depth without drama
- Three-tier tonal layering for elevation instead of shadows
- Typographic hierarchy through weight contrast alone at the body scale (13px title vs 13px body — same size, different weight)
- Monospace as a structural element, not decoration — index numbers, dates, and labels carry the DM Mono voice
- Accent used sparingly, primarily as a state signal (hover, active, focus) rather than decoration
- Three themes (light, dark, panda) as first-class system variants, not afterthoughts

## 2. Colors: The Two-Hue Notebook

The palette is built from two divergent hue families — warm amber (75°) for all surfaces and a cooler blue-gray (255°) for all text — with one edit-mark accent. The temperature gap between ground and figure creates contrast without the bluntness of pure neutral.

### Primary
- **Edit Mark** (`oklch(46% 0.11 145)`): The proofreader's olive-green. Used exclusively as a state signal: hover colors, active section in sidebar nav, open accordion item names, focus outlines, scrollbar hover. Never applied decoratively to a resting surface. Its rarity is the point.

### Neutral (Surfaces — warm amber axis, hue 75°)
- **Laid Paper** (`oklch(97.2% 0.008 75)`): Main page background (`--bg`). The slight warm tint keeps it from reading as pure white — closer to uncoated book stock than digital white.
- **Field Margin** (`oklch(93.5% 0.007 75)`): Secondary surface (`--bg2`). Appears on accordion row hover and sidebar hover states. The visible step between `--bg` and `--bg2` is the entire elevation vocabulary.
- **Ruled Surface** (`oklch(88% 0.006 75)`): Tertiary surface (`--bg3`). Tech tag backgrounds. The faintest step of depth.
- **Page Leaf** (`oklch(95.5% 0.007 75)`): Card background (`--card`). Sits between `--bg` and `--bg2` — for future card-adjacent patterns.
- **Ruling Line** (`oklch(84% 0.005 75)`): Borders and dividers (`--bd`). Hairline-weight separators. 0.5px at the code level; never thicker as a colored stripe.

### Neutral (Text — blue-gray axis, hue 255°)
- **Ink** (`oklch(14% 0.012 255)`): Primary text (`--tx`). Near-black with a cool blue inflection. Not pure black — the hue keeps it from looking printed on screen.
- **Graphite** (`oklch(44% 0.010 255)`): Secondary text (`--tx2`). Subtitles, body copy in the about section. Clear and readable, clearly subordinate.
- **Pencil** (`oklch(62% 0.008 255)`): Tertiary text (`--tx3`). Labels, index numbers, dates, links at rest, secondary metadata. The default "quiet" text weight.

### Named Rules
**The Edit Mark Rule.** The accent (`edit-mark`) appears on ≤10% of any screen. It is a state signal only. Never use it as a background fill, never apply it to resting text, never use it to color an arbitrary element for visual interest. If you are adding it to something that is not in a hover, active, or focus state, stop.

**The Two-Hue Rule.** Surfaces always pull from the warm axis (hue 75°). Text always pulls from the cool axis (hue 255°). Do not mix these: no warm-tinted text, no cool-tinted backgrounds. The pairing is the system.

## 3. Typography

**Display Font:** Hanken Grotesk (system-ui, sans-serif fallback)
**Body Font:** Hanken Grotesk — same family, weight-driven hierarchy
**Label/Mono Font:** DM Mono (Courier New fallback)

**Character:** Hanken Grotesk is a humanist grotesque with generous spacing and warm curves — precise without being cold. At display weight (-0.04em tracking, tight leading), it reads as a proper nameplate. At body weight (400, 1.85 leading), it reads as clear prose. The same family serves both roles, so hierarchy is entirely a function of weight and size — never font-switching. DM Mono provides a secondary voice for structural elements: numbers that should count, labels that should index, dates that should timestamp.

### Hierarchy
- **Display** (700, `clamp(40px, 6.5vw, 58px)`, leading 1, −0.04em tracking): Hero name only. One instance per page. The nameplate.
- **Title** (600, 13px, leading 1.4): Project names in the accordion, section headings where weight is needed. Same size as body — differentiated by weight alone.
- **Body** (400, 13px, leading 1.85): About section prose, project descriptions. Maximum line length 62ch.
- **Label** (500, 11px, 0.04–0.05em tracking): Navigation links, "view project" links, section label text. Slightly tracked for legibility at small scale.
- **Mono** (DM Mono 400, 11px): Index numbers (`01`, `02`), publication years, monospaced structural elements. Also mono italic for code references.

### Named Rules
**The Weight Hierarchy Rule.** Between 13px title and 13px body, weight is the only differentiator. Never change the font-size to signal importance at this scale — only font-weight. Reserve size differences for the display-to-body jump.

**The Mono Restraint Rule.** DM Mono is structural, not decorative. Use it for numbers that measure (index, date, count) and labels that categorize. Prohibited for prose, headings, or accent callouts.

## 4. Elevation

This system is **flat by design**. No `box-shadow` anywhere. Depth is conveyed entirely through tonal layering — three surface steps (`--bg`, `--bg2`, `--bg3`) on the warm axis, each step lighter/darker by ~5% lightness. The visible difference between `--bg` and `--bg2` is the entire hover feedback vocabulary for interactive rows.

States communicate through surface shift, not shadow appearance:
- Resting accordion row: transparent (shows `--bg`)
- Hovered accordion row: shifts to `--bg2` (Field Margin)
- Hovered scrollbar thumb: color shifts to `--acc` (Edit Mark)
- Open accordion item name: color shifts to `--acc`

Dark mode is a parallel system: `--bg` becomes `oklch(12% 0.010 75)` and the three surface steps invert direction (darker base, lighter raised surfaces). The tonal layering logic is identical; only the lightness range flips.

### Named Rules
**The Shadowless Rule.** Prohibited: `box-shadow`, `drop-shadow`, `filter: blur()` used as depth cues. If an element needs to feel elevated, it belongs to a different surface step, not a shadow. If that's not possible, reconsider whether it needs to feel elevated at all.

## 5. Components

### Text Links (the primary interactive element)
The portfolio uses almost no button-shaped elements. Interactive actions are text links styled with a hairline underline — the border-bottom-0.5px technique. This is the primary "button" of the system.

- **Shape:** No background, no border-radius. A `0.5px border-bottom` in `--bd` at rest.
- **Color:** `--tx3` (Pencil) at rest; transitions to `--acc` (Edit Mark) + matching border on hover.
- **Transition:** `150–200ms` duration, colors only. No transform, no size change.
- **External links:** Appended `↗` as plain text — not an icon component, not an SVG. Inline character.

### Tech Tags
Small flat chips for project technology labels. Flat, no border, minimal.

- **Shape:** `3px` radius (tag). Background: `--bg3` (Ruled Surface). No border.
- **Text:** 10px, `--tx3`, normal weight.
- **Padding:** `2px 7px`.
- **Never interactive.** Not clickable, not filterable in the base system.

### Status Pills (shipped / wip)
A status signal pill appended to a tech tag row.

- **Shipped variant:** Background `oklch(46% 0.11 145 / 0.1)` (10% opacity edit-mark), text `--acc`. Signals completion.
- **WIP variant:** Background `--bg3`, text `--tx3`. Quieter — work in progress needs no emphasis.
- **Shape:** `2px` radius, `uppercase`, `0.08em` tracking, `9px` text, `1px 6px` padding.

### Section Label
The primary section-heading component. Lowercase, quiet, followed by a horizontal ruling line.

- **Type:** 10px, `--tx3`, weight 500, all lowercase. No caps, no allcaps.
- **Trailing rule:** A `0.5px` horizontal line in `--bd` that extends to the right edge of its container — `::after` pseudoelement, `flex: 1`. This is the only horizontal divider in the system.
- **Margin below:** 22px before section content begins.

### Accordion Row (Work section)
The main content interaction pattern. A row per project; expands to reveal description, tags, and links.

- **Grid:** Three columns at desktop (`32px number | 1fr title+desc | 64px year | 44px toggle`). Two columns on mobile (number + content).
- **Index:** Monospace `01`, `02` in `--tx3`. The leading count, not a bullet.
- **Toggle character:** `+` (closed), `×` (open). Plain text, not SVG icons.
- **Hover:** Background shifts to `--bg2`, `−4px` horizontal margin offset and `+4px` padding to keep visual alignment.
- **Open state:** Project name color shifts to `--acc`. Description hides (truncated preview replaced by full content below).
- **Separator:** `0.5px border-bottom` in `--bd`. The first item has no top border.

### Sidebar Navigation
Fixed, vertically centered, right-edge. Visible at ≥768px only.

- **Items:** Section names in 9px uppercase, `0.06em` tracking, `--tx3` at rest.
- **Active item:** Color shifts to `--acc`, letter-spacing expands to `0.09em`. The expansion is the only width change — no dot, no indicator bar.
- **Transition:** `220ms` on color and letter-spacing simultaneously.
- **Position:** `right: max(16px, calc(50vw - 400px - 64px))` — self-positions outside the main column at wide viewports, collapses to 16px gutter at narrow.

## 6. Do's and Don'ts

### Do:
- **Do** use OKLCH for all color definitions. Every token in `globals.css` is OKLCH; maintain this for any new token added to the system.
- **Do** keep the `edit-mark` accent to ≤10% of screen area, reserved for state signals (hover, active, focus) only.
- **Do** use `0.5px` for all separator lines, ruling lines, and link underlines. Thicker borders belong to a different system.
- **Do** use weight contrast to establish hierarchy at 13px — title is 600, body is 400, same size.
- **Do** use DM Mono for index numbers, dates, and structural labels; Hanken Grotesk for everything prose-like.
- **Do** respect `prefers-reduced-motion` at the CSS layer; all new animations must respect the existing media query.
- **Do** treat the surface tonal steps (`--bg` → `--bg2` → `--bg3`) as the entire elevation vocabulary. A hover is a surface shift, not a shadow.
- **Do** append `↗` as a plain text character for external links, not as an icon component.
- **Do** keep section labels lowercase — the typographic choice is intentional and signals the voice of the system.

### Don't:
- **Don't** use `box-shadow` or `filter: drop-shadow()` anywhere. The system is flat by doctrine.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on any element. Prohibited absolutely.
- **Don't** use gradient text (`background-clip: text` with a gradient). Emphasis through weight or size only.
- **Don't** build a hero section with metrics, statistics, or a "big number + small label" pattern. This is the SaaS cliché the system explicitly rejects.
- **Don't** create a grid of identical cards — same-size, same-structure, icon + heading + text, repeated. Accordion or list structures are preferred for content grids.
- **Don't** apply the `edit-mark` color to resting, non-interactive elements for visual interest. It loses meaning when overused.
- **Don't** add new font families. The system is intentionally two-voice: Hanken Grotesk for prose, DM Mono for structure.
- **Don't** create modal dialogs as a first solution. The system has no modals by choice — exhaust inline and progressive disclosure alternatives first.
- **Don't** introduce WebGL, canvas animations, 3D transforms, or particle effects. Creativity through restraint, not spectacle.
- **Don't** use warm-axis colors (hue 75°) for text, or cool-axis colors (hue 255°) for surfaces. The Two-Hue Rule is structural.
