import { NextRequest, NextResponse } from 'next/server'
import getCorsHeader from '@/lib/getCorsHeader'
import { stripe } from '@/lib/stripe/server'
import airdrop from '@/lib/coinbase/airdrop'
import { STRIPE_ENDPOINT_SECRET } from '@/lib/consts'
import { Address } from 'thirdweb'

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
    const event = stripe.webhooks.constructEvent(body, signature, STRIPE_ENDPOINT_SECRET)
    if (event.type === 'payment_intent.succeeded') {
      const hash = await airdrop(event.data.object.metadata.recipient as Address)
      return NextResponse.json(
        {
          transactionHash: hash,
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
