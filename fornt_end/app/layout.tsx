import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import GlobalContext from '@/context/GlobalContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Todo App with nextjs and springboot',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='w-full min-h-screen max-h-screen'>
          <div className='w-full h-screen flex flex-col gap-2 relative'>
            <Header />
            <GlobalContext>
              {children}
            </GlobalContext>
          </div>
        </div>
      </body>
    </html>
  )
}
