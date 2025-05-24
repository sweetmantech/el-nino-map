import {
  CHAIN_ID,
  ERC1155_LAZY_PAYABLE_CLAIM,
  MANIFOLD_FEE,
  OUTCOMING_WRAPPER_ETH,
  WALLET_STATUS,
} from '@/lib/consts'
import { erc20Abi, zeroAddress } from 'viem'
import useClaimInfo from './useClaimInfo'
import getBalance from '@/lib/getBalance'
import { getPublicClient } from '@/lib/clients'
import { useAccount } from 'wagmi'
import { useFrameProvider } from '@/providers/FrameProvider'
import useApproveERC20 from './useApproveERC20'
import { useActiveAccount } from 'thirdweb/react'

const usePrepareClaim = () => {
  const { address } = useAccount()
  const { context } = useFrameProvider()
  const { approve } = useApproveERC20()
  const activeAccount = useActiveAccount()

  const isPrepared = async (claimInfo: ReturnType<typeof useClaimInfo>) => {
    const publicClient = getPublicClient(CHAIN_ID)
    const account = context ? address : activeAccount?.address
    const { erc20Address, price, amount } = claimInfo
    const totalManifoldFee = MANIFOLD_FEE * BigInt(amount)
    const ethBalance = await getBalance(account)
    if (ethBalance < totalManifoldFee) return WALLET_STATUS.INSUFFICIENT_BALANCE

    if (erc20Address === zeroAddress) return WALLET_STATUS.ENOUGH_ETH
    const totalClaimPrice = price * BigInt(amount)
    const balanceOf = await publicClient.readContract({
      address: erc20Address,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [account],
    })
    if (balanceOf < totalClaimPrice) {
      if (ethBalance > OUTCOMING_WRAPPER_ETH * BigInt(amount) + totalManifoldFee)
        return WALLET_STATUS.ENOUGH_ETH
      return WALLET_STATUS.INSUFFICIENT_BALANCE
    }
    const allowance = await publicClient.readContract({
      address: erc20Address,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [account, ERC1155_LAZY_PAYABLE_CLAIM],
    })

    if (allowance < totalClaimPrice) {
      const hash = await approve(erc20Address, ERC1155_LAZY_PAYABLE_CLAIM)
      await publicClient.waitForTransactionReceipt({ hash })
    }
    return WALLET_STATUS.ENOUGH_USDC
  }

  return {
    isPrepared,
  }
}

export default usePrepareClaim
