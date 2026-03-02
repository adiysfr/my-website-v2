import { cn } from '@/lib/utils'

const items = [
  'TypeScript',
  '✦',
  'React',
  '✦',
  'Next.js',
  '✦',
  'Node.js',
  '✦',
  'PostgreSQL',
  '✦',
  'Tailwind CSS',
  '✦',
  'Docker',
  '✦',
  'Redis',
  '✦',
  'Prisma',
  '✦',
  'Framer Motion',
  '✦',
]

interface MarqueeStripProps {
  className?: string
  reverse?: boolean
}

export function MarqueeStrip({ className, reverse = false }: MarqueeStripProps) {
  return (
    <div
      className={cn(
        'overflow-hidden border-y border-[var(--border)] py-3.5 bg-[var(--surface)]',
        className
      )}
    >
      <div
        className="flex whitespace-nowrap w-max"
        style={{
          animation: `marquee${reverse ? '-reverse' : ''} 28s linear infinite`,
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`flex-shrink-0 px-5 text-xs font-mono tracking-widest uppercase ${
              item === '✦'
                ? 'text-blue-600/60'
                : 'text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors cursor-default'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
