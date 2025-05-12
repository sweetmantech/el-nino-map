import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  try {
    if (!url) throw Error('url is invalid.')
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer sk_gfb7567odeiow27ucuzndu8j4uzyp07j',
        'Content-Type': 'application/json',
      },
      body: `{"link":"${decodeURIComponent(url)}","source":"API","forceNewSnapshot":"true","forceNewSnapshotRecursive":"true"}`,
    }

    const response = await fetch('https://api.peekalink.io/', options)
    const data = await response.json()
    return Response.json(data)
  } catch (e: any) {
    console.log(e)
    const message = e?.message ?? 'failed to get link preview.'
    return Response.json({ message }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0
