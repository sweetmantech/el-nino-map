import LandingPage from '@/components/LandingPage'
import { MapProvider } from '@/providers/MapProvider'
import { TipProvider } from '@/providers/TipProvider'

const Page = () => (
  <TipProvider>
    <MapProvider>
      <LandingPage />
    </MapProvider>
  </TipProvider>
)

export default Page
