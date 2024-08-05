'use client'

import wagmiConfig from '@/lib/wagmi/config'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { base } from 'viem/chains'
import { WagmiProvider as WProvider } from 'wagmi'

const queryClient = new QueryClient()

const WagmiProvider = ({ children }: { children: ReactNode }) => (
  <WProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <OnchainKitProvider apiKey={process.env.PUBLIC_ONCHAINKIT_API_KEY} chain={base as any}>
        {children}
      </OnchainKitProvider>
    </QueryClientProvider>
  </WProvider>
)

export default WagmiProvider
