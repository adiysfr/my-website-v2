'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Blog', href: '#blog', id: 'blog' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export function Navbar() {
  const scrollProgress = useScrollProgress()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const scrolled = scrollProgress > 0.02

  // Track active section with IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.35, rootMargin: '-80px 0px -30% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    // Reset when at top
    const onScroll = () => {
      if (window.scrollY < 100) setActiveSection('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observers.forEach((o) => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300',
          scrolled
            ? 'bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--border)]'
            : 'bg-transparent'
        )}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-blue-600 origin-left"
          style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
        />

        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-bold text-lg tracking-tight text-[var(--foreground)] hover:text-blue-600 transition-colors"
          >
            Adi<span className="text-blue-600">.</span>YR
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative text-sm font-medium transition-colors duration-200 py-1"
                style={{
                  color:
                    activeSection === link.id
                      ? '#2563eb'
                      : 'var(--text-secondary)',
                }}
              >
                {link.label}
                {/* Active underline */}
                <motion.span
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-blue-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeSection === link.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -mr-2 text-[var(--foreground)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--background)] flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-3xl font-semibold transition-colors"
                style={{
                  color:
                    activeSection === link.id
                      ? '#2563eb'
                      : 'var(--foreground)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
