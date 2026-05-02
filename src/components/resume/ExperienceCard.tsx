interface ExperienceCardProps {
  role: string
  company: string
  period: string
  bullets: string[]
  current?: boolean
}

export function ExperienceCard({ role, company, period, bullets, current }: ExperienceCardProps) {
  return (
    <div
      className="experience-card"
      style={{
        border: '.5px solid var(--bd)',
        borderRadius: 8,
        padding: '18px 20px',
        background: 'var(--card)',
        marginBottom: 10,
        transition: 'border-color .2s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 12,
          marginBottom: 10,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--tx)', marginBottom: 2 }}>
            {role}
          </div>
          <div style={{ fontSize: 11, color: 'var(--tx2)', letterSpacing: '.03em' }}>
            {company}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {current && (
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
              now
            </span>
          )}
          <span style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.04em' }}>
            {period}
          </span>
        </div>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {bullets.map((b, i) => (
          <li
            key={i}
            style={{
              fontSize: 11,
              color: 'var(--tx2)',
              lineHeight: 1.65,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
            }}
          >
            <span style={{ color: 'var(--acc)', flexShrink: 0, marginTop: 1 }}>·</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}
