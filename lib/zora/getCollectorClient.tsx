import { createCollectorClient } from '@zoralabs/protocol-sdk'
import { CHAIN_ID } from '../consts'
import { getPublicClient } from '../clients'

const getCollectorClient = () => {
  const publicClient = getPublicClient(CHAIN_ID)
  const collectorClient = createCollectorClient({
    chainId: CHAIN_ID,
    publicClient,
  })

  return collectorClient
}

export default getCollectorClient
