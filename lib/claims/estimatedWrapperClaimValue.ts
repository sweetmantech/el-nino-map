import { Address } from 'thirdweb'
import { MANIFOLD_FEE, CHAIN_ID, WRAPPER_ADAPTER, FALLBACK_WRAPPER_SWAP_AMOUNT } from '@/lib/consts'
import useClaimInfo from '@/hooks/useClaimInfo'
import getWrapperClaimArgs from '@/lib/claims/getWrapperClaimArgs'
import getPoolInfo from '@/lib/getPoolInfo'
import { getPublicClient } from '@/lib/clients'
import { wrapperAbi } from '@/lib/abi/wrapperAbi'

const estimatedWrapperClaimValue = async (
  claimInfo: ReturnType<typeof useClaimInfo>,
  accountAddress: Address,
) => {
  const manifoldFee = MANIFOLD_FEE * BigInt(claimInfo.amount)
  const poolInfo = await getPoolInfo(accountAddress, BigInt(claimInfo.price))
  const calculatedValue = manifoldFee + poolInfo.amountInMaximum * BigInt(claimInfo.amount)

  const claimArgs = getWrapperClaimArgs(claimInfo, accountAddress)
  const publicClient = getPublicClient(CHAIN_ID)

  try {
    await publicClient.simulateContract({
      address: WRAPPER_ADAPTER,
      abi: wrapperAbi,
      functionName: 'mint',
      args: claimArgs,
      value: calculatedValue,
      account: accountAddress,
    })
    return calculatedValue
  } catch (error) {
    return FALLBACK_WRAPPER_SWAP_AMOUNT
  }
}

export default estimatedWrapperClaimValue
