import { Address, prepareContractCall, sendTransaction } from 'thirdweb'
import { CHAIN_ID, STPV2_WRAPPER_ADAPTER, SUBSCRIPTION } from '@/lib/consts'
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
import { useFrameProvider } from '@/providers/FrameProvider'
import { useAccount, useWriteContract } from 'wagmi'
import { useActiveAccount } from 'thirdweb/react'
import getViemNetwork from '@/lib/viem/getViemNetwork'
import { stpv2WrapperAbi } from '@/lib/abi/stpv2WrapperAbi'

const useETHSubscribe = () => {
  const { pricePerPeriod, initPrice, balanceOf, decimals } = useSubscriptionInfoProvider()
  const { context } = useFrameProvider()
  const { address } = useAccount()
  const activeAccount = useActiveAccount()
  const { writeContractAsync } = useWriteContract()

  const subscribeWithETH = async () => {
    const account = context ? address : activeAccount.address
    const { amountInMaximum } = await getPoolInfo(account, parseUnits('1.1', decimals))
    const price = balanceOf > 0 ? pricePerPeriod : initPrice + pricePerPeriod
    const subscribeArgs = [
      {
        swapFactory: V3_CORE_FACTORY_ADDRESSES[CHAIN_ID],
        swapRouter: SWAP_ROUTER_02_ADDRESSES(CHAIN_ID),
        quoterV2: QUOTER_ADDRESSES[CHAIN_ID],
        tokenIn: WETH_TOKEN.address,
        fee: FeeAmount.LOW,
      },
      SUBSCRIPTION,
      1,
      account as Address,
    ]
    const subscribeValue = amountInMaximum * BigInt(formatUnits(price, decimals))
    if (context) {
      const hash = await writeContractAsync({
        address: STPV2_WRAPPER_ADAPTER,
        abi: stpv2WrapperAbi as any,
        chain: getViemNetwork(CHAIN_ID),
        account,
        args: subscribeArgs,
        value: subscribeValue,
        functionName: 'mint',
      })
      return hash
    }
    const transaction: any = prepareContractCall({
      contract: STPV2WrapperContract,
      method:
        'function mint((address swapFactory, address swapRouter, address quoterV2, address tokenIn, uint24 fee) swapData, address subscription, uint16 tierId, address to) payable',
      params: subscribeArgs as any,
      value: subscribeValue,
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
