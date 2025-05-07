'use client'

import { AirstackProvider } from '@airstack/airstack-react'
import WagmiProvider from './WagmiProvider'
import FrameProvider from './FrameProvider'
import { ThirdwebProvider } from 'thirdweb/react'
import { CrossmintCheckoutProvider, CrossmintProvider } from '@crossmint/client-sdk-react-ui'
import { Fragment } from 'react'
import { SubscriptionProvider } from './SubscriptionProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_CROSSMINT_API_KEY)
    return <Fragment>NEXT_PUBLIC_CROSSMINT_API_KEY environment variable is not set</Fragment>

  return (
    <WagmiProvider>
      <CrossmintProvider apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY as string}>
        <CrossmintCheckoutProvider>
          <FrameProvider>
            <AirstackProvider apiKey={process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ?? ''}>
              <ThirdwebProvider>
                <SubscriptionProvider>{children}</SubscriptionProvider>
              </ThirdwebProvider>
            </AirstackProvider>
          </FrameProvider>
        </CrossmintCheckoutProvider>
      </CrossmintProvider>
    </WagmiProvider>
  )
}
