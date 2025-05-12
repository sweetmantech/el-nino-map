import { Address, prepareContractCall, sendTransaction } from 'thirdweb'
import { CHAIN_ID, SUBSCRIPTION } from '@/lib/consts'
import { Account } from 'thirdweb/wallets'
import {
  QUOTER_ADDRESSES,
  SWAP_ROUTER_02_ADDRESSES,
  V3_CORE_FACTORY_ADDRESSES,
} from '@uniswap/sdk-core'
import { WETH_TOKEN } from '@/lib/tokens'
import { FeeAmount } from '@uniswap/v3-sdk'
import { STPV2WrapperContract } from '@/lib/contracts'
import { useSubscriptionInfoProvider } from '@/providers/SubscriptionProvider'
import { formatUnits, parseUnits } from 'viem'
import getPoolInfo from '@/lib/getPoolInfo'

const useETHSubscribe = () => {
  const { pricePerPeriod, initPrice, balanceOf, decimals } = useSubscriptionInfoProvider()

  const subscribeWithETH = async (activeAccount: Account) => {
    const { amountInMaximum } = await getPoolInfo(
      activeAccount.address,
      parseUnits('1.1', decimals),
    )
    const price = balanceOf > 0 ? pricePerPeriod : initPrice + pricePerPeriod
    const transaction: any = prepareContractCall({
      contract: STPV2WrapperContract,
      method:
        'function mint((address swapFactory, address swapRouter, address quoterV2, address tokenIn, uint24 fee) swapData, address subscription, uint16 tierId, address to) payable',
      params: [
        {
          swapFactory: V3_CORE_FACTORY_ADDRESSES[CHAIN_ID],
          swapRouter: SWAP_ROUTER_02_ADDRESSES(CHAIN_ID),
          quoterV2: QUOTER_ADDRESSES[CHAIN_ID],
          tokenIn: WETH_TOKEN.address,
          fee: FeeAmount.LOW,
        },
        SUBSCRIPTION,
        1,
        activeAccount.address as Address,
      ],
      value: amountInMaximum * BigInt(formatUnits(price, decimals)),
    })
    const { transactionHash } = await sendTransaction({
      transaction,
      account: activeAccount,
    })

    return transactionHash
  }

  return {
    subscribeWithETH,
  }
}

export default useETHSubscribe
