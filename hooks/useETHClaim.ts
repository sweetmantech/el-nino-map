import { Address, prepareContractCall, sendTransaction } from 'thirdweb'
import useClaimInfo from './useClaimInfo'
import { CHAIN_ID, MANIFOLD_FEE, WRAPPER_ADAPTER } from '@/lib/consts'
import { wrapperContract } from '@/lib/contracts'
import { useActiveAccount } from 'thirdweb/react'
import { useAccount, useWriteContract } from 'wagmi'
import { useFrameProvider } from '@/providers/FrameProvider'
import { wrapperAbi } from '@/lib/abi/wrapperAbi'
import getViemNetwork from '@/lib/viem/getViemNetwork'
import getPoolInfo from '@/lib/getPoolInfo'
import getWrapperClaimArgs from '@/lib/claims/getWrapperClaimArgs'

const useETHClaim = () => {
  const activeAccount = useActiveAccount()
  const { address } = useAccount()
  const { context } = useFrameProvider()
  const { writeContractAsync } = useWriteContract()

  const claimWithETH = async (claimInfo: ReturnType<typeof useClaimInfo>) => {
    if (!activeAccount) return
    const claimArgs = getWrapperClaimArgs(
      claimInfo,
      context ? (address as Address) : (activeAccount.address as Address),
    )
    const poolInfo = await getPoolInfo(activeAccount.address as Address, BigInt(claimInfo.price))
    const claimValue =
      MANIFOLD_FEE * BigInt(claimInfo.amount) + poolInfo.amountInMaximum * BigInt(claimInfo.amount)
    if (context) {
      const hash = await writeContractAsync({
        address: WRAPPER_ADAPTER,
        abi: wrapperAbi,
        chain: getViemNetwork(CHAIN_ID),
        account: address,
        functionName: 'mint',
        args: claimArgs,
        value: claimValue,
      })
      return hash
    }
    const transaction = prepareContractCall({
      contract: wrapperContract,
      method: 'mint',
      params: claimArgs,
      value: claimValue,
    })

    const { transactionHash } = await sendTransaction({
      transaction,
      account: activeAccount,
    })

    return transactionHash
  }

  return {
    claimWithETH,
  }
}

export default useETHClaim
