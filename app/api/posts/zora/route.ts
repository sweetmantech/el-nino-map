import { fetchZoraPostsData } from '@/lib/zora/getZoraPosts'

export async function GET() {
  try {
    const posts = await fetchZoraPostsData()

    Response.json(posts)
  } catch (e: any) {
    console.log(e)
    const message = e?.message ?? 'failed to fetch posts'
    return Response.json({ message }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0
