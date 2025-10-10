import { useQuery } from '@tanstack/react-query'

interface CreateCheckoutResponse {
  clientSecret: string | null
}

/**
 * Custom hook to create a Stripe checkout session
 *
 * @returns Query result with client secret for embedded checkout
 */
export const useStripeCheckout = () => {
  return useQuery<CreateCheckoutResponse>({
    queryKey: ['stripe-checkout-session'],
    queryFn: async () => {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      return response.json()
    },
    staleTime: Infinity, // Never refetch automatically
    retry: 3,
  })
}
