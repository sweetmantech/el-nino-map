import { Address } from 'viem'
import getIpfsLink from '../getIpfsLink'

export interface CollectionMetadata {
  image: string
  name: string
  description: string
  chainId: number
  tokenContract: Address
}

export async function getMetadata(collections): Promise<CollectionMetadata[]> {
  try {
    const promise = collections.map(async (c) => {
      try {
        const response = await fetch(
          `/api/metadata?uri=${encodeURIComponent(c.contractURI || c.uri)}`,
        )
        const data = await response.json()
        return {
          image: getIpfsLink(data?.image || ''),
          name: (data?.name as string) || '',
          description: data?.description || '',
          chainId: c.chainId,
          tokenContract: c.newContract,
        }
      } catch (error) {
        return null
      }
    })
    const metadata = await Promise.all(promise)
    return metadata.filter((m) => m)
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}
