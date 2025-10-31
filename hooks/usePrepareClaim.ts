import {
  CHAIN_ID,
  ERC1155_LAZY_PAYABLE_CLAIM,
  MANIFOLD_FEE,
  FALLBACK_WRAPPER_SWAP_AMOUNT,
  WALLET_STATUS,
} from '@/lib/consts'
import { type Address, zeroAddress } from 'viem'
import useClaimInfo from './useClaimInfo'
import getBalance from '@/lib/getBalance'
import { getPublicClient } from '@/lib/clients'
import { useAccount } from 'wagmi'
import { useFrameProvider } from '@/providers/FrameProvider'
import useApproveERC20 from './useApproveERC20'
import { useActiveAccount } from 'thirdweb/react'
import { readContract } from 'thirdweb'
import { currencyContract } from '@/lib/contracts'

const usePrepareClaim = () => {
  const { address } = useAccount()
  const { context } = useFrameProvider()
  const { approve } = useApproveERC20()
  const activeAccount = useActiveAccount()

  const isPrepared = async (claimInfo: ReturnType<typeof useClaimInfo>) => {
    const publicClient = getPublicClient(CHAIN_ID)
    const account = context ? address : (activeAccount?.address as Address)
    if (!account) return null
    const { erc20Address, price, amount } = claimInfo
    const totalManifoldFee = MANIFOLD_FEE * BigInt(amount)
    const ethBalance = await getBalance(account)
    if (ethBalance < totalManifoldFee) return WALLET_STATUS.INSUFFICIENT_BALANCE

    if (erc20Address === zeroAddress) return WALLET_STATUS.ENOUGH_ETH
    const totalClaimPrice = price * BigInt(amount)
    const balanceOf = await readContract({
      contract: currencyContract(erc20Address),
      method: 'balanceOf',
      params: [account],
    })
    if (balanceOf < totalClaimPrice) {
      if (ethBalance > FALLBACK_WRAPPER_SWAP_AMOUNT * BigInt(amount) + totalManifoldFee)
        return WALLET_STATUS.ENOUGH_ETH
      return WALLET_STATUS.INSUFFICIENT_BALANCE
    }
    const allowance = await readContract({
      contract: currencyContract(erc20Address),
      method: 'allowance',
      params: [account, ERC1155_LAZY_PAYABLE_CLAIM],
    })

    if (allowance < totalClaimPrice) {
      const hash = await approve(erc20Address, ERC1155_LAZY_PAYABLE_CLAIM as Address)
      if (hash) await publicClient.waitForTransactionReceipt({ hash })
    }
    return WALLET_STATUS.ENOUGH_USDC
  }

  return {
    isPrepared,
  }
}

export default usePrepareClaim
