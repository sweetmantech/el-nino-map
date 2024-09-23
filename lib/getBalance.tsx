import { getPublicClient } from './clients'
import { CHAIN_ID } from './consts'
import { Address, formatEther } from 'viem'

const getBalance = async (address: Address) => {
  const publicClient = getPublicClient(CHAIN_ID)

  const balance = await publicClient.getBalance({
    address,
  })

  return parseFloat(formatEther(balance))
}

export default getBalance
