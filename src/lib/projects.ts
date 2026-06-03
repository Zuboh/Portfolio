import type { Project } from '@/types'

export const projects: Project[] = [
  {
    name: 'Prism',
    slug: 'prism',
    description:
      'Drop a Figma URL or export, get a clean React + Tailwind component. Strips noise, flags hardcoded values, validates with tsc.',
    longDescription:
      'Prism is a local Figma to TSX pipeline. A /prism skill takes a Figma URL or local SVG/CSS export and outputs a cleaned React + Tailwind component to ./prism-output. It strips Figma noise, flags hardcoded colors and fonts, localizes assets, and validates with tsc. The Prism Workbench is a local inspection UI that renders the output, surfaces tsc errors and TODOs, and lets you verify before copying to your project. Goal: confidence in the component in under 30 seconds.',
    tags: ['React', 'Tailwind', 'TypeScript', 'Figma API'],
    year: 2025,
    status: 'in progress',
    href: '/works/prism',
    github: 'https://github.com/Zuboh/Prism',
    whatsnext: [
      'Support for Figma component variants',
      'Auto token extraction into CSS variables',
      'One-click copy to project with path picker',
      'Batch export for multiple frames',
    ],
    progress: 45,
    lastUpdated: 'May 2026',
    estimatedCompletion: 'Q3 2026',
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
