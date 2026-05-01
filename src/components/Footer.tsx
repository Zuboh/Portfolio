'use client'

export function Footer() {
  return (
    <footer
      style={{
        marginTop: 60,
        paddingTop: 20,
        borderTop: '.5px solid var(--bd)',
        fontSize: 10,
        color: 'var(--tx3)',
        letterSpacing: '.06em',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span>zubo.dev · Brescia, Italy</span>
      <span>last updated April 2026</span>
    </footer>
  )
}
