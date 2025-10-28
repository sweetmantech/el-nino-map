import Stripe from 'stripe'
import { validateServerStripeConfig } from './validateStripeConfig'

// Validate environment variables on module load
validateServerStripeConfig()

// Server-side Stripe instance
// This should only be used in API routes and server components
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion,
})
