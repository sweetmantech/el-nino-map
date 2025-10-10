import { loadStripe } from '@stripe/stripe-js'

// Demo public key - in production, use environment variables
export const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo'

// Initialize Stripe
export const getStripe = () => {
  return loadStripe(stripePublishableKey)
}

// Demo product data
export const demoProducts = [
  {
    id: 'prod_1',
    name: 'Premium Subscription',
    description: 'Get access to all premium features',
    price: 2999, // $29.99 in cents
    currency: 'usd',
    image: '/images/premium-product.png'
  },
  {
    id: 'prod_2', 
    name: 'Basic Plan',
    description: 'Essential features for getting started',
    price: 999, // $9.99 in cents
    currency: 'usd',
    image: '/images/basic-product.png'
  }
]