import getMemoriesPoints from '@/lib/stack/getMemoriesPoints'
import { useEffect, useState } from 'react'

const useImagination = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const init = async () => {
      const points = await getMemoriesPoints()
      setEvents(points)
    }
    init()
  }, [])

  return {
    events,
  }
}

export default useImagination
