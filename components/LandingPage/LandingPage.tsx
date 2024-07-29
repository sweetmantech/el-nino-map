'use client'

import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
import { useMeasure } from 'react-use'
import useDialog from '@/hooks/useDialog'
import Dialog from './Dialog'

const LandingPage = () => {
  const [containerRef, { height }] = useMeasure() as any
  const {
    close,
    showTooltip,
    closeTooltip,
    show,
    isVisibleToolTip,
    isDialogOpen,
    tooltipX,
    tooltipY,
  } = useDialog()

  return (
    <div
      className="relative w-screen h-screen overflow-hidden
      flex items-center justify-center bg-background"
      ref={containerRef}
      onClick={close}
    >
      <div className="cursor-pointer relative">
        <ImageMapper
          src="/images/home.jpeg"
          map={map}
          responsive
          parentWidth={(height / 914) * 1600}
          onMouseMove={(area, index, e) => showTooltip(e)}
          onMouseLeave={closeTooltip}
          onClick={show}
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
      {isDialogOpen && <Dialog />}
    </div>
  )
}

export default LandingPage
