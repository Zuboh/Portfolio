# SEO + GEO + Recruiter Visibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Far trovare il portfolio da Google/Bing, da ChatGPT/Perplexity/Claude/Gemini e da recruiter/startup che cercano un Frontend Engineer React/TypeScript.

**Architecture:** Tutto deriva da `src/lib/site.ts` (origin canonico). Si corregge l'origin, si apre `robots.ts` ai bot AI per nome, si arricchisce il JSON-LD `Person` in `src/lib/jsonld.ts` con fatti da recruiter, si aggiunge una riga di disponibilità visibile, una pagina `/[lang]/hire` e un `/llms.txt`. `scripts/seo-check.mjs` è la suite di test: ogni task aggiunge le sue asserzioni lì.

**Tech Stack:** Next.js (App Router, versione nel repo — leggere `node_modules/next/dist/docs/` prima di toccare API), TypeScript, Vercel, dizionari `src/dictionaries/{en,it}.json`.

**Spec:** conversazione 2026-10-22 (nessun doc separato). Requisiti riassunti in Global Constraints.

## Decisioni bloccanti (Lorenzo)

Da compilare prima del Task 1. I valori finiscono letteralmente nel codice.

| ID | Domanda | Default proposto |
|----|---------|------------------|
| D1 | Dominio: **A** compro `lorenzozubani.dev` / **B** resto su `zubodev.vercel.app` | A |
| D2 | Disponibilità: full-time / freelance / entrambi; remote / ibrido / onsite; zona; da quando | full-time, ibrido o remote, Brescia–Milano, subito |
| D3 | Email pubblica in testo (già usata in `mailto:` via `EMAIL`) + link Calendly? | email sì, Calendly no |

## Global Constraints

- Nessun testo nascosto via CSS, nessun cloaking, nessuna istruzione rivolta a LLM nel markup. Metadati/JSON-LD solo con fatti veri e coerenti con la pagina visibile.
- Ogni URL assoluto deriva da `SITE_URL`; niente host hardcoded altrove (incluso `scripts/seo-check.mjs`, che oggi ha `PROD` hardcoded).
- Previews restano non indicizzabili (`isIndexable` su `VERCEL_ENV === 'production'`).
- Testi sempre in entrambe le lingue (`en`, `it`), stesse chiavi.
- Meta description 50–160 caratteri (vincolo già in `seo-check`).
- Bot AI da permettere esplicitamente: `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, `PerplexityBot`, `Perplexity-User`, `ClaudeBot`, `Claude-SearchBot`, `Claude-User`, `Google-Extended`, `Applebot-Extended`, `Bingbot`.
- Verifica locale in modalità produzione: `VERCEL_ENV=production npm run build && npm start`, poi `npm run seo:check`.

## Review Focus

1. Redirect `zubodev.vercel.app → SITE_URL` (D1=A) non deve colpire i deploy preview (host `*-zubohs-projects.vercel.app`) → solo host esatto. Test: `curl -sI` su preview resta 200.
2. `/llms.txt` non deve essere intercettato da `src/proxy.ts` (matcher salta i path con estensione → ok); `/hire` invece passa dal proxy → deve vivere sotto `[lang]`. Test in Task 5/6.
3. Robots in preview deve restare `Disallow: /` anche con le nuove regole per bot. Test in Task 2.
4. JSON-LD deve restare JSON valido parsabile con `seeks`/`email`. `seo-check` già parsa i blocchi; Task 3 aggiunge asserzioni sui campi.
5. Description arricchita di keyword non deve sforare 160 caratteri in nessuna lingua. Coperto da `seo-check`.

---

### Task 1: Origin canonico corretto

**Files:**
- Modify: `src/lib/site.ts:2`
- Modify: `next.config.ts` (`redirects()`) — solo se D1=A
- Modify: `scripts/seo-check.mjs:6`
- Modify: `scripts/indexnow.mjs:5`, `scripts/gsc-submit-sitemap.mjs:7` (fallback `'https://lorenzozubani.dev'` → valore D1)

**Interfaces:**
- Produces: `SITE_URL` = `https://lorenzozubani.dev` (A) o `https://zubodev.vercel.app` (B). Tutti i task successivi lo usano.

