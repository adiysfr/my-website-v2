'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Send, CheckCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerChildren, staggerItem } from '@/components/animations/StaggerChildren'
import MagneticWrapper from '@/components/ui/MagneticWrapper'
import { socialLinks } from '@/data/socialLinks'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
}

type FormState = 'idle' | 'loading' | 'success'

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormState('success')
  }

  const reset = () => {
    setFormState('idle')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="Contact"
          title="Let&apos;s Connect"
          description="Got a project in mind? Let&apos;s talk."
          align="center"
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact form */}
          <FadeIn direction="left">
            {formState === 'success' ? (
              <motion.div
                className="flex flex-col items-center justify-center py-16 gap-4 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="text-xl font-semibold text-[var(--foreground)]">
                  Message sent!
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={reset}
                  className="text-sm text-blue-600 hover:underline mt-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, message: e.target.value }))
                    }
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all resize-none"
                  />
                </div>

                <MagneticWrapper>
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition-all duration-200"
                  >
                    {formState === 'loading' ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </MagneticWrapper>
              </form>
            )}
          </FadeIn>

          {/* Social links */}
          <FadeIn direction="right" delay={0.2}>
            <div>
              <h3 className="font-semibold text-lg mb-6 text-[var(--foreground)]">
                Find me online
              </h3>
              <StaggerChildren staggerDelay={0.08} className="space-y-3">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon]
                  return (
                    <motion.a
                      key={link.name}
                      variants={staggerItem}
                      href={link.url}
                      target={
                        link.url.startsWith('mailto') ? undefined : '_blank'
                      }
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-blue-600/30 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all group"
                    >
                      {Icon && (
                        <Icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-blue-600 transition-colors" />
                      )}
                      <span className="font-medium text-[var(--foreground)] group-hover:text-blue-600 transition-colors">
                        {link.name}
                      </span>
                    </motion.a>
                  )
                })}
              </StaggerChildren>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
