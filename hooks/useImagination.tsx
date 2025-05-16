import getMemoriesPoints from '@/lib/stack/getMemoriesPoints'
import { useEffect, useState } from 'react'

const useImagination = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const init = async () => {
      const points = await getMemoriesPoints()
      const filtered = points.filter(
        (point) =>
          point.metadata.url.includes('instagram.com') ||
          point.metadata.url.includes('warpcast.com'),
      )
      setEvents(filtered)
    }
    init()
  }, [])

  return {
    events,
  }
}

export default useImagination
