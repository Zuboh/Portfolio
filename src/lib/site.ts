// Canonical origin and brand name. Every absolute URL on the site derives from here.
export const SITE_URL = 'https://lorenzozubani.dev'
export const SITE_HOST = new URL(SITE_URL).host
export const SITE_NAME = 'Lorenzo Zubani'

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** Only the production deployment may be indexed; previews and local builds are not. */
export const isIndexable = process.env.VERCEL_ENV === 'production'
