import { ReactNode, useEffect } from 'react'

const Modal = ({ onClose, children }: { onClose: () => void; children: ReactNode }) => {
  useEffect(() => {
    const handleEscapeEvent = (e) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEscapeEvent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="absolute left-0 top-0 w-full h-full z-[15]
          flex items-center justify-center"
      onClick={(e: any) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {children}
    </div>
  )
}

export default Modal
