import LandingPage from '@/components/LandingPage'
import { MapProvider } from '@/providers/MapProvider'
import { TipProvider } from '@/providers/TipProvider'
import OnBoarding from '@/components/OnBoarding'
import { Metadata } from 'next'
import { APP_URL } from '@/lib/farcaster/consts'

const TITLE = 'El Niño Maravilla Pt. 1'
const DESCRIPTION = `El Niño Maravilla is the debut album by xcelencia, showcasing a unique blend of Latin
urban and pop sounds. This project brings together a talented team of designers,
developers, and producers to create a groundbreaking musical experience.`

export const revalidate = 300

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [`${APP_URL}/favicon.png`],
  },
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: `${APP_URL}/favicon.png`,
      aspectRatio: '1:1',
      button: {
        title: 'Collect',
        action: {
          type: 'launch_frame',
          name: TITLE,
          url: APP_URL,
          splashImageUrl: `${APP_URL}/miniapp-icon.png`,
          splashBackgroundColor: '#6330d0',
        },
      },
    }),
  },
}

const Page = () => (
  <TipProvider>
    <MapProvider>
      <LandingPage />
      <OnBoarding />
    </MapProvider>
  </TipProvider>
)

export default Page
