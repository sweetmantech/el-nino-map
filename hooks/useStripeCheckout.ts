import { getStripe } from '@/lib/stripe'

interface Product {
  id: string
  name: string
  description: string
  price: number
  quantity: number
}

export default function useStripeCheckout() {
  const createCheckoutSession = async (products: Product[]) => {
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()
      
      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripe is not available')
      }

      const { error } = await stripe.redirectToCheckout({ sessionId })
      
      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      throw error
    }
  }

  return { createCheckoutSession }
}