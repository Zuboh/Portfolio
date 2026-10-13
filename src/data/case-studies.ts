// Case-study copy is drawn from each project's own README and docs. Nothing here goes beyond them.

export interface CaseStudySection {
  title: string
  paragraphs?: string[]
  bullets?: { label?: string; text: string }[]
  flow?: string[]
}

export interface CaseStudy {
  sections: CaseStudySection[]
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  eira: {
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'Eira is a full-stack application for managing nursing handovers digitally. It brings SBAR handover, shift planning, clinical data and staff coordination into a single workspace, with separate flows for nurses and ward heads.',
          'It was developed as the final project work of the degree in Informatica per le Aziende Digitali at Università Telematica Pegaso. The clinical context is fictional and there is no partnership with real healthcare facilities. Eira is an academic and demonstration project: it is not a medical device and must not be used for real clinical data or decisions.',
        ],
      },
      {
        title: 'What it does',
        bullets: [
          { text: 'Structured SBAR/ISBAR handover with priority and history.' },
          {
            text: 'Patient chart with vital signs, SOAPIE diary and Norton and Conley risk assessments.',
          },
          {
            text: 'Shift planning, assignments and detection of uncovered shifts.',
          },
          {
            text: 'Shift swaps with double confirmation: the colleague and the ward head.',
          },
          {
            text: 'Leave requests, hours bank and monitoring of medication stock.',
          },
          {
            text: 'Role-specific dashboards and a responsive interface for desktop and tablet.',
          },
        ],
      },
      {
        title: 'Architecture',
        paragraphs: [
          'The frontend talks to the backend through a typed client generated from the backend’s own OpenAPI schema, so the API contract is shared rather than duplicated.',
        ],
        flow: [
          'Vue 3 + PrimeVue',
          'openapi-fetch typed client',
          'FastAPI',
          'JWT and access policies',
          'Domain services',
          'SQLite + Alembic',
        ],
        bullets: [
          {
            label: 'Frontend',
            text: 'Vue 3, Vite, TypeScript, Pinia, PrimeVue and Vue Router.',
          },
          {
            label: 'Backend',
            text: 'FastAPI, SQLAlchemy, Pydantic, JWT and Alembic.',
          },
          {
            label: 'Persistence',
            text: 'SQLite with migrations and a non-destructive bootstrap.',
          },
        ],
      },
      {
        title: 'Decisions',
        bullets: [
          {
            label: 'One API contract',
            text: 'TypeScript types and the client are generated from the OpenAPI schema, and a contract check is part of the project scripts.',
          },
          {
            label: 'Authorization on the server',
            text: 'Access is checked per role, ward, user and shift on the backend. Frontend checks only guide the experience.',
          },
          {
            label: 'No known credentials in production',
            text: 'The demo seed exists only in development and end-to-end runs and is always disabled in production.',
          },
        ],
      },
      {
        title: 'Quality and security',
        bullets: [
          {
            label: 'Tests',
            text: 'API and domain tests, component and composable tests, static checks, OpenAPI contract verification and browser end-to-end tests with axe-core accessibility checks.',
          },
          {
            label: 'Security',
            text: 'bcrypt password hashing, expiring JWTs with the user reloaded from the database on every request, data isolation between wards with protection against IDOR, and server-side validation of avatars.',
          },
          {
            label: 'Documentation',
            text: 'The repository documents the threat model and known limits in its SECURITY.md.',
          },
        ],
      },
    ],
  },

  primo: {
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'Italian labour law is dense. Primo is a mobile app that takes a contract or payslip and explains it in plain language, built for workers rather than lawyers.',
          'It is still in progress.',
        ],
      },
      {
        title: 'How it works',
        flow: [
          'Photo of a contract or payslip',
          'Text extraction',
          'Prompt written for Italian employment law',
          'Findings explained in plain language',
        ],
        bullets: [
          { text: 'It flags missing clauses, illegal terms and underpayment.' },
          { text: 'Each finding is explained without legal jargon.' },
        ],
      },
      {
        title: 'Stack',
        bullets: [
          { label: 'App', text: 'React Native with Expo and TypeScript.' },
          { label: 'Backend', text: 'Supabase.' },
          { label: 'Analysis', text: 'OpenAI GPT-4o mini.' },
        ],
      },
    ],
  },

  'zubo-os': {
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'Zubo OS is a personal CLI agent on the Claude API. I wanted to know how Claude Code actually works, so I rebuilt its core loop by hand: hooks, permission gates, tool dispatch and context assembly. That is the deterministic part of an agent, and it fits in about 300 lines of readable Python.',
        ],
      },
      {
        title: 'The loop',
        paragraphs: [
          'When the model stops with end_turn the response is printed. When it stops with tool_use the loop runs the tool call and goes around again.',
        ],
        flow: [
          'User input',
          'UserInput hook',
          'Claude API',
          'PreToolUse hook',
          'Permission gate',
          'Tool execution',
          'PostToolUse hook',
          'tool_result appended, loop',
        ],
      },
      {
        title: 'Layers',
        bullets: [
          {
            label: 'Context assembly',
            text: 'The system prompt is built at runtime from a base prompt, the active skills and a memory index.',
          },
          {
            label: 'Hooks',
            text: 'Four lifecycle events (PreToolUse, PostToolUse, UserInput and Stop) registered as callables on a HookRegistry.',
          },
          {
            label: 'Permissions',
            text: 'Three modes: default asks before guarded tools, auto allows everything and plan blocks tool execution.',
          },
          {
            label: 'Tool dispatch',
            text: 'Each tool module exports its schemas and functions. They are merged into one dispatch dict and called with the model’s input unpacked directly.',
          },
          {
            label: 'Memory',
            text: 'Markdown files with frontmatter, indexed by a MEMORY.md that is injected into the system prompt.',
          },
        ],
      },
      {
        title: 'Decisions',
        bullets: [
          {
            label: 'Hooks over edits to the loop',
            text: 'Logging, validation and slash commands live in hooks, so cross-cutting concerns never require changing agent.py.',
          },
          {
            label: 'Same skeleton, smaller scope',
            text: 'It keeps the conceptual skeleton of Claude Code and leaves out its production hardening: streaming, worktrees, MCP servers and concurrent tool calls.',
          },
        ],
      },
    ],
  },
}
