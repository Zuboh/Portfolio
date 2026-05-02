import Link from 'next/link'
import { Topbar } from '@/components/Topbar'
import { Footer } from '@/components/sections/Footer'
import { ResumeHeader } from '@/components/resume/ResumeHeader'
import { ResumeSection } from '@/components/resume/ResumeSection'
import { ExperienceCard } from '@/components/resume/ExperienceCard'

const EXPERIENCE = [
  {
    role: 'Frontend & AI Engineer',
    company: 'Lavoratore autonomo',
    period: 'Mar 2024 – present',
    current: true,
    bullets: [
      'Prism — Figma token extractor for Claude Code integration',
      'PR Review Assistant — AI code review tool with Claude API',
      'Second Brain — AI knowledge base with semantic search (pgvector)',
      'PrimoContratto — Contract analyzer app (React Native + OpenAI)',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Codiceplastico',
    period: '2022 – 2024',
    current: false,
    bullets: [
      'Built React component libraries and design system primitives',
      'Led migration from class components to hooks across legacy codebase',
      'Implemented state management with Zustand and Recoil',
      'Collaborated with design team to produce pixel accurate UIs',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Accenture',
    period: '2019 – 2022',
    current: false,
    bullets: [
      'Developed Angular applications for enterprise clients',
      'Integrated REST APIs and managed complex data flows with Redux',
      'Contributed to internal design system and component documentation',
    ],
  },
]

const EDUCATION = [
  {
    degree: 'Laurea triennale in Digital Business',
    institution: 'Università Telematica Pegaso',
    period: '2024 – 2027',
    status: 'in progress' as const,
  },
  {
    degree: 'Diploma di Liceo Tecnico Informatico',
    institution: 'IIS "Carlo Beretta", Gardone Val Trompia',
    period: '2014 – 2019',
    status: null,
  },
]

const PROJECTS = [
  {
    name: 'Prism',
    year: 2025,
    description: 'Figma design token extractor. Generates AI-ready context for Claude Code.',
    tags: ['React', 'Figma API', 'Claude API', 'TypeScript'],
  },
  {
    name: 'PR Review Assistant',
    year: 2025,
    description: 'Paste a diff, get an AI code review. Focus on best practices, performance.',
    tags: ['React', 'Claude API', 'Monaco Editor'],
  },
  {
    name: 'Second Brain',
    year: 2024,
    description: 'Personal knowledge base with AI categorization and semantic search.',
    tags: ['Next.js', 'pgvector', 'Drizzle ORM', 'Claude API'],
  },
  {
    name: 'PrimoContratto',
    year: 2025,
    description: 'Contract & payslip analyzer for workers. AI-powered insights.',
    tags: ['React Native', 'Expo', 'OpenAI', 'Supabase'],
  },
]

const SKILLS: { category: string; items: string[] }[] = [
  {
    category: 'frontend',
    items: ['HTML', 'CSS/Sass', 'JavaScript', 'TypeScript', 'React', 'React Native', 'Next.js', 'TailwindCSS', 'Angular', 'Framer Motion', 'MUI'],
  },
  {
    category: 'backend',
    items: ['Node.js', 'Python', 'Supabase', 'Drizzle ORM'],
  },
  {
    category: 'state & data',
    items: ['Recoil', 'Zustand', 'Redux', 'MongoDB'],
  },
  {
    category: 'AI / LLM',
    items: ['Claude API', 'OpenAI', 'prompt engineering'],
  },
  {
    category: 'tools',
    items: ['Figma', 'Git', 'Vercel', 'VS Code'],
  },
  {
    category: 'UI / UX',
    items: ['Design Systems', 'Component Architecture'],
  },
]

const EXPERTISE: { category: string; items: string[] }[] = [
  { category: 'Architecture', items: ['Component design', 'design systems', 'state management'] },
  { category: 'Frontend', items: ['React', 'React Native', 'TypeScript', 'Tailwind', 'Framer Motion'] },
  { category: 'Backend', items: ['Next.js', 'Supabase', 'Edge Functions (Deno)'] },
  { category: 'AI / LLM', items: ['Claude API', 'OpenAI integration', 'prompt engineering'] },
  { category: 'Tools', items: ['Figma', 'Git', 'VS Code', 'Vercel'] },
]

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: 10,
        color: 'var(--tx3)',
        background: 'var(--bg3)',
        padding: '2px 7px',
        borderRadius: 3,
      }}
    >
      {label}
    </span>
  )
}

