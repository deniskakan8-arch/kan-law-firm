'use client'

import { useRef } from 'react'
import { useI18n } from '@/components/i18n-provider'
import { SectionLabel } from '@/components/section-label'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '@/lib/motion'

export function Stats() {
  const { t, locale } = useI18n()
  const root = useRef<HTMLElement>(null)

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count)
        const counter = { v: 0 }
        el.textContent = '0'
        gsap.to(counter, {
          v: end,
          duration: 2.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(counter.v).toLocaleString('ru-RU')
          },
        })
      })
      gsap.fromTo(
        '[data-stat]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } },
      )
    }, root)
    return () => ctx.revert()
  }, [locale])

  return (
    <section ref={root} id="stats" className="relative bg-background py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionLabel index="02">{t.stats.label}</SectionLabel>
        <dl className="mt-14 grid grid-cols-1 border-t border-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.items.map((s, i) => (
            <div
              key={s.caption}
              data-stat
              className="flex flex-col-reverse gap-4 border-b border-foreground/10 py-10 sm:px-8 sm:odd:border-r lg:border-r lg:last:border-r-0 lg:first:pl-0"
            >
              <dt className="max-w-[16ch] text-sm leading-relaxed text-foreground/55">{s.caption}</dt>
              <dd className="flex items-baseline font-serif text-6xl tracking-tight text-foreground md:text-7xl">
                {s.prefix && <span className="mr-1 text-4xl text-gold">{s.prefix}</span>}
                <span data-count={s.value} className="tabular-nums">
                  {s.value.toLocaleString('ru-RU')}
                </span>
                {s.suffix && <span className="ml-1 text-3xl text-gold md:text-4xl">{s.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
