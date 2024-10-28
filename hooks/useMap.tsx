import { CustomArea } from 'react-img-mapper'
import { useState } from 'react'
import usePurchase from './usePurchase'

const useMap = () => {
  const [mapperKey, setMapperKey] = useState(0)
  const { isCrossmintOpen, setIsCrossmintOpen, mint, purchasing } = usePurchase()
  const [isSpinampOpen, setIsSpinampOpen] = useState(false)
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
  const [isMetadataOpen, setIsMetadataOpen] = useState(false)

  const clickMap = (area: CustomArea) => {
    if (area.id === 'spinamp') {
      setIsSpinampOpen(!isSpinampOpen)
      return
    }

    if (area.id === 'leaderboard') {
      setIsLeaderboardOpen(!isLeaderboardOpen)
      return
    }

    if (area.id === 'metadata') {
      setIsMetadataOpen(!isMetadataOpen)
      return
    }
    if (area.id === 'mint') {
      mint()
    }
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
  }
}

export default useMap
