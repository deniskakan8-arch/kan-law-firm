import { I18nProvider } from '@/components/i18n-provider'
import { SmoothScroll } from '@/components/smooth-scroll'
import { SceneBackground } from '@/components/scene/scene-background'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/sections/hero'
import { Manifesto } from '@/components/sections/manifesto'
import { Stats } from '@/components/sections/stats'
import { Practices } from '@/components/sections/practices'
import { Process } from '@/components/sections/process'
import { Cases } from '@/components/sections/cases'
import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <I18nProvider>
      <SmoothScroll />
      <SceneBackground />
      <SiteHeader />
      <main>
        <Hero />
        <Manifesto />
        <Stats />
        <Practices />
        <Process />
        <Cases />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </I18nProvider>
  )
}
