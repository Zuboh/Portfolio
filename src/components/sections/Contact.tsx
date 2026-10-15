import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Icon } from '@/components/ui/Icon'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_PDF } from '@/data/social'
import type { Dictionary } from '@/app/[lang]/dictionaries'

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <Container>
        <SectionHeader id="contact-title" title={dict.contact.title} />

        <p className="mb-6 flex items-center gap-3 text-[clamp(18px,2.2vw,26px)] leading-tight tracking-[-0.02em] text-tx2">
          <span
            aria-hidden="true"
            className="wave inline-block text-[1.35em] leading-none"
          >
            👋
          </span>
          {dict.contact.hi}
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="mb-9 block text-[clamp(17px,4.2vw,52px)] leading-none font-semibold tracking-[-0.05em] [overflow-wrap:anywhere] transition-colors hover:text-acc"
        >
          {EMAIL}
        </a>

        <div className="flex flex-wrap gap-2.5">
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
          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <Icon name="download" className="text-base" />
            {dict.common.resume}
          </a>
        </div>
      </Container>
    </section>
  )
}
