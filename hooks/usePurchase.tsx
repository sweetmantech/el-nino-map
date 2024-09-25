import getBalance from '@/lib/getBalance'
import { useActiveAccount, useConnectedWallets } from 'thirdweb/react'
import useZoraCollect from './useZoraCollect'
import { useState } from 'react'
import { toast } from 'react-toastify'

const usePurchase = () => {
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address
  const wallets = useConnectedWallets()
  const isExternalWallet = wallets?.[0]?.id !== 'inApp'
  const { purchase } = useZoraCollect()
  const [isCrossmintOpen, setIsCrossmintOpen] = useState(false)
  const [purchasing, setPurchasing] = useState(false)

  const mint = async () => {
    if (!address) return
    setPurchasing(true)
    toast('Purchasing...', {
      position: 'top-right',
      autoClose: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
    })
    const balance = await getBalance(address)
    const hasSufficient = balance > 0.000111
    if (isExternalWallet && hasSufficient) {
      await purchase(activeAccount)
      setPurchasing(true)
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
