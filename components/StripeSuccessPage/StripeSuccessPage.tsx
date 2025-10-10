import Link from 'next/link'

export default function StripeSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-2">
            Thank you for your purchase. Your payment has been processed successfully using Stripe's embedded checkout.
          </p>
          
          <p className="text-sm text-gray-500 mb-8">
            You stayed on our site throughout the entire payment process - no redirects needed!
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/stripe" 
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Try Embedded Checkout Again
            </Link>
            
            <Link 
              href="/" 
              className="block w-full border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}