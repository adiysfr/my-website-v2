export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-[var(--text-muted)]">
          © {year} Adi YR. All rights reserved.
        </p>
        <p className="text-sm text-[var(--text-muted)]">
          Built with Next.js &amp; ☕
        </p>
      </div>
    </footer>
  )
}
