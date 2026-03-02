# Portfolio Website Blueprint — "Clean Engineer"

> **Vibe:** Minimalis, clean, monochrome + 1 accent color, scroll parallax, micro-interactions
> **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
> **Target:** Developer/Engineer portfolio

---

## Tech Stack & Dependencies

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir
cd portfolio
npm install framer-motion lucide-react
npm install -D @tailwindcss/typography
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout + fonts + metadata
│   ├── page.tsx              # Homepage — compose all sections
│   ├── blog/
│   │   ├── page.tsx          # Blog list page
│   │   └── [slug]/
│   │       └── page.tsx      # Blog detail page
│   └── globals.css           # Tailwind base + custom CSS variables
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Fixed top navbar
│   │   ├── Footer.tsx        # Minimal footer
│   │   └── SmoothScroll.tsx  # Lenis smooth scroll wrapper
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx       # Hero dengan text reveal + parallax background
│   │   ├── AboutSection.tsx      # About + tech stack icons
│   │   ├── ProjectsSection.tsx   # Project showcase grid
│   │   ├── BlogSection.tsx       # Blog preview (latest 3)
│   │   └── ContactSection.tsx    # Contact form + social links
│   │
│   ├── ui/
│   │   ├── ProjectCard.tsx       # Individual project card
│   │   ├── BlogCard.tsx          # Individual blog card
│   │   ├── TechIcon.tsx          # Tech stack icon with tooltip
│   │   ├── SectionHeading.tsx    # Reusable section title with line animation
│   │   ├── Button.tsx            # Reusable button component
│   │   ├── MagneticWrapper.tsx   # Magnetic hover effect wrapper
│   │   └── ParallaxLayer.tsx     # Reusable parallax wrapper component
│   │
│   └── animations/
│       ├── FadeIn.tsx            # Scroll-triggered fade in
│       ├── TextReveal.tsx        # Character-by-character text reveal
│       ├── StaggerChildren.tsx   # Staggered children animation
│       └── ParallaxScroll.tsx    # Parallax scroll effect hook/component
│
├── data/
│   ├── projects.ts           # Project data array
│   ├── techStack.ts          # Tech stack list
│   └── socialLinks.ts        # Social media links
│
├── hooks/
│   ├── useScrollProgress.ts  # Track scroll progress (0-1)
│   ├── useParallax.ts        # Parallax offset based on scroll
│   └── useInView.ts          # Element in viewport detection
│
├── lib/
│   ├── fonts.ts              # Font configuration
│   └── utils.ts              # Utility functions (cn, etc.)
│
├── content/
│   └── blog/                 # MDX blog posts
│       ├── my-first-post.mdx
│       └── another-post.mdx
│
└── types/
    └── index.ts              # Shared TypeScript types
```

---

## Design Tokens & Theme

### Colors (CSS Variables di `globals.css`)

```css
:root {
  /* Base */
  --bg-primary: #fafafa;
  --bg-secondary: #f0f0f0;
  --text-primary: #1a1a1a;
  --text-secondary: #6b6b6b;
  --text-muted: #a0a0a0;

  /* Accent — pick ONE, biru ini default */
  --accent: #2563eb;
  --accent-light: #3b82f6;
  --accent-subtle: rgba(37, 99, 235, 0.08);

  /* Borders & Surfaces */
  --border: #e5e5e5;
  --surface: #ffffff;
  --surface-hover: #f5f5f5;
}

/* Optional dark mode toggle */
[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  --text-primary: #ededed;
  --text-secondary: #8b8b8b;
  --text-muted: #555555;
  --accent: #3b82f6;
  --accent-light: #60a5fa;
  --accent-subtle: rgba(59, 130, 246, 0.1);
  --border: #262626;
  --surface: #171717;
  --surface-hover: #1f1f1f;
}
```

### Typography

```ts
// lib/fonts.ts
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
// Atau pakai font lain yang lo suka:
// Opsi heading: Sora, Outfit, Manrope, Plus Jakarta Sans
// Opsi mono: Fira Code, IBM Plex Mono

