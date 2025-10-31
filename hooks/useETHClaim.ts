import { Address, prepareContractCall, sendTransaction } from 'thirdweb'
import useClaimInfo from './useClaimInfo'
import { CHAIN_ID, WRAPPER_ADAPTER } from '@/lib/consts'
import { wrapperContract } from '@/lib/contracts'
import { useActiveAccount } from 'thirdweb/react'
import { useAccount, useWriteContract } from 'wagmi'
import { useFrameProvider } from '@/providers/FrameProvider'
import { wrapperAbi } from '@/lib/abi/wrapperAbi'
import getViemNetwork from '@/lib/viem/getViemNetwork'
import getWrapperClaimArgs from '@/lib/claims/getWrapperClaimArgs'
import estimatedWrapperClaimValue from '@/lib/claims/estimatedWrapperClaimValue'

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
    const wrapperClaimValue = await estimatedWrapperClaimValue(
      claimInfo,
      activeAccount.address as Address,
    )
    if (context) {
      const hash = await writeContractAsync({
        address: WRAPPER_ADAPTER,
        abi: wrapperAbi,
        chain: getViemNetwork(CHAIN_ID),
        account: address,
        functionName: 'mint',
        args: claimArgs,
        value: wrapperClaimValue,
      })
      return hash
    }
    const transaction = prepareContractCall({
      contract: wrapperContract,
      method: 'mint',
      params: claimArgs,
      value: wrapperClaimValue,
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
