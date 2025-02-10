import { CustomArea } from 'react-img-mapper'
import { useState } from 'react'
import usePurchase from './usePurchase'

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

  const clickMap = (area: CustomArea) => {
    if (area.id === 'spinamp') setIsSpinampOpen(!isSpinampOpen)
    if (area.id === 'leaderboard') setIsLeaderboardOpen(!isLeaderboardOpen)
    if (area.id === 'metadata') setIsMetadataOpen(!isMetadataOpen)
    if (area.id === 'video') setIsVideoOpen(!isVideoOpen)
    if (area.id === 'merch') window.open('http://shopxcelencia.com/', '_blank')
    if (area.id === 'live-show') setIsComingSoonOpen(!isComingSoonOpen)
    if (area.id === 'mint') mint()
    if (area.id === 'control') setIsGuestbookOpen(!isGuestbookOpen)
    if (area.id === 'subscribe') setIsHypersubOpen(!isHypersubOpen)
    if (area.id === 'memories') setIsMemoriesOpen(!isMemoriesOpen)
    if (area.id === 'plannet') setIsPlannetOpen(!isPlannetOpen)
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
  }
}

export default useMap