- [ ] **Step 1 (test):** in `seo-check.mjs` sostituire `const PROD = 'https://lorenzozubani.dev'` con `const PROD = process.env.SITE_URL ?? '<valore D1>'` e aggiungere: `if (!robots.text.includes(\`Sitemap: ${PROD}/sitemap.xml\`)) fail('/robots.txt', 'sitemap not on PROD')`.
- [ ] **Step 2:** (A) comprare dominio, `vercel domains add lorenzozubani.dev` sul progetto `portfolio` (team `zubohs-projects`), verificare `dig +short lorenzozubani.dev` non vuoto e `curl -sI https://lorenzozubani.dev` → 200/307. (B) salta.
- [ ] **Step 3:** impostare `SITE_URL` in `src/lib/site.ts` e lo stesso valore come fallback in `seo-check.mjs`, `indexnow.mjs`, `gsc-submit-sitemap.mjs` (`rg -n lorenzozubani.dev scripts src` deve restituire solo `site.ts` se D1=B). Se A: in `redirects()` aggiungere `{ source: '/:path*', has: [{ type: 'host', value: 'zubodev.vercel.app' }], destination: 'https://lorenzozubani.dev/:path*', permanent: true }`.
- [ ] **Step 4 (verifica):** build in modalità produzione + `npm run seo:check` → 0 errori; `npm run typecheck` → ok.
- [ ] **Step 5:** commit `fix(seo): point canonical origin at a live host`.

### Task 2: Robots aperto ai bot AI

**Files:**
- Modify: `src/lib/site.ts` (nuova costante)
- Modify: `src/app/robots.ts`
- Modify: `scripts/seo-check.mjs`

**Interfaces:**
- Produces: `export const AI_AGENTS: readonly string[]` in `src/lib/site.ts` (lista da Global Constraints). `seo-check.mjs` ne tiene una copia (è `.mjs`, non importa TS).

- [ ] **Step 1 (test):** in `seo-check.mjs`, per ogni agent: `if (!new RegExp(\`User-Agent: ${a}\\b\`, 'i').test(robots.text)) fail('/robots.txt', \`${a} not listed\`)`.
- [ ] **Step 2:** verifica che fallisca sulla build attuale.
- [ ] **Step 3:** `rules` diventa array: `[{ userAgent: '*', allow: '/' }, { userAgent: [...AI_AGENTS], allow: '/' }]`. Ramo preview invariato.
- [ ] **Step 4 (verifica):** `seo:check` verde in prod-mode; build senza `VERCEL_ENV` → `curl localhost:3000/robots.txt` mostra solo `Disallow: /`.
- [ ] **Step 5:** controllare Vercel Firewall/Bot Protection (MCP `get_firewall_config`) che non blocchi questi UA. Commit `feat(seo): explicitly allow AI search crawlers`.

### Task 3: JSON-LD Person per recruiter

**Files:**
- Modify: `src/lib/jsonld.ts:15-34` (`person`)
- Modify: `src/app/[lang]/layout.tsx` (chiamata a `person`)
- Modify: `src/data/social.ts` (nuovi profili per `sameAs` dal Task 8)
- Modify: `scripts/seo-check.mjs`

**Interfaces:**
- Consumes: `SITE_URL`, `EMAIL` (già esportato, usato in `Hero.tsx`).
- Produces: `person(jobTitle: string, description: string): Thing`.

