import { CHAIN_ID, OUTCOMING_WRAPPER_ETH, SUBSCRIPTION, WALLET_STATUS } from '@/lib/consts'
import { erc20Abi, formatUnits, zeroAddress } from 'viem'
import getBalance from '@/lib/getBalance'
import { getPublicClient } from '@/lib/clients'
import { useSubscriptionInfoProvider } from '@/providers/SubscriptionProvider'
import { useActiveAccount } from 'thirdweb/react'
import { useFrameProvider } from '@/providers/FrameProvider'
import { useAccount } from 'wagmi'
import useApproveERC20 from './useApproveERC20'

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
    const price = remainedSeconds > 0 ? pricePerPeriod : initPrice
    const ethBalance = await getBalance(account)
    if (currency === zeroAddress) {
      if (ethBalance < price) return WALLET_STATUS.INSUFFICIENT_BALANCE
      else return WALLET_STATUS.ENOUGH_ETH
    }
    const balanceOf = await publicClient.readContract({
      address: currency,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [account],
    })

    if (balanceOf < price) {
      if (ethBalance > OUTCOMING_WRAPPER_ETH * BigInt(formatUnits(price, decimals)))
        return WALLET_STATUS.ENOUGH_ETH
      return WALLET_STATUS.INSUFFICIENT_BALANCE
    }
    const allowance = await publicClient.readContract({
      address: currency,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [account, SUBSCRIPTION],
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
