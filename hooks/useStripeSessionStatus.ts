import { useQuery } from '@tanstack/react-query'
import Stripe from 'stripe'

/**
 * Custom hook to fetch Stripe checkout session status
 *
 * @param sessionId - The Stripe checkout session ID
 * @returns Query result with full Stripe checkout session
 */
export const useStripeSessionStatus = (sessionId: string | null) => {
  return useQuery<Stripe.Checkout.Session>({
    queryKey: ['stripe-session-status', sessionId],
    queryFn: async () => {
      if (!sessionId) {
        throw new Error('Session ID is required')
      }

      const response = await fetch(`/api/stripe/session-status?session_id=${sessionId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch session status')
      }

      return response.json()
    },
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  })
}
