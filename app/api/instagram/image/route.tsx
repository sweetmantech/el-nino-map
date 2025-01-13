import { NextRequest } from 'next/server'
import * as cheerio from 'cheerio'

export async function GET(req: NextRequest) {
  const postURL = req.nextUrl.searchParams.get('postURL')

  try {
    const response = await fetch(postURL)
    const htmlText = await response.text()
    const $ = cheerio.load(htmlText)

    const children = $("[class*='_aagv']").children()

    const images = []
    children.each((i, element) => {
      const image = $('img', element)
      images.push(image.html())
    })

    return Response.json({ success: true, images }, { status: 200 })
  } catch (error) {
    console.error(error)
    const message = error instanceof Error ? error.message : 'failed'
    return Response.json({ message }, { status: 400 })
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0
