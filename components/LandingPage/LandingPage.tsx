'use client'

import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
import { useMeasure } from 'react-use'

const LandingPage = () => {
  const [containerRef, { height }] = useMeasure() as any

  const showTooltip = () => {
    console.log('ZIAD HERE')
  }

  return (
    <div
      className="bg-center bg-cover bg-[url('/images/home.jpg')] bg-center
      w-full h-full flex items-center justify-center"
      ref={containerRef}
    >
      <ImageMapper
        src="/images/space-station.png"
        map={map}
        responsive
        parentWidth={(height / 870) * 836}
        onMouseMove={showTooltip}
      />
    </div>
  )
}

export default LandingPage
