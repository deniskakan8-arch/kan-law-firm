'use client'

import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { locales } from '@/lib/dictionary'
import { useI18n } from '@/components/i18n-provider'
import { Logo } from '@/components/logo'

export const PHONE_DISPLAY = '+7 777 228 2288'
export const PHONE_HREF = 'tel:+77772282288'

export function SiteHeader() {
  const { t, locale, setLocale } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#practices', label: t.nav.practices },
    { href: '#cases', label: t.nav.cases },
    { href: '#manifesto', label: t.nav.principles },
    { href: '#about', label: t.nav.about },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <div
        className={cn(
          'mx-auto flex items-center justify-between border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          scrolled
            ? 'max-w-5xl border-foreground/10 bg-[#0A0A0A]/55 px-4 py-2.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl md:px-5'
            : 'max-w-7xl border-transparent bg-transparent px-2 py-4 md:px-4',
        )}
      >
        <a href="#top" className="shrink-0" aria-label="На главную">
          <Logo compact={scrolled} />
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-[13px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-foreground"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <LocaleSwitch locale={locale} setLocale={setLocale} />
          <a
            href="#contact"
            className="hidden items-center gap-2 border border-gold/50 px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-foreground transition-colors duration-500 hover:bg-gold hover:text-background md:inline-flex"
          >
            <Phone className="size-3.5" strokeWidth={1.25} aria-hidden="true" />
            {t.nav.call}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex size-10 items-center justify-center border border-foreground/15 lg:hidden"
            aria-label={t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="size-4" strokeWidth={1.25} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-50 flex flex-col bg-[#0A0A0A]/95 px-6 pt-6 pb-10 backdrop-blur-xl transition-opacity duration-500 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex size-10 items-center justify-center border border-foreground/15"
            aria-label={t.nav.close}
            tabIndex={open ? 0 : -1}
          >
            <X className="size-4" strokeWidth={1.25} />
          </button>
        </div>
        <nav aria-label="Мобильная навигация" className="mt-16 flex-1">
          <ul className="flex flex-col gap-6">
            {[...links, { href: '#contact', label: t.nav.call }].map((l, i) => (
              <li key={l.href} className="border-b border-foreground/10 pb-6">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline gap-4 font-serif text-3xl text-foreground"
                >
                  <span className="font-sans text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={PHONE_HREF} tabIndex={open ? 0 : -1} className="text-sm tracking-[0.2em] text-foreground/70">
          {PHONE_DISPLAY}
        </a>
      </div>
    </header>
  )
}

function LocaleSwitch({ locale, setLocale }: { locale: string; setLocale: (l: 'ru' | 'en' | 'kk') => void }) {
  return (
    <div role="group" aria-label="Язык / Language" className="flex items-center text-[11px] tracking-[0.16em]">
      {locales.map((l, i) => (
        <span key={l.code} className="flex items-center">
          {i > 0 && <span className="mx-1.5 h-3 w-px bg-foreground/20" aria-hidden="true" />}
          <button
            type="button"
            onClick={() => setLocale(l.code)}
            aria-pressed={locale === l.code}
            className={cn(
              'px-0.5 py-1 transition-colors',
              locale === l.code ? 'text-gold' : 'text-foreground/50 hover:text-foreground',
            )}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  )
}
