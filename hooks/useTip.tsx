'use client'

import { useEffect, useRef, useState } from 'react'
import useIsMobile from './useIsMobile'

const useTip = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [tooltipId, setTooltipId] = useState('connect')
  const isMobile = useIsMobile()
  const [isVisibleToolTip, setIsVisibleTooltip] = useState(false)
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)

  const closeTooltip = () => {
    setIsVisibleTooltip(false)
  }

  const showTooltip = (area: any, e: any) => {
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
