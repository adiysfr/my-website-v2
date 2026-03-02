'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { FadeIn } from '@/components/animations/FadeIn'

const stats = [
  { value: 5, suffix: '+', label: 'Years of Experience' },
  { value: 40, suffix: '+', label: 'Projects Delivered' },
  { value: 12, suffix: '+', label: 'Happy Clients' },
  { value: 500, suffix: '+', label: 'Cups of Coffee' },
]

function CountUp({
  to,
  suffix,
  inView,
  duration = 1600,
}: {
  to: number
  suffix: string
  inView: boolean
  duration?: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const totalSteps = 60
    const increment = to / totalSteps
    const intervalMs = duration / totalSteps

    const timer = setInterval(() => {
      start += increment
      if (start >= to) {
        setCount(to)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, intervalMs)

    return () => clearInterval(timer)
  }, [inView, to, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-16 border-y border-[var(--border)] bg-[var(--background)]"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="text-center group">
                <p className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-1.5 tabular-nums">
                  <CountUp
                    to={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                    duration={1400 + i * 100}
                  />
                </p>
                <div className="w-6 h-px bg-blue-600 mx-auto mb-2 group-hover:w-10 transition-all duration-300" />
                <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
