import { NextRequest, NextResponse } from 'next/server'
import { getSessionStatus } from '@/lib/stripe/getSessionStatus'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    const session = await getSessionStatus(sessionId)

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email,
    })
  } catch (error: any) {
    console.error('Error retrieving session status:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
