'use client'

import { useEffect, useRef } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

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
          className={`${message.sender === 'user' ? 'text-right' : 'text-left'}`}
        >
          <div
            className={`inline-block max-w-xs lg:max-w-md ${
              message.sender === 'user'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-900'
            } px-4 py-3 rounded-lg`}
          >
            <p className="font-medium">{message.text}</p>
            <p className={`text-xs mt-1 ${
              message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
            }`}>
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList