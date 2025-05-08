import {
  CHAIN,
  CHAIN_ID,
  ERC1155_LAZY_PAYABLE_CLAIM,
  MANIFOLD_FEE,
  OUTCOMING_WRAPPER_ETH,
  WALLET_STATUS,
} from '@/lib/consts'
import { client } from '@/lib/thirdweb/client'
import { getContract, prepareContractCall, readContract, sendTransaction } from 'thirdweb'
import { erc20Abi, maxUint256, zeroAddress } from 'viem'
import useClaimInfo from './useClaimInfo'
import getBalance from '@/lib/getBalance'
import { getPublicClient } from '@/lib/clients'

const usePrepareClaim = () => {
  const isPrepared = async (claimInfo: ReturnType<typeof useClaimInfo>, activeAccount: any) => {
    const account = activeAccount?.address
    const { erc20Address, price, amount } = claimInfo
    const totalManifoldFee = MANIFOLD_FEE * BigInt(amount)
    const ethBalance = await getBalance(account)
    if (ethBalance < totalManifoldFee) return WALLET_STATUS.INSUFFICIENT_BALANCE

    if (erc20Address === zeroAddress) return WALLET_STATUS.ENOUGH_ETH
    const totalClaimPrice = price * BigInt(amount)
    const erc20Contract = getContract({
      address: erc20Address,
      abi: erc20Abi,
      chain: CHAIN,
      client,
    }) as any
    const balanceOf = await readContract({
      contract: erc20Contract,
      method: 'function balanceOf(address account) view returns (uint256)',
      params: [account],
    })
    if (balanceOf < totalClaimPrice) {
      if (ethBalance > OUTCOMING_WRAPPER_ETH * BigInt(amount) + totalManifoldFee)
        return WALLET_STATUS.ENOUGH_ETH
      return WALLET_STATUS.INSUFFICIENT_BALANCE
    }
    const allowance = await readContract({
      contract: erc20Contract,
      method: 'function allowance(address owner, address spender) view returns (uint256)',
      params: [account, ERC1155_LAZY_PAYABLE_CLAIM],
    })
    if (allowance < totalClaimPrice) {
      const transaction = prepareContractCall({
        contract: erc20Contract,
        method: 'function approve(address spender, uint256 value) returns (bool)',
        params: [ERC1155_LAZY_PAYABLE_CLAIM, maxUint256],
      })

      const { transactionHash } = await sendTransaction({
        transaction,
        account: activeAccount,
      })
      const publicClient = getPublicClient(CHAIN_ID)
      await publicClient.waitForTransactionReceipt({ hash: transactionHash })
    }
    return WALLET_STATUS.ENOUGH_USDC
  }

  return {
    isPrepared,
  }
}

export default usePrepareClaim
