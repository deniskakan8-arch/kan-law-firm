'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '@/lib/motion'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  wordClassName?: string
  delay?: number
  onScroll?: boolean
  highlight?: number[]
}

export function SplitReveal({ text, as: Tag = 'h2', className, wordClassName, delay = 0, onScroll = true, highlight = [] }: Props) {
  const ref = useRef<HTMLElement>(null)
  const words = text.split(' ')

  useIsoLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const targets = ref.current!.querySelectorAll('[data-word]')
      gsap.fromTo(
        targets,
        { yPercent: 115, opacity: 0, rotateX: -35, filter: 'blur(8px)' },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.07,
          delay,
          scrollTrigger: onScroll ? { trigger: ref.current, start: 'top 85%', once: true } : undefined,
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [text, delay, onScroll])

  return (
    <Tag ref={ref as never} className={cn('[perspective:800px]', className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span
              data-word
              className={cn('inline-block origin-bottom will-change-transform', highlight.includes(i) && 'text-gold italic', wordClassName)}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
