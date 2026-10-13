export interface StackGroup {
  title: string
  items: string[]
}

// Sourced from the résumé skills and the featured projects.
export const STACK_GROUPS: StackGroup[] = [
  {
    title: 'Frontend',
    items: [
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind',
      'MUI',
      'Redux',
      'Zustand',
      'React Query',
      'GraphQL',
      'React Native',
      'Angular',
      'Vue',
    ],
  },
  {
    title: 'Backend and data',
    items: [
      'Node.js',
      'Python',
      'FastAPI',
      'Supabase',
      'PostgreSQL',
      'MongoDB',
    ],
  },
  {
    title: 'AI and LLM',
    items: ['Claude API', 'OpenAI', 'Prompt engineering', 'pgvector'],
  },
  {
    title: 'Tools',
    items: ['Claude Code', 'Codex', 'Bash', 'Git', 'Figma', 'Vercel', 'Cursor'],
  },
]
