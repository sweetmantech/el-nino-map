import getBalance from '@/lib/getBalance'
import { useActiveAccount, useConnectedWallets } from 'thirdweb/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import useManifoldClaim from './useManifoldClaim'

const usePurchase = () => {
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address
  const wallets = useConnectedWallets()
  const isExternalWallet = wallets?.[0]?.id !== 'inApp'
  const { claim } = useManifoldClaim()
  const [isCrossmintOpen, setIsCrossmintOpen] = useState(false)
  const [purchasing, setPurchasing] = useState(false)

  const mint = async () => {
    if (!address) return
    setPurchasing(true)
    const balance = await getBalance(address)
    const hasSufficient = balance > 0.000111
    if (isExternalWallet && hasSufficient) {
      toast('Purchasing...', {
        position: 'top-right',
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      })
      await claim(activeAccount)
      setPurchasing(false)
      return
    }
    setIsCrossmintOpen(true)
    setPurchasing(false)
  }

  return {
    isCrossmintOpen,
    setIsCrossmintOpen,
    mint,
    purchasing,
  }
}

export default usePurchase
