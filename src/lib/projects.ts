import type { Project } from '@/types'

export const projects: Project[] = [
  {
    name: 'Prism',
    slug: 'prism',
    description:
      'Reads a Figma file and outputs structured context for Claude Code, tokens, components, spacing, the lot.',
    longDescription:
      'Prism connects your Figma file to Claude Code. It reads design tokens, component structures, spacing scales, and color systems, then outputs structured context that Claude can reason about. Feed it a file key, get back everything Claude needs to generate pixel accurate components without guessing at the design system.',
    tags: ['React', 'Figma API', 'Claude API', 'TypeScript'],
    year: 2025,
    status: 'in progress',
    href: '/works/prism',
    github: '#',
    demo: '#',
    whatsnext: [
      'Component variant extraction from Figma',
      'Auto mapping Figma components to Code Connect snippets',
      'CLI mode for use outside Claude Code',
      'Support for multiple file keys in one run',
    ],
    progress: 45,
    lastUpdated: 'April 2026',
    estimatedCompletion: 'Q3 2026',
  },
  {
    name: 'PR Review Assistant',
    slug: 'pr-review-assistant',
    description:
      'Drop in a diff, get back a review. Runs against Claude with a strict prompt no praise, just problems.',
    longDescription:
      'Paste a diff, get a review. The prompt is deliberately harsh — no "looks good", no filler. Claude is told to find bugs, flag anti patterns, and surface anything that would fail in production. Built with Monaco Editor for syntax highlighted diffs and a streaming response panel.',
    tags: ['React', 'Claude API', 'Monaco Editor'],
    year: 2025,
    status: 'planning',
    href: '/works/pr-review-assistant',
    github: '#',  
    lastUpdated: 'March 2026',
  },
  {
    name: 'Second Brain',
    slug: 'second-brain',
    description:
      'Notes go in, get tagged and embedded automatically. Search by meaning, not keyword. Built on pgvector.',
    longDescription:
      'A knowledge base that thinks. Notes get embedded on save and indexed into pgvector. Search is semantic — ask a question, get the relevant fragments back. Tags are suggested by Claude based on content. Built on Neon for serverless Postgres with Drizzle ORM and a Next.js frontend.',
    tags: ['Next.js', 'Neon', 'pgvector', 'Drizzle ORM'],
    year: 2024,
    status: 'planning',
    href: '/works/second-brain',
    github: '#',
    lastUpdated: 'January 2026',
  },
  {
    name: 'Primo',
    slug: 'primo',
    description:
      'Upload a contract or payslip, AI reads it, flags issues, and breaks it down in plain language. Built for workers, not lawyers.',
    longDescription:
      'Italian labour law is dense. Primo takes a contract or payslip photo, extracts the text, and runs it through a prompt that knows Italian employment law. It flags missing clauses, illegal terms, and underpayment — then explains each finding in plain language. No legal jargon.',
    tags: ['React Native', 'Expo', 'OpenAI', 'Supabase'],
    year: 2025,
    status: 'in progress',
    href: '/works/primo',
    github: 'https://github.com/Zuboh/Primo',
    whatsnext: [
      'OCR pipeline for handwritten contracts',
      'Push notifications for contract expiry dates',
      'Italian App Store submission',
      'Support for CCNL (national collective agreements)',
    ],
    progress: 60,
    lastUpdated: 'April 2026',
    estimatedCompletion: 'Q2 2026',
  },
]
