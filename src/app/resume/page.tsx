import Link from 'next/link'
import { Topbar } from '@/components/Topbar'
import { Footer } from '@/components/sections/Footer'
import { ResumeHeader } from '@/components/resume/ResumeHeader'
import { ResumeSection } from '@/components/resume/ResumeSection'
import { ExperienceCard } from '@/components/resume/ExperienceCard'

const PAGE = 'grid grid-cols-1 md:grid-cols-[1fr_68px] max-w-[800px] mx-auto pl-6 pr-4 md:pl-14 md:pr-3 pb-[140px] overflow-x-hidden'

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
  { category: 'frontend', items: ['HTML', 'CSS/Sass', 'JavaScript', 'TypeScript', 'React', 'React Native', 'Next.js', 'TailwindCSS', 'Angular', 'Framer Motion', 'MUI'] },
  { category: 'backend', items: ['Node.js', 'Python', 'Supabase', 'Drizzle ORM'] },
  { category: 'state & data', items: ['Recoil', 'Zustand', 'Redux', 'MongoDB'] },
  { category: 'AI / LLM', items: ['Claude API', 'OpenAI', 'prompt engineering'] },
  { category: 'tools', items: ['Figma', 'Git', 'Vercel', 'VS Code'] },
  { category: 'UI / UX', items: ['Design Systems', 'Component Architecture'] },
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
    <span className="text-[10px] text-tx3 bg-bg3 px-[7px] py-0.5 rounded-[3px]">
      {label}
    </span>
  )
}

function CategoryCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-[0.5px] border-bd rounded-lg py-3 px-4 bg-card">
      <div className="text-[9px] text-tx3 tracking-[.12em] uppercase mb-2">{label}</div>
      {children}
    </div>
  )
}

export default function ResumePage() {
  return (
    <div className={PAGE}>
      <Topbar />
      <main className="min-w-0">
        <div className="pt-10 [animation:fadeUp_0.4s_ease_both]">
          <Link
            href="/"
            className="text-[11px] text-tx3 no-underline tracking-[.06em] inline-block mb-8 border-b-[0.5px] border-bd pb-0.5 transition-colors duration-200 hover:text-acc hover:border-acc"
          >
            ← back
          </Link>
        </div>

        <ResumeHeader />

        <ResumeSection label="experience">
          {EXPERIENCE.map((e) => (
            <ExperienceCard key={e.company} {...e} />
          ))}
        </ResumeSection>

        <ResumeSection label="side projects" delay={60}>
          <div className="flex flex-col gap-3.5">
            {PROJECTS.map((p) => (
              <div key={p.name} className="border-[0.5px] border-bd rounded-lg py-3.5 px-[18px] bg-card">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-medium text-tx">{p.name}</span>
                  <span className="text-[10px] text-tx3 tracking-[.04em]">{p.year}</span>
                </div>
                <p className="text-[11px] text-tx2 leading-[1.65] mb-2">{p.description}</p>
                <div className="flex flex-wrap gap-1">{p.tags.map((t) => <Tag key={t} label={t} />)}</div>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection label="expertise" delay={80}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EXPERTISE.map((e) => (
              <CategoryCard key={e.category} label={e.category}>
                <div className="flex flex-wrap gap-1">{e.items.map((i) => <Tag key={i} label={i} />)}</div>
              </CategoryCard>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection label="skills" delay={100}>
          <div className="flex flex-col gap-4">
            {SKILLS.map((s) => (
              <div key={s.category}>
                <div className="text-[9px] text-tx3 tracking-[.12em] uppercase mb-1.5">{s.category}</div>
                <div className="flex flex-wrap gap-1">{s.items.map((i) => <Tag key={i} label={i} />)}</div>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection label="education" delay={120}>
          <div className="flex flex-col gap-2.5">
            {EDUCATION.map((e) => (
              <div key={e.degree} className="border-[0.5px] border-bd rounded-lg py-3.5 px-[18px] bg-card">
                <div className="flex justify-between items-start gap-3 flex-wrap">
                  <div>
                    <div className="text-xs font-medium text-tx mb-0.5">{e.degree}</div>
                    <div className="text-[10px] text-tx2 tracking-[.03em]">{e.institution}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {e.status && (
                      <span className="text-[9px] tracking-[.1em] uppercase px-2 py-[3px] rounded-[20px] bg-[rgba(192,91,0,0.1)] text-[#C05B00]">
                        {e.status}
                      </span>
                    )}
                    <span className="text-[10px] text-tx3 tracking-[.04em]">{e.period}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection label="languages & certificates" delay={140}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CategoryCard label="languages">
              <div className="flex gap-1.5"><Tag label="Italian (native)" /><Tag label="English C1" /></div>
            </CategoryCard>
            <CategoryCard label="certificates">
              <div className="flex flex-wrap gap-1.5"><Tag label="Sviluppo web front-end" /></div>
            </CategoryCard>
          </div>
        </ResumeSection>

        <Footer />
      </main>
    </div>
  )
}
