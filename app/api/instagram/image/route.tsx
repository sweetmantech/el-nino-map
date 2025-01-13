import { NextRequest } from 'next/server'
import * as cheerio from 'cheerio'

export async function GET(req: NextRequest) {
  const postURL = req.nextUrl.searchParams.get('postURL')

  try {
    const response = await fetch(`${postURL}?img_index=1`)
    const htmlText = await response.text()
    const $ = cheerio.load(htmlText)

    const images = []
    $('img').each((_, element) => {
      const src = $(element).attr('src')
      if (src) {
        images.push(src)
      }
    })

    return Response.json({ success: true, images, postURL }, { status: 200 })
  } catch (error) {
    console.error(error)
    const message = error instanceof Error ? error.message : 'failed'
    return Response.json({ message }, { status: 400 })
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0
