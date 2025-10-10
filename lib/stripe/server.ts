import Stripe from 'stripe'
import { validateStripeConfig } from './validateStripeConfig'

// Validate environment variables on module load
validateStripeConfig()

// Server-side Stripe instance
// This should only be used in API routes and server components
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

