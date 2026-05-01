# zubo.dev

Personal portfolio — built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — scroll reveals, parallax, ticker

## Features

- Typewriter intro, parallax h1 on mouse move
- Analog clock (live)
- Scrolling ticker with current status
- Project showcase with tech tags
- Tech stack grid
- Activity log
- Contact section
- Dark/light theme via `next-themes`
- Dynamic favicon + tab title when window loses focus
- Sidebar navigation, scroll-to-top

## Dev

```bash
npm install
npm run dev
```

## Structure

```
src/
  app/          # layout, page, globals
  components/   # Hero, Work, Stack, About, Log, Contact, …
  hooks/        # useTypewriter, useScrollReveal, useClock, …
  lib/          # projects data
```

## License

MIT
