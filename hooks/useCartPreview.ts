import { demoProducts } from '@/lib/stripe'

export function useCartPreview() {
  // For demo purposes, we'll show all products in cart
  const items = demoProducts
  
  const total = items.reduce((sum, item) => sum + item.price, 0)
  const currency = 'usd'

  return {
    items,
    total,
    currency
  }
}