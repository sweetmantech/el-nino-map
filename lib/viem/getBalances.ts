import { CreatedContract } from '../../hooks/usePosts'
import { getPublicClient } from '../clients'
import { Address } from 'viem'
import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments'

const createCalls = (collections: CreatedContract[], functionName: string) => {
  return collections.map((c: CreatedContract) => {
    const call: {
      address: string
      abi: typeof zoraCreator1155ImplABI
      functionName: string
      args?: any[]
    } = {
      address: c.newContract,
      abi: zoraCreator1155ImplABI,
      functionName,
    }
    return call
  })
}

const getBalances = async (
  address: Address,
  contracts: CreatedContract[],
): Promise<CreatedContract[]> => {
  try {
    const grouped = contracts.reduce(
      (acc: { [chainId: number]: CreatedContract[] }, item: CreatedContract) => {
        if (!acc[item.chainId]) {
          acc[item.chainId] = []
        }
        acc[item.chainId].push(item)
        return acc
      },
      {},
    )

    const promise = Object.entries(grouped).map(async ([chainId, collections]) => {
      const publicClient: any = getPublicClient(parseInt(chainId, 10))
      const nextTokenIdCalls = createCalls(collections, 'nextTokenId')
      const nextTokenIdResults = await publicClient.multicall({ contracts: nextTokenIdCalls })

      const balanceCalls = collections.map((c: CreatedContract, i) => {
        const nextTokenId =
          typeof nextTokenIdResults?.[i]?.result === 'bigint'
            ? nextTokenIdResults[i].result
            : BigInt(0)
        return {
          address: c.newContract,
          abi: zoraCreator1155ImplABI,
          functionName: 'balanceOfBatch',
          args: [
            Array.from({ length: Number(nextTokenId) })
              .slice(1)
              .map(() => address),
            Array.from({ length: Number(nextTokenId) })
              .slice(1)
              .map((_, index) => index + 1),
          ],
        }
      })

      const batchBalanceResults = await publicClient.multicall({ contracts: balanceCalls })
      return collections.map((c: CreatedContract) => ({
        ...c,
        batchBalances: batchBalanceResults.map((r) => (r?.result as bigint[]) || []),
      }))
    })
    const collections = await Promise.all(promise)
    return collections.flat()
  } catch (error) {
    return []
  }
}

export default getBalances
