export * from './config'

// Format price utility
export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`
}

// Demo products with quantity for existing component
export const demoProducts = [
  {
    id: 'prod_1',
    name: 'Premium Subscription',
    description: 'Get access to all premium features',
    price: 2999, // $29.99 in cents
    quantity: 1,
    currency: 'usd',
    image: '/images/premium-product.png'
  },
  {
    id: 'prod_2', 
    name: 'Basic Plan',
    description: 'Essential features for getting started',
    price: 999, // $9.99 in cents
    quantity: 1,
    currency: 'usd',
    image: '/images/basic-product.png'
  }
]