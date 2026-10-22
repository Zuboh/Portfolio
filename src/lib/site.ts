// Canonical origin and brand name. Every absolute URL on the site derives from here.
export const SITE_URL = 'https://zubodev.vercel.app'
export const SITE_HOST = new URL(SITE_URL).host
export const SITE_NAME = 'Lorenzo Zubani'

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** Only the production deployment may be indexed; previews and local builds are not. */
export const isIndexable = process.env.VERCEL_ENV === 'production'

/** AI search and assistant crawlers, named so a blanket bot rule can't shut them out. */
export const AI_AGENTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'Applebot-Extended',
]
