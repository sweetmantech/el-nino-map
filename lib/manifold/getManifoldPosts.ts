import getManifoldBalances from './getManifoldBalances'
import { Address } from 'viem'

const getManifoldPosts = async (address: Address) => {
  const response = await fetch(`/api/posts/manifold`)
  const createdTokens = await response.json()
  const tokensAndBalances = await getManifoldBalances(address, createdTokens)
  const filtered = tokensAndBalances.filter((c) => c.balance > BigInt(0))
  return filtered
}

export default getManifoldPosts
