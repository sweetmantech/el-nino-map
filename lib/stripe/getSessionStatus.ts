import Stripe from 'stripe'
import { stripe } from './server'

/**
 * Retrieves a Stripe Checkout Session
 *
 * @param sessionId - The Stripe checkout session ID
 * @param params - Optional parameters for retrieving the session (e.g., expand options)
 * @returns Full Stripe Checkout Session object
 */
export const getSessionStatus = async (
  sessionId: string,
  params?: Stripe.Checkout.SessionRetrieveParams,
): Promise<Stripe.Checkout.Session> => {
  if (!sessionId) {
    throw new Error('Session ID is required')
  }

  return await stripe.checkout.sessions.retrieve(sessionId, params)
}
