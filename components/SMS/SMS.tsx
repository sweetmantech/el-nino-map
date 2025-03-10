import Script from 'next/script'
import { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import { useMapProvider } from '@/providers/MapProvider'

const SMS = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { isPlannetOpen, setIsPlannetOpen } = useMapProvider()

  useEffect(() => {
    const handleEscapeEvent = (e) => {
      if (e.key === 'Escape') {
        setIsPlannetOpen(() => false)
      }
    }

    window.addEventListener('keydown', handleEscapeEvent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`fixed left-0 top-0 z-[100] w-screen h-screen ${isPlannetOpen ? 'block' : 'hidden pointer-events-none'}`}
    >
      <div
        className="absolute left-0 top-0 w-full h-full z-[150] flex items-center justify-center"
        onClick={(e: any) => {
          if (e.target === e.currentTarget) {
            setIsPlannetOpen(false)
          }
        }}
      >
        <div className="min-w-[500px] p-3 bg-black rounded-md" id="sms">
          <Script
            src="https://embed.laylo.com/laylo-sdk.js"
            // strategy="afterInteractive"
            async
            onLoad={() => {
              setIsLoaded(true)
            }}
          />
          {isLoaded ? (
            <iframe
              title="Counter Down"
              id="laylo-drop-d6tew"
              frameBorder={0}
              scrolling="no"
              src="https://embed.laylo.com?dropId=d6tew&color=FF7300&minimal=false&theme=dark"
              allow="web-share"
              allowTransparency
              className="w-[100%]"
            />
          ) : (
            <Skeleton className="w-full h-[200px] bg-grey" />
          )}
        </div>
      </div>
    </div>
  )
}

export default SMS
