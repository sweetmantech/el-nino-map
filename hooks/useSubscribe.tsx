import { useState } from 'react'
import {
  useActiveAccount,
  useConnectedWallets,
  useConnectModal,
  useSwitchActiveWalletChain,
} from 'thirdweb/react'
import { client } from '@/lib/thirdweb/client'
import { baseSepolia } from 'thirdweb/chains'
import { CHAIN, SUBSCRIPTION } from '@/lib/consts'
import { getContract, prepareContractCall, sendTransaction } from 'thirdweb'
import { zeroAddress } from 'viem'
import { subscriptionAbi } from '@/lib/abi/subscription'
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
        abi: subscriptionAbi as any,
        client,
      })

      const transaction: any = prepareContractCall({
        contract,
        method:
          'function deploySubscription(string name, string symbol, string contractURI, string tokenURI, uint256 tokensPerSecond, uint256 minimumPurchaseSeconds, uint16 rewardBps, address erc20TokenAddr, uint256 feeConfigId) payable returns (address)',
        params: [
          "",
          "",
          'ipfs://',
          'ipfs://',
          BigInt(1),
          BigInt(1),
          500,
          zeroAddress,
          BigInt(1),
        ],
        value: BigInt(0),
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
