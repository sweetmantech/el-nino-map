import { CollectionMetadata, getMetadata } from '@/lib/viem/getMetadata'
import getBalances from '@/lib/viem/getBalances'
import { useQuery } from '@tanstack/react-query'
import { useActiveAccount } from 'thirdweb/react'
import { Address } from 'viem'

export type CreatedContract = {
  newContract: Address
  chainId: number
  name: string
  contractURI: string
  nextTokenId: bigint
  batchBalances: bigint[]
}

async function fetchPosts(address: Address | undefined): Promise<CollectionMetadata[]> {
  try {
    if (!address) return []
    const response = await fetch(`/api/posts/zora`)
    const zoraCreatedContracts = await response.json()
    const collectionsAndBalances = await getBalances(address, zoraCreatedContracts)
    const filtered = collectionsAndBalances.filter((c) =>
      c.batchBalances.flat().some((b) => BigInt(b) > BigInt(0)),
    )
    const metadata = await getMetadata(filtered)
    return metadata
  } catch (error) {
    throw new Error('Failed to fetch zora posts.')
  }
}

const usePosts = () => {
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address

  console.log('ziad', address)
  return useQuery({
    queryKey: ['posts', address],
    queryFn: () => fetchPosts(address),
    refetchOnMount: true,
  })
}

export default usePosts
