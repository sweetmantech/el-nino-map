import { CollectionMetadata, getMetadata } from '@/lib/viem/getMetadata'
import getBalancesUris from '@/lib/viem/getBalancesUris'
import { fetchZoraPostsData } from '@/lib/zora/getZoraPosts'
import { useQuery } from '@tanstack/react-query'
import { useActiveAccount } from 'thirdweb/react'
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
export type FormattedZoraPost = ZoraPost & {
  contractURI: string
  uri: string
  balance: bigint
}

async function fetchPosts(address: Address | undefined): Promise<CollectionMetadata[]> {
  try {
    // const response = await fetch('/api/posts/zora')
    // const zoraPosts = await response.json()
    const zoraPosts = await fetchZoraPostsData()
    const ownedNfts = await getBalancesUris(address, zoraPosts)
    const filtered = ownedNfts.filter((nft) => nft.balance !== BigInt(0))
    const aggregated = {}

    for (const item of filtered) {
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
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address

  return useQuery({
    queryKey: ['posts', address],
    queryFn: () => fetchPosts(address),
    staleTime: 1000 * 60 * 5,
    enabled: !!address,
    refetchOnMount: true,
  })
}

export default usePosts
