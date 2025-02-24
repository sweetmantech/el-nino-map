import { AirstackProvider } from '@airstack/airstack-react'
import WagmiProvider from './WagmiProvider'
import FrameProvider from './FrameProvider'
import { ThirdwebProvider } from 'thirdweb/react'
import { MapProvider } from './MapProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AirstackProvider apiKey={process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ?? ''}>
      <ThirdwebProvider>
        <WagmiProvider>
          <FrameProvider>
            <MapProvider>{children}</MapProvider>
          </FrameProvider>
        </WagmiProvider>
      </ThirdwebProvider>
    </AirstackProvider>
  )
}
