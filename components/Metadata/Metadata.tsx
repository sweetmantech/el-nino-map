'use client'

import { X } from 'lucide-react'
import Modal from '../Modal'
import Chat from '../ChatPage/Chat'

const Metadata = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <div
        className="w-[500px] h-[600px] max-w-[90vw] max-h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden"
        id="metadata"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0 bg-white">
          <p className="font-titilliumweb text-xl font-semibold text-gray-900">
            El Niño Maravilla Pt. 1
          </p>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors p-1"
          >
            <X className="size-5" />
          </button>
        </div>
        <Chat className="flex-1 min-h-0" />
      </div>
    </Modal>
  )
}

export default Metadata
