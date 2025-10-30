import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe/createCheckoutSession'

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin') || ''
    const body = await req.json()
    const { recipient } = body
    if (!recipient) {
      return NextResponse.json({ error: 'Recipient is required' }, { status: 400 })
    }
    const session = await createCheckoutSession({
      return_url: `${origin}/stripe/return?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        recipient,
      },
    })

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
