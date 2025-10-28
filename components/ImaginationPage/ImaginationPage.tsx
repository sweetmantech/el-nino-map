'use client'

import useImagination from '@/hooks/useImagination'
import Imagination from './Imagination'

const ImaginationPage = () => {
  const { events } = useImagination()
  return (
    <div className="w-full flex flex-wrap px-10 pt-20 gap-2">
      {events.map((event) => (
        <Imagination key={event.uniqueId} event={event} />
      ))}
    </div>
  )
}

export default ImaginationPage
