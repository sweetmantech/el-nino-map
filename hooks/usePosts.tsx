import { CollectionMetadata, getMetadata } from '@/lib/viem/getMetadata'
import { fetchZoraPostsData } from '@/lib/zora/getZoraPosts'
import { useQuery } from '@tanstack/react-query'
import { Address } from 'viem'

export type ZoraPost = {
  tokenContract: Address
  chainId: number
  media: string
  tokenId: string
  name: string
  mimeType: string
  blurhash: string
  preview: string
}
async function fetchPosts(): Promise<CollectionMetadata[]> {
  try {
    // const response = await fetch('/api/posts/zora')
    // const zoraPosts = await response.json()
    const zoraPosts = await fetchZoraPostsData()
    const aggregated = {}

    for (const item of zoraPosts) {
      const tokenContract = item.tokenContract
      if (!aggregated[tokenContract]) aggregated[tokenContract] = item
    }

    const metadata = await getMetadata(Object.values(aggregated))
    return metadata
  } catch (error) {
    throw new Error('Failed to fetch zora posts.')
  }
}

const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
  })
}

export default usePosts
