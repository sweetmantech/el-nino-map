import { useState } from 'react'
import usePurchase from './usePurchase'
import useAreaDetection from './useAreaDetection'

interface Laylo {
  openPopup: (options: {
    id: string
    minimal: boolean
    customCTA: string
    color: string
    theme: string
    background: string
    fullWidth: boolean
    secondsToWait: number
  }) => void
}

declare global {
  interface Window {
    laylo?: Laylo
  }
}

const useMap = () => {
  const [mapperKey, setMapperKey] = useState(0)
  const { isCrossmintOpen, setIsCrossmintOpen, mint, purchasing } = usePurchase()
  const [isSpinampOpen, setIsSpinampOpen] = useState(false)
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
  const [isMetadataOpen, setIsMetadataOpen] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false)
  const [isHypersubOpen, setIsHypersubOpen] = useState(false)
  const [isMemoriesOpen, setIsMemoriesOpen] = useState(false)
  const [isPlannetOpen, setIsPlannetOpen] = useState(false)
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false)
  const { handleMouseMove, area } = useAreaDetection()

  const clickMap = () => {
    console.log('ziad')
    if (area === 'spinamp') setIsSpinampOpen(!isSpinampOpen)
    if (area === 'leaderboard') setIsLeaderboardOpen(!isLeaderboardOpen)
    if (area === 'metadata') setIsMetadataOpen(!isMetadataOpen)
    if (area === 'video') setIsVideoOpen(!isVideoOpen)
    if (area === 'merch') window.open('http://shopxcelencia.com/', '_blank')
    if (area === 'live-show') setIsComingSoonOpen(!isComingSoonOpen)
    if (area === 'mint') mint()
    if (area === 'control') setIsGuestbookOpen(!isGuestbookOpen)
    if (area === 'subscribe') setIsHypersubOpen(!isHypersubOpen)
    if (area === 'memories') setIsMemoriesOpen(!isMemoriesOpen)
    if (area === 'plannet') setIsPlannetOpen(true)
  }

  return {
    clickMap,
    isCrossmintOpen,
    setIsCrossmintOpen,
    isLeaderboardOpen,
    setIsLeaderboardOpen,
    mapperKey,
    setMapperKey,
    purchasing,
    isSpinampOpen,
    setIsSpinampOpen,
    isMetadataOpen,
    setIsMetadataOpen,
    isVideoOpen,
    setIsVideoOpen,
    isGuestbookOpen,
    setIsGuestbookOpen,
    isHypersubOpen,
    setIsHypersubOpen,
    isMemoriesOpen,
    setIsMemoriesOpen,
    isPlannetOpen,
    setIsPlannetOpen,
    isComingSoonOpen,
    setIsComingSoonOpen,
    handleMouseMove,
  }
}

export default useMap
