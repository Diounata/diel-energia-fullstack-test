import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Header } from '@/components/header'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

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
      <body className={`flex flex-col min-h-screen bg-gray-100 ${inter.className}`}>
        <Header />

        <main className="grow my-20 px-4 md:px-[3.5rem]">{children}</main>

        <Toaster />
      </body>
    </html>
  )
}
