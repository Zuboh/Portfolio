# AI visibility audit — zubodev.vercel.app (2026-10-23)

Skill: `ai-seo`. Context: `.agents/product-marketing.md`. Technical SEO: `2026-10-audit.md`.
Goal: when a recruiter, founder or client asks an assistant about Lorenzo Zubani, or for a React / Next.js frontend engineer in Italy, the answer cites this site and states correct facts.

## Baseline

- **Web search, brand query** `"Lorenzo Zubani" frontend` (2026-10-23): no result mentions Lorenzo. Expected: the canonical origin only became valid today and the site is not submitted to Google or Bing yet.
- **AI assistants:** not measured yet. They have to be run by hand (no API access from here). Prompt set: `ai-prompts.csv`. Rule: 3–5 runs per prompt per engine, record `cited k/n`, compare rates over time, not single answers.
- **Realistic expectation:** brand and identity prompts ("Who is Lorenzo Zubani?") are the first win, once Bing and Google index the site (ChatGPT search leans on Bing; Gemini on Google). Generic discovery prompts ("React developer in Brescia") recommend individuals only with third-party consensus (LinkedIn, GitHub, directories), so treat those as the long-term metric.

## Access, discovery, parseability (agent readiness)

| Check | Result |
|---|---|
| Core content in initial HTML | Pass. Server-rendered; JSON-LD in the HTML |
| Firewall / bot challenge | Pass. `/en/hire` returns 200 with full HTML (142 KB) to OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, ClaudeBot, Claude-SearchBot, Claude-User, Googlebot, bingbot, meta-externalagent |
| HTTP behavior | Pass. Real 404s, stable self-canonicals, 308 for trailing slash and http |
| robots.txt AI stance | Pass. Discovery, user-retrieval and training crawlers named and allowed (deliberate: a portfolio wants to be known, training included) |
| Sitemap | Pass |
| `llms.txt` | Pass. Summary, pages, projects with descriptions, profiles |
| `llms-full.txt` | Missing. Emerging, cheap: same generator, plus case study bodies and résumé |
| Markdown negotiation / `Link` header | Missing. Emerging; skip for now |
| Structured data | Pass. Person (skills, seeks, hasOccupation, alumniOf, sameAs), WebSite, ProfilePage, AboutPage, CreativeWork |
| One H1, semantic landmarks | Pass |

## Extractability (priority pages)

| Check | Home | /hire | Case studies |
|---|---|---|---|
| Plain statement of who/what in first paragraph | Partial: intro says "Frontend engineer specializing in React and TypeScript…" without the name | Pass: "Lorenzo Zubani is a Frontend Engineer based in Brescia, Italy…" | Pass (description up top) |
| Self-contained answer blocks | Partial | Pass (lists) | Partial |
| Numbers / verifiable facts | Missing | Partial (since 2019, 95–100 Lighthouse) | Missing (see audit C1) |
| Q&A for the questions recruiters ask | Missing | Missing | n/a |
| Freshness signal | Pass ("Updated October 2026" footer) | Pass | Pass (`dateModified` in JSON-LD) |
| Distinct title | Fail (audit O1) | Pass | Fail (audit O1) |

## Presence (where assistants look for people)

- **LinkedIn** is the most-cited source for professional queries on ChatGPT, Perplexity and Copilot (Gemini almost never cites it). ChatGPT has shifted to feed posts, Perplexity/Copilot also cite long-form articles (reference `linkedin-ai-citations.md`, 2026 data).
- **Consensus:** assistants recommend people they see described the same way in several places. Today only the site and LinkedIn exist, and the LinkedIn headline is unverified.
- **GitHub:** profile README and pinned repos are crawlable and frequently retrieved for developer queries.
- Not applicable: Wikipedia, review sites, Google Business Profile.

## Recommendations (priority order)

1. **Get indexed** (audit T1): GSC + Bing Webmaster + IndexNow. Prerequisite for everything else; ChatGPT search depends heavily on Bing.
2. **Titles** (audit O1) carrying role, stack and place: the title is what the assistants' search step matches first.
3. **Hire page Q&A block**, visible, 4–6 questions phrased like recruiter prompts, each answered in 1–2 sentences: *Is Lorenzo available?* · *Remote or on-site? Where?* · *Full-time or freelance?* · *Main stack?* · *Experience?* · *How to contact?* Mirror it as `FAQPage` JSON-LD (Google doesn't need it; other engines extract it). Same facts as today, no new claims.
4. **Name in the home intro**: start `hero.intro` with "Lorenzo Zubani is a frontend engineer…", so the opening passage stands alone when extracted.
5. **Outcomes in case studies** (audit C1): 2–3 dated, verifiable facts each. Statistics are the most reliable citation lever in the GEO research.
6. **`llms-full.txt`**: generate from the same data as `llms.txt` plus case study sections and résumé.
7. **Off-site consensus** (Lorenzo):
   - LinkedIn headline identical to the site: `Frontend Engineer · React / Next.js / TypeScript · Brescia`; About first line = the hire-page lead; site link in Featured.
   - One feed post per month, first words = target phrase (it becomes the URL slug), e.g. "Frontend engineer in Brescia: how I…". One long-form article on a case study (Prism, or perf 69→98).
   - GitHub profile README with the same one-line positioning + site link; Wellfound profile with the same text.

## Measurement

- Monthly: run the stable core in `ai-prompts.csv` (3 runs × ChatGPT search, Perplexity, Claude with web search, Gemini). Log rows in `ai-visibility-log.csv` (`date,engine,prompt_id,runs,cited,mentioned,url_cited,wrong_facts`).
- Any wrong fact in an answer: find the page or profile that should state it plainly, fix it there (reference `answer-accuracy.md`).
- Google side: Search Console Performance for brand + role queries (no AI-specific report exists).
