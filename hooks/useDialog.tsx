'use client'

import { useState } from 'react'
import useIsMobile from './useIsMobile'
import { useMeasure } from 'react-use'
import usePan from './usePan'

const useDialog = () => {
  const [containerRef, { width, height }] = useMeasure()
  const [tooltipId, setTooltipId] = useState('connect')
  const isMobile = useIsMobile()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isVisibleToolTip, setIsVisibleTooltip] = useState(false)
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)
  const { scale } = usePan()

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

    const container = document.getElementById('container')
    setTooltipX(container.scrollLeft + x)
    setTooltipY(container.scrollTop + y)
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
    containerRef,
    width,
    height,
    scale,
  }
}

export default useDialog
