'use client'

import { useRef } from 'react'
import { ArrowUpRight, Building2, Gavel, Landmark, ShieldAlert, Scale, FileSearch } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { SectionLabel } from '@/components/section-label'
import { SplitReveal } from '@/components/split-reveal'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '@/lib/motion'

const icons = [Building2, Scale, Landmark, ShieldAlert, Gavel, FileSearch]

export function Practices() {
  const { t, locale } = useI18n()
  const root = useRef<HTMLElement>(null)

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-practice]',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '[data-practice-grid]', start: 'top 80%', once: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [locale])

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <section ref={root} id="practices" className="relative bg-background py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="03">{t.practices.label}</SectionLabel>
            <SplitReveal
              key={locale}
              text={t.practices.title}
              className="mt-8 max-w-2xl text-balance font-serif text-4xl leading-[1.1] text-foreground md:text-6xl"
            />
          </div>
        </div>

        <ul data-practice-grid className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-24">
          {t.practices.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <li
                key={item.title}
                data-practice
                onPointerMove={onMove}
                className="group relative isolate flex min-h-[320px] flex-col overflow-hidden border border-foreground/10 bg-gradient-to-b from-[#0E1420]/80 to-[#0A0A0A]/60 p-8 backdrop-blur-xl transition-colors duration-700 hover:border-gold/40"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(184,156,114,0.16), transparent 60%)',
                  }}
                />
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center border border-foreground/10 transition-colors duration-700 group-hover:border-gold/50">
                    <Icon className="size-5 text-gold" strokeWidth={1} aria-hidden="true" />
                  </span>
                  <span className="font-serif text-sm text-foreground/30">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="mt-auto">
                  <h3 className="font-serif text-2xl text-foreground transition-transform duration-700 group-hover:-translate-y-1">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/55">{item.text}</p>
                  <a
                    href="#contact"
                    className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-foreground/50 transition-colors duration-500 group-hover:text-gold"
                  >
                    {t.practices.more}
                    <span className="sr-only">{`: ${item.title}`}</span>
                    <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.25} aria-hidden="true" />
                  </a>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