export const heading = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
})

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})
```

**Typography Scale:**
- Hero title: `text-5xl md:text-7xl font-bold tracking-tight`
- Section heading: `text-3xl md:text-4xl font-semibold`
- Body: `text-base md:text-lg leading-relaxed`
- Caption/meta: `text-sm text-secondary`
- Code/mono: `font-mono text-sm`

### Spacing Philosophy

- Section padding: `py-24 md:py-32`
- Container max-width: `max-w-5xl mx-auto px-6`
- Between elements: multiples of 4 (`gap-4`, `gap-8`, `gap-12`)
- Generous whitespace — let things breathe

---

## Component Specs

### 1. `Navbar.tsx`

```
Behavior:
- Fixed top, transparent background
- Background blur + border-bottom on scroll (useScrollProgress > 0.02)
- Logo/name kiri, nav links kanan
- Links: About, Projects, Blog, Contact
- Smooth scroll to section on click
- Optional: mobile hamburger menu

Visual:
- Height: h-16
- Backdrop blur: backdrop-blur-md
- Transition: background 0.3s ease
```

### 2. `HeroSection.tsx`

```
Layout:
- Full viewport height (min-h-screen)
- Content centered vertically
- Nama besar di atas, tagline di bawah, CTA button

Content:
- Greeting: "Hi, I'm" (text-muted, text-lg)
- Name: "[Your Name]" (text-7xl, font-bold, tracking-tight)
- Tagline: "I build things for the web." (text-xl, text-secondary)
- CTA: "See my work ↓" button (scroll ke Projects)

Animations:
- Text reveal animation (karakter per karakter, stagger 0.03s)
- Tagline fade-in setelah nama selesai (delay 0.5s)
- CTA bounce subtle (infinite, 2s interval)

Parallax:
- Background: subtle grid pattern atau dot pattern
- Grid pattern bergerak lebih lambat dari scroll (speed: 0.3)
- Optional: floating geometric shapes (circle, square) dengan parallax berbeda
  - Shape 1: speed 0.2 (sangat lambat, jauh di belakang)
  - Shape 2: speed 0.5 (medium)
  - Shape 3: speed 0.8 (hampir ikut scroll)
```

### 3. `AboutSection.tsx`

```
Layout:
- 2 column di desktop: text kiri, tech stack grid kanan
- 1 column di mobile: text atas, tech stack bawah

Content:
- Section heading: "About Me" dengan line animation
- 3-4 paragraf singkat tentang diri lo
- Tech stack: grid 4-5 kolom icon dengan label

Animations:
- Fade in dari kiri untuk text (scroll-triggered)
- Stagger fade in untuk tech stack icons
- Icon hover: scale 1.1 + accent color glow

Parallax:
- Section ini punya accent line/shape di background
- Line bergerak dengan speed 0.4 relatif terhadap scroll
```

### 4. `ProjectsSection.tsx`

```
Layout:
- Section heading: "Selected Projects"
- Grid 2 kolom (desktop), 1 kolom (mobile)
- Optional filter tabs di atas: All, Frontend, Backend, Fullstack

Content per ProjectCard:
- Thumbnail/screenshot (aspect-ratio 16/9)
- Project title
- Short description (1-2 kalimat)
- Tech tags (small pills)
- Links: Live Demo, GitHub

Animations:
- Cards stagger fade-in on scroll
- Card hover:
  - Scale 1.02
  - Shadow elevation naik
  - Image zoom subtle (scale 1.05)
  - Arrow icon muncul di corner

Parallax:
- Thumbnail image dalam card punya parallax effect ringan
  - Saat scroll, image bergerak sedikit ke atas (speed 0.1-0.2)
  - Overflow hidden di card container
  - Ini bikin efek "window" yang keren
```

### 5. `BlogSection.tsx`

```
Layout:
- Section heading: "Latest Writing"
- List style (bukan grid) — lebih clean untuk blog
- Show 3 latest posts
- "View all posts →" link di bawah

Content per BlogCard:
- Tanggal (text-sm, text-muted)
- Title (text-xl, font-semibold)
- Reading time (text-sm, text-muted)
- No thumbnail — keep it clean

Animations:
- Stagger fade in from bottom
- Hover: title color → accent, arrow slide in dari kanan
- Divider line antara posts
```

### 6. `ContactSection.tsx`

```
Layout:
- Section heading: "Let's Connect"
- 2 column: form kiri, info kanan (atau centered single column)

