'use client'

import { useEffect } from 'react'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe/client'
import { useStripeCheckout } from '@/hooks/useStripeCheckout'

const StripeCheckout = () => {
  const { data, mutate, isPending, isError } = useStripeCheckout()

  useEffect(() => {
    mutate()
  }, [mutate])

  if (isPending) {
    return <p className="text-gray-600 text-center">Loading checkout...</p>
  }

  if (isError || !data?.clientSecret) {
    return <p className="text-red-600 text-center">Error loading checkout. Please try again.</p>
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret: data.clientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default StripeCheckout
