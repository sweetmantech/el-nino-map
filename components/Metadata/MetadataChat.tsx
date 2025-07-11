import React from 'react'
import { type Message } from '@ai-sdk/react'
import MessageList from '../ChatPage/MessageList'
import MessageInput from '../ChatPage/MessageInput'
import DefaultPrompts from '../ChatPage/DefaultPrompts'

const MetadataChat = ({ 
  messages, 
  status, 
  input, 
  onInputChange, 
  onSubmit, 
  onPromptSelect 
}: {
  messages: Message[]
  status: string
  input: string
  onInputChange: (value: string) => void
  onSubmit: (event?: { preventDefault?: () => void }) => void
  onPromptSelect: (prompt: string) => void
}) => {
  return (
    <div className="flex flex-col h-full">
      {messages.length === 0 ? (
        <div className="flex-1 overflow-hidden">
          <DefaultPrompts onPromptSelect={onPromptSelect} />
        </div>
      ) : (
        <div 
          className="flex-1 max-h-[300px] overflow-hidden"
          onWheel={(e) => e.stopPropagation()}
        >
          <MessageList messages={messages} status={status} />
        </div>
      )}
      <MessageInput
        value={input}
        onChange={onInputChange}
        onSubmit={onSubmit}
        status={status}
      />
    </div>
  )
}

export default MetadataChat