import type { Project } from '@/types'

export const projects: Project[] = [
  {
    name: 'Eira',
    slug: 'eira',
    description:
      'Digital nursing handover platform — SBAR/ISBAR reports, patient charts, shift scheduling. Full-stack university thesis project.',
    longDescription:
      'Eira digitizes nursing shift handovers: SBAR/ISBAR reports, SOAPIE diary, patient vitals, Norton/Conley risk assessments, shift and staff management, with separate flows for nurses and ward heads. Built as the final project work for a Computer Science degree at Università Telematica Pegaso. Academic/demo project — fictional clinical context, not a medical device.',
    tags: ['Vue 3', 'TypeScript', 'FastAPI', 'Python'],
    year: 2026,
    status: 'shipped',
    github: 'https://github.com/Zuboh/Eira',
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
