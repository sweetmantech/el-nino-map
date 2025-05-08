import { prepareContractCall, sendTransaction } from 'thirdweb'
import { Account } from 'thirdweb/wallets'
import { subscriptionContract } from '@/lib/contracts'
import { useSubscriptionInfoProvider } from '@/providers/SubscriptionProvider'

const useUsdcSubscribe = () => {
  const { initPrice, balanceOf, pricePerPeriod } = useSubscriptionInfoProvider()

  const subscribeWithUsdc = async (activeAccount: Account) => {
    const price = balanceOf > 0 ? pricePerPeriod : initPrice
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
