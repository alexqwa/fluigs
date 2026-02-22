import type { Metadata } from 'next'
import { Google_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import './globals.css'

const googleSans = Google_Sans({
  variable: '--font-googleSans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Controle de Fluigs - Dia a Dia',
  description: 'App deselvolvido para melhor controle de fluigs.',
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
      </body>
    </html>
  )
}
