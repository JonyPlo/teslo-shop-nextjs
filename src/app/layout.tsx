import type { Metadata } from 'next'
import './globals.css'

import { inter } from '@/config/fonts'

export const metadata: Metadata = {
  title: 'Teslo | Shop',
  description: 'Virtual shop of products',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
