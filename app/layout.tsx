import { Google_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import '@/lib/dayjs'
import './globals.css'

const googleSans = Google_Sans({
  variable: '--font-googleSans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Controle de Fluigs',
    template: '%s - Controle de Fluigs',
    description: 'Tenha controle total de todos os seus fluigs.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${googleSans.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
