'use client'

import { useRef } from 'react'
import { useI18n } from '@/components/i18n-provider'
import { SectionLabel } from '@/components/section-label'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '@/lib/motion'

export function Process() {
  const { t, locale } = useI18n()
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const el = track.current!
      const distance = () => el.scrollWidth - window.innerWidth
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      gsap.fromTo(
        '[data-progress]',
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: true } },
      )
      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step) => {
        gsap.fromTo(
          step.querySelector('[data-step-num]'),
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: step, containerAnimation: tween, start: 'left 80%', end: 'left 40%', scrub: true },
          },
        )
      })
    })
    mm.add('(max-width: 1023px)', () => {
      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step) => {
        gsap.fromTo(step, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: step, start: 'top 85%', once: true } })
      })
    })
    return () => mm.revert()
  }, [locale])

  return (
    <section ref={root} id="process" className="relative overflow-hidden border-y border-foreground/10 bg-[#0E1420] lg:h-svh">
      <div className="flex h-full flex-col py-24 lg:py-0">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-10 lg:absolute lg:inset-x-0 lg:top-28 lg:z-10">
          <SectionLabel index="04">{t.process.label}</SectionLabel>
          <div className="mt-6 flex items-end justify-between gap-6">
            <h2 className="max-w-xl text-balance font-serif text-4xl leading-[1.1] text-foreground md:text-5xl">{t.process.title}</h2>
            <p className="hidden text-[11px] uppercase tracking-[0.3em] text-foreground/40 lg:block">{t.process.hint} →</p>
          </div>
        </div>

        <div
          ref={track}
          className="mt-14 flex flex-col gap-px px-5 md:px-10 lg:mt-0 lg:h-full lg:w-max lg:flex-row lg:items-end lg:gap-0 lg:pb-24 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-[20vw]"
        >
          {t.process.steps.map((step, i) => (
            <article
              key={step.title}
              data-step
              className="relative flex flex-col border-t border-foreground/10 py-10 lg:w-[38vw] lg:max-w-[560px] lg:border-t-0 lg:border-l lg:px-12 lg:py-0"
            >
              <span data-step-num className="font-serif text-7xl leading-none text-gold md:text-[9rem]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-8 font-serif text-3xl text-foreground md:text-4xl">{step.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/60 md:text-base">{step.text}</p>
            </article>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-10 mx-auto hidden w-full max-w-7xl px-10 lg:block" aria-hidden="true">
          <div className="h-px w-full bg-foreground/10">
            <div data-progress className="h-px w-full origin-left bg-gold" />
          </div>
        </div>
      </div>
    </section>
  )
}
