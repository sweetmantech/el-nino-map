'use client'

import { ThirdwebProvider } from 'thirdweb/react'
import { AirstackProvider } from '@airstack/airstack-react'
import { MapProvider } from './MapProvider'
import { CrossmintCheckoutProvider, CrossmintProvider } from '@crossmint/client-sdk-react-ui'
import { Fragment } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_CROSSMINT_API_KEY)
    return <Fragment>NEXT_PUBLIC_CROSSMINT_API_KEY environment variable is not set</Fragment>

  return (
    <CrossmintProvider apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY as string}>
      <CrossmintCheckoutProvider>
        <AirstackProvider apiKey={process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ?? ''}>
          <ThirdwebProvider>
            <MapProvider>{children}</MapProvider>
          </ThirdwebProvider>
        </AirstackProvider>
      </CrossmintCheckoutProvider>
    </CrossmintProvider>
  )
}
