'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import MagneticWrapper from '@/components/ui/MagneticWrapper'

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const orbY = useTransform(scrollYProgress, [0, 1], ['0px', '80px'])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0px', '120px'])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]"
    >
      {/* Dot grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(37,99,235,0.15) 1.5px, transparent 1.5px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </motion.div>

      {/* Gradient orb */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          y: orbY,
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0.04) 50%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-sm font-mono text-blue-600 tracking-widest uppercase mb-6">
            Error 404
          </p>
          <h1
            className="font-bold tracking-tight text-[var(--foreground)] leading-none mb-6 select-none"
            style={{ fontSize: 'clamp(6rem, 20vw, 14rem)' }}
          >
            <span className="text-[var(--foreground)]">4</span>
            <span className="text-blue-600">0</span>
            <span className="text-[var(--foreground)]">4</span>
          </h1>
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="w-12 h-px bg-blue-600 mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xl font-medium text-[var(--foreground)] mb-3">
            Page not found
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-10 max-w-sm mx-auto">
            Looks like this page took a wrong turn. Let&apos;s get you back on track.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <MagneticWrapper>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-600/25"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </MagneticWrapper>

          <MagneticWrapper>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--border)] text-[var(--foreground)] font-medium rounded-lg hover:border-blue-600/50 hover:text-blue-600 active:scale-95 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </MagneticWrapper>
        </motion.div>
      </div>
    </div>
  )
}
