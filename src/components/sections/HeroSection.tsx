'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import MagneticWrapper from '@/components/ui/MagneticWrapper'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Layer 1 — dot grid, slowest (stays behind)
  const bgY = useTransform(scrollYProgress, [0, 1], ['0px', '200px'])
  // Layer 2 — large orb, slow
  const orbY = useTransform(scrollYProgress, [0, 1], ['0px', '120px'])
  // Layer 3 — ring + square, medium
  const shape1Y = useTransform(scrollYProgress, [0, 1], ['0px', '80px'])
  const shape2Y = useTransform(scrollYProgress, [0, 1], ['0px', '280px'])
  // Layer 4 — small accent dot, fast (parallax inversion)
  const shape3Y = useTransform(scrollYProgress, [0, 1], ['0px', '-100px'])

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]"
    >
      {/* ── Layer 1: Dot grid — moves slow ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, willChange: 'transform' }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(37,99,235,0.18) 1.5px, transparent 1.5px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </motion.div>

      {/* ── Layer 2: Large gradient orb — primary parallax hero ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          y: orbY,
          willChange: 'transform',
          top: '-10%',
          right: '-5%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.06) 50%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Layer 2b: Second orb bottom-left ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          y: shape2Y,
          willChange: 'transform',
          bottom: '-15%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, rgba(37,99,235,0.10) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ── Layer 3: Ring outline (top-right) ── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          y: shape1Y,
          willChange: 'transform',
          top: '15%',
          right: '8%',
          width: '320px',
          height: '320px',
          border: '1.5px solid rgba(37,99,235,0.25)',
        }}
      />

      {/* ── Layer 3b: Smaller inner ring (top-right) ── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          y: shape1Y,
          willChange: 'transform',
          top: '22%',
          right: '15%',
          width: '160px',
          height: '160px',
          border: '1px solid rgba(37,99,235,0.15)',
        }}
      />

      {/* ── Layer 3c: Rotated square (bottom-left) ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          y: shape2Y,
          willChange: 'transform',
          bottom: '20%',
          left: '8%',
          width: '120px',
          height: '120px',
          border: '1.5px solid rgba(37,99,235,0.22)',
          transform: 'rotate(45deg)',
        }}
      />

      {/* ── Layer 4: Fast accent dot (moves opposite) ── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          y: shape3Y,
          willChange: 'transform',
          top: '40%',
          left: '12%',
          width: '12px',
          height: '12px',
          backgroundColor: 'rgba(37,99,235,0.5)',
          boxShadow: '0 0 20px rgba(37,99,235,0.4)',
        }}
      />

      {/* ── Layer 4b: Accent dot top-center ── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          y: shape3Y,
          willChange: 'transform',
          top: '20%',
          left: '45%',
          width: '6px',
          height: '6px',
          backgroundColor: 'rgba(37,99,235,0.6)',
        }}
      />

      {/* Bottom gradient fade — smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--background))',
        }}
      />

      {/* ── Content (foreground) ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <FadeIn delay={0.1}>
          <p className="text-[var(--text-muted)] text-sm font-mono mb-6 tracking-[0.3em] uppercase">
            Hi, I&apos;m
          </p>
        </FadeIn>

        <h1 className="text-7xl md:text-9xl font-bold tracking-tight text-[var(--foreground)] mb-6 leading-none">
          <TextReveal text="Adi YR" staggerDelay={0.06} />
        </h1>

        <FadeIn delay={0.55}>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-3 font-medium">
            I build things for the web.
          </p>
          <p className="text-base text-[var(--text-muted)] max-w-md mx-auto mb-10 leading-relaxed">
            Full-stack developer crafting performant, beautiful digital experiences
            with modern technologies.
          </p>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <MagneticWrapper>
              <button
                onClick={() => scrollToSection('#projects')}
                className="px-8 py-3.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-600/25"
              >
                See my work ↓
              </button>
            </MagneticWrapper>
            <MagneticWrapper>
              <button
                onClick={() => scrollToSection('#contact')}
                className="px-8 py-3.5 border border-[var(--border)] text-[var(--foreground)] font-medium rounded-lg hover:border-blue-600/50 hover:text-blue-600 active:scale-95 transition-all duration-200"
              >
                Get in touch
              </button>
            </MagneticWrapper>
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <FadeIn delay={1.2}>
          <motion.div
            className="mt-16 flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-[var(--text-muted)] to-transparent" />
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}
