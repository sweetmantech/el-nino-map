import { FormattedZoraPost } from '@/hooks/usePosts'
import { Address } from 'viem'
import getIpfsLink from '../getIpfsLink'

export interface CollectionMetadata {
  image: string
  name: string
  description: string
  chainId: number
  tokenContract: Address
}

export async function getMetadata(posts: FormattedZoraPost[]): Promise<CollectionMetadata[]> {
  try {
    const promise = posts.map(async (p: FormattedZoraPost) => {
      try {
        if (!p.uri)
          return {
            image: p.preview,
            name: p.name,
            description: '',
            chainId: p.chainId,
            tokenContract: p.tokenContract,
          }
        const response = await fetch(
          `/api/metadata?uri=${encodeURIComponent(p.contractURI as string)}`,
        )
        const data = await response.json()
        return {
          image: getIpfsLink(data?.image || ''),
          description: data?.description || '',
          name: data?.name || '',
          chainId: p.chainId,
          tokenContract: p.tokenContract,
        }
      } catch (error) {
        return {
          image: p.preview,
          name: p.name,
          description: '',
          chainId: p.chainId,
          tokenContract: p.tokenContract,
        }
      }
    })

    const metadata = await Promise.all(promise)
    return metadata
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}
