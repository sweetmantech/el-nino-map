import { useConnectedWallets } from 'thirdweb/react'
import { useState } from 'react'
import useManifoldClaim, { CLAIM_ERRORS } from './useManifoldClaim'
import { useFrameProvider } from '@/providers/FrameProvider'
import usePrepareTx from './usePrepareTx'
import { toast } from 'react-toastify'

const usePurchase = () => {
  const { context } = useFrameProvider()
  const connectedWallets = useConnectedWallets()
  const isExternalWallet = connectedWallets?.[0]?.id !== 'inApp'
  const manifold = useManifoldClaim()
  const [isCrossmintOpen, setIsCrossmintOpen] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  const [isOpenCollect, setIsOpenCollect] = useState(false)
  const { isPreparedTx } = usePrepareTx()

  const mint = async () => {
    setIsOpenCollect(false)
    const isPrepared = await isPreparedTx()
    if (!isPrepared) return
    toast.info('Purchasing...')
    setPurchasing(true)
    if (isExternalWallet || context) {
      const { error } = await manifold.claim()
      if (error === CLAIM_ERRORS.TX_REJECTED || error === CLAIM_ERRORS.NO_ERROR) {
        setPurchasing(false)
        return
      }
    }
    setIsCrossmintOpen(true)
    setPurchasing(false)
  }

  return {
    isCrossmintOpen,
    setIsCrossmintOpen,
    mint,
    purchasing,
    ...manifold,
    isOpenCollect,
    setIsOpenCollect,
  }
}

export default usePurchase
