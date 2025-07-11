'use client'

import { useEffect, useRef } from 'react'
import { type Message } from '@ai-sdk/react'
import { BaseChatMessage, BaseChatThinking } from '@/components/Chat'

interface MessageListProps {
  messages: Message[]
  status?: string
}

const MessageList = ({ messages, status }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message) => (
        <BaseChatMessage
          key={message.id}
          message={message}
          variant="default"
          showTimestamp={true}
        />
      ))}

      {(status === "submitted" || status === "streaming") && (
        <BaseChatThinking variant="default" text="Hmm..." />
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList