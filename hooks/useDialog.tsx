'use client'

import { useState } from 'react'
import useIsMobile from './useIsMobile'

const useDialog = () => {
  const [tooltipId, setTooltipId] = useState('connect')
  const isMobile = useIsMobile()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isVisibleToolTip, setIsVisibleTooltip] = useState(false)
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)

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

  return {
    isDialogOpen,
    isVisibleToolTip,
    tooltipX,
    tooltipY,
    showTooltip,
    show,
    close,
    closeTooltip,
    tooltipId,
  }
}

export default useDialog
