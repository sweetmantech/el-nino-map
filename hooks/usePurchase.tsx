import { useActiveAccount, useConnectedWallets, useConnectModal } from 'thirdweb/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import useManifoldClaim, { CLAIM_ERRORS } from './useManifoldClaim'
import { client } from '@/lib/thirdweb/client'
import { CHAIN } from '@/lib/consts'
import { wallets } from '@/lib/thirdweb/wallets'

const usePurchase = () => {
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address
  const connectedWallets = useConnectedWallets()
  const isExternalWallet = connectedWallets?.[0]?.id !== 'inApp'
  const manifold = useManifoldClaim()
  const [isCrossmintOpen, setIsCrossmintOpen] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  const [isOpenCollect, setIsOpenCollect] = useState(false)
  const { connect } = useConnectModal()

  const mint = async () => {
    setIsOpenCollect(false)
    if (!address) {
      await connect({
        client,
        wallets,
        chain: CHAIN,
      })
      return
    }
    setPurchasing(true)
    if (isExternalWallet) {
      const toastId = toast('Purchasing...', {
        position: 'top-right',
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      })
      const { error } = await manifold.claim(activeAccount)
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
  }
}

export default usePurchase
