import { loadStripe, Stripe } from '@stripe/stripe-js'

// Client-side Stripe instance
// This should only be used in client components
let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable')
    }
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

