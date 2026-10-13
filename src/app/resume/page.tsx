import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { projects } from '@/lib/projects'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_PDF } from '@/data/social'

const EXPERIENCE = [
  {
    role: 'Frontend Engineer',
    company: 'Self-employed',
    period: 'Mar 2024 – present',
    bullets: [
      'Eira — digital nursing handover platform, Vue 3 + FastAPI (university thesis)',
      'Primo — Italian contract analyzer (React Native + Supabase)',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Codiceplastico',
    period: '2022 – 2024',
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
    period: '2024 – 2027 (in progress)',
  },
  {
    degree: 'Diploma di Liceo Tecnico Informatico',
    institution: 'IIS "Carlo Beretta", Gardone Val Trompia',
    period: '2014 – 2019',
  },
]

const SKILLS = [
  {
    category: 'Architecture',
    items: ['Component design', 'Design systems', 'State management'],
  },
  {
    category: 'Frontend',
    items: [
      'React',
      'React Native',
      'TypeScript',
      'Next.js',
      'Tailwind',
      'Angular',
      'Framer Motion',
    ],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'Supabase', 'Drizzle ORM', 'Edge Functions'],
  },
  {
    category: 'AI and LLM',
    items: ['Claude API', 'OpenAI', 'Prompt engineering', 'pgvector'],
  },
  { category: 'Tools', items: ['Figma', 'Git', 'Cursor', 'Vercel'] },
]

const rowClass =
  'grid gap-3 border-b border-bd py-7 md:grid-cols-[200px_1fr] md:gap-6'
const labelClass = 'pt-1.5 font-mono text-[13px] font-normal text-tx3'

export default function ResumePage() {
  return (
    <main id="main" className="pb-4">
      <section
        className="pt-[clamp(48px,7vw,88px)]"
        aria-labelledby="resume-title"
      >
        <Container>
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-tx3 transition-colors hover:text-tx"
          >
            <span aria-hidden="true">←</span> Back to home
          </Link>

          <div className="flex flex-wrap items-start gap-8">
            <div className="size-32 shrink-0 overflow-hidden rounded-full border border-bd2">
              <Image
                src="/profile-image.jpeg"
                alt="Portrait of Lorenzo Zubani"
                width={256}
                height={256}
                priority
                className="size-full scale-[1.22] object-cover object-[50%_41%]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[13px] text-tx3">
                Frontend Engineer
              </p>
              <h1
                id="resume-title"
                className="mt-2 text-[clamp(32px,5vw,52px)] leading-none font-semibold tracking-[-0.055em]"
              >
                Lorenzo <span className="text-acc">Zubani</span>
              </h1>
              <p className="mt-5 max-w-[56ch] text-tx2 [text-wrap:pretty]">
                Frontend engineer focused on architecture and design systems.
                Growing into AI engineering, treating LLMs as the core of the
                product, not an add-on. Based in Brescia, Italy.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <a href={`mailto:${EMAIL}`} className="btn btn-primary">
                  <Icon name="mail" className="text-base" />
                  Get in touch
                </a>
                <a
                  href={RESUME_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <Icon name="download" className="text-base" />
                  Download PDF
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <Icon name="github" className="text-base" />
                  GitHub
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <Icon name="linkedin" className="text-base" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-24" aria-labelledby="exp-title">
        <Container>
          <SectionHeader id="exp-title" title="Experience" />
          <div className="border-t border-bd">
            {EXPERIENCE.map((e) => (
              <div key={e.company} className={rowClass}>
                <p className={labelClass}>{e.period}</p>
                <div>
                  <h3 className="text-base font-semibold tracking-[-0.02em]">
                    {e.role}
                  </h3>
                  <p className="text-tx2">{e.company}</p>
                  <ul className="mt-4 flex flex-col gap-2 text-tx2">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span aria-hidden="true" className="text-acc">
                          ·
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-24" aria-labelledby="proj-title">
        <Container>
          <SectionHeader id="proj-title" title="Projects" />
          <div className="border-t border-bd">
            {projects.map((p) => (
              <div key={p.slug} className={rowClass}>
                <p className={labelClass}>{p.year}</p>
                <div>
                  <h3 className="text-base font-semibold tracking-[-0.02em]">
                    <Link
                      href={`/work/${p.slug}`}
                      className="transition-colors hover:text-acc"
                    >
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-1 max-w-[60ch] text-tx2">{p.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li key={s}>
                        <Badge label={s} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-24" aria-labelledby="skills-title">
        <Container>
          <SectionHeader id="skills-title" title="Skills" />
          <div className="border-t border-bd">
            {SKILLS.map((s) => (
              <div key={s.category} className={rowClass}>
                <h3 className={labelClass}>{s.category}</h3>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <li key={i}>
                      <Badge label={i} size="md" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-24" aria-labelledby="edu-title">
        <Container>
          <SectionHeader id="edu-title" title="Education" />
          <div className="border-t border-bd">
            {EDUCATION.map((e) => (
              <div key={e.degree} className={rowClass}>
                <p className={labelClass}>{e.period}</p>
                <div>
                  <h3 className="text-base font-semibold tracking-[-0.02em]">
                    {e.degree}
                  </h3>
                  <p className="text-tx2">{e.institution}</p>
                </div>
              </div>
            ))}
            <div className={rowClass}>
              <h3 className={labelClass}>Languages</h3>
              <ul className="flex flex-wrap gap-2">
                <li>
                  <Badge label="Italian (native)" size="md" />
                </li>
                <li>
                  <Badge label="English C1" size="md" />
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
