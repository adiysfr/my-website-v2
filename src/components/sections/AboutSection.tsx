'use client'

import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerChildren } from '@/components/animations/StaggerChildren'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TechIcon } from '@/components/ui/TechIcon'
import { ParallaxLayer } from '@/components/ui/ParallaxLayer'
import { techStack } from '@/data/techStack'

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Decorative parallax accent line */}
      <ParallaxLayer
        speed={0.4}
        className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
      >
        <div className="h-full bg-gradient-to-b from-transparent via-blue-600/20 to-transparent" />
      </ParallaxLayer>

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Text */}
          <div>
            <SectionHeading label="About" title="About Me" className="mb-8" />

            <div className="space-y-4">
              <FadeIn direction="left" delay={0.1}>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  I&apos;m a full-stack developer with a passion for building clean,
                  performant web applications. I specialize in TypeScript, React, and
                  Node.js — and I care deeply about developer experience and code quality.
                </p>
              </FadeIn>
              <FadeIn direction="left" delay={0.2}>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                  contributing to open source, or writing about software engineering on my blog.
                </p>
              </FadeIn>
              <FadeIn direction="left" delay={0.3}>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  I&apos;m always open to interesting projects and collaborations. If you
                  have an idea, let&apos;s build it together.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.4} className="mt-8">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-[var(--text-secondary)]">
                  Currently available for freelance work
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Tech stack */}
          <div>
            <FadeIn delay={0.2}>
              <h3 className="text-sm font-mono text-blue-600 tracking-widest uppercase mb-8">
                Tech Stack
              </h3>
            </FadeIn>
            <StaggerChildren staggerDelay={0.05} className="grid grid-cols-4 gap-6">
              {techStack.map((tech) => (
                <TechIcon key={tech.name} tech={tech} />
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
  )
}
