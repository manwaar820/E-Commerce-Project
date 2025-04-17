import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { CartProvider } from '../context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern E-Commerce Product Page',
  description: 'A dynamic and responsive e-commerce product page built using Next.js 15+, React Context API, and Tailwind CSS. It provides a fully interactive shopping cart experience with persistent storage and a clean, testable architecture.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
