import { useState } from 'react'
import useAreaDetection from './useAreaDetection'
import { useRouter } from 'next/navigation'

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
  const { push } = useRouter()
  const [mapperKey, setMapperKey] = useState(0)
  const [isSpinampOpen, setIsSpinampOpen] = useState(false)
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
  const [isMetadataOpen, setIsMetadataOpen] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isHypersubOpen, setIsHypersubOpen] = useState(false)
  const [isMemoriesOpen, setIsMemoriesOpen] = useState(false)
  const [isPlannetOpen, setIsPlannetOpen] = useState(false)
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false)
  const { handleMouseMove, area } = useAreaDetection()

  const clickMap = () => {
    if (area === 'spinamp') setIsSpinampOpen(!isSpinampOpen)
    if (area === 'leaderboard') setIsLeaderboardOpen(!isLeaderboardOpen)
    if (area === 'metadata') setIsMetadataOpen(!isMetadataOpen)
    if (area === 'video') setIsVideoOpen(!isVideoOpen)
    if (area === 'merch') window.open('http://shopxcelencia.com/', '_blank')
    if (area === 'live-show') setIsComingSoonOpen(!isComingSoonOpen)
    if (area === 'control') push('/inventory')
    if (area === 'subscribe') setIsHypersubOpen(!isHypersubOpen)
    if (area === 'memories') setIsMemoriesOpen(!isMemoriesOpen)
    if (area === 'plannet') setIsPlannetOpen(true)
  }

  return {
    clickMap,
    isLeaderboardOpen,
    setIsLeaderboardOpen,
    mapperKey,
    setMapperKey,
    isSpinampOpen,
    setIsSpinampOpen,
    isMetadataOpen,
    setIsMetadataOpen,
    isVideoOpen,
    setIsVideoOpen,
    isHypersubOpen,
    setIsHypersubOpen,
    isMemoriesOpen,
    setIsMemoriesOpen,
    isPlannetOpen,
    setIsPlannetOpen,
    isComingSoonOpen,
    setIsComingSoonOpen,
    handleMouseMove,
    area,
  }
}

export default useMap
