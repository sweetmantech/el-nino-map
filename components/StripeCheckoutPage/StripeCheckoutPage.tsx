'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CartPreview from './CartPreview'
import EmbeddedCheckout from '../StripePage/EmbeddedCheckout'
import { demoProducts } from '@/lib/stripe'
import useStripeCheckout from '@/hooks/useStripeCheckout'

export default function StripeCheckoutPage() {
  const [showCheckout, setShowCheckout] = useState(false)
  const { createEmbeddedCheckoutSession, loading, clientSecret } = useStripeCheckout()
  const router = useRouter()

  const totalAmount = demoProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )

  const handleCheckout = async () => {
    try {
      await createEmbeddedCheckoutSession(demoProducts)
      setShowCheckout(true)
    } catch (error) {
      console.error('Checkout failed:', error)
      alert('Failed to initialize checkout. Please try again.')
    }
  }

  const handleCheckoutComplete = () => {
    // Redirect to success page after payment completion
    router.push('/stripe/success')
  }

  const handleBackToCart = () => {
    setShowCheckout(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stripe Embedded Checkout Demo
          </h1>
          <p className="text-lg text-gray-600">
            Experience seamless embedded checkout - no redirects needed
          </p>
        </div>

        {!showCheckout ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <CartPreview 
              products={demoProducts} 
              totalAmount={totalAmount}
            />
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Initializing Checkout...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>🔒</span>
                    <span>Proceed to Secure Checkout</span>
                  </div>
                )}
              </button>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Powered by Stripe • Your payment information is secure
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToCart}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>←</span>
                <span>Back to Cart</span>
              </button>
              <div className="text-sm text-gray-600">
                Total: ${(totalAmount / 100).toFixed(2)}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {clientSecret && (
                <EmbeddedCheckout 
                  clientSecret={clientSecret}
                  onComplete={handleCheckoutComplete}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}