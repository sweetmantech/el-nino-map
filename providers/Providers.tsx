import { AirstackProvider } from '@airstack/airstack-react'
import WagmiProvider from './WagmiProvider'
import FrameProvider from './FrameProvider'
import { ThirdwebProvider } from 'thirdweb/react'
import { MapProvider } from './MapProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AirstackProvider apiKey={process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ?? ''}>
      <WagmiProvider>
        <FrameProvider>
          <ThirdwebProvider>
            <MapProvider>{children}</MapProvider>
          </ThirdwebProvider>
        </FrameProvider>
      </WagmiProvider>
    </AirstackProvider>
  )
}
