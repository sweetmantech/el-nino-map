import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="overflow-hidden">
      <body className="overflow-hidden">
        {children}
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  )
}
