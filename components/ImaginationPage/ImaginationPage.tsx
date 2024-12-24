'use client'

import useImagination from '@/hooks/useImagination'

const ImaginationPage = () => {
  const { events } = useImagination()

  return (
    <div className="w-full grid grid-cols-3 mx-auto max-w-3xl pt-20 gap-2">
      {events.map((event) => (
        <div key={event.metadata.uniqueId} className="border-[2px] rounded-md p-2 border-black">
          <p>POST URL: {event.metadata.url}</p>
          {event.metadata.message && <p>Message: {event.metadata.message}</p>}
        </div>
      ))}
    </div>
  )
}

export default ImaginationPage
