import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { MarqueeStrip } from '@/components/ui/MarqueeStrip'

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <StatsSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
    </>
  )
}
