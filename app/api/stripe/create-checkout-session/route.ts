import { NextRequest, NextResponse } from 'next/server'
import { validateStripeConfig } from '@/lib/stripe/validateStripeConfig'
import { createCheckoutSession } from '@/lib/stripe/createCheckoutSession'

export async function POST(req: NextRequest) {
  try {
    validateStripeConfig()

    const origin = req.headers.get('origin') || ''
    const session = await createCheckoutSession({
      return_url: `${origin}/stripe/return?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
