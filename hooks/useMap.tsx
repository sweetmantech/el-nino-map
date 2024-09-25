import { useRouter } from 'next/navigation'
import { useActiveAccount, useConnectModal } from 'thirdweb/react'
import { baseSepolia } from 'thirdweb/chains'
import { client } from '@/lib/thirdweb/client'
import { CustomArea } from 'react-img-mapper'
import { useState } from 'react'
import { wallets } from '@/lib/thirdweb/wallets'
import usePurchase from './usePurchase'

const useMap = () => {
  const { push } = useRouter()
  const { connect } = useConnectModal()
  const activeAccount = useActiveAccount()
  const [mapperKey, setMapperKey] = useState(0)
  const { isCrossmintOpen, setIsCrossmintOpen, mint, purchasing } = usePurchase()

  const clickMap = async (area: CustomArea, show: any) => {
    const address = activeAccount?.address
    if (area.id === 'connect') {
      if (address) {
        show()
        return
      }

      await connect({
        client,
        wallets,
        chain: baseSepolia,
      })
      window.location.reload()
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
  }
}

export default useMap
