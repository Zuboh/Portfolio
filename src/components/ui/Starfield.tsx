// Seeded PRNG keeps star positions identical between server and client renders.
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Star = { x: string; y: string; r: number; delay: string }

function stars(count: number, seed: number, minR: number, maxR: number) {
  const rand = mulberry32(seed)
  return Array.from(
    { length: count },
    (): Star => ({
      x: `${(rand() * 100).toFixed(2)}%`,
      y: `${(rand() * 100).toFixed(2)}%`,
      r: +(minR + rand() * (maxR - minR)).toFixed(2),
      delay: `-${(rand() * 8).toFixed(2)}s`,
    })
  )
}

const DUST = stars(90, 7, 0.4, 0.8)
const BRIGHT = stars(30, 21, 0.8, 1.2)
const ACCENT = stars(7, 42, 1.2, 1.7)

export function Starfield({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`starfield pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <g fill="rgb(237 237 237 / 0.5)">
        {DUST.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} />
        ))}
      </g>
      <g fill="rgb(237 237 237 / 0.85)">
        {BRIGHT.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            className="twinkle"
            style={{ animationDelay: s.delay }}
          />
        ))}
      </g>
      <g fill="oklch(85% 0.12 150 / 0.9)">
        {ACCENT.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            className="twinkle twinkle-slow"
            style={{ animationDelay: s.delay }}
          />
        ))}
      </g>
    </svg>
  )
}
