import { useQuery } from '@tanstack/react-query'
import { useActiveAccount } from 'thirdweb/react'

interface CreateCheckoutResponse {
  clientSecret: string | null
}

/**
 * Custom hook to create a Stripe checkout session
 *
 * @returns Query result with client secret for embedded checkout
 */
export const useStripeCheckout = () => {
  const activeAccount = useActiveAccount()

  return useQuery<CreateCheckoutResponse>({
    queryKey: ['stripe-checkout-session'],
    queryFn: async () => {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        body: JSON.stringify({
          recipient: activeAccount?.address,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      return response.json()
    },
    staleTime: Infinity, // Never refetch automatically
    retry: 3,
    enabled: Boolean(activeAccount?.address),
  })
}
