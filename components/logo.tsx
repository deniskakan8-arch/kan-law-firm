import { cn } from '@/lib/utils'

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="relative flex size-9 items-center justify-center border border-gold/60 font-serif text-[15px] tracking-tight text-gold">
        K
        <span className="absolute inset-1 border border-gold/20" aria-hidden="true" />
      </span>
      <span
        className={cn(
          'flex flex-col leading-none transition-all duration-500',
          compact ? 'max-w-0 overflow-hidden opacity-0 sm:max-w-[200px] sm:opacity-100' : 'max-w-[220px] opacity-100',
        )}
      >
        <span className="font-serif text-[15px] tracking-[0.22em] text-foreground">KAN</span>
        <span className="mt-1 text-[9px] uppercase tracking-[0.34em] text-foreground/50">Law Office</span>
      </span>
    </span>
  )
}
