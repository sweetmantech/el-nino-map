'use client'

import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
import { useMeasure } from 'react-use'
import useDialog from '@/hooks/useDialog'
import Dialog from './Dialog'
import { useAccount, useConnect } from 'wagmi'
import { Address } from 'viem'
import { useEffect, useState } from 'react'
import { useStackProvider } from '@/providers/StackProvider'

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

  const { address } = useAccount()
  const { connectors, connect } = useConnect()
  const connector = connectors[0]
  const [mapperKey, setMapperKey] = useState(0)
  const { loginEvents } = useStackProvider()

  const handleClick = (connectedWallet: Address) => {
    if (connectedWallet) {
      show()
      return
    }

    connect({ connector })
  }

  useEffect(() => {
    if (address || loginEvents) setMapperKey(Math.floor(Math.random() * 1000))
  }, [address, loginEvents])

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
          onClick={() => handleClick(address as Address)}
          key={mapperKey}
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
