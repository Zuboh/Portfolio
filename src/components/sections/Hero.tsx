import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_PDF } from '@/data/social'

const linkClass =
  'inline-flex items-center gap-2 text-sm text-tx2 transition-colors hover:text-tx'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-[clamp(80px,12vw,152px)] pb-10">
      <Container>
        <p
          className="rise inline-flex rounded-full border border-bd2 px-3 py-1.5 font-mono text-[13px] text-tx3"
          style={{ '--d': '0ms' } as React.CSSProperties}
        >
          Frontend Engineer · Brescia, Italy
        </p>

        <h1
          id="hero-title"
          className="rise mt-6 text-[clamp(52px,9vw,116px)] leading-[0.97] font-semibold tracking-[-0.058em]"
          style={{ '--d': '80ms' } as React.CSSProperties}
        >
          Lorenzo <span className="text-acc">Zubani</span>
        </h1>

        <p
          className="rise mt-7 max-w-[52ch] text-[clamp(17px,1.7vw,20px)] text-tx2 [text-wrap:pretty]"
          style={{ '--d': '160ms' } as React.CSSProperties}
        >
          Frontend engineer specializing in React and TypeScript, with strong attention to
          architecture, UX, and implementation quality.
        </p>

        <div
          className="rise mt-9 flex flex-wrap gap-2.5"
          style={{ '--d': '240ms' } as React.CSSProperties}
        >
          <a href={`mailto:${EMAIL}`} className="btn btn-primary">
            <Icon name="mail" className="text-base" />
            Get in touch
          </a>
          <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer" className="btn">
            <Icon name="download" className="text-base" />
            Résumé
          </a>
        </div>

        <div
          className="rise mt-10 flex flex-wrap gap-x-6 gap-y-3"
          style={{ '--d': '320ms' } as React.CSSProperties}
        >
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Icon name="github" className="text-[17px]" />
            GitHub
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Icon name="linkedin" className="text-[17px]" />
            LinkedIn
          </a>
        </div>
      </Container>
    </section>
  )
}
