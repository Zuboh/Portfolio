// Seeded PRNG keeps star positions identical between server and client renders.
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Star = { x: string; y: string; r: number }

function stars(count: number, seed: number, minR: number, maxR: number) {
  const rand = mulberry32(seed)
  return Array.from(
    { length: count },
    (): Star => ({
      x: `${(rand() * 100).toFixed(2)}%`,
      y: `${(rand() * 100).toFixed(2)}%`,
      r: +(minR + rand() * (maxR - minR)).toFixed(2),
    })
  )
}

// Twinkling stars are split into a few phase groups, each its own <svg>, so the
// opacity animation runs on the compositor instead of restyling every circle.
function phases(list: Star[], groups: number, period: number) {
  return Array.from({ length: groups }, (_, g) => ({
    stars: list.filter((_, i) => i % groups === g),
    delay: `-${((period / groups) * g).toFixed(2)}s`,
  }))
}

const DUST = stars(90, 7, 0.4, 0.8)
const BRIGHT = phases(stars(30, 21, 0.8, 1.2), 3, 5)
const ACCENT = phases(stars(7, 42, 1.2, 1.7), 2, 8)

const layerClass = 'absolute inset-0 h-full w-full'

function Layer({
  stars,
  fill,
  className = '',
  delay,
}: {
  stars: Star[]
  fill: string
  className?: string
  delay?: string
}) {
  return (
    <svg
      focusable="false"
      className={`${layerClass} ${className}`}
      style={delay ? { animationDelay: delay } : undefined}
    >
      <g fill={fill}>
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} />
        ))}
      </g>
    </svg>
  )
}

export function Starfield({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`starfield pointer-events-none absolute inset-0 ${className}`}
    >
      <Layer stars={DUST} fill="var(--star)" />
      {BRIGHT.map((p, i) => (
        <Layer
          key={`b${i}`}
          stars={p.stars}
          fill="var(--star-bright)"
          className="twinkle"
          delay={p.delay}
        />
      ))}
      {ACCENT.map((p, i) => (
        <Layer
          key={`a${i}`}
          stars={p.stars}
          fill="var(--star-acc)"
          className="twinkle twinkle-slow"
          delay={p.delay}
        />
      ))}
    </div>
  )
}
