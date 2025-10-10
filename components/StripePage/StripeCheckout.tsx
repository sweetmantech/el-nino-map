import { useEffect, useState } from 'react'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe/client'

const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}

export default StripeCheckout
