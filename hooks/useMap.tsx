import { useRouter } from 'next/navigation'
import { CustomArea } from 'react-img-mapper'
import { useState } from 'react'
import usePurchase from './usePurchase'

const useMap = () => {
  const { push } = useRouter()
  const [mapperKey, setMapperKey] = useState(0)
  const { isCrossmintOpen, setIsCrossmintOpen, mint, purchasing } = usePurchase()
  const [isSpinampOpen, setIsSpinampOpen] = useState(false)

  const clickMap = (area: CustomArea) => {
    if (area.id === 'spinamp') {
      setIsSpinampOpen(!isSpinampOpen)
      return
    }

    if (area.id === 'leaderboard') {
      push('/leaderboard')
    }

    if (area.id === 'mint') {
      mint()
    }
  }

  return {
    clickMap,
    isCrossmintOpen,
    setIsCrossmintOpen,
    mapperKey,
    setMapperKey,
    purchasing,
    isSpinampOpen,
    setIsSpinampOpen,
  }
}

export default useMap
