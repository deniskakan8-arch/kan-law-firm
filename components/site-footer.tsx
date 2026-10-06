'use client'

import { useI18n } from '@/components/i18n-provider'
import { Logo } from '@/components/logo'
import { PHONE_DISPLAY, PHONE_HREF } from '@/components/site-header'

export function SiteFooter() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <Logo />
          <address className="grid gap-2 text-sm not-italic leading-relaxed text-foreground/55 md:text-right">
            <span>{t.footer.address}</span>
            <a href={PHONE_HREF} className="transition-colors hover:text-gold">
              {PHONE_DISPLAY}
            </a>
            <a href="mailto:office@kan.law" className="transition-colors hover:text-gold">
              office@kan.law
            </a>
          </address>
        </div>
        <p
          className="mt-20 select-none font-serif text-[18vw] leading-none tracking-tight text-foreground/[0.04] md:text-[12rem]"
          aria-hidden="true"
        >
          KAN
        </p>
        <div className="mt-8 flex flex-col gap-4 border-t border-foreground/10 pt-8 text-[11px] uppercase tracking-[0.2em] text-foreground/35 md:flex-row md:items-center md:justify-between">
          <p>{`© ${year} Kan Law Office. ${t.footer.rights}`}</p>
          <div className="flex flex-col gap-3 md:flex-row md:gap-8">
            <a href="#" className="transition-colors hover:text-foreground">{t.footer.privacy}</a>
            <span>{t.footer.license} № 0047</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
