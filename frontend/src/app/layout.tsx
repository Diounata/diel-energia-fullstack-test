import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gerenciador de tarefas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`grid grid-rows-[6.875rem_1fr] w-screen h-screen ${inter.className} flex-grow`}>
        <Header />

        {children}
      </body>
    </html>
  )
}