- [ ] **Step 1 (test):** in `seo-check`, sulla home trovare il nodo `@type: 'Person'` e asserire: `knowsAbout.length >= 10`, `seeks` presente, `hasOccupation` presente, `email` presente se D3=sì, `sameAs.length >= 2`.
- [ ] **Step 2:** verifica fail.
- [ ] **Step 3:** campi da aggiungere:
  - `description`
  - `email: \`mailto:${EMAIL}\``
  - `knowsAbout`: `React`, `TypeScript`, `Next.js`, `React Native`, `JavaScript`, `HTML`, `CSS`, `Tailwind CSS`, `Design systems`, `Figma`, `Accessibility`, `Web performance`, `Frontend architecture`, `AI-assisted development` — tenere solo quelli confermati dal CV
  - `hasOccupation: { '@type': 'Occupation', name: jobTitle, occupationLocation: { '@type': 'City', name: 'Brescia' }, skills: knowsAbout.join(', ') }`
  - `seeks: { '@type': 'Demand', description: '<D2 in inglese>' }`
  - `alumniOf` / `worksFor` solo se presenti nel CV (sezione resume dei dizionari).
- [ ] **Step 4 (verifica):** `seo:check` verde; home in https://validator.schema.org → 0 errori.
- [ ] **Step 5:** commit `feat(seo): enrich Person structured data for recruiters`.

### Task 4: Riga disponibilità + meta description con keyword

**Files:**
- Modify: `src/dictionaries/en.json`, `src/dictionaries/it.json` (`meta.description`, nuova `hero.availability`)
- Modify: `src/components/sections/Hero.tsx` (render `hero.availability` sotto `hero.role`, stile del testo secondario esistente)
- Modify: tipo del dizionario se tipizzato (`src/app/[lang]/dictionaries.ts`)

- [ ] **Step 1 (test):** in `seo-check`, home: HTML contiene la stringa `hero.availability` della lingua (letta dai JSON); description contiene `React` e `TypeScript`.
- [ ] **Step 2:** verifica fail.
- [ ] **Step 3:** copy (adattare a D2):
  - en `hero.availability`: `"Open to frontend roles · Brescia / Milan / Remote"`
  - it `hero.availability`: `"Disponibile per ruoli frontend · Brescia / Milano / Remote"`
  - en `meta.description` (≤160): `"Lorenzo Zubani, Frontend Engineer in Brescia, Italy. React, Next.js, TypeScript, React Native. Open to product and startup roles, remote or hybrid."`
  - it: equivalente ≤160.
  - render in `Hero.tsx`.
- [ ] **Step 4 (verifica):** `seo:check` verde; `npm run shots` → hero mobile+desktop senza rotture di layout.
- [ ] **Step 5:** commit `feat(content): state availability for recruiters`.

### Task 5: Pagina `/[lang]/hire`

**Files:**
- Create: `src/app/[lang]/hire/page.tsx` (stesso pattern di `resume/page.tsx`: `generateMetadata` con canonical + hreflang **e** `title`, `description`, `openGraph: { url, title, description }` propri — altrimenti eredita quelli della home dal layout)
- Modify: dizionari (`hire.metaTitle`, `hire.metaDescription` 50–160 car., `hire.title`, `hire.lead`, `hire.looking`, `hire.stack`, `hire.results`, `hire.cta`)
- Modify: `src/app/sitemap.ts` → `...localized('/hire', 'monthly', 0.8, now)`
- Modify: `src/components/sections/Contact.tsx` → link testuale a `/${lang}/hire` (non nel menu principale)

**Interfaces:**
- Consumes: `PERSON_ID`, `WEBSITE_ID` (JSON-LD `@type: 'AboutPage'`, `mainEntity: { '@id': PERSON_ID }`).

- [ ] **Step 1 (test):** `seo-check` copre la pagina via sitemap (canonical, hreflang, title, description, og:image). Aggiungere: home contiene `href="/${lang}/hire"`; su `/${lang}/hire` `<title>` contiene `hire.metaTitle`, meta description === `hire.metaDescription`, `og:url` === URL della pagina (non la home).
- [ ] **Step 2:** verifica fail (404 sulla voce di sitemap).
- [ ] **Step 3:** contenuto: frase-riassunto citabile (`"Lorenzo Zubani is a Frontend Engineer based in Brescia, Italy, building products with React, Next.js and TypeScript."`), cosa cerco (D2), stack, 2–3 risultati misurabili dai case study, contatto (email in testo, `RESUME_PDF`, Calendly se D3).
- [ ] **Step 4 (verifica):** `seo:check` verde, `npm run typecheck`, `npm run lint`, screenshot.
- [ ] **Step 5:** commit `feat: add hire page for recruiters`.

