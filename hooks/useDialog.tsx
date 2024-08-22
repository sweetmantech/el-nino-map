'use client'

import { useState } from 'react'
import useIsMobile from './useIsMobile'
import { Address } from 'viem'
import { useRouter } from 'next/navigation'
import useZoraCollect from './useZoraCollect'
import { useConnectModal } from 'thirdweb/react'
import { createWallet } from 'thirdweb/wallets'
import { baseSepolia } from 'thirdweb/chains'
import { client } from '@/lib/thirdweb/client'

const useDialog = () => {
  const [tooltipId, setTooltipId] = useState('connect')
  const isMobile = useIsMobile()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isVisibleToolTip, setIsVisibleTooltip] = useState(false)
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)
  const { push } = useRouter()
  const { purchase } = useZoraCollect()
  const { connect } = useConnectModal()

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

  const clickMap = (area: any, activeAccount: any) => {
    if (area.id === 'connect') {
      const address = activeAccount?.address
      if (address) {
        show()
        return
      }

      connect({
        client,
        wallets: [createWallet('embedded')],
        chain: baseSepolia,
      })
      return
    }

    if (area.id === 'leaderboard') {
      push('/leaderboard')
    }

    if (area.id === 'mint') {
      purchase(activeAccount)
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
  }
}

export default useDialog
