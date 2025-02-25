'use client'

import { useEffect } from 'react'
import getLoginEvents from '@/lib/stack/getLoginPoints'
import trackLoginPoints from '@/lib/stack/trackLoginPoints'
import { useActiveAccount } from 'thirdweb/react'
import { Account } from 'thirdweb/wallets'
import Modals from './Modals'
import { useMapProvider } from '@/providers/MapProvider'
import Tooltip from './Tooltip'
import getTooltipText from '@/lib/getTooltipText'
import calculateScaledWidth from '@/lib/calculateScaledWidth'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
import { useTipProvider } from '@/providers/TipProvider'

const LandingPage = () => {
  const { isVisibleToolTip, tooltipX, tooltipY, tooltipId, width, height, imageRef } =
    useTipProvider()

  const { clickMap, setMapperKey, handleMouseMove } = useMapProvider()
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
    <div id="container">
      <TransformWrapper initialScale={1.1} centerOnInit>
        <TransformComponent
          contentProps={{
            onMouseMove: handleMouseMove,
            onClick: clickMap,
          }}
          wrapperClass={`!w-screen !h-screen !overflow-hidden bg-[url('/images/background.png')] bg-cover bg-center`}
        >
          <div ref={imageRef} style={{ width: '100%', height: '100%' }}>
            <ImageMapper
              src="/images/xcelencia-web-elements_only.png"
              map={map}
              responsive
              parentWidth={calculateScaledWidth(width, height)}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
      {isVisibleToolTip && <Tooltip text={getTooltipText(tooltipId)} x={tooltipX} y={tooltipY} />}
      <Modals />
    </div>
  )
}

export default LandingPage
