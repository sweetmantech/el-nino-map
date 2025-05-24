import { useState } from 'react'
import { useSwitchActiveWalletChain } from 'thirdweb/react'
import { CHAIN, CHAIN_ID, WALLET_STATUS } from '@/lib/consts'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'
import useHypersubUris from './useHypersubUris'
import usePrepareSubscribe from './usePrepareSubscribe'
import useETHSubscribe from './useETHSubscribe'
import useUsdcSubscribe from './useUsdcSubscribe'
import usePrepareTx from './usePrepareTx'
import { useSwitchChain } from 'wagmi'
import { useFrameProvider } from '@/providers/FrameProvider'

const useSubscribe = () => {
  const { photos } = useHypersubUris()
  const switchChain = useSwitchActiveWalletChain()
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const { isPrepared } = usePrepareSubscribe()
  const { subscribeWithETH } = useETHSubscribe()
  const { subscribeWithUsdc } = useUsdcSubscribe()
  const [fiatActive, setFiatActive] = useState<boolean>(false)
  const { isPreparedTx } = usePrepareTx()
  const { context } = useFrameProvider()
  const { switchChainAsync } = useSwitchChain()

  const subscribe = async () => {
    const isPreparedSubscribe = await isPreparedTx()
    if (!isPreparedSubscribe) return
    try {
      setLoading(true)
      if (context) await switchChainAsync({ chainId: CHAIN_ID })
      else await switchChain(CHAIN)
      const isPreparedSubscribe = await isPrepared()
      if (isPreparedSubscribe === WALLET_STATUS.INSUFFICIENT_BALANCE) {
        setLoading(false)
        setFiatActive(true)
        return
      }
      if (isPreparedSubscribe === WALLET_STATUS.ENOUGH_ERC20) await subscribeWithUsdc()
      if (isPreparedSubscribe === WALLET_STATUS.ENOUGH_ETH) await subscribeWithETH()
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
    fiatActive,
    setFiatActive,
  }
}

export default useSubscribe
