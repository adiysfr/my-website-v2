import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BlogCard } from '@/components/ui/BlogCard'
import { StaggerChildren } from '@/components/animations/StaggerChildren'
import { FadeIn } from '@/components/animations/FadeIn'
import type { BlogPost } from '@/types'

const blogPosts: BlogPost[] = [
  {
    slug: 'building-scalable-apis-with-nodejs',
    title: 'Building Scalable APIs with Node.js and TypeScript',
    date: 'Feb 15, 2026',
    readingTime: '8 min read',
    excerpt:
      'A deep dive into building production-ready REST APIs with proper error handling, validation, and testing strategies.',
  },
  {
    slug: 'react-performance-optimization',
    title: 'React Performance Optimization: Beyond memo() and useCallback',
    date: 'Jan 28, 2026',
    readingTime: '12 min read',
    excerpt:
      'Exploring advanced techniques for optimizing React applications including virtualization, code splitting, and profiling.',
  },
  {
    slug: 'the-art-of-clean-code',
    title: 'The Art of Clean Code: Principles I Follow Daily',
    date: 'Jan 10, 2026',
    readingTime: '6 min read',
    excerpt:
      'Practical principles and patterns that make code more readable, maintainable, and enjoyable to work with.',
  },
]

export function BlogSection() {
  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 gap-4">
          <SectionHeading label="Writing" title="Latest Writing" className="mb-0" />
          <FadeIn delay={0.3}>
            <a
              href="/blog"
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors group flex-shrink-0"
            >
              View all posts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeIn>
        </div>

        <StaggerChildren staggerDelay={0.1}>
          {blogPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} isLast={i === blogPosts.length - 1} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
