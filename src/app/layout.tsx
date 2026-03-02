import type { Metadata } from 'next'
import { heading, mono } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { CustomCursor } from '@/components/ui/CustomCursor'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adi YR — Software Engineer',
  description:
    'Full-stack developer specializing in TypeScript, React, and Node.js. Building performant, beautiful digital experiences.',
  openGraph: {
    title: 'Adi YR — Software Engineer',
    description: 'Full-stack developer crafting performant, beautiful digital experiences.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: set theme before React hydrates to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
