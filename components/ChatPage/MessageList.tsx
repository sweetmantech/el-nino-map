'use client'

import { useEffect, useRef } from 'react'
import { type Message } from '@ai-sdk/react'

interface MessageListProps {
  messages: Message[]
}

const MessageList = ({ messages }: MessageListProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div 
      ref={messagesContainerRef} 
      className="h-full overflow-y-auto p-4 space-y-4"
      style={{ scrollBehavior: 'smooth' }}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Start a conversation...</p>
        </div>
      ) : (
        messages.map((message) => (
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
              <div className="font-medium">
                {message.parts?.map((part, index) => {
                  if (part.type === 'text') {
                    return <span key={index}>{part.text}</span>
                  }
                  return null
                })}
                {/* Fallback to content if parts is empty */}
                {(!message.parts || message.parts.length === 0) && message.content}
              </div>
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
        ))
      )}
    </div>
  )
}

export default MessageList