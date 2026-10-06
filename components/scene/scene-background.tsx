'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, sceneState, useMediaQuery } from '@/lib/motion'

const MonolithScene = dynamic(() => import('./monolith-scene'), { ssr: false })

export function SceneBackground() {
  const wrapper = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const enable3d = isDesktop && !reduced

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      sceneState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      sceneState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#manifesto',
        start: 'top bottom',
        endTrigger: '#manifesto',
        end: 'bottom center',
        onUpdate: (self) => {
          sceneState.progress = self.progress
        },
      })
      gsap.to(wrapper.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '#stats', start: 'top bottom', end: 'top 25%', scrub: true },
      })
      ScrollTrigger.create({
        trigger: '#stats',
        start: 'top top',
        onEnter: () => setActive(false),
        onLeaveBack: () => setActive(true),
      })
    })

    return () => {
      window.removeEventListener('pointermove', onMove)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={wrapper} className="pointer-events-none fixed inset-0 -z-10 bg-background" aria-hidden="true">
      {enable3d ? (
        <div className="absolute inset-0">
          <MonolithScene active={active} />
        </div>
      ) : (
        <Image
          src="/images/hero-obsidian.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-70"
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,rgba(10,10,10,0.55)_55%,#0A0A0A_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
