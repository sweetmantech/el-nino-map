'use client'

import { useEffect, useRef, useState } from 'react'
import useIsMobile from './useIsMobile'

const useTip = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [tooltipId, setTooltipId] = useState<string | null>('connect')
  const isMobile = useIsMobile()
  const [isVisibleToolTip, setIsVisibleTooltip] = useState(false)
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)

  const closeTooltip = () => {
    setTooltipId(null)
    setIsVisibleTooltip(false)
  }

  const showTooltip = (area: { id: string }, e: React.MouseEvent) => {
    setTooltipId(area.id)
    setIsVisibleTooltip(area.id !== 'mint')
    const x = e.clientX
    const y = e.clientY

    const container = document.getElementById('container')
    if (container) {
      setTooltipX(container.scrollLeft + x)
      setTooltipY(container.scrollTop + y)
    }
  }

  useEffect(() => {
    const windowWidth = document.documentElement.clientWidth
    const windowHeight = document.documentElement.clientHeight
    setWidth(windowWidth)
    setHeight(windowHeight)
  }, [isMobile])

  return {
    isVisibleToolTip,
    tooltipX,
    tooltipY,
    showTooltip,
    closeTooltip,
    tooltipId,
    width,
    height,
    imageRef,
  }
}

export default useTip
