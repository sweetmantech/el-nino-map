import { useState } from 'react'
import {
  useActiveAccount,
  useConnectedWallets,
  useConnectModal,
  useSwitchActiveWalletChain,
} from 'thirdweb/react'
import { client } from '@/lib/thirdweb/client'
import { baseSepolia } from 'thirdweb/chains'
import { CHAIN, MINT_REFERRAL, SUBSCRIPTION } from '@/lib/consts'
import { getContract, prepareContractCall, sendTransaction } from 'thirdweb'
import { parseEther } from 'viem'
import { subscriptionAbi } from '@/lib/abi/subscription'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'
import useHypersubUris from './useHypersubUris'

const useSubscribe = () => {
  const { photos } = useHypersubUris()
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
        abi: subscriptionAbi as any,
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
    photos,
  }
}

export default useSubscribe