Content:
- Headline: "Got a project in mind? Let's talk."
- Form fields: Name, Email, Message
- Submit button dengan loading state
- Social links: GitHub, LinkedIn, Twitter/X, Email
- Optional: availability status ("Currently available for freelance")

Animations:
- Fade in on scroll
- Input focus: border color → accent + subtle glow
- Submit button: magnetic hover effect
- Social icons: stagger fade in + hover scale
```

### 7. `Footer.tsx`

```
Content:
- "Built with Next.js & ☕" atau sejenisnya
- Copyright year (dynamic)
- Minimal, 1 baris

Visual:
- border-top
- py-8
- text-sm text-muted text-center
```

---

## Animation & Parallax Components Detail

### `ParallaxLayer.tsx`

```tsx
// Wrapper component yang menggerakkan children berdasarkan scroll
// Props:
//   speed: number (0-1, dimana 0 = diam, 1 = ikut scroll normal)
//   direction: 'up' | 'down' (default 'up')
//   className: string

// Implementation:
// - Pakai useScroll() + useTransform() dari Framer Motion
// - Transform Y position berdasarkan scroll progress * speed * range
// - Wrap children dalam motion.div dengan style={{ y: transformedY }}
```

### `ParallaxScroll.tsx` (hook version)

```tsx
// Custom hook untuk parallax
// const y = useParallax(ref, speed)
//
// Implementation:
// - useScroll({ target: ref, offset: ["start end", "end start"] })
// - useTransform(scrollYProgress, [0, 1], [startOffset, endOffset])
// - startOffset & endOffset dihitung dari speed
//   misal speed=0.5 → range [-100, 100] pixels
```

### `FadeIn.tsx`

```tsx
// Props:
//   direction: 'up' | 'down' | 'left' | 'right' (default 'up')
//   delay: number (default 0)
//   duration: number (default 0.6)
//   children: ReactNode

// Framer Motion:
// initial: { opacity: 0, y/x: offset berdasarkan direction }
// whileInView: { opacity: 1, y: 0, x: 0 }
// viewport: { once: true, margin: "-100px" }
// transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] }
```

### `TextReveal.tsx`

```tsx
// Props:
//   text: string
//   className: string
//   delay: number (default 0)
//   staggerDelay: number (default 0.03)

// Implementation:
// - Split text into individual characters
// - Wrap each char dalam motion.span
// - Parent: variants container dengan staggerChildren
// - Child: variants { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
// - Trigger: whileInView
```

### `StaggerChildren.tsx`

```tsx
// Props:
//   staggerDelay: number (default 0.1)
//   children: ReactNode

// Implementation:
// - motion.div container dengan variants
// - staggerChildren in transition
// - Each direct child wrapped in motion.div dengan fade+slide variant
```

### `MagneticWrapper.tsx`

```tsx
// Props:
//   strength: number (default 0.3)
//   children: ReactNode

// Implementation:
// - Track mouse position relative to element center
// - onMouseMove: hitung offset dari center, apply transform * strength
// - onMouseLeave: animate back to {x: 0, y: 0} dengan spring
// - Pakai useMotionValue + useSpring dari Framer Motion
```

---

## Data Structures

### `data/projects.ts`

```ts
export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  thumbnail: string          // path ke image di /public/projects/
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  category: 'frontend' | 'backend' | 'fullstack' | 'other'
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory.',
    thumbnail: '/projects/ecommerce.png',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true,
    category: 'fullstack',
  },
  // ... more projects
]
```

### `data/techStack.ts`

```ts
export interface TechItem {
  name: string
  icon: string  // SVG path atau lucide icon name
  category: 'language' | 'framework' | 'tool' | 'database'
}

