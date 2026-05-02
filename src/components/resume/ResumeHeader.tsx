import Link from 'next/link'

export function ResumeHeader() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        alignItems: 'flex-start',
        marginBottom: 48,
        flexWrap: 'wrap',
        animation: 'fadeUp .5s ease both',
      }}
    >
      {/* Photo placeholder */}
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: '50%',
          background: 'var(--bg3)',
          border: '.5px solid var(--bd)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          color: 'var(--tx3)',
          letterSpacing: '-.02em',
          fontWeight: 500,
        }}
      >
        LZ
      </div>

      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontSize: 'clamp(22px, 4vw, 32px)',
            fontWeight: 500,
            letterSpacing: '-.02em',
            color: 'var(--tx)',
            marginBottom: 4,
          }}
        >
          Lorenzo Zubani
        </h1>

        <p style={{ fontSize: 12, color: 'var(--acc)', letterSpacing: '.06em', marginBottom: 10 }}>
          Frontend &amp; AI Engineer
        </p>

        <p
          style={{
            fontSize: 11,
            color: 'var(--tx2)',
            lineHeight: 1.8,
            maxWidth: 440,
            marginBottom: 14,
          }}
        >
          Frontend engineer focused on architecture and design systems. Growing into AI engineering
          — integrating LLMs as core product experience, not just features. Based in Brescia, Italy.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px' }}>
          {[
            { label: 'lorenzozubani1999@gmail.com', href: 'mailto:lorenzozubani1999@gmail.com' },
            { label: 'Brescia, Italy', href: null },
            { label: 'linkedin', href: 'https://www.linkedin.com/in/lorenzo-zubani/' },
            { label: 'github.com/zuboh', href: 'https://github.com/zuboh' },
          ].map(({ label, href }) =>
            href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="nav-link-acc"
                style={{ fontSize: 10 }}
              >
                {label}
              </a>
            ) : (
              <span key={label} style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.04em' }}>
                {label}
              </span>
            )
          )}
        </div>

        <div style={{ marginTop: 14 }}>
          <Link
            href="/resume.pdf"
            target="_blank"
            className="nav-link-acc"
            style={{ fontSize: 10, letterSpacing: '.06em' }}
          >
            ↓ download pdf
          </Link>
        </div>
      </div>
    </div>
  )
}
