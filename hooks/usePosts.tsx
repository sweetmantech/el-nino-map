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
async function fetchPosts(): Promise<ZoraPost[]> {
  try {
    const zoraPosts = await fetchZoraPostsData()
    return zoraPosts
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
