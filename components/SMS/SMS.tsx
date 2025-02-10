import Script from 'next/script'
import Modal from '../Modal'
import { useState } from 'react'
import { Skeleton } from '../ui/skeleton'

const SMS = ({ onClose }: { onClose: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <Modal onClose={onClose}>
      <div className="min-w-[500px] p-3 bg-black rounded-md" id="sms">
        <Script
          src="https://embed.laylo.com/laylo-sdk.js"
          strategy="afterInteractive"
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
    </Modal>
  )
}

export default SMS
