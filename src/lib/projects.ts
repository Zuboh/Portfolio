import type { Project, ProjectBase } from '@/types'

// Language-neutral project data. Descriptions live in the dictionaries
// (src/dictionaries/*.json, under `projects.<slug>`).
export const projects: ProjectBase[] = [
  {
    name: 'Eira',
    slug: 'eira',
    stack: ['Vue 3', 'TypeScript', 'FastAPI', 'Python'],
    year: 2026,
    status: 'shipped',
    updated: '2026-10-13',
    github: 'https://github.com/Zuboh/Eira',
  },
  {
    name: 'Primo',
    slug: 'primo',
    stack: ['React Native', 'Expo', 'OpenAI', 'Supabase'],
    year: 2025,
    status: 'in progress',
    updated: '2026-10-13',
    github: 'https://github.com/Zuboh/Primo',
  },
  {
    name: 'Zubo OS',
    slug: 'zubo-os',
    stack: ['Python', 'Claude API', 'CLI', 'Agents'],
    year: 2026,
    status: 'in progress',
    updated: '2026-10-13',
    github: 'https://github.com/Zuboh/zubo-os',
  },
]

export type ProjectCopy = Record<
  string,
  { metaTitle: string; description: string; longDescription?: string }
>

export function getProject(
  slug: string,
  copy: ProjectCopy
): Project | undefined {
  const base = projects.find((p) => p.slug === slug)
  const text = copy[slug]
  return base && text ? { ...base, ...text } : undefined
}

export function localizeProjects(copy: ProjectCopy): Project[] {
  return projects.flatMap((p) =>
    copy[p.slug] ? [{ ...p, ...copy[p.slug] }] : []
  )
}

export function statusLabel(
  p: ProjectBase,
  labels: { inProgress: string; planned: string }
): string {
  if (p.status === 'shipped') return String(p.year)
  return `${p.year} · ${p.status === 'in progress' ? labels.inProgress : labels.planned}`
}
