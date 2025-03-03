import { ReactNode, useEffect } from 'react'
import PulsatingGlow from './ui/pulsating-glow'

const Modal = ({ onClose = () => {}, children }: { onClose?: () => void; children: ReactNode }) => {
  useEffect(() => {
    const handleEscapeEvent = (e) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEscapeEvent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[100] w-screen h-screen">
      <div
        className="absolute left-0 top-0 w-full h-full z-[15]
              flex items-center justify-center"
        onClick={(e: any) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <PulsatingGlow>{children}</PulsatingGlow>
      </div>
    </div>
  )
}

export default Modal
