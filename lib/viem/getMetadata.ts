import { ZoraPost } from '@/hooks/usePosts'
import { Address } from 'viem'
import { getPublicClient } from '../clients'
import getIpfsLink from '../getIpfsLink'

export interface CollectionMetadata {
  image: string
  name: string
  description: string
  chainId: number
  tokenContract: Address
}

const abi = [
  {
    inputs: [],
    name: 'contractURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export async function getMetadata(posts: ZoraPost[]): Promise<CollectionMetadata[]> {
  try {
    const promise = posts.map(async (p: ZoraPost) => {
      try {
        const publicClient = getPublicClient(p.chainId)

        const uri = await publicClient.readContract({
          address: p.tokenContract,
          abi,
          functionName: 'contractURI',
          args: [],
        })
        if (!uri)
          return {
            image: p.preview,
            name: p.name,
            description: '',
            chainId: p.chainId,
            tokenContract: p.tokenContract,
          }
        const response = await fetch(getIpfsLink(uri as string))
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
    console.error('Error fetching tokens:', error)
    return []
  }
}
