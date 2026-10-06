'use client'

import { useRef } from 'react'
import { Lock } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { SectionLabel } from '@/components/section-label'
import { SplitReveal } from '@/components/split-reveal'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '@/lib/motion'

export function Cases() {
  const { t, locale } = useI18n()
  const root = useRef<HTMLElement>(null)

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-case]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 80, clipPath: 'inset(12% 0% 0% 0%)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [locale])

  return (
    <section ref={root} id="cases" className="relative bg-background py-24 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel index="05">{t.cases.label}</SectionLabel>
          <SplitReveal
            key={locale}
            text={t.cases.title}
            className="mt-8 text-balance font-serif text-4xl leading-[1.1] text-foreground md:text-5xl"
          />
          <p className="mt-8 flex items-start gap-3 text-sm leading-relaxed text-foreground/45">
            <Lock className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1} aria-hidden="true" />
            {t.cases.note}
          </p>
        </div>

        <ol className="flex flex-col gap-4">
          {t.cases.items.map((c, i) => (
            <li
              key={c.title}
              data-case
              className="group relative border border-foreground/10 bg-gradient-to-br from-[#0E1420] to-[#0A0A0A] p-8 transition-colors duration-700 hover:border-gold/30 md:p-12"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="border border-gold/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-gold">{c.tag}</span>
                <span className="font-serif text-sm text-foreground/30">{`Case ${String(i + 1).padStart(3, '0')}`}</span>
              </div>
              <p className="mt-10 font-serif text-5xl tracking-tight text-foreground md:text-6xl">{c.amount}</p>
              <h3 className="mt-6 font-serif text-2xl text-foreground">{c.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/55 md:text-base">{c.text}</p>
              <div className="mt-10 flex items-center gap-4 border-t border-foreground/10 pt-6">
                <span className="size-1.5 rounded-full bg-gold shadow-[0_0_12px_2px_rgba(184,156,114,0.6)]" aria-hidden="true" />
                <p className="text-[12px] uppercase tracking-[0.2em] text-foreground/80">{c.outcome}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
