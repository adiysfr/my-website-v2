'use client'

import { useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useParallax } from '@/hooks/useParallax'

interface ParallaxScrollProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxScroll({
  children,
  speed = 0.5,
  className,
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const y = useParallax(ref as React.RefObject<HTMLElement>, speed)

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
