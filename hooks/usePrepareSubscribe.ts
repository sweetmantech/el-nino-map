import { CHAIN_ID, SUBSCRIPTION, WALLET_STATUS } from '@/lib/consts'
import { formatUnits, parseUnits, zeroAddress } from 'viem'
import getBalance from '@/lib/getBalance'
import { getPublicClient } from '@/lib/clients'
import { useSubscriptionInfoProvider } from '@/providers/SubscriptionProvider'
import { useActiveAccount } from 'thirdweb/react'
import { useFrameProvider } from '@/providers/FrameProvider'
import { useAccount } from 'wagmi'
import useApproveERC20 from './useApproveERC20'
import getPoolInfo from '@/lib/getPoolInfo'
import { readContract } from 'thirdweb'
import { currencyContract } from '@/lib/contracts'

const usePrepareSubscribe = () => {
  const {
    currency,
    balanceOf: remainedSeconds,
    pricePerPeriod,
    initPrice,
    decimals,
  } = useSubscriptionInfoProvider()
  const activeAccount = useActiveAccount()
  const { context } = useFrameProvider()
  const { address } = useAccount()
  const { approve } = useApproveERC20()

  const isPrepared = async () => {
    const account = context ? address : activeAccount?.address
    const publicClient = getPublicClient(CHAIN_ID)
    const price = remainedSeconds > 0 ? pricePerPeriod : initPrice + pricePerPeriod
    const ethBalance = await getBalance(account)
    if (currency === zeroAddress) {
      if (ethBalance < price) return WALLET_STATUS.INSUFFICIENT_BALANCE
      else return WALLET_STATUS.ENOUGH_ETH
    }
    const balanceOf = await readContract({
      contract: currencyContract(currency) as any,
      method: 'function balanceOf(address account) view returns (uint256)',
      params: [account],
    })

    if (balanceOf < price) {
      const { amountInMaximum } = await getPoolInfo(account, parseUnits('1.1', decimals))
      if (ethBalance > amountInMaximum * BigInt(formatUnits(price, decimals)))
        return WALLET_STATUS.ENOUGH_ETH
      return WALLET_STATUS.INSUFFICIENT_BALANCE
    }
    const allowance = await readContract({
      contract: currencyContract(currency) as any,
      method: 'function allowance(address owner, address spender) view returns (uint256)',
      params: [account, SUBSCRIPTION],
    })

    if (allowance < price) {
      const hash = await approve(currency, SUBSCRIPTION)
      await publicClient.waitForTransactionReceipt({ hash })
    }
    return WALLET_STATUS.ENOUGH_ERC20
  }

  return {
    isPrepared,
  }
}

export default usePrepareSubscribe
