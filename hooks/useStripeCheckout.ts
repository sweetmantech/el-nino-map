import { useMutation } from '@tanstack/react-query'

interface CreateCheckoutResponse {
  clientSecret: string | null
}

/**
 * Custom hook to create a Stripe checkout session
 *
 * @returns Mutation result with client secret for embedded checkout
 */
export const useStripeCheckout = () => {
  return useMutation<CreateCheckoutResponse, Error>({
    mutationFn: async () => {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      return response.json()
    },
  })
}
