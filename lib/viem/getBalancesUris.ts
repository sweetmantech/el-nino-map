import { FormattedZoraPost, ZoraPost } from '../../hooks/usePosts'
import { getPublicClient } from '../clients'
import { Address } from 'viem'
import getIpfsLink from '../getIpfsLink'
import abi from '@/lib/abi/1155'

const createCalls = (tokens: ZoraPost[], functionName: string, address?: Address) => {
  return tokens.map((t: ZoraPost) => {
    const call: { address: string; abi: typeof abi; functionName: string; args?: any[] } = {
      address: t.tokenContract,
      abi,
      functionName,
    }
    if (functionName === 'balanceOf') {
      call.args = [address, t.tokenId]
    } else if (functionName === 'uri') {
      call.args = [t.tokenId]
    }
    return call
  })
}

const getBalancesUris = async (
  address: Address,
  tokens: ZoraPost[],
): Promise<FormattedZoraPost[]> => {
  const grouped = tokens.reduce((acc: { [chainId: number]: ZoraPost[] }, item: ZoraPost) => {
    if (!acc[item.chainId]) {
      acc[item.chainId] = []
    }
    acc[item.chainId].push(item)
    return acc
  }, {})

  const promise = Object.entries(grouped).map(async ([chainId, tokens]) => {
    const publicClient: any = getPublicClient(parseInt(chainId, 10))
    const contractUriCalls = createCalls(tokens, 'contractURI')
    const balanceCalls = createCalls(tokens, 'balanceOf', address)
    const uriCalls = createCalls(tokens, 'uri')

    try {
      const [contractURIResults, balanceResults, uriResults] = await Promise.all([
        publicClient.multicall({ contracts: contractUriCalls }),
        publicClient.multicall({ contracts: balanceCalls }),
        publicClient.multicall({ contracts: uriCalls }),
      ])

      return tokens.map((t: ZoraPost, i) => {
        const contractURI =
          typeof contractURIResults?.[i]?.result === 'string' ? contractURIResults[i].result : ''
        const uri = typeof uriResults?.[i]?.result === 'string' ? uriResults[i].result : ''
        const balance =
          typeof balanceResults?.[i]?.result === 'bigint' ? balanceResults[i].result : BigInt(0)

        return {
          ...t,
          contractURI: getIpfsLink(contractURI),
          uri: getIpfsLink(uri),
          balance,
        }
      })
    } catch (error) {
      console.error(`Error fetching data for chainId ${chainId}:`, error)
      return tokens.map((t) => ({ ...t, contractURI: '', uri: '', balance: BigInt(0) }))
    }
  })

  const nftsBalanceAndUri = await Promise.all(promise)
  return nftsBalanceAndUri.flat()
}

export default getBalancesUris
