'use client'

import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
import { useMeasure } from 'react-use'
import useDialog from '@/hooks/useDialog'
import Dialog from './Dialog'

const LandingPage = () => {
  const [containerRef, { height }] = useMeasure() as any
  const {
    closeDlg,
    showTooltip,
    closeTooltip,
    showDlg,
    isVisibleToolTip,
    isDialogOpen,
    tooltipX,
    tooltipY,
  } = useDialog()

  return (
    <div
      className="relative bg-center bg-cover bg-[url('/images/home.jpg')]
      w-screen h-screen overflow-hidden
      flex items-center justify-center"
      ref={containerRef}
      onClick={closeDlg}
    >
      <div className="cursor-pointer relative">
        <ImageMapper
          src="/images/space-station.png"
          map={map}
          responsive
          parentWidth={(height / 870 / 4) * 836}
          onMouseMove={(area, index, e) => showTooltip(e)}
          onMouseLeave={closeTooltip}
          onClick={showDlg}
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
