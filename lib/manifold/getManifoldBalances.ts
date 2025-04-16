import { getPublicClient } from '../clients'
import { Address } from 'viem'
import { Token } from '@/types/inventory'

const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'uri',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
const getManifoldBalances = async (address: Address, contracts: Token[]) => {
  try {
    const grouped = contracts.reduce((acc: { [chainId: number]: Token[] }, item: Token) => {
      if (!acc[item.chainId]) {
        acc[item.chainId] = []
      }
      acc[item.chainId].push(item)
      return acc
    }, {})

    const promise = Object.entries(grouped).map(async ([chainId, tokens]) => {
      const publicClient: any = getPublicClient(parseInt(chainId, 10))
      const balanceCalls = tokens.map((t: Token) => {
        return {
          address: t.tokenContract,
          abi,
          functionName: 'balanceOf',
          args: [address, t.tokenId],
        }
      })
      const uriCalls = tokens.map((t: Token) => {
        return {
          address: t.tokenContract,
          abi,
          functionName: 'balanceOf',
          args: [address, t.tokenId],
        }
      })
      const balanceCallsResults = await publicClient.multicall({ contracts: balanceCalls })
      const uriCallsResults = await publicClient.multicall({ contracts: uriCalls })
      return tokens.map((t: Token, i) => ({
        ...t,
        balance: balanceCallsResults[i].result as bigint,
        uri: uriCallsResults[i].result as string,
      }))
    })
    const tokens = await Promise.all(promise)
    return tokens.flat()
  } catch (error) {
    return []
  }
}

export default getManifoldBalances
