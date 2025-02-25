'use client'

import { ThirdwebProvider } from 'thirdweb/react'
import { AirstackProvider } from '@airstack/airstack-react'
import { CrossmintCheckoutProvider, CrossmintProvider } from '@crossmint/client-sdk-react-ui'
import { Fragment } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_CROSSMINT_API_KEY)
    return <Fragment>NEXT_PUBLIC_CROSSMINT_API_KEY environment variable is not set</Fragment>

  return (
    <QueryClientProvider client={queryClient}>
      <CrossmintProvider apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY as string}>
        <CrossmintCheckoutProvider>
          <AirstackProvider apiKey={process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ?? ''}>
            <ThirdwebProvider>{children}</ThirdwebProvider>
          </AirstackProvider>
        </CrossmintCheckoutProvider>
      </CrossmintProvider>
    </QueryClientProvider>
  )
}
