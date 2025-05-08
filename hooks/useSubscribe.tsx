import { useState } from 'react'
import {
  useActiveAccount,
  useConnectedWallets,
  useConnectModal,
  useSwitchActiveWalletChain,
} from 'thirdweb/react'
import { client } from '@/lib/thirdweb/client'
import { CHAIN, WALLET_STATUS } from '@/lib/consts'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'
import useHypersubUris from './useHypersubUris'
import usePrepareSubscribe from './usePrepareSubscribe'
import useETHSubscribe from './useETHSubscribe'
import useUsdcSubscribe from './useUsdcSubscribe'

const useSubscribe = () => {
  const { photos } = useHypersubUris()
  const activeAccount = useActiveAccount()
  const wallets = useConnectedWallets()
  const { connect } = useConnectModal()
  const switchChain = useSwitchActiveWalletChain()
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const { isPrepared } = usePrepareSubscribe()
  const { subscribeWithETH } = useETHSubscribe()
  const { subscribeWithUsdc } = useUsdcSubscribe()

  const subscribe = async () => {
    const address = activeAccount?.address
    if (!address) {
      connect({
        client,
        wallets,
        chain: CHAIN,
      })
      return
    }
    try {
      setLoading(true)
      await switchChain(CHAIN)
      const isPreparedSubscribe = await isPrepared(activeAccount)
      if (isPreparedSubscribe === WALLET_STATUS.ENOUGH_ERC20) await subscribeWithUsdc(activeAccount)
      if (isPreparedSubscribe === WALLET_STATUS.ENOUGH_ETH) await subscribeWithETH(activeAccount)
      toast.success('Subscribed!')
      setLoading(false)
      setSubscribed(true)
    } catch (error) {
      handleTxError(error)
      setLoading(false)
      setSubscribed(false)
    }
  }

  return {
    subscribed,
    subscribe,
    loading,
    photos,
  }
}

export default useSubscribe
