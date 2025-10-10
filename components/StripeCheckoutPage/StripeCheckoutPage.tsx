'use client'

import { useState } from 'react'
import CartPreview from './CartPreview'
import { demoProducts } from '@/lib/stripe'
import useStripeCheckout from '@/hooks/useStripeCheckout'

export default function StripeCheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { createCheckoutSession } = useStripeCheckout()

  const totalAmount = demoProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      await createCheckoutSession(demoProducts)
    } catch (error) {
      console.error('Checkout failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Stripe Checkout Demo
          </h1>
          <p className="text-gray-600">
            Experience our seamless checkout process powered by Stripe
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <CartPreview 
            products={demoProducts} 
            totalAmount={totalAmount}
          />
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold 
                       hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200"
            >
              {isLoading ? 'Creating checkout...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}