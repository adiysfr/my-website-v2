'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import MagneticWrapper from './MagneticWrapper'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
  magnetic?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  magnetic = false,
  disabled,
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer'

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95',
    outline:
      'border border-[var(--border)] text-[var(--foreground)] hover:border-blue-600 hover:text-blue-600 active:scale-95',
    ghost:
      'text-[var(--foreground)] hover:text-blue-600 active:scale-95',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  const content = href ? (
    <a
      href={href}
      className={classes}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )

  if (magnetic) return <MagneticWrapper>{content}</MagneticWrapper>
  return content
}
