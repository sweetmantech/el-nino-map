import { ReactNode } from 'react'

const Modal = ({ onClose, children }: { onClose: () => void; children: ReactNode }) => {
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
