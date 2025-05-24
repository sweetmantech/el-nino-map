import { useConnectedWallets } from 'thirdweb/react'
import { useState } from 'react'
import { Id, toast } from 'react-toastify'
import useManifoldClaim, { CLAIM_ERRORS } from './useManifoldClaim'
import { useFrameProvider } from '@/providers/FrameProvider'
import usePrepareTx from './usePrepareTx'

const usePurchase = () => {
  const { context } = useFrameProvider()
  const connectedWallets = useConnectedWallets()
  const isExternalWallet = connectedWallets?.[0]?.id !== 'inApp'
  const manifold = useManifoldClaim()
  const [isCrossmintOpen, setIsCrossmintOpen] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  const [isOpenCollect, setIsOpenCollect] = useState(false)
  const [toastId, setToastId] = useState<Id | null>(null)
  const { isPreparedTx } = usePrepareTx()

  const mint = async () => {
    setIsOpenCollect(false)
    const isPrepared = await isPreparedTx()
    if (!isPrepared) return

    setPurchasing(true)
    if (isExternalWallet || context) {
      const toastId = toast('Purchasing...', {
        position: 'top-right',
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      })
      setToastId(toastId)
      const { error } = await manifold.claim()
      if (error === CLAIM_ERRORS.TX_REJECTED || error === CLAIM_ERRORS.NO_ERROR) {
        toast.dismiss(toastId)
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
    toastId,
  }
}

export default usePurchase
