import getManifoldPosts from '@/lib/manifold/getManifoldPosts'
import { CollectionMetadata, getMetadata } from '@/lib/viem/getMetadata'
import getZoraPosts from '@/lib/zora/getZoraPosts'
import { useQuery } from '@tanstack/react-query'
import { useActiveAccount } from 'thirdweb/react'
import { type Address } from 'viem'

async function fetchPosts(address: Address | undefined): Promise<CollectionMetadata[]> {
  try {
    if (!address) return []
    const zoraCreatedPosts = await getZoraPosts(address)
    const manifoldCreatedPosts = await getManifoldPosts(address)
    const metadata = await getMetadata([...zoraCreatedPosts, ...manifoldCreatedPosts])
    return metadata
  } catch (error) {
    throw new Error('Failed to fetch posts.')
  }
}

const usePosts = () => {
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address

  return useQuery({
    queryKey: ['posts', address],
    queryFn: () => fetchPosts(address as Address),
    refetchOnMount: true,
  })
}

export default usePosts
