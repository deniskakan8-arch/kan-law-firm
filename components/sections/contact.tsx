'use client'

import { useActionState } from 'react'
import { MessageCircle, Phone, Send, ShieldCheck } from 'lucide-react'
import { submitContact, type ContactState } from '@/app/actions'
import { useI18n } from '@/components/i18n-provider'
import { SectionLabel } from '@/components/section-label'
import { SplitReveal } from '@/components/split-reveal'
import { GoldButton } from '@/components/gold-button'
import { PHONE_DISPLAY, PHONE_HREF } from '@/components/site-header'
import { cn } from '@/lib/utils'

const initial: ContactState = { status: 'idle' }

const channels = [
  { label: 'WhatsApp', href: 'https://wa.me/77772282288', icon: MessageCircle },
  { label: 'Telegram', href: 'https://t.me/kan_law', icon: Send },
]

export function Contact() {
  const { t, locale } = useI18n()
  const [state, action, pending] = useActionState(submitContact, initial)

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0E1420] py-24 md:py-40">
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(184,156,114,0.12),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionLabel index="07">{t.contact.label}</SectionLabel>
          <SplitReveal
            key={locale}
            text={t.contact.title}
            className="mt-8 text-balance font-serif text-5xl leading-[1.05] text-foreground md:text-7xl"
          />
          <p className="mt-8 max-w-md text-pretty leading-relaxed text-foreground/60">{t.contact.subtitle}</p>

          <div className="mt-14 space-y-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/40">{t.contact.direct}</p>
              <a
                href={PHONE_HREF}
                className="mt-3 inline-flex items-center gap-3 font-serif text-3xl text-foreground transition-colors hover:text-gold md:text-4xl"
              >
                <Phone className="size-5 text-gold" strokeWidth={1} aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/40">{t.contact.channels}</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {channels.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 border border-foreground/15 px-5 py-3 text-[12px] uppercase tracking-[0.2em] text-foreground/80 transition-colors duration-500 hover:border-gold/60 hover:text-gold"
                    >
                      <Icon className="size-4" strokeWidth={1.25} aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative border border-foreground/10 bg-[#0A0A0A]/60 p-8 backdrop-blur-xl md:p-12">
          {state.status === 'success' ? (
            <div className="flex min-h-[420px] flex-col items-start justify-center gap-6" role="status">
              <ShieldCheck className="size-10 text-gold" strokeWidth={1} aria-hidden="true" />
              <p className="max-w-sm font-serif text-3xl leading-snug text-foreground">{t.contact.success}</p>
            </div>
          ) : (
            <form action={action} className="flex flex-col gap-8" noValidate>
              <Field id="name" label={t.contact.name} invalid={!!state.fields?.name}>
                <input id="name" name="name" autoComplete="name" required maxLength={80} className={inputClass} />
              </Field>
              <Field id="phone" label={t.contact.phone} invalid={!!state.fields?.phone}>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7"
                  required
                  maxLength={20}
                  className={inputClass}
                />
              </Field>
              <Field id="message" label={t.contact.message} invalid={!!state.fields?.message}>
                <textarea id="message" name="message" rows={3} maxLength={2000} className={cn(inputClass, 'resize-none')} />
              </Field>

              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-foreground/50">
                <input type="checkbox" name="consent" required defaultChecked className="mt-0.5 size-4 shrink-0 accent-[#B89C72]" />
                {t.contact.consent}
              </label>

              {state.status === 'error' && (
                <p role="alert" className="text-sm text-destructive">
                  {t.contact.error}
                </p>
              )}

              <GoldButton type="submit" disabled={pending} className="justify-between">
                {pending ? t.contact.sending : t.contact.submit}
              </GoldButton>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

const inputClass =
  'peer w-full border-0 border-b border-foreground/20 bg-transparent px-0 pb-3 pt-2 text-lg text-foreground placeholder:text-foreground/25 transition-colors focus:border-gold focus:outline-none focus:ring-0'

function Field({ id, label, invalid, children }: { id: string; label: string; invalid: boolean; children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col gap-2', invalid && '[&_input]:border-destructive [&_textarea]:border-destructive')}>
      <label htmlFor={id} className="text-[11px] uppercase tracking-[0.26em] text-foreground/45">
        {label}
      </label>
      {children}
    </div>
  )
}