export const techStack: TechItem[] = [
  { name: 'TypeScript', icon: 'typescript', category: 'language' },
  { name: 'React', icon: 'react', category: 'framework' },
  { name: 'Next.js', icon: 'nextjs', category: 'framework' },
  { name: 'Node.js', icon: 'nodejs', category: 'framework' },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'database' },
  { name: 'Tailwind', icon: 'tailwind', category: 'tool' },
  // ...
]
```

### `data/socialLinks.ts`

```ts
export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/username', icon: 'Github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/username', icon: 'Linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/username', icon: 'Twitter' },
  { name: 'Email', url: 'mailto:you@email.com', icon: 'Mail' },
]
```

---

## Parallax Strategy Summary

| Section | Element | Parallax Speed | Direction | Notes |
|---------|---------|---------------|-----------|-------|
| Hero | Background grid/dots | 0.3 | up | Pattern moves slow, content feels floating |
| Hero | Floating shape 1 | 0.15 | up | Far background, very slow |
| Hero | Floating shape 2 | 0.5 | up | Mid layer |
| Hero | Floating shape 3 | 0.7 | down | Foreground, creates depth |
| About | Accent decorative line | 0.4 | up | Subtle, di belakang text |
| Projects | Card thumbnails | 0.15 | up | Image moves inside card frame |
| Contact | Background gradient orb | 0.3 | up | Blurred gradient ball |

**Key principles:**
- Speed 0 = completely static (moves with scroll)
- Speed 1 = stays in place while page scrolls
- Keep most parallax between 0.1 - 0.5 untuk subtle effect
- Jangan lebih dari 3 parallax layers per section — nanti malah rame
- Always add `will-change: transform` untuk performance
- Disable parallax di mobile (`useMediaQuery` check) — biar gak laggy

---

## Scroll Behavior

### Smooth Scroll (Lenis)

```bash
npm install lenis
```

```tsx
// components/layout/SmoothScroll.tsx
// Wrap seluruh app dalam Lenis provider
// Config: duration 1.2, easing easeOutQuart, smooth true
// Ini bikin semua scroll jadi butter smooth
// PENTING: disable di mobile kalau performance jelek
```

### Scroll Progress Indicator

Optional: thin line di top page yang nunjukin scroll progress. Accent color, height 2-3px.

---

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|-----------|---------------|
| `< 640px` (mobile) | Single column, no parallax, smaller text, hamburger menu |
| `640-1024px` (tablet) | 2-col projects, reduced parallax speed |
| `> 1024px` (desktop) | Full layout, all parallax active, hover effects |

---

## Performance Checklist

- [ ] Lazy load images (Next.js Image component)
- [ ] Disable parallax on mobile / reduced motion preference
- [ ] Use `will-change: transform` sparingly
- [ ] Intersection Observer for scroll animations (Framer Motion handles this)
- [ ] Optimize images: WebP, proper sizing
- [ ] Preload fonts
- [ ] Check `prefers-reduced-motion` media query — disable animations for accessibility

---

## SEO & Meta

```tsx
// app/layout.tsx metadata
export const metadata = {
  title: '[Your Name] — Developer Portfolio',
  description: 'Full-stack developer specializing in ...',
  openGraph: {
    title: '[Your Name] — Developer Portfolio',
    description: '...',
    images: ['/og-image.png'],  // 1200x630
  },
  twitter: {
    card: 'summary_large_image',
  },
}
```

---

## Implementation Order (Recommended)

1. **Setup**: Next.js + Tailwind + Fonts + CSS Variables + globals.css
2. **Layout**: Navbar + Footer + SmoothScroll wrapper
3. **Hero**: Text reveal + parallax background (most impactful, build first)
4. **Animation components**: FadeIn, StaggerChildren, ParallaxLayer
5. **About**: Content + tech stack icons
6. **Projects**: ProjectCard + grid + parallax thumbnails
7. **Blog**: Blog list + MDX setup
8. **Contact**: Form + social links
9. **Polish**: Micro-interactions, magnetic buttons, transitions
10. **Responsive**: Mobile adjustments, disable heavy effects
11. **Deploy**: Vercel

---

## Prompt untuk Claude Code

Kalau mau langsung vibes code, bisa copy prompt ini:

> "Build a minimalist developer portfolio using Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion. Follow the blueprint in PORTFOLIO-BLUEPRINT.md. Start with [section yang mau dikerjain dulu]. Use the component structure defined in the blueprint. Key features: scroll parallax effects, text reveal animation, smooth scroll with Lenis, magnetic button hover effects. Keep it monochrome with one blue accent color (#2563eb). Generous whitespace, clean typography."

---

*Happy building, bro. Ship it.* 🚀
