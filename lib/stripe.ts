import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'

// Client-side Stripe instance
export const getStripe = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  if (!publishableKey) {
    console.warn('Stripe publishable key not found')
    return null
  }
  return loadStripe(publishableKey)
}

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

// Demo products for the cart
export const demoProducts = [
  {
    id: 'demo-1',
    name: 'Premium T-Shirt',
    description: 'High-quality cotton t-shirt with custom design',
    price: 2999, // $29.99 in cents
    image: '/images/tshirt.jpg',
    quantity: 1,
  },
  {
    id: 'demo-2',
    name: 'Coffee Mug',
    description: 'Ceramic mug perfect for your morning coffee',
    price: 1599, // $15.99 in cents
    image: '/images/mug.jpg',
    quantity: 2,
  },
]

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100)
}