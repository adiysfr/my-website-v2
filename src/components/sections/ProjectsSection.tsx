'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { StaggerChildren } from '@/components/animations/StaggerChildren'
import { FadeIn } from '@/components/animations/FadeIn'
import { projects } from '@/data/projects'

type FilterCategory = 'all' | 'frontend' | 'backend' | 'fullstack'

const filters: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Fullstack', value: 'fullstack' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
]

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="py-24 md:py-32 bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          label="Work"
          title="Selected Projects"
          description="A curated selection of things I&apos;ve built."
        />

        {/* Filter tabs */}
        <FadeIn delay={0.2} className="mb-10">
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === f.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--foreground)] border border-[var(--border)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.length > 0 ? (
              <StaggerChildren staggerDelay={0.1} className="grid md:grid-cols-2 gap-6">
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </StaggerChildren>
            ) : (
              <p className="text-center py-16 text-[var(--text-muted)]">
                No projects in this category yet.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
