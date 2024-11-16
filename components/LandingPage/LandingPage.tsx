'use client'

import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
import { useMeasure } from 'react-use'
import useDialog from '@/hooks/useDialog'
import Dialog from './Dialog'
import { useEffect } from 'react'
import getLoginEvents from '@/lib/stack/getLoginPoints'
import trackLoginPoints from '@/lib/stack/trackLoginPoints'
import getTooltipText from '@/lib/getTooltipText'
import { useActiveAccount } from 'thirdweb/react'
import CreditCardPayModal from '../CreditCardPayModal'
import { Account } from 'thirdweb/wallets'
import useMap from '@/hooks/useMap'
import SpinampPlayer from './SpinampPlayer'
import Leaderboard from '../Leaderboard'
import Metadata from '../Metadata'
import Video from '../Video'
import GuestBook from '../GuestBook'
import Hypersub from '../Hypersub'

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

  const {
    clickMap,
    isCrossmintOpen,
    setIsCrossmintOpen,
    mapperKey,
    setMapperKey,
    purchasing,
    isSpinampOpen,
    isLeaderboardOpen,
    setIsLeaderboardOpen,
    isMetadataOpen,
    setIsMetadataOpen,
    isVideoOpen,
    setIsVideoOpen,
    isHypersubOpen,
    setIsHypersubOpen,
    isGuestbookOpen,
    setIsGuestbookOpen,
  } = useMap()

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
      flex items-center justify-center bg-[#352d69]"
      ref={containerRef}
      onClick={close}
    >
      {isSpinampOpen && <SpinampPlayer />}
      {isLeaderboardOpen && (
        <Leaderboard onClose={() => setIsLeaderboardOpen(!isLeaderboardOpen)} />
      )}
      {isMetadataOpen && <Metadata onClose={() => setIsMetadataOpen(!isMetadataOpen)} />}
      {isVideoOpen && <Video onClose={() => setIsVideoOpen(!isVideoOpen)} />}

      <div className="cursor-pointer relative z-[2]">
        <ImageMapper
          src="/images/home.jpg"
          map={map}
          responsive
          parentWidth={(height / 1620) * 2880}
          onMouseMove={(area, index, e) => showTooltip(area, e)}
          onMouseLeave={closeTooltip}
          onClick={clickMap}
          key={`${mapperKey} ${isSpinampOpen}`}
          disabled={purchasing}
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
          {getTooltipText(tooltipId)}
        </div>
      )}
      {isDialogOpen && <Dialog />}
      {isCrossmintOpen && <CreditCardPayModal onClose={() => setIsCrossmintOpen(false)} />}
      {isGuestbookOpen && <GuestBook onClose={() => setIsGuestbookOpen(false)} />}
      {isHypersubOpen && <Hypersub onClose={() => setIsHypersubOpen(false)} />}
    </div>
  )
}

export default LandingPage
