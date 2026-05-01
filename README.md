# zubo.dev

Personal portfolio — built with Next.js 16, React 19, TypeScript, and Framer Motion.

## Stack

- **Next.js 16** (App Router, static export)
- **React 19**
- **TypeScript** (strict)
- **Framer Motion** — parallax h1 on mouse move
- **next-themes** — light / dark / panda theme switching
- **CSS custom properties** — design token system

## Features

- Typewriter intro, parallax h1
- Analog clock (live, rAF-driven)
- Scrolling ticker
- Project showcase
- Tech stack grid
- Activity log
- Contact section
- Dynamic favicon + tab title on visibility change
- Sidebar scroll-spy nav, scroll-to-top

## Dev

```bash
npm install
npm run dev
```

## Structure

```
src/
  app/               # layout, page, globals.css
  components/
    sections/        # Hero, Work, Stack, About, Log, Contact, Footer
    ui/              # SectionLabel, Card, TagPill
    Topbar, SidebarNav, ScrollToTop, AnalogClock, DynamicFavicon
  data/              # content, social, stack, log — single source of truth
  hooks/             # useTypewriter, useIntersectionReveal, useClock, useFavicon
  lib/               # projects, date
  types/             # shared TypeScript interfaces
```

## License

MIT
