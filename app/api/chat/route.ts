import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const response = await fetch('https://chat.recoupable.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    // Stream the response body and forward headers
    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        // You can forward more headers if needed
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}