/**
 * Validates required server-side Stripe environment variables
 *
 * @throws Error if required environment variables are missing
 */
export const validateServerStripeConfig = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable')
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable')
  }
}

/**
 * Validates required client-side Stripe environment variables
 *
 * @throws Error if required environment variables are missing
 */
export const validateClientStripeConfig = () => {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable')
  }
}
