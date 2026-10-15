export interface StackGroup {
  // Key into the dictionary's `stack.groups`; the visible title is localized.
  key: 'frontend' | 'backend' | 'ai' | 'tools'
  items: string[]
}

// Sourced from the résumé skills and the featured projects.
export const STACK_GROUPS: StackGroup[] = [
  {
    key: 'frontend',
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
    key: 'backend',
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
    key: 'ai',
    items: ['Claude API', 'OpenAI', 'Prompt engineering', 'pgvector'],
  },
  {
    key: 'tools',
    items: ['Claude Code', 'Codex', 'Bash', 'Git', 'Figma', 'Vercel', 'Cursor'],
  },
]
