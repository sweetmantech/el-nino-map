'use client'

import { useEffect, useState } from 'react'
import useIsMobile from './useIsMobile'
import usePan from './usePan'
import calculateScaledWidth from '@/lib/calculateScaledWidth'

const useDialog = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
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

  useEffect(() => {
    const windowWidth = document.documentElement.clientWidth
    const windowHeight = document.documentElement.clientHeight
    setWidth(windowWidth)
    setHeight(windowHeight)
  }, [isMobile, scale])

  useEffect(() => {
    let timer = null
    if (isMobile) {
      const offsetX = (scale * calculateScaledWidth(width, height) - width) / 2
      const container = document.getElementById('container')
      timer = setTimeout(() => {
        container.scrollBy({
          left: offsetX,
          behavior: 'smooth',
        })
      }, 2000)
    }
    return () => clearInterval(timer)
    // eslint-disable-next-line
  }, [isMobile, width, height])

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
    width,
    height,
    scale,
  }
}

export default useDialog
