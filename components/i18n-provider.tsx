'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { dictionaries, type Dictionary, type Locale } from '@/lib/dictionary'

type I18nValue = { locale: Locale; t: Dictionary; setLocale: (l: Locale) => void }

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ru')

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(() => ({ locale, t: dictionaries[locale], setLocale }), [locale])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
