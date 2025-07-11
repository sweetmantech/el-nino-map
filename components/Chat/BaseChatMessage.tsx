'use client'

import { type Message } from '@ai-sdk/react'
import ChatMarkdown from '../ChatPage/ChatMarkdown'

interface BaseChatMessageProps {
  message: Message
  variant?: 'default' | 'compact'
  showTimestamp?: boolean
}

const BaseChatMessage = ({ 
  message, 
  variant = 'default',
  showTimestamp = true 
}: BaseChatMessageProps) => {
  const isUser = message.role === 'user'
  const isCompact = variant === 'compact'
  
  return (
    <div className={isUser ? 'text-right' : 'text-left'}>
      <div
        className={`inline-block ${
          isCompact ? 'max-w-[280px]' : 'max-w-xs lg:max-w-md'
        } ${
          isUser ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
        } ${
          isCompact ? 'px-2 py-1 text-xs' : 'px-4 py-3'
        } ${
          isCompact ? 'rounded' : 'rounded-lg'
        }`}
      >
        <div className={isCompact ? '' : 'font-medium'}>
          {message.parts?.map((part, index) => {
            if (part.type === 'text') {
              return (
                <div key={index}>
                  <ChatMarkdown 
                    content={part.text} 
                    className="text-inherit"
                  />
                </div>
              )
            }
            return null
          })}
          {(!message.parts || message.parts.length === 0) && message.content && (
            <ChatMarkdown 
              content={message.content} 
              className="text-inherit"
            />
          )}
        </div>
        {showTimestamp && message.createdAt && !isCompact && (
          <p className={`text-xs mt-1 ${
            isUser ? 'text-gray-300' : 'text-gray-500'
          }`}>
            {new Date(message.createdAt).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        )}
      </div>
    </div>
  )
}

export default BaseChatMessage