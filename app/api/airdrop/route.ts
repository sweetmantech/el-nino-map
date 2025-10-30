import { NextRequest, NextResponse } from 'next/server'
import getCorsHeader from '@/lib/getCorsHeader'
import { stripe } from '@/lib/stripe/server'
import airdrop from '@/lib/coinbase/airdrop'
import { STRIPE_ENDPOINT_SECRET } from '@/lib/consts'
import { Address } from 'thirdweb'
import sendEmail from '@/lib/sendEmail'

// CORS headers for allowing cross-origin requests
const corsHeaders = getCorsHeader()

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')
    if (!signature) {
      return NextResponse.json({ error: 'Stripe signature is required' }, { status: 400 })
    }
    const event = stripe.webhooks.constructEvent(body, signature, STRIPE_ENDPOINT_SECRET)
    if (
      event.type === 'checkout.session.completed' &&
      event.data.object.payment_status === 'paid'
    ) {
      const email = event.data.object.customer_details?.email
      const { hash } = await airdrop(event.data.object.metadata?.recipient as Address)
      if (email) {
        await sendEmail({
          to: email,
          hash,
        })
      }
      return NextResponse.json(
        {
          message: 'Email sent',
        },
        { status: 200 },
      )
    }
    return NextResponse.json(
      {
        message: event.type,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0
