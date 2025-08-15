import { useState } from 'react'
import useAreaDetection from './useAreaDetection'
import { useRouter } from 'next/navigation'
import { usePurchaseProvider } from '@/providers/PurchaseProvider'
import useIsMobile from './useIsMobile'

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
  const [isMusicOpen, setIsMusicOpen] = useState(false)
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
  const [isMetadataOpen, setIsMetadataOpen] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [isMemoriesOpen, setIsMemoriesOpen] = useState(false)
  const [isPlannetOpen, setIsPlannetOpen] = useState(false)
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false)
  const { handleMouseMove, area } = useAreaDetection()
  const { setIsOpenCollect } = usePurchaseProvider()
  const isMobile = useIsMobile()

  const clickMap = () => {
    if (area === 'music') setIsMusicOpen(!isMusicOpen)
    if (area === 'leaderboard') setIsLeaderboardOpen(!isLeaderboardOpen)
    if (area === 'metadata') setIsMetadataOpen(!isMetadataOpen)
    if (area === 'video') setIsVideoOpen(!isVideoOpen)
    if (area === 'merch') window.open('http://shopxcelencia.com/', '_blank')
    if (area === 'live-show') setIsComingSoonOpen(!isComingSoonOpen)
    if (area === 'control') push('/inventory')
    if (area === 'subscribe') setIsSubscribeOpen(!isSubscribeOpen)
    if (area === 'memories') setIsMemoriesOpen(!isMemoriesOpen)
    if (area === 'plannet') setIsPlannetOpen(true)
    if (isMobile && area === 'mint') setIsOpenCollect(true)
  }

  return {
    clickMap,
    isLeaderboardOpen,
    setIsLeaderboardOpen,
    mapperKey,
    setMapperKey,
    isMusicOpen,
    setIsMusicOpen,
    isMetadataOpen,
    setIsMetadataOpen,
    isVideoOpen,
    setIsVideoOpen,
    isSubscribeOpen,
    setIsSubscribeOpen,
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
