'use client'

import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
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
import calculateScaledWidth from '@/lib/calculateScaledWidth'

const LandingPage = () => {
  const {
    showTooltip,
    closeTooltip,
    isVisibleToolTip,
    isDialogOpen,
    tooltipX,
    tooltipY,
    tooltipId,
    width,
    height,
    scale,
  } = useDialog()

  const { clickMap, mapperKey, setMapperKey, purchasing } = useMapProvider()
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
      className={`relative h-screen w-screen overflow-auto bg-[#1125a8] flex
      ${width > scale * calculateScaledWidth(width, height) && 'justify-center'}
      ${height > scale * height && 'items-center'}`}
      id="container"
    >
      <div className="relative z-[2]" id="map">
        <ImageMapper
          src="/images/home.jpg"
          map={map}
          responsive
          parentWidth={scale * calculateScaledWidth(width, height)}
          onMouseMove={(area, index, e) => showTooltip(area, e)}
          onMouseLeave={closeTooltip}
          onClick={clickMap}
          key={`${mapperKey}`}
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
