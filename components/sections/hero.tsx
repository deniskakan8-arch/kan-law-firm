'use client'

import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { SplitReveal } from '@/components/split-reveal'
import { GoldButton } from '@/components/gold-button'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '@/lib/motion'

export function Hero() {
  const { t, locale } = useI18n()
  const root = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-fade]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out', stagger: 0.15, delay: 1 },
      )
      gsap.fromTo('[data-hero-line]', { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'expo.inOut', delay: 0.2 })
      gsap.to(content.current, {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [locale])

  return (
    <section ref={root} id="top" className="relative flex min-h-svh items-end pb-16 pt-32 md:items-center md:pb-0">
      <div ref={content} className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <div className="max-w-3xl">
          <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-gold" data-hero-fade>
            <span data-hero-line className="block h-px w-12 origin-left bg-gold" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>

          <SplitReveal
            key={locale}
            as="h1"
            text={t.hero.title}
            onScroll={false}
            delay={0.35}
            highlight={[t.hero.title.split(' ').length - 1]}
            className="mt-8 text-balance font-serif text-[2.6rem] leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[5.4rem]"
          />

          <p data-hero-fade className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-foreground/65 md:text-lg">
            {t.hero.subtitle}
          </p>

          <div data-hero-fade className="mt-10">
            <GoldButton href="#contact">{t.hero.cta}</GoldButton>
          </div>
        </div>
      </div>

      <a
        href="#manifesto"
        data-hero-fade
        className="absolute bottom-8 right-5 hidden items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-foreground/50 transition-colors hover:text-foreground md:right-10 md:flex"
      >
        {t.hero.scroll}
        <span className="relative flex h-12 w-px overflow-hidden bg-foreground/15" aria-hidden="true">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.4s_ease-in-out_infinite] bg-gold" />
        </span>
        <ArrowDown className="sr-only" />
      </a>
    </section>
  )
}
