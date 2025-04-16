import { Address } from 'viem'
import getZoraBalances from './getZoraBalances'

const getZoraPosts = async (address: Address) => {
  const response = await fetch(`/api/posts/zora`)

  const createdContracts = await response.json()
  const collectionsAndBalances = await getZoraBalances(address, createdContracts)
  const filtered = collectionsAndBalances.filter((c) =>
    c.batchBalances.flat().some((b) => BigInt(b) > BigInt(0)),
  )

  return filtered
}

export default getZoraPosts
