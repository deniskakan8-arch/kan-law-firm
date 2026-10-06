'use client'

import { useRef } from 'react'
import { EyeOff, Compass, Target } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { SectionLabel } from '@/components/section-label'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '@/lib/motion'

const icons = [EyeOff, Compass, Target]

export function Manifesto() {
  const { t, locale } = useI18n()
  const root = useRef<HTMLElement>(null)

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-mword]')
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: { trigger: '[data-statement]', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      )
      gsap.utils.toArray<HTMLElement>('[data-principle]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80 + i * 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 60%', scrub: 1 },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [locale])

  const words = t.manifesto.statement.split(' ')
  const dashIndex = words.indexOf('—')

  return (
    <section ref={root} id="manifesto" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionLabel index="01">{t.manifesto.label}</SectionLabel>

        <p data-statement className="mt-12 max-w-5xl text-balance font-serif text-3xl leading-[1.2] text-foreground sm:text-5xl lg:text-6xl">
          {words.map((w, i) => (
            <span key={`${w}-${i}`} data-mword className={dashIndex >= 0 && i > dashIndex ? 'italic text-gold' : undefined}>
              {w}{' '}
            </span>
          ))}
        </p>

        <ul className="mt-24 grid gap-px border border-foreground/10 bg-foreground/10 md:mt-32 md:grid-cols-3">
          {t.manifesto.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <li
                key={item.title}
                data-principle
                className="flex flex-col gap-6 bg-[#0A0A0A]/70 p-8 backdrop-blur-md md:p-10"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-gold" strokeWidth={1} aria-hidden="true" />
                  <span className="font-serif text-sm text-foreground/30">{`0${i + 1}`}</span>
                </div>
                <h3 className="mt-8 font-serif text-2xl text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/60">{item.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
