import { useState } from 'react'
import { getStripe } from '@/lib/stripe/config'

interface Product {
  id: string
  name: string
  price: number
  quantity: number
}

export default function useStripeCheckout() {
  const [loading, setLoading] = useState(false)

  const createCheckoutSession = async (products: Product[]) => {
    try {
      setLoading(true)
      
      // Create checkout session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()
      
      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      if (!stripe) throw new Error('Stripe failed to initialize')

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) {
        console.error('Stripe redirect error:', error)
        throw error
      }
    } catch (error) {
      console.error('Checkout error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    createCheckoutSession,
    loading
  }
}