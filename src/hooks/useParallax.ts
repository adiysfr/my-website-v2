'use client'

import { RefObject } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.5
): MotionValue<string> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const range = 100 * speed
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${range}px`, `-${range}px`]
  )

  return y
}
