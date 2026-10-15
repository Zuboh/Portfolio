export type ProjectStatus = 'in progress' | 'shipped' | 'planning'

export interface ProjectBase {
  name: string
  slug: string
  stack: string[]
  year: number
  status: ProjectStatus
  /** Last meaningful change to the case study (YYYY-MM-DD); feeds sitemap and JSON-LD. */
  updated: string
  github?: string
  demo?: string
}

export interface Project extends ProjectBase {
  description: string
  longDescription?: string
}

export interface ActivityEntry {
  date: string // ISO 8601
  repo: string
  message: string
  sha: string // short sha
  url: string
}
