import Stripe from 'stripe'
import { stripe } from './server'
import { STRIPE_CONFIG } from './config'

/**
 * Creates a Stripe Checkout Session for embedded checkout
 *
 * @param params - Stripe checkout session creation parameters
 * @returns Stripe Checkout Session
 */
export const createCheckoutSession = async (
  params: Stripe.Checkout.SessionCreateParams,
): Promise<Stripe.Checkout.Session> => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        price: STRIPE_CONFIG.DEFAULT_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: STRIPE_CONFIG.MODE,
    ...params,
  })

  return session
}
