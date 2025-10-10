// Stripe configuration
export const STRIPE_CONFIG = {
  // Replace this with your actual Stripe Price ID
  // Get it from: https://dashboard.stripe.com/prices
  DEFAULT_PRICE_ID: 'price_1SGl8HPLDfY9BlZnwAGyyqGE',

  // Payment mode: 'payment' for one-time, 'subscription' for recurring
  MODE: 'payment' as const,

  // Currency (optional, defaults to your Stripe account currency)
  // CURRENCY: 'usd',
}

// Validate environment variables
export const validateStripeConfig = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable')
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable')
  }
}
