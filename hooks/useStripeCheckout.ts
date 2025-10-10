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
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const createEmbeddedCheckoutSession = async (products: Product[]) => {
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

      const { clientSecret } = await response.json()
      setClientSecret(clientSecret)
      
      return clientSecret
    } catch (error) {
      console.error('Checkout error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    createEmbeddedCheckoutSession,
    loading,
    clientSecret
  }
}