# zubo.dev

Portfolio of Lorenzo Zubani, Frontend Engineer. Next.js 16, React 19, TypeScript and Tailwind CSS v4.

## Routes

| Route | Description |
| --- | --- |
| `/` | Hero, selected work, stack, live GitHub commits, contact |
| `/work/[slug]` | Case study for each project (`eira`, `primo`, `zubo-os`) |
| `/resume` | Web résumé; the PDF is `public/resume.pdf` |

`/works` redirects to `/#work`. Also generated: `sitemap.xml`, `robots.txt`, an Open Graph image and a 404 page.

## Develop

```bash
npm install
npm run dev
```

Optional: set `GITHUB_TOKEN` to raise the GitHub API rate limit for the commit feed (60 requests per hour unauthenticated).

| Script | Purpose |
| --- | --- |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run shots <label>` | Playwright screenshots of every route at 1440, 1024 and 390px into `screenshots/<label>`; add `--reduced` for reduced motion. Needs the dev server on `localhost:3000`. |

## Structure

```
src/
  app/                 routes, layout, sitemap, robots, not-found, opengraph-image
  components/
    Nav.tsx
    sections/          Hero, Work, Stack, Activity, Contact, Footer
    ui/                Badge, Container, Flow, Icon, SectionHeader
  data/                case-studies, social, stack, tech
  lib/                 projects (single source), github, utils
public/icons/          stack logos (devicon, MIT)
```

Design rules live in [DESIGN.md](DESIGN.md), product intent in [PRODUCT.md](PRODUCT.md).
