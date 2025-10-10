import { loadStripe } from '@stripe/stripe-js'

// Demo public key - in production, use environment variables
export const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo'

// Initialize Stripe
export const getStripe = () => {
  return loadStripe(stripePublishableKey)
}
