# Product marketing context — Lorenzo Zubani portfolio

Read by the `seo-audit` and `ai-seo` skills before they ask questions.

## Who
- **Lorenzo Zubani**, Frontend Engineer, Brescia, Italy.
- Frontend developer since 2019: Accenture (Angular, 2019–2022), Codiceplastico (React, design systems, 2022–2024), independent projects and startups (2024–present).
- Core stack: React, Next.js, TypeScript, React Native. Also design systems, Figma, Supabase, Node.js, Python, Claude API / OpenAI.

## Site
- URL: https://zubodev.vercel.app (Vercel, Next.js App Router). No custom domain yet.
- Locales: `en` (x-default) and `it`, under `/en/…` and `/it/…`.
- Pages: home, `/hire` (recruiter page), `/resume`, `/work/<slug>` case studies (Eira, Primo, Zubo OS, …), `/llms.txt`, `/resume.pdf`.
- Profiles: https://github.com/zuboh, https://www.linkedin.com/in/lorenzo-zubani/

## Site type and goal
- Personal developer portfolio. Not SaaS, not e-commerce, not a local business.
- Goal: inbound contacts from recruiters, startups and freelance clients.
- Wanted: full-time **remote** frontend roles, or **freelance** frontend projects anywhere in Italy; in person preferred in the Brescia area.
- Conversion: email (lorenzozubani1999@gmail.com), résumé PDF download, LinkedIn.

## Audience
- Tech recruiters and talent partners (Italy and EU remote).
- Startup founders / CTOs hiring a frontend engineer.
- Italian SMBs and agencies needing freelance frontend work.

## Priority queries
- Brand: "Lorenzo Zubani", "Lorenzo Zubani frontend".
- EN: "frontend engineer react italy", "react developer remote italy", "next.js developer italy", "frontend engineer brescia".
- IT: "sviluppatore frontend brescia", "react developer brescia", "frontend developer freelance italia", "sviluppatore react freelance".
- AI prompts: "who is Lorenzo Zubani?", "find a React frontend engineer in Lombardy open to remote work".

## Current state (2026-10-23)
- Indexing just started: canonical origin fixed to zubodev.vercel.app (previously pointed at an unresolved domain), so no meaningful Search Console or traffic data yet.
- Already in place: SSR HTML, hreflang en/it + x-default, sitemap, robots naming AI crawlers, Person/WebSite/ProfilePage/CreativeWork JSON-LD, llms.txt, Lighthouse mobile perf 95–100.
- Local check: `node scripts/seo-check.mjs <baseUrl>`.

## Constraints
- No hidden text, cloaking or LLM-targeted instructions in markup. Structured data must match visible content.
- All copy in both `en` and `it` (`src/dictionaries/*.json`).
