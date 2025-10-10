import Stripe from 'stripe'

// Server-side Stripe instance
// This should only be used in API routes and server components
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

// Helper function to get Stripe instance with validation
export const getStripeInstance = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable')
  }
  return stripe
}

