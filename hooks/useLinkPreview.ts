import { useQuery } from '@tanstack/react-query'

export interface LinkPreview {
  id: number
  ok: boolean
  url: string
  domain: string
  type: string
  status: number
  updatedAt: string
  size: number
  redirected: boolean
  title: string
  description: string
  icon: {
    url: string
    width: number
    height: number
    backgroundColor: string
  }
  image: {
    id: number
    thumbnail: {
      url: string
      width: number
      height: number
    }
    medium: {
      url: string
      width: number
      height: number
    }
    large: {
      url: string
      width: number
      height: number
    }
    original: {
      url: string
      width: number
      height: number
    }
  }
  page: {
    size: number
    estimatedReadingTimeInMinutes: 1
    htmlUrl: string
    markdownUrl: string
    rawTextUrl: string
    screenshot: {
      thumbnail: {
        url: string
        width: number
        height: number
      }
      medium: {
        url: string
        width: number
        height: number
      }
      large: {
        url: string
        width: number
        height: number
      }
      original: {
        url: string
        width: number
        height: number
      }
    }
  }
  requestId: string
}

async function fetchLinkPreview(link: string): Promise<LinkPreview> {
  const response = await fetch(`/api/link/get_detail?url=${encodeURIComponent(link)}`)
  if (!response.ok) throw Error('failed to get link preview.')

  const data = await response.json()
  return data
}

const useLinkPreview = (link: string) => {
  return useQuery({
    queryKey: ['link_preview', link],
    queryFn: () => fetchLinkPreview(link),
    staleTime: 1000 * 60 * 5,
    enabled: !!link,
    refetchOnMount: true,
  })
}

export default useLinkPreview
