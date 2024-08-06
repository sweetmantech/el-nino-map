import { Chain, PublicClient, createPublicClient, http } from 'viem'
import getViemNetwork from '../viem/getViemNetwork'

export const getPublicClient = (chainId: number) => {
  const chain = getViemNetwork(chainId)
  let publicClient = createPublicClient({
    chain: chain as Chain,
    transport: http(),
  }) as any
  return publicClient as PublicClient
}
