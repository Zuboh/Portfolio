export type ProjectStatus = 'in progress' | 'shipped' | 'planning'

export interface Project {
  name: string
  slug: string
  description: string
  longDescription?: string
  tags: string[]
  year: number
  status: ProjectStatus
  github?: string
  demo?: string
  docs?: string
}

export interface StackItem {
  label: string
  src?: string
  fallback?: { bg: string; color: string; text: string }
  isDark?: boolean
}

export type TagVariant = 'wip' | 'ship' | 'fix' | 'refactor'
export type ActivityType = 'commit' | 'pr' | 'release' | 'fix' | 'refactor' | 'wip'

export interface ActivityEntry {
  date: string
  repo: string
  type: ActivityType
  message: string
  tag?: {
    label: string
    variant: TagVariant
  }
}

export interface InfoRow {
  key: string
  value: string
  href?: string
}

export interface ClockState {
  handH: { x: number; y: number }
  handM: { x: number; y: number }
  handS: { tip: { x: number; y: number }; tail: { x: number; y: number } }
  digital: string
  date: string
}

export type Theme = 'light' | 'dark'
export type HiddenTheme = 'panda'
