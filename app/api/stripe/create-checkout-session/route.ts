import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_demo', {
  apiVersion: '2025-09-30.clover',
})

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items' },
        { status: 400 }
      )
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity || 1,
    }))

    // Create Stripe embedded checkout session
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      return_url: `${request.nextUrl.origin}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        demo: 'true'
      }
    })

    return NextResponse.json({ 
      sessionId: session.id,
      clientSecret: session.client_secret 
    })
  } catch (error) {
    console.error('Stripe checkout session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}