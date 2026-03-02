export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  thumbnail: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  category: 'frontend' | 'backend' | 'fullstack' | 'other'
}

export interface TechItem {
  name: string
  icon: string
  category: 'language' | 'framework' | 'tool' | 'database'
  color: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  readingTime: string
  excerpt: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}
