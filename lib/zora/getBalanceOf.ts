import { getPublicClient } from '../clients'
import { DROP_ADDRESS, CHAIN_ID } from '../consts'
import { Address } from 'viem'
import { erc1155Abi } from '../abi/erc1155Abi'

const getBalanceOf = async (address: Address, tokenId: bigint = BigInt(1)) => {
  try {
    const publicClient = getPublicClient(CHAIN_ID)
    const balance = await publicClient.readContract({
      address: DROP_ADDRESS as Address,
      abi: erc1155Abi,
      functionName: 'balanceOf',
      args: [address, tokenId],
    })
    return balance as bigint
  } catch (error) {
    return BigInt(0)
  }
}

export default getBalanceOf
