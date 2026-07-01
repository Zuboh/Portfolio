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
    github: 'https://github.com/Zuboh/Prism',
  },
  {
    name: 'Primo',
    slug: 'primo',
    description:
      'Upload a contract or payslip, AI reads it, flags issues, and breaks it down in plain language. Built for workers, not lawyers.',
    longDescription:
      'Italian labour law is dense. Primo takes a contract or payslip photo, extracts the text, and runs it through a prompt that knows Italian employment law. It flags missing clauses, illegal terms, and underpayment, then explains each finding in plain language. No legal jargon.',
    tags: ['React Native', 'Expo', 'OpenAI', 'Supabase'],
    year: 2025,
    status: 'in progress',
    github: 'https://github.com/Zuboh/Primo',
  },
  {
    name: 'Zubo OS',
    slug: 'zubo-os',
    description:
      "Rebuilt Claude Code's core loop by hand in Python: hooks, permission gates, tool dispatch, context assembly. No framework, just the loop.",
    longDescription:
      "Zubo OS is a personal CLI agent on the Claude API that mirrors Claude Code's internals in about 300 lines of Python: a PreToolUse/PostToolUse hook system, a 3-mode permission gate (default/auto/plan), a tool dispatch dict, and a system prompt assembled at runtime from a base prompt, active skills, and a memory index. I built it to understand the deterministic infrastructure behind tool execution and context assembly, not the model.",
    tags: ['Python', 'Claude API', 'CLI', 'Agents'],
    year: 2026,
    status: 'in progress',
    github: 'https://github.com/Zuboh/zubo-os',
  },
]
