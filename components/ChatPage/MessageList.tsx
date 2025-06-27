'use client'

import { useEffect, useRef } from 'react'
import { type Message } from '@ai-sdk/react'

interface MessageListProps {
  messages: Message[]
}

const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${message.role === 'user' ? 'text-right' : 'text-left'}`}
        >
          <div
            className={`inline-block max-w-xs lg:max-w-md ${
              message.role === 'user'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-900'
            } px-4 py-3 rounded-lg`}
          >
            <p className="font-medium">{message.content}</p>
            <p className={`text-xs mt-1 ${
              message.role === 'user' ? 'text-gray-300' : 'text-gray-500'
            }`}>
              {message.createdAt ? new Date(message.createdAt).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              }) : ''}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList