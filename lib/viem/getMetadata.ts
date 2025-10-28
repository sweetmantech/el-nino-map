import { Address } from 'viem'
import getIpfsLink from '../getIpfsLink'
import { ZoraCreatedContract, Token } from '@/types/inventory'

export interface CollectionMetadata {
  image: string
  name: string
  description: string
  chainId: number
  tokenContract: Address
}

type CollectionWithBalance =
  | (ZoraCreatedContract & { batchBalances: bigint[][] })
  | (Token & { balance: bigint; uri: string })

export async function getMetadata(
  collections: CollectionWithBalance[],
): Promise<CollectionMetadata[]> {
  try {
    const promise = collections.map(async (c) => {
      try {
        const uri = 'contractURI' in c ? c.contractURI : c.uri
        const tokenContract = 'newContract' in c ? c.newContract : c.tokenContract

        const response = await fetch(`/api/metadata?uri=${encodeURIComponent(uri)}`)
        const data = await response.json()
        return {
          image: getIpfsLink(data?.image || ''),
          name: (data?.name as string) || '',
          description: (data?.description as string) || '',
          chainId: c.chainId,
          tokenContract: tokenContract,
        }
      } catch (error) {
        return null
      }
    })
    const metadata = await Promise.all(promise)
    return metadata.filter((m): m is CollectionMetadata => m !== null)
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}
