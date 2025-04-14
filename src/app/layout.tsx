import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import ClientProviders from '@/components/clientComponents'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MAKAN+',
  description: 'Sustainable food rescue app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <div className="flex flex-col min-h-screen w-full">
            <NavBar />
            <main className="px-8 py-3">
              {children}
            </main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}
