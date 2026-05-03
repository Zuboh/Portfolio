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
      className="reveal mb-14 pb-6"
    >
      <SectionLabel>stack</SectionLabel>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-2.5 pt-0.5 pb-5">
        {ICONS.map((icon) => (
          <div
            key={icon.label}
            className="relative h-[52px] flex items-center justify-center rounded-[10px] transition-colors duration-200 cursor-default"
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
                className="object-contain transition-transform duration-200"
                style={{
                  transform: hovered === icon.label ? 'scale(1.08)' : 'scale(1)',
                  filter: icon.isDark && isDark ? 'invert(1)' : undefined,
                }}
              />
            ) : (
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-medium transition-transform duration-200"
                style={{
                  background: icon.fallback!.bg,
                  color: icon.fallback!.color,
                  transform: hovered === icon.label ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                {icon.fallback!.text}
              </div>
            )}

            {hovered === icon.label && (
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[10px] text-acc whitespace-nowrap pointer-events-none z-10 tracking-[.04em] font-mono">
                {icon.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
