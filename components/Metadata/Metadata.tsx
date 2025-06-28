'use client'

import { X } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import Modal from '../Modal'
import MessageList from '../ChatPage/MessageList'
import MessageInput from '../ChatPage/MessageInput'

const Metadata = ({ onClose }: { onClose: () => void }) => {
  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    api: 'https://chat.recoupable.com/api/chat',
    body: {
      artistId: 'eaa2fb07-5a4b-4710-9c0d-4a74db3612d2',
      accountId: '46cd41de-88a8-4839-b03b-264a8566cccf',
    },
  })

  return (
    <Modal onClose={onClose}>
      <div className="w-[500px] h-[600px] max-w-[90vw] max-h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden" id="metadata">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0 bg-white">
          <p className="font-titilliumweb text-xl font-semibold text-gray-900">El Niño Maravilla Pt. 1</p>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors p-1"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 min-h-0">
            <MessageList messages={messages} />
          </div>
          <div className="flex-shrink-0 border-t border-gray-200 bg-white">
            <MessageInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Metadata
