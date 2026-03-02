'use client'

import { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number
  direction?: 'up' | 'down'
  className?: string
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  direction = 'up',
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const range = 100 * speed
  const yStart = direction === 'up' ? range : -range
  const yEnd = direction === 'up' ? -range : range
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${yStart}px`, `${yEnd}px`]
  )

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div style={{ y, willChange: 'transform' }}>{children}</motion.div>
    </div>
  )
}
