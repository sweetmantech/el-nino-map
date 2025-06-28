'use client'

import { useEffect, useRef } from 'react'
import { type Message } from '@ai-sdk/react'
import ChatMarkdown from './ChatMarkdown'
import Thinking from './Thinking'

interface MessageListProps {
  messages: Message[]
  status?: string
}

const MessageList = ({ messages, status }: MessageListProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
      {messages.map((message) => (
        <div key={message.id} className={`${message.role === 'user' ? 'text-right' : 'text-left'}`}>
          <div
            className={`inline-block max-w-xs lg:max-w-md ${
              message.role === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
            } px-4 py-3 rounded-lg`}
          >
            <div className="font-medium">
              {message.parts?.map((part, index) => {
                if (part.type === 'text') {
                  return <ChatMarkdown key={index} content={part.text} className="text-inherit" />
                }
                return null
              })}
              {/* Fallback to content if parts is empty */}
              {(!message.parts || message.parts.length === 0) && message.content && (
                <ChatMarkdown content={message.content} className="text-inherit" />
              )}
            </div>
            <p
              className={`text-xs mt-1 ${
                message.role === 'user' ? 'text-gray-300' : 'text-gray-500'
              }`}
            >
              {message.createdAt
                ? new Date(message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''}
            </p>
          </div>
        </div>
      ))}

      {(status === 'submitted' || status === 'streaming') && <Thinking />}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
