'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useI18n } from '@/components/i18n-provider'
import { SectionLabel } from '@/components/section-label'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '@/lib/motion'

export function About() {
  const { t, locale } = useI18n()
  const root = useRef<HTMLElement>(null)

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-portrait-mask]',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut', scrollTrigger: { trigger: '[data-portrait-mask]', start: 'top 80%', once: true } },
      )
      gsap.fromTo(
        '[data-portrait-img]',
        { yPercent: -8, scale: 1.15 },
        { yPercent: 8, scale: 1.05, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
      gsap.fromTo(
        '[data-about-fade]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '[data-about-copy]', start: 'top 80%', once: true } },
      )
    }, root)
    return () => ctx.revert()
  }, [locale])

  return (
    <section ref={root} id="about" className="relative border-t border-foreground/10 bg-background py-24 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-24">
        <div data-portrait-mask className="relative aspect-[4/5] overflow-hidden bg-[#0E1420]">
          <div data-portrait-img className="absolute inset-0">
            <Image
              src="/images/kan-portrait.jpg"
              alt={`${t.about.name}, ${t.about.role}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover grayscale-[30%]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute inset-4 border border-gold/20" aria-hidden="true" />
          <p className="absolute bottom-8 left-8 text-[10px] uppercase tracking-[0.3em] text-foreground/60">Almaty · KZ</p>
        </div>

        <div data-about-copy>
          <SectionLabel index="06">{t.about.label}</SectionLabel>
          <h2 data-about-fade className="mt-8 font-serif text-5xl leading-none tracking-tight text-foreground md:text-7xl">
            {t.about.name}
          </h2>
          <p data-about-fade className="mt-4 text-[12px] uppercase tracking-[0.3em] text-gold">{t.about.role}</p>
          <p data-about-fade className="mt-10 max-w-lg text-pretty text-base leading-relaxed text-foreground/65 md:text-lg">
            {t.about.bio}
          </p>
          <ul className="mt-10 grid gap-px border-y border-foreground/10 sm:grid-cols-2">
            {t.about.facts.map((f) => (
              <li data-about-fade key={f} className="flex items-start gap-3 py-4 pr-4 text-sm text-foreground/75">
                <span className="mt-2 h-px w-4 shrink-0 bg-gold" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <blockquote data-about-fade className="mt-10 font-serif text-2xl italic leading-snug text-foreground/90 md:text-3xl">
            {t.about.quote}
          </blockquote>
        </div>
      </div>
    </section>
  )
}
