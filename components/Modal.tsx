import { Fragment, ReactNode, useEffect } from 'react'

const Modal = ({
  onClose = () => {},
  children,
  open = true,
}: {
  onClose?: () => void
  children: ReactNode
  open?: boolean
}) => {
  useEffect(() => {
    const handleEscapeEvent = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (open) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscapeEvent)
    }

    return () => {
      // Restore body scroll when modal closes
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscapeEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return <Fragment />

  return (
    <div className="fixed left-0 top-0 z-[100] w-screen h-screen bg-black bg-opacity-50">
      <div
        className="absolute left-0 top-0 w-full h-full z-[15]
              flex items-center justify-center"
        onClick={(e: any) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
