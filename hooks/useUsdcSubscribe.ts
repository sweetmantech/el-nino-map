import { prepareContractCall, sendTransaction } from 'thirdweb'
import { subscriptionContract } from '@/lib/contracts'
import { useSubscriptionInfoProvider } from '@/providers/SubscriptionProvider'
import { useActiveAccount } from 'thirdweb/react'
import { useFrameProvider } from '@/providers/FrameProvider'
import { useAccount, useWriteContract } from 'wagmi'
import { CHAIN_ID, SUBSCRIPTION } from '@/lib/consts'
import { stpv2Abi } from '@/lib/abi/stpv2'
import getViemNetwork from '@/lib/viem/getViemNetwork'

const useUsdcSubscribe = () => {
  const { initPrice, balanceOf, pricePerPeriod } = useSubscriptionInfoProvider()
  const activeAccount = useActiveAccount()
  const { context } = useFrameProvider()
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const subscribeWithUsdc = async () => {
    const price = balanceOf > 0 ? pricePerPeriod : initPrice + pricePerPeriod
    if (context) {
      const hash = await writeContractAsync({
        address: SUBSCRIPTION,
        abi: stpv2Abi as any,
        chain: getViemNetwork(CHAIN_ID),
        functionName: 'mint',
        account: address,
        args: [price],
      })
      return hash
    }
    const transaction: any = prepareContractCall({
      contract: subscriptionContract,
      method: 'function mint(uint256 numTokens) payable',
      params: [price],
    })
    const { transactionHash } = await sendTransaction({
      transaction,
      account: activeAccount,
    })

    return transactionHash
  }

  return {
    subscribeWithUsdc,
  }
}

export default useUsdcSubscribe
