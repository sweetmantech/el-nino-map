'use client'

import StripeCheckout from './StripeCheckout'
import { useActiveAccount } from 'thirdweb/react'

const StripePage = () => {
  const activeAccount = useActiveAccount()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-8">
        {activeAccount?.address ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
              <p className="text-gray-600">Secure checkout powered by Stripe</p>
            </div>
            <StripeCheckout />
          </>
        ) : (
          <p>Please explore your wallet</p>
        )}
      </div>
    </div>
  )
}

export default StripePage
