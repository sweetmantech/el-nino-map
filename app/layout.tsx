import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import '@coinbase/onchainkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import Providers from '@/providers/Providers'
import Header from '@/components/Header'
import { Metadata } from 'next'

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

const VERCEL_OG = 'https://el-nino-map.vercel.app'
const TITLE = 'El Niño Maravilla Pt. 1'
const DESCRIPTION = `El Niño Maravilla is the debut album by xcelencia, showcasing a unique blend of Latin
urban and pop sounds. This project brings together a talented team of designers,
developers, and producers to create a groundbreaking musical experience.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [
      `${VERCEL_OG}/images/space-station.png`
    ]
  },
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: '/images/space-station.png',
      button: {
        title: 'El Niño',
        action: {
          type: 'launch_frame',
          name: 'El Niño Maravilla Pt. 1',
          url: 'https://el-nino-map-git-techengme-myc-983-31152c-sweetmantechs-projects.vercel.app/',
          splashImageUrl: '/images/space-station.png',
          splashBackgroundColor: '#ffffff',
        },
      },
    }),
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <ToastContainer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
