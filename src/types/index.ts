export type ProjectStatus = 'in progress' | 'shipped' | 'planning'

export interface Project {
  name: string
  slug: string
  description: string
  longDescription?: string
  stack: string[]
  year: number
  status: ProjectStatus
  github?: string
  demo?: string
}

export interface ActivityEntry {
  date: string // ISO 8601
  repo: string
  message: string
  sha: string // short sha
  url: string
}
