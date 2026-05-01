'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface StackItem {
  label: string
  src?: string
  fallback?: { bg: string; color: string; text: string }
  isDark?: boolean
}

const ICONS: StackItem[] = [
  {
    label: 'HTML',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    label: 'CSS',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    label: 'JavaScript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    label: 'TypeScript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    label: 'React',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    label: 'Next.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    isDark: true,
  },
  {
    label: 'React Native',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactnative/reactnative-original-wordmark.svg',
  },
  {
    label: 'Expo',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg',
    isDark: true,
  },
  {
    label: 'Python',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  },
  {
    label: 'Node.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg',
  },
  {
    label: 'MongoDB',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  },
  {
    label: 'PostgreSQL',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    label: 'Git',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    label: 'Figma',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  { label: 'Claude', src: 'https://cdn.simpleicons.org/claude' },
]

export function Stack() {
  const ref = useScrollReveal<HTMLElement>()
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
      <div
        className="section-label"
        style={{
          fontSize: 10,
          color: 'var(--tx3)',
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          marginBottom: 22,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        stack
      </div>

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
                  transform:
                    hovered === icon.label ? 'scale(1.08)' : 'scale(1)',
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
                  transform:
                    hovered === icon.label ? 'scale(1.08)' : 'scale(1)',
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
