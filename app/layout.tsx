import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Playfair_Display } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-manrope',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Кан и партнёры — адвокатское бюро, Алматы',
  description:
    'Безупречная правовая защита бизнеса в Алматы: корпоративные споры, арбитраж, налоговые споры, банкротство и уголовная защита по экономическим делам. Конфиденциально.',
  keywords: ['адвокат Алматы', 'корпоративные споры', 'защита бизнеса', 'уголовная защита', 'арбитраж', 'налоговые споры'],
  openGraph: {
    title: 'Кан и партнёры — адвокатское бюро',
    description: 'Безупречная правовая защита вашего бизнеса. Алматы.',
    locale: 'ru_KZ',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${playfair.variable} bg-background`}>
      <body className="antialiased">
        {children}
        <div className="grain" aria-hidden="true" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
