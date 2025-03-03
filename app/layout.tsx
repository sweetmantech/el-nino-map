'use client'

import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import '@coinbase/onchainkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import Providers from '@/providers/Providers'
import Header from '@/components/Header'
import OnBoarding from '@/components/OnBoarding'

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <OnBoarding />
          <Header />
          {children}
          <ToastContainer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
