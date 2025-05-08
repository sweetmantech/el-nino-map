import { CHAIN_ID, SUBSCRIPTION, WALLET_STATUS } from '@/lib/consts'
import { prepareContractCall, readContract, sendTransaction } from 'thirdweb'
import { maxUint256, zeroAddress } from 'viem'
import getBalance from '@/lib/getBalance'
import { getPublicClient } from '@/lib/clients'
import { useSubscriptionInfoProvider } from '@/providers/SubscriptionProvider'
import { currencyContract } from '@/lib/contracts'

const usePrepareSubscribe = () => {
  const {
    currency,
    balanceOf: remainedSeconds,
    pricePerPeriod,
    initPrice,
  } = useSubscriptionInfoProvider()

  const isPrepared = async (activeAccount: any) => {
    const account = activeAccount?.address
    const price = remainedSeconds > 0 ? pricePerPeriod : initPrice
    if (currency === zeroAddress) {
      const ethBalance = await getBalance(account)
      if (ethBalance < price) return WALLET_STATUS.INSUFFICIENT_BALANCE
      else return WALLET_STATUS.ENOUGH_ETH
    }
    const balanceOf = await readContract({
      contract: currencyContract(currency) as any,
      method: 'function balanceOf(address account) view returns (uint256)',
      params: [account],
    })
    if (balanceOf < price) return WALLET_STATUS.INSUFFICIENT_BALANCE
    const allowance = await readContract({
      contract: currencyContract(currency) as any,
      method: 'function allowance(address owner, address spender) view returns (uint256)',
      params: [account, SUBSCRIPTION],
    })
    if (allowance < price) {
      const transaction = prepareContractCall({
        contract: currencyContract(currency) as any,
        method: 'function approve(address spender, uint256 value) returns (bool)',
        params: [SUBSCRIPTION, maxUint256],
      })

      const { transactionHash } = await sendTransaction({
        transaction,
        account: activeAccount,
      })
      const publicClient = getPublicClient(CHAIN_ID)
      await publicClient.waitForTransactionReceipt({ hash: transactionHash })
    }
    return WALLET_STATUS.ENOUGH_ERC20
  }

  return {
    isPrepared,
  }
}

export default usePrepareSubscribe
