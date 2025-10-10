import { useQuery } from '@tanstack/react-query'

interface SessionStatusResponse {
  status: string | null
  customer_email: string | null
}

/**
 * Custom hook to fetch Stripe checkout session status
 *
 * @param sessionId - The Stripe checkout session ID
 * @returns Query result with session status and customer email
 */
export const useStripeSessionStatus = (sessionId: string | null) => {
  return useQuery<SessionStatusResponse>({
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