### Task 6: `/llms.txt`

**Files:**
- Create: `src/app/llms.txt/route.ts` (`GET` → `text/plain; charset=utf-8`, statico; verificare API route handler nei docs Next locali)
- Modify: `scripts/seo-check.mjs`

- [ ] **Step 1 (test):** `GET /llms.txt` → 200, inizia con `# Lorenzo Zubani`, contiene `${PROD}/en/hire`, ogni riga progetto ha forma `- [name](url): <descrizione non vuota>`.
- [ ] **Step 2:** verifica fail (404).
- [ ] **Step 3:** formato llmstxt.org: H1 nome, blockquote con la stessa frase-riassunto del Task 5, `## Pages` (home, hire, resume, progetti), `## Profiles` (`sameAs`). Locale fissa `en`: progetti da `localizeProjects((await getDictionary('en')).projects)` (`src/lib/projects.ts:49`) — `projects[]` grezzo non ha `description`. Generato dai dati esistenti, niente testo duplicato a mano.
- [ ] **Step 4 (verifica):** `seo:check` verde; `curl -sI localhost:3000/llms.txt` → 200 senza redirect.
- [ ] **Step 5:** commit `feat(seo): serve llms.txt`.

### Task 7: Deploy + indicizzazione

Operativo, niente codice.

- [ ] **Step 1:** PR → merge su `main` → deploy prod. `node scripts/seo-check.mjs https://<SITE_HOST>` → 0 errori.
- [ ] **Step 2:** Google Search Console: verifica proprietà (dominio → DNS TXT; se D1=B → prefisso URL + meta tag/file HTML). `GSC_SERVICE_ACCOUNT=… npm run seo:gsc -- <SITE_URL>`: output **non** deve contenere `skipping`; conferma in GSC → Sitemaps stato "Riuscito". URL Inspection su `/en`, `/it`, `/en/hire` → "Request indexing".
- [ ] **Step 3:** Bing Webmaster Tools: import da GSC, submit sitemap, `npm run seo:indexnow -- <SITE_URL>` (origin esplicito; key file in `public/` già presente) → HTTP 200/202.
- [ ] **Step 4:** dopo 7 giorni: GSC pagine indicizzate > 0, Bing Site Explorer > 0, Vercel logs con UA `OAI-SearchBot|PerplexityBot|ClaudeBot` → almeno una hit.

### Task 8: Off-site (Lorenzo)

Pesa più del codice per recruiter e AI. Stesso titolo ovunque: `Frontend Engineer · React / TypeScript · Brescia`.

- [ ] LinkedIn: headline identica, "Open to work" (solo recruiter), sito in Featured + Contact info.
- [ ] GitHub: profile README con link al sito, 4–6 repo pinnati con descrizione, "Available for hire".
- [ ] Wellfound + YC Work at a Startup (+ Malt se freelance in D2): profilo con link al sito → URL in `sameAs` (Task 3).
- [ ] 1 post LinkedIn o dev.to su un progetto (Prism o perf 69→98) con link al case study.
- [ ] CV PDF: link al sito in testata (se D1=A, il redirect copre il vecchio `zubodev.vercel.app`).

### Task 9: Misura (mensile)

- [ ] Prompt fissi su ChatGPT (search on), Perplexity, Claude, Gemini: `"Chi è Lorenzo Zubani?"`, `"Frontend engineer React a Brescia"`, `"React developer disponibili in Lombardia per startup"`. Annotare: citato sì/no, URL citato, fatti errati.
- [ ] GSC report query: impression per `frontend`, `react`, `brescia`.
- [ ] Fatti errati nelle risposte AI → correggere la fonte (sito/LinkedIn) che li genera.
