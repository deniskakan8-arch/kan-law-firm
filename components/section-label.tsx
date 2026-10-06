import { cn } from '@/lib/utils'

export function SectionLabel({ index, children, className }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-foreground/55', className)}>
      <span className="text-gold">{index}</span>
      <span className="h-px w-10 bg-foreground/20" aria-hidden="true" />
      {children}
    </p>
  )
}
