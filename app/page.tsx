import LandingPage from '@/components/LandingPage'
import { MapProvider } from '@/providers/MapProvider'
import { TipProvider } from '@/providers/TipProvider'
import OnBoarding from '@/components/OnBoarding'
import { Metadata } from 'next'

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
    images: ['https://el-nino-map.vercel.app/favicon.png'],
  },
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: 'https://el-nino-map.vercel.app/favicon.png',
      aspectRatio: '1:1',
      button: {
        title: 'Collect',
        action: {
          type: 'launch_frame',
          name: TITLE,
          url: 'https://el-nino-map.vercel.app',
          iconImageUrl: 'https://el-nino-map.vercel.app/miniapp-icon.png',
          splashImageUrl: 'https://el-nino-map.vercel.app/miniapp-cover.jpeg',
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
