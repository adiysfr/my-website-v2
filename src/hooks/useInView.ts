'use client'

import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  once?: boolean
  margin?: string
}

export function useInView({
  threshold = 0.1,
  once = true,
  margin = '0px',
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin: margin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once, margin])

  return { ref, inView }
}
