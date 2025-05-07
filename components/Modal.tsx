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

    window.addEventListener('keydown', handleEscapeEvent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!open) return <Fragment />

  return (
    <div className="fixed left-0 top-0 z-[100] w-screen h-screen">
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
