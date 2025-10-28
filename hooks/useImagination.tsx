import getMemoriesPoints from '@/lib/stack/getMemoriesPoints'
import { useEffect, useState } from 'react'

interface MemoryEvent {
  uniqueId: string
  metadata: {
    url: string
    message?: string
  }
}

const useImagination = () => {
  const [events, setEvents] = useState<MemoryEvent[]>([])

  useEffect(() => {
    const init = async () => {
      const points = await getMemoriesPoints()
      const filtered = points.filter(
        (point: MemoryEvent) =>
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
