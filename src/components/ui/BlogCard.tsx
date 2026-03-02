'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { staggerItem } from '@/components/animations/StaggerChildren'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
  isLast?: boolean
}

export function BlogCard({ post, isLast = false }: BlogCardProps) {
  return (
    <motion.div variants={staggerItem}>
      <a
        href={`/blog/${post.slug}`}
        className="group flex items-start justify-between py-6 gap-4 cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono text-[var(--text-muted)]">
              {post.date}
            </span>
            <span className="text-[var(--text-muted)] text-xs">·</span>
            <span className="text-sm text-[var(--text-muted)]">
              {post.readingTime}
            </span>
          </div>
          <h3 className="font-semibold text-lg text-[var(--foreground)] group-hover:text-blue-600 transition-colors duration-200 mb-1.5">
            {post.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[var(--text-muted)] group-hover:text-blue-600 transition-all duration-200 group-hover:translate-x-1">
          <ArrowRight className="w-5 h-5" />
        </div>
      </a>
      {!isLast && <div className="border-t border-[var(--border)]" />}
    </motion.div>
  )
}
