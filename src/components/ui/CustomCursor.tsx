'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Dot — no spring, direct follow (zero lag)
  // Ring — slight trail only
  const ringX = useSpring(mouseX, { stiffness: 500, damping: 38, restDelta: 0.001 })
  const ringY = useSpring(mouseY, { stiffness: 500, damping: 38, restDelta: 0.001 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        window.getComputedStyle(target).cursor === 'pointer'
      setIsHovering(isInteractive)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
    }
  }, [mouseX, mouseY, isVisible])

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <>
      {/* Dot — instant follow, no spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY }}
      >
        <motion.div
          className="rounded-full bg-blue-600"
          animate={{
            width: isHovering ? 10 : 6,
            height: isHovering ? 10 : 6,
            x: isHovering ? -5 : -3,
            y: isHovering ? -5 : -3,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Ring — trailing */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full border border-blue-600/40"
          animate={{
            width: isHovering ? 44 : 28,
            height: isHovering ? 44 : 28,
            x: isHovering ? -22 : -14,
            y: isHovering ? -22 : -14,
            borderColor: isHovering
              ? 'rgba(37,99,235,0.7)'
              : 'rgba(37,99,235,0.35)',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  )
}
