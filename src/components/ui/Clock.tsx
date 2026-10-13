'use client'

import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Rome',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

export function Clock({ className = '' }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <p className={className}>
      <time
        className="text-tx tabular-nums"
        aria-label={time ? `${time} in Brescia` : undefined}
      >
        {time ?? '--:--:--'}
      </time>
    </p>
  )
}
