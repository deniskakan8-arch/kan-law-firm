import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

const base =
  'group relative inline-flex items-center gap-4 overflow-hidden border border-gold/70 px-7 py-4 text-[12px] uppercase tracking-[0.2em] text-foreground transition-colors duration-700 hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50 md:px-9 md:py-5'

function Inner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
        aria-hidden="true"
      />
      <span className="relative">{children}</span>
      <ArrowUpRight
        className="relative size-4 transition-transform duration-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.25}
        aria-hidden="true"
      />
    </>
  )
}

export function GoldButton({ children, href, type = 'button', disabled, className }: Props) {
  if (href) {
    return (
      <a href={href} className={cn(base, className)}>
        <Inner>{children}</Inner>
      </a>
    )
  }
  return (
    <button type={type} disabled={disabled} className={cn(base, className)}>
      <Inner>{children}</Inner>
    </button>
  )
}
