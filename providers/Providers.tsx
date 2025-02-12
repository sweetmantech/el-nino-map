'use client'

import { ThirdwebProvider } from 'thirdweb/react'
import { AirstackProvider } from '@airstack/airstack-react'
import { MapProvider } from './MapProvider'
import WagmiProvider from './WagmiProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AirstackProvider apiKey={process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ?? ''}>
      <WagmiProvider>
        <ThirdwebProvider>
          <MapProvider>{children}</MapProvider>
        </ThirdwebProvider>
      </WagmiProvider>
    </AirstackProvider>
  )
}
