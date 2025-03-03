'use client'

import { useEffect, useState } from 'react'
import getLoginEvents from '@/lib/stack/getLoginPoints'
import trackLoginPoints from '@/lib/stack/trackLoginPoints'
import { useActiveAccount } from 'thirdweb/react'
import { Account } from 'thirdweb/wallets'
import Modals from './Modals'
import { useMapProvider } from '@/providers/MapProvider'
import Tooltip from './Tooltip'
import getTooltipText from '@/lib/getTooltipText'
import calculateScaledSize from '@/lib/calculateScaledSize'
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
  const [pulsatingCenter, setPulsatingCenter] = useState<{ x: number; y: number } | null>(null)

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

  const handleMoseMoveWithPosition = (e) => {
    const centerCoords = handleMouseMove(e)
    if (centerCoords) {
      setPulsatingCenter(centerCoords)
      return
    }
    setPulsatingCenter(null)
  }
  return (
    <div id="container">
      <TransformWrapper initialScale={1.1} centerOnInit>
        <TransformComponent
          contentProps={{
            onMouseMove: handleMoseMoveWithPosition,
            onClick: clickMap,
          }}
          wrapperClass={`!w-screen !h-screen !overflow-hidden bg-[url('/images/background.png')] bg-cover bg-center`}
        >
          <div ref={imageRef} className="size-full relative">
            <ImageMapper
              src="/images/xcelencia-web-elements_only.png"
              map={map}
              responsive
              parentWidth={calculateScaledSize(width, height).width}
            />
            {pulsatingCenter && imageRef.current && (
              <div
                className="absolute rounded-full animate-glow pointer-events-none bg-[#ef4444] opacity-[0.6] blur-[25px] w-[200px] h-[200px]"
                style={{
                  left: (pulsatingCenter.x / 8000) * calculateScaledSize(width, height).width - 100,
                  top: (pulsatingCenter.y / 4500) * calculateScaledSize(width, height).height - 100,
                }}
              />
            )}
          </div>
          F
        </TransformComponent>
      </TransformWrapper>
      {isVisibleToolTip && <Tooltip text={getTooltipText(tooltipId)} x={tooltipX} y={tooltipY} />}
      <Modals />
    </div>
  )
}

export default LandingPage
