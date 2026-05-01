'use client'

import { useIntersectionReveal } from '@/hooks/useIntersectionReveal'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { ICONS } from '@/data/stack'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function Stack() {
  const ref = useIntersectionReveal<HTMLElement>()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  const isDark = mounted && (theme === 'dark' || theme === 'panda')

  return (
    <section
      ref={ref}
      id="s-stack"
      className="reveal"
      style={{ marginBottom: 56, paddingBottom: 24 }}
    >
      <SectionLabel>stack</SectionLabel>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          padding: '2px 0 20px',
        }}
      >
        {ICONS.map((icon) => (
          <div
            key={icon.label}
            style={{
              position: 'relative',
              width: 52,
              height: 52,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              transition: 'background .2s ease',
              cursor: 'default',
            }}
            onMouseEnter={() => setHovered(icon.label)}
            onMouseLeave={() => setHovered(null)}
          >
            {icon.src ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={icon.src}
                alt={icon.label}
                width={30}
                height={30}
                style={{
                  objectFit: 'contain',
                  transition: 'transform .2s ease',
                  transform: hovered === icon.label ? 'scale(1.08)' : 'scale(1)',
                  filter: icon.isDark && isDark ? 'invert(1)' : undefined,
                }}
              />
            ) : (
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 500,
                  background: icon.fallback!.bg,
                  color: icon.fallback!.color,
                  transition: 'transform .2s ease',
                  transform: hovered === icon.label ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                {icon.fallback!.text}
              </div>
            )}

            {hovered === icon.label && (
              <span
                style={{
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: 10,
                  color: 'var(--acc)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  zIndex: 10,
                  letterSpacing: '.04em',
                  fontFamily: 'var(--font-dm-mono), monospace',
                }}
              >
                {icon.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
