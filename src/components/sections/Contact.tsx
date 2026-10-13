import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Icon } from '@/components/ui/Icon'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_PDF } from '@/data/social'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <Container>
        <SectionHeader id="contact-title" title="Contact" />

        <a
          href={`mailto:${EMAIL}`}
          className="mb-9 block text-[clamp(19px,5.6vw,72px)] leading-none font-semibold tracking-[-0.05em] [overflow-wrap:anywhere] transition-colors hover:text-acc"
        >
          {EMAIL}
        </a>

        <div className="flex flex-wrap gap-2.5">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn">
            <Icon name="github" className="text-base" />
            GitHub
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn">
            <Icon name="linkedin" className="text-base" />
            LinkedIn
          </a>
          <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer" className="btn">
            <Icon name="download" className="text-base" />
            Résumé
          </a>
        </div>
      </Container>
    </section>
  )
}
