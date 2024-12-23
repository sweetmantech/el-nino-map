import { useState } from 'react'
import {
  useActiveAccount,
  useConnectedWallets,
  useConnectModal,
  useSwitchActiveWalletChain,
} from 'thirdweb/react'
import { client } from '@/lib/thirdweb/client'
import { baseSepolia } from 'thirdweb/chains'
import { CHAIN, IS_TESTNET, MINT_REFERRAL, SUBSCRIPTION } from '@/lib/consts'
import { getContract, prepareContractCall, sendTransaction } from 'thirdweb'
import { parseEther } from 'viem'
import { subscriptionAbi } from '@/lib/abi/subscription'
import { subscriptionV2Abi } from '@/lib/abi/STV2'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'

const useSubscribe = () => {
  const activeAccount = useActiveAccount()
  const wallets = useConnectedWallets()
  const { connect } = useConnectModal()
  const switchChain = useSwitchActiveWalletChain()
  const [loading, setLoading] = useState(false)

  const subscribe = async () => {
    setLoading(true)
    try {
      const address = activeAccount?.address
      if (!address) {
        connect({
          client,
          wallets,
          chain: baseSepolia,
        })
        return
      }

      await switchChain(CHAIN)

      const contract: any = getContract({
        address: SUBSCRIPTION,
        chain: CHAIN,
        abi: IS_TESTNET ? (subscriptionAbi as any) : (subscriptionV2Abi as any),
        client,
      })

      const transaction: any = prepareContractCall({
        contract,
        method: 'function mintFor(address account, uint256 numTokens) payable',
        params: [MINT_REFERRAL, parseEther('0.001')],
        value: parseEther('0.001'),
      })

      const { transactionHash } = await sendTransaction({
        transaction,
        account: activeAccount,
      })

      toast.success('Subscribed!')
      setLoading(false)
      return transactionHash
    } catch (error) {
      handleTxError(error)
      setLoading(false)
      return { error }
    }
  }

  return {
    subscribe,
    loading,
  }
}

export default useSubscribe
