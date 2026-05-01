import type { Project } from '@/types'

export const projects: Project[] = [
  {
    name: 'Prism',
    description:
      'Reads a Figma file and outputs structured context for Claude Code — tokens, components, spacing, the lot.',
    tags: ['React', 'Figma API', 'Claude API', 'TypeScript'],
    year: 2025,
    status: 'in progress',
    href: '#',
  },
  {
    name: 'PR Review Assistant',
    description:
      'Drop in a diff, get back a review. Runs against Claude with a strict prompt — no praise, just problems.',
    tags: ['React', 'Claude API', 'Monaco Editor'],
    year: 2025,
    status: 'in progress',
    href: '#',
  },
  {
    name: 'Second Brain',
    description:
      'Notes go in, get tagged and embedded automatically. Search by meaning, not keyword. Built on pgvector.',
    tags: ['Next.js', 'Neon', 'pgvector', 'Drizzle ORM'],
    year: 2024,
    status: 'in progress',
    href: '#',
  },
  {
    name: 'Primo Contratto',
    description:
      'Upload a contract or payslip — AI reads it, flags issues, and breaks it down in plain language. Built for workers, not lawyers.',
    tags: ['React Native', 'Expo', 'OpenAI', 'Supabase'],
    year: 2025,
    status: 'in progress',
    href: '#',
  },
]
