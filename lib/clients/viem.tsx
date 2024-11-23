import { Chain, PublicClient, createPublicClient, http } from 'viem'
import getViemNetwork from '../viem/getViemNetwork'
import getRpcUrl from '../viem/getRpcUrl'

export const getPublicClient = (chainId: number) => {
  const chain = getViemNetwork(chainId)
  const rpcUrl = getRpcUrl(chain.id)

  const publicClient = createPublicClient({
    chain: chain as Chain,
    transport: http(rpcUrl ?? undefined),
  }) as any
  return publicClient as PublicClient
}
