import { prepareContractCall, sendTransaction } from 'thirdweb'
import useClaimInfo from './useClaimInfo'
import { CHAIN, DROP_ADDRESS, ERC1155_LAZY_PAYABLE_CLAIM, MANIFOLD_FEE } from '@/lib/consts'
import { extensionContract } from '@/lib/contracts'
import { useActiveAccount } from 'thirdweb/react'
import { useAccount, useWriteContract } from 'wagmi'
import { useFrameProvider } from '@/providers/FrameProvider'
import getViemNetwork from '@/lib/viem/getViemNetwork'
import { erc1155LazyPayableClaimAbi } from '@/lib/abi/erc_1155_lazy_payable'

const useUsdcClaim = () => {
  const activeAccount = useActiveAccount()
  const { address } = useAccount()
  const { context } = useFrameProvider()
  const { writeContractAsync } = useWriteContract()

  const claimWithUsdc = async (claimInfo: ReturnType<typeof useClaimInfo>) => {
    if (!activeAccount?.address) return
    const claimArgs = [
      DROP_ADDRESS,
      BigInt(claimInfo.instanceId),
      claimInfo.amount,
      [],
      [[]],
      context ? address : activeAccount.address,
    ]
    const claimValue = MANIFOLD_FEE * BigInt(claimInfo.amount)
    if (context) {
      const hash = await writeContractAsync({
        address: ERC1155_LAZY_PAYABLE_CLAIM,
        chain: getViemNetwork(CHAIN.id),
        abi: erc1155LazyPayableClaimAbi,
        account: address,
        functionName: 'mintBatch',
        args: claimArgs,
        value: claimValue,
      })
      return hash
    }
    const transaction = prepareContractCall({
      contract: extensionContract,
      method: 'mintBatch',
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
    claimWithUsdc,
  }
}

export default useUsdcClaim
