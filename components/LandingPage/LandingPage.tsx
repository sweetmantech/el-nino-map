'use client'

import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
import { useMeasure } from 'react-use'
import useDialog from '@/hooks/useDialog'
import { useEffect } from 'react'
import getLoginEvents from '@/lib/stack/getLoginPoints'
import trackLoginPoints from '@/lib/stack/trackLoginPoints'
import { useActiveAccount } from 'thirdweb/react'
import { Account } from 'thirdweb/wallets'
import Modals from './Modals'
import { useMapProvider } from '@/providers/MapProvider'
import Dialog from './Dialog'
import Tooltip from './Tooltip'
import getTooltipText from '@/lib/getTooltipText'

const LandingPage = () => {
  const [containerRef, { height }] = useMeasure() as any
  const {
    close,
    showTooltip,
    closeTooltip,
    isVisibleToolTip,
    isDialogOpen,
    tooltipX,
    tooltipY,
    tooltipId,
  } = useDialog()

  const { clickMap, mapperKey, setMapperKey, purchasing, isSpinampOpen } = useMapProvider()

  const activeAccount: Account = useActiveAccount()
  const address = activeAccount?.address

  useEffect(() => {
    const init = async () => {
      if (address) {
        const events: any = await getLoginEvents(address)
        if (!events?.length && !events.error) {
          await trackLoginPoints(address)
        }
        setMapperKey(Math.floor(Math.random() * 1000))
      }
    }

    if (!address) return

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <div
      className="relative w-screen h-screen overflow-hidden
      flex items-center justify-center bg-[#1125a8]"
      ref={containerRef}
      onClick={close}
    >
      <div className="cursor-pointer relative z-[2]">
        <ImageMapper
          src="/images/home.jpg"
          map={map}
          responsive
          parentWidth={(height / 4500) * 8000}
          onMouseMove={(area, index, e) => showTooltip(area, e)}
          onMouseLeave={closeTooltip}
          onClick={clickMap}
          key={`${mapperKey} ${isSpinampOpen}`}
          disabled={purchasing}
        />
      </div>
      {isVisibleToolTip && <Tooltip text={getTooltipText(tooltipId)} x={tooltipX} y={tooltipY} />}
      {isDialogOpen && <Dialog />}
      <Modals />
    </div>
  )
}

export default LandingPage
