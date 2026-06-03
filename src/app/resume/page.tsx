import Link from 'next/link'
import { Topbar } from '@/components/Topbar'
import { Footer } from '@/components/sections/Footer'
import { ResumeHeader } from '@/components/resume/ResumeHeader'
import { ResumeSection } from '@/components/resume/ResumeSection'
import { ExperienceCard } from '@/components/resume/ExperienceCard'
import { BlurFade } from '@/components/ui/blur-fade'

const PAGE = 'grid grid-cols-1 md:grid-cols-[1fr_68px] max-w-[800px] mx-auto pl-6 pr-4 md:pl-14 md:pr-3 pb-[140px] overflow-x-hidden'

const EXPERIENCE = [
  {
    role: 'Frontend Engineer',
    company: 'Lavoratore autonomo',
    period: 'Mar 2024 – present',
    current: true,
    bullets: [
      'Prism — local Figma to TSX pipeline with inspection workbench',
      'Primo — Italian contract analyzer (React Native + Supabase)',
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
    description: 'Local Figma to TSX pipeline. Drop a URL or export, get a clean React + Tailwind component validated with tsc.',
    tags: ['React', 'Tailwind', 'TypeScript', 'Figma API'],
  },
  {
    name: 'Primo',
    year: 2025,
    description: 'Contract and payslip analyzer for Italian workers. AI reads the document, flags issues, explains in plain language.',
    tags: ['React Native', 'Expo', 'OpenAI', 'Supabase'],
  },
]

const SKILLS: { category: string; items: string[] }[] = [
  { category: 'Architecture', items: ['Component design', 'design systems', 'state management'] },
  { category: 'Frontend', items: ['React', 'React Native', 'TypeScript', 'Next.js', 'Tailwind', 'Angular', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'Supabase', 'Drizzle ORM', 'Edge Functions'] },
  { category: 'AI / LLM', items: ['Claude API', 'OpenAI', 'prompt engineering', 'pgvector'] },
  { category: 'Tools', items: ['Figma', 'Git', 'VS Code', 'Vercel'] },
]

function Tag({ label }: { label: string }) {
  return (
    <span className="text-[10px] text-tx3 bg-bg3 px-[7px] py-0.5 rounded-[3px]">
      {label}
    </span>
  )
}

export default function ResumePage() {
  return (
    <div className={PAGE}>
      <Topbar />
      <main className="min-w-0">
        <BlurFade delay={0}>
          <div className="pt-10">
            <Link
              href="/"
              className="text-[11px] text-tx3 no-underline tracking-[.06em] inline-block mb-8 border-b-[0.5px] border-bd pb-0.5 transition-colors duration-200 hover:text-acc hover:border-acc"
            >
              ← back
            </Link>
          </div>
        </BlurFade>

        <ResumeHeader />

        <ResumeSection label="experience">
          {EXPERIENCE.map((e) => (
            <ExperienceCard key={e.company} {...e} />
          ))}
        </ResumeSection>

        <ResumeSection label="side projects">
          <div className="flex flex-col">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="pb-5 mb-5 border-b-[0.5px] border-bd last:border-b-0 last:mb-0"
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[13px] font-medium text-tx">{p.name}</span>
                  <span className="text-[10px] text-tx3 font-mono tracking-[.04em]">{p.year}</span>
                </div>
                <p className="text-[11px] text-tx2 leading-[1.65] mb-2">{p.description}</p>
                <div className="flex flex-wrap gap-1">{p.tags.map((t) => <Tag key={t} label={t} />)}</div>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection label="skills">
          <div className="flex flex-col gap-5">
            {SKILLS.map((s) => (
              <div key={s.category}>
                <div className="text-[10px] text-tx3 font-medium mb-2">{s.category}</div>
                <div className="flex flex-wrap gap-1">{s.items.map((i) => <Tag key={i} label={i} />)}</div>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection label="education">
          <div className="flex flex-col">
            {EDUCATION.map((e) => (
              <div key={e.degree} className="pb-5 mb-5 border-b-[0.5px] border-bd last:border-b-0 last:mb-0">
                <div className="flex justify-between items-start gap-3 flex-wrap">
                  <div>
                    <div className="text-[13px] font-medium text-tx mb-0.5">{e.degree}</div>
                    <div className="text-[11px] text-tx2 tracking-[.03em]">{e.institution}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {e.status && (
                      <span className="text-[9px] tracking-[.1em] uppercase px-2 py-[3px] rounded-[20px] bg-[oklch(from_var(--acc)_l_c_h_/_0.1)] text-acc">
                        {e.status}
                      </span>
                    )}
                    <span className="text-[10px] text-tx3 font-mono tracking-[.04em]">{e.period}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection label="languages">
          <div className="flex gap-1.5">
            <Tag label="Italian (native)" />
            <Tag label="English C1" />
          </div>
        </ResumeSection>

        <Footer />
      </main>
    </div>
  )
}
