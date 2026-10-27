import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { localizeProjects } from '@/lib/projects'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_PDF } from '@/data/social'
import { hasLocale } from '@/i18n/config'
import { getDictionary } from '../dictionaries'

const rowClass =
  'grid gap-3 border-b border-bd py-7 md:grid-cols-[200px_1fr] md:gap-6'
const labelClass = 'pt-1.5 font-mono text-[13px] font-normal text-tx3'

export default async function ResumePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const t = dict.resume
  const projects = localizeProjects(dict.projects)

  return (
    <main id="main" className="pb-4">
      <section
        className="pt-[clamp(48px,7vw,88px)]"
        aria-labelledby="resume-title"
      >
        <Container>
          <Link
            href={`/${lang}`}
            className="tap mb-10 inline-flex items-center gap-2 text-sm text-tx3 transition-colors hover:text-tx"
          >
            <span aria-hidden="true">←</span> {dict.common.backHome}
          </Link>

          <div className="flex flex-wrap items-start gap-8">
            <div className="size-28 shrink-0 md:size-36">
              <Image
                src="/profile-portrait.png"
                alt={t.imageAlt}
                width={384}
                height={384}
                priority
                // Transparent cutout; the black shirt dissolves into the page background.
                className="size-full object-cover [mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%)]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[13px] text-tx3">{t.role}</p>
              <h1
                id="resume-title"
                className="mt-2 text-[clamp(32px,5vw,52px)] leading-none font-semibold tracking-[-0.055em]"
              >
                Lorenzo <span className="text-acc">Zubani</span>
              </h1>
              <p className="mt-5 max-w-[56ch] text-tx2 [text-wrap:pretty]">
                {t.intro}
              </p>
              <div className="btn-row mt-7">
                <a href={`mailto:${EMAIL}`} className="btn btn-primary">
                  <Icon name="mail" className="text-base" />
                  {dict.common.getInTouch}
                </a>
                <a
                  href={RESUME_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <Icon name="download" className="text-base" />
                  {t.downloadPdf}
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <Icon name="github" className="text-base" />
                  {dict.common.github}
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <Icon name="linkedin" className="text-base" />
                  {dict.common.linkedin}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-24" aria-labelledby="exp-title">
        <Container>
          <SectionHeader id="exp-title" title={t.experience} />
          <div className="border-t border-bd">
            {t.experienceItems.map((e) => (
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
          <SectionHeader id="proj-title" title={t.projects} />
          <div className="border-t border-bd">
            {projects.map((p) => (
              <div key={p.slug} className={rowClass}>
                <p className={labelClass}>{p.year}</p>
                <div>
                  <h3 className="text-base font-semibold tracking-[-0.02em]">
                    <Link
                      href={`/${lang}/work/${p.slug}`}
                      className="tap transition-colors hover:text-acc"
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
          <SectionHeader id="skills-title" title={t.skills} />
          <div className="border-t border-bd">
            {t.skillGroups.map((s) => (
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
          <SectionHeader id="edu-title" title={t.education} />
          <div className="border-t border-bd">
            {t.educationItems.map((e) => (
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
              <h3 className={labelClass}>{t.languages}</h3>
              <ul className="flex flex-wrap gap-2">
                {t.languageItems.map((l) => (
                  <li key={l}>
                    <Badge label={l} size="md" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
