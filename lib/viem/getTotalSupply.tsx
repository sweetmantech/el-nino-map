import { erc721Abi } from 'viem'
import { getPublicClient } from '../clients'
import { CHAIN_ID } from '../consts'
import { type Address } from 'viem'

const getTotalSupply = async (dropAddress) => {
  const response = await getPublicClient(CHAIN_ID).readContract({
    address: dropAddress as Address,
    abi: erc721Abi,
    functionName: 'totalSupply',
  } as any)
  return response
}

export default getTotalSupply
