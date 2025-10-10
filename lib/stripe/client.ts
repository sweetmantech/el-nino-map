import { loadStripe, Stripe } from '@stripe/stripe-js'
import { validateStripeConfig } from './validateStripeConfig'

// Client-side Stripe instance
// This should only be used in client components
let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    validateStripeConfig()
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