export default function ResumePage() {
  return (
    <div className="page">
      <Topbar />
      <main>
        <div style={{ paddingTop: 40, animation: 'fadeUp .4s ease both' }}>
          <Link
            href="/"
            className="nav-link-acc"
            style={{ fontSize: 11, display: 'inline-block', marginBottom: 32 }}
          >
            ← back
          </Link>
        </div>

        <ResumeHeader />

        {/* Experience */}
        <ResumeSection label="experience">
          {EXPERIENCE.map((e) => (
            <ExperienceCard key={e.company} {...e} />
          ))}
        </ResumeSection>

        {/* Side Projects */}
        <ResumeSection label="side projects" delay={60}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                style={{
                  border: '.5px solid var(--bd)',
                  borderRadius: 8,
                  padding: '14px 18px',
                  background: 'var(--card)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--tx)' }}>{p.name}</span>
                  <span style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.04em' }}>{p.year}</span>
                </div>
                <p style={{ fontSize: 11, color: 'var(--tx2)', lineHeight: 1.65, marginBottom: 8 }}>
                  {p.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {p.tags.map((t) => <Tag key={t} label={t} />)}
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Expertise */}
        <ResumeSection label="expertise" delay={80}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EXPERTISE.map((e) => (
              <div
                key={e.category}
                style={{
                  border: '.5px solid var(--bd)',
                  borderRadius: 8,
                  padding: '12px 16px',
                  background: 'var(--card)',
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: 'var(--tx3)',
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  {e.category}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {e.items.map((item) => <Tag key={item} label={item} />)}
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Skills */}
        <ResumeSection label="skills" delay={100}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SKILLS.map((s) => (
              <div key={s.category}>
                <div
                  style={{
                    fontSize: 9,
                    color: 'var(--tx3)',
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  {s.category}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {s.items.map((item) => <Tag key={item} label={item} />)}
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Education */}
        <ResumeSection label="education" delay={120}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {EDUCATION.map((e) => (
              <div
                key={e.degree}
                style={{
                  border: '.5px solid var(--bd)',
                  borderRadius: 8,
                  padding: '14px 18px',
                  background: 'var(--card)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--tx)', marginBottom: 2 }}>
                      {e.degree}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--tx2)', letterSpacing: '.03em' }}>
                      {e.institution}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    {e.status && (
                      <span
                        style={{
                          fontSize: 9,
                          letterSpacing: '.1em',
                          textTransform: 'uppercase',
                          padding: '2px 8px',
                          borderRadius: 20,
                          background: 'rgba(192, 91, 0, .1)',
                          color: '#C05B00',
                        }}
                      >
                        {e.status}
                      </span>
                    )}
                    <span style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.04em' }}>
                      {e.period}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Languages & Certs */}
        <ResumeSection label="languages & certificates" delay={140}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              style={{
                border: '.5px solid var(--bd)',
                borderRadius: 8,
                padding: '12px 16px',
                background: 'var(--card)',
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: 'var(--tx3)',
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                languages
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <Tag label="Italian (native)" />
                <Tag label="English C1" />
              </div>
            </div>
            <div
              style={{
                border: '.5px solid var(--bd)',
                borderRadius: 8,
                padding: '12px 16px',
                background: 'var(--card)',
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: 'var(--tx3)',
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                certificates
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Tag label="Sviluppo web front-end" />
              </div>
            </div>
          </div>
        </ResumeSection>

        <Footer />
      </main>
    </div>
  )
}
