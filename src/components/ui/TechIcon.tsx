'use client'

import { motion } from 'framer-motion'
import { staggerItem } from '@/components/animations/StaggerChildren'
import type { TechItem } from '@/types'

interface TechIconProps {
  tech: TechItem
}

export function TechIcon({ tech }: TechIconProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="group flex flex-col items-center gap-2"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xs font-mono shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:shadow-md"
        style={{ backgroundColor: tech.color }}
      >
        {tech.icon}
      </div>
      <span className="text-xs text-[var(--text-secondary)] font-medium text-center leading-tight">
        {tech.name}
      </span>
    </motion.div>
  )
}
