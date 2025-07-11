'use client'

import { BaseChatInput } from '@/components/Chat'

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (event?: { preventDefault?: () => void }) => void
  status?: string
}

const MessageInput = ({ value, onChange, onSubmit, status = '' }: MessageInputProps) => {
  return (
    <div className="bg-white border-t border-gray-200 p-6">
      <div className="max-w-2xl mx-auto">
        <BaseChatInput
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          status={status}
          variant="default"
          placeholder="Type a message..."
        />
      </div>
    </div>
  )
}

export default MessageInput