# zubo.dev

Personal portfolio — built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

## Stack

- **Next.js 16** (App Router, static export)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** — utility-first styling with `@theme inline` CSS variable tokens
- **Framer Motion** — parallax h1 on mouse move
- **next-themes** — light / dark / panda theme switching
- **CSS custom properties** — design token system (3 themes)

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, work, stack, about, log, contact |
| `/works` | Project showcase grid |
| `/works/[slug]` | Project detail — progress bar, roadmap, links |
| `/resume` | Web CV — experience, projects, skills, education |

## Features

- Typewriter intro, parallax h1
- Analog clock (live, rAF-driven)
- Scrolling ticker
- Project cards with status badges (in progress / shipped / planning)
- Tech stack icon grid
- Activity log
- Contact section
- Dynamic favicon + tab title on visibility change
- Sidebar scroll-spy nav, scroll-to-top
- Fully responsive — mobile-first, no horizontal scroll

## Dev

```bash
npm install
npm run dev
```

## Structure

```
src/
  app/
    page.tsx              # home
    works/                # project list + [slug] detail
    resume/               # web CV
    globals.css           # Tailwind @theme, CSS vars, keyframes
  components/
    sections/             # Hero, Work, Stack, About, Log, Contact, Footer
    works/                # ProjectCard, ProjectGrid, ProjectLinks
    resume/               # ResumeHeader, ResumeSection, ExperienceCard
    ui/                   # SectionLabel, Card, TagPill
    Topbar, SidebarNav, ScrollToTop, AnalogClock, DynamicFavicon
  data/                   # content, social, stack, log
  hooks/                  # useTypewriter, useIntersectionReveal, useClock, useFavicon
  lib/                    # projects, date
  types/                  # shared TypeScript interfaces
```

## License

MIT
