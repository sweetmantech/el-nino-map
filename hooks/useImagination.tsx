import getMemoriesPoints from '@/lib/stack/getMemoriesPoints'
import { useEffect, useState } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { Account } from 'thirdweb/wallets'

const useImagination = () => {
  const [events, setEvents] = useState([])
  const activeAccount: Account = useActiveAccount()
  const address = activeAccount?.address

  useEffect(() => {
    const init = async () => {
      const points = await getMemoriesPoints(address)
      setEvents(points)
    }
    if (!address) return
    init()
  }, [address])

  return {
    events,
  }
}

export default useImagination
