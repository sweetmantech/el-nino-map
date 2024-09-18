'use client'

import { useState } from 'react'
import useIsMobile from './useIsMobile'
import { useRouter } from 'next/navigation'
import { useConnectModal } from 'thirdweb/react'
import { baseSepolia } from 'thirdweb/chains'
import { client } from '@/lib/thirdweb/client'
import { wallets } from '@/lib/thirdweb/wallets'
import { Account } from 'thirdweb/wallets'
import { CustomArea } from 'react-img-mapper'
import useZoraCollect from './useZoraCollect'
import getBalance from '@/lib/getBalance'

const useDialog = () => {
  const [tooltipId, setTooltipId] = useState('connect')
  const isMobile = useIsMobile()
  const [isCrossmintOpen, setIsCrossmintOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isVisibleToolTip, setIsVisibleTooltip] = useState(false)
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)
  const { push } = useRouter()
  const { connect } = useConnectModal()
  const { purchase } = useZoraCollect()

  const show = () => {
    setIsVisibleTooltip(isMobile)
    setIsDialogOpen(true)
  }

  const close = () => {
    if (!isDialogOpen) return
    setIsDialogOpen(false)
  }

  const closeTooltip = () => {
    setIsVisibleTooltip(false)
  }

  const showTooltip = (area: any, e: any) => {
    if (isDialogOpen) return
    setTooltipId(area.id)
    setIsVisibleTooltip(true)
    const x = e.clientX
    const y = e.clientY

    setTooltipX(x)
    setTooltipY(y)
  }

  const clickMap = async (area: CustomArea, activeAccount: Account, isExternalWallet: boolean) => {
    const address = activeAccount?.address
    if (area.id === 'connect') {
      if (address) {
        show()
        return
      }

      await connect({
        client,
        wallets,
        chain: baseSepolia,
      })
      window.location.reload()
      return
    }

    if (area.id === 'leaderboard') {
      push('/leaderboard')
    }

    if (area.id === 'mint') {
      if (!address) return
      const balance = await getBalance(address)
      const hasSufficient = balance > 0.000111
      if (isExternalWallet && hasSufficient) {
        await purchase()
        return
      }
      setIsCrossmintOpen(true)
    }
  }

  return {
    isDialogOpen,
    isVisibleToolTip,
    tooltipX,
    tooltipY,
    showTooltip,
    show,
    close,
    closeTooltip,
    clickMap,
    tooltipId,
    setIsCrossmintOpen,
    isCrossmintOpen,
  }
}

export default useDialog
