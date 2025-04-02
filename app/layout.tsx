import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import '@coinbase/onchainkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import Providers from '@/providers/Providers'
import Header from '@/components/Header'
import { Metadata } from 'next'
import { getFrameMetadata } from '@coinbase/onchainkit/frame'

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

const TITLE = 'El Niño Maravilla Pt. 1'
const DESCRIPTION = `El Niño Maravilla is the debut album by xcelencia, showcasing a unique blend of Latin
urban and pop sounds. This project brings together a talented team of designers,
developers, and producers to create a groundbreaking musical experience.`
const IMAGE =
  'https://got3wwl5l6yqyl6kye4gs2fgzlfwlen6ufvpj4cl2b4ddpzm5mkq.arweave.net/M6e7WX1fsQwvysE4aWimystlkb6havTwS9B4Mb8s6xU'

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'link',
      label: 'Collect',
      target: `https://www.estrella.city/`,
    },
  ],
  image: {
    src: IMAGE,
    aspectRatio: '1:1',
  },
})

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
  other: {
    ...frameMetadata,
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
