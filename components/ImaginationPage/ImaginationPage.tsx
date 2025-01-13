'use client'

import useImagination from '@/hooks/useImagination'
import Imagination from './Imagination'

const ImaginationPage = () => {
  const { events } = useImagination()
  return (
    <div className="w-full grid grid-cols-3 mx-auto max-w-3xl pt-20 gap-2">
      {events.map((event) => (
        <Imagination key={event.metadata.uniqueId} event={event} />
      ))}
    </div>
  )
}

export default ImaginationPage
