import LandingPage from '@/components/LandingPage'
import { MapProvider } from '@/providers/MapProvider'
import { TipProvider } from '@/providers/TipProvider'
import OnBoarding from '@/components/OnBoarding'
import { Metadata } from 'next'

const TITLE = 'El Niño Maravilla Pt. 1'
const DESCRIPTION = `El Niño Maravilla is the debut album by xcelencia, showcasing a unique blend of Latin
urban and pop sounds. This project brings together a talented team of designers,
developers, and producers to create a groundbreaking musical experience.`
const IMAGE =
  'https://got3wwl5l6yqyl6kye4gs2fgzlfwlen6ufvpj4cl2b4ddpzm5mkq.arweave.net/M6e7WX1fsQwvysE4aWimystlkb6havTwS9B4Mb8s6xU'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: IMAGE,
      aspectRatio: '1:1',
      button: {
        title: 'Collect',
        action: {
          type: 'launch_frame',
          name: 'In Process',
          url: 'https://el-nino-map.vercel.app',
          iconImageUrl: IMAGE,
          splashImageUrl: IMAGE,
          splashBackgroundColor: '#f7f7f7',
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
