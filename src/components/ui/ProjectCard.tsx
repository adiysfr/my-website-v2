'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { staggerItem } from '@/components/animations/StaggerChildren'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

const categoryColors: Record<string, string> = {
  fullstack: '#2563eb',
  frontend: '#7c3aed',
  backend: '#059669',
  other: '#6b7280',
}

const categoryLabels: Record<string, string> = {
  fullstack: 'Full Stack',
  frontend: 'Frontend',
  backend: 'Backend',
  other: 'Other',
}

export function ProjectCard({ project }: ProjectCardProps) {
  // 3D tilt values
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10
    rotateX.set(y)
    rotateY.set(x)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const accentColor = categoryColors[project.category]

  return (
    <motion.div
      variants={staggerItem}
      style={{ perspective: '800px' }}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-blue-600/30 transition-colors duration-300 hover:shadow-2xl hover:shadow-black/8"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <motion.div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${accentColor}18 0%, ${accentColor}08 100%)`,
            }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
          >
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle, ${accentColor}30 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
            {/* Center icon */}
            <div className="relative text-center">
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center text-white text-xl font-bold shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                {project.title.charAt(0)}
              </div>
              <span
                className="text-xs font-mono font-semibold tracking-widest uppercase"
                style={{ color: accentColor }}
              >
                {categoryLabels[project.category]}
              </span>
            </div>
          </motion.div>

          {/* Arrow on hover */}
          <motion.div
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
            initial={{ opacity: 0, scale: 0.7 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <ArrowUpRight className="w-4 h-4 text-blue-600" />
          </motion.div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-blue-600 text-white rounded-full uppercase tracking-wider">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-lg text-[var(--foreground)] group-hover:text-blue-600 transition-colors duration-200 mb-2">
            {project.title}
          </h3>

          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs font-mono bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded border border-blue-100 dark:border-blue-900/50"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-4 border-t border-[var(--border)]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
