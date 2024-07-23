'use client'

import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
import { useMeasure } from 'react-use'
import { useState } from 'react'

const LandingPage = () => {
  const [containerRef, { height }] = useMeasure() as any
  const [isVisibleToolTip, setIsVisibleTooltip] = useState(false)
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)

  const showTooltip = (e: any) => {
    setIsVisibleTooltip(true)
    const x = e.clientX
    const y = e.clientY

    setTooltipX(x)
    setTooltipY(y)
  }

  return (
    <div
      className="bg-center bg-cover bg-[url('/images/home.jpg')] bg-center
      w-full h-full flex items-center justify-center"
      ref={containerRef}
    >
      <div className="cursor-pointer">
        <ImageMapper
          src="/images/space-station.png"
          map={map}
          responsive
          parentWidth={(height / 870) * 836}
          onMouseMove={(area, index, e) => showTooltip(e)}
          onMouseLeave={() => setIsVisibleTooltip(false)}
        />
      </div>
      {isVisibleToolTip && (
        <div
          className="bubble-name"
          style={{
            left: tooltipX,
            top: tooltipY,
          }}
        >
          El Niño Estrella is a multimedia experience. The smart album is a limited edition digital
          box set
        </div>
      )}
    </div>
  )
}

export default LandingPage
