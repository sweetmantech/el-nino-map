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
    const grouped = posts.reduce((acc: { [chainId: number]: ZoraPost[] }, item: ZoraPost) => {
      if (!acc[item.chainId]) {
        acc[item.chainId] = []
      }
      acc[item.chainId].push(item)
      return acc
    }, {})

    const uriPromise = Object.entries(grouped).map(async ([chainId, collections]) => {
      const publicClient: any = getPublicClient(parseInt(chainId, 10))
      const calls = collections.map((c: ZoraPost) => {
        return {
          address: c.tokenContract,
          abi,
          functionName: 'contractURI',
        }
      })
      const returnValues = await publicClient.multicall({
        contracts: calls,
      })
      return collections.map((c: ZoraPost, i) => {
        const uri = typeof returnValues?.[i]?.result === 'string' ? returnValues[i].result : ''
        return {
          ...c,
          uri: getIpfsLink(uri),
        }
      })
    })

    const postsUris = await Promise.all(uriPromise)

    const promise = postsUris.flat().map(async (p: any) => {
      try {
        if (!p.uri)
          return {
            image: p.preview,
            name: p.name,
            description: '',
            chainId: p.chainId,
            tokenContract: p.tokenContract,
          }
        const response = await fetch(getIpfsLink(p.uri as string))
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
