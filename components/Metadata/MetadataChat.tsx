import React, { useEffect, useRef } from 'react'
import { type Message } from '@ai-sdk/react'
import DefaultPrompts from '../ChatPage/DefaultPrompts'
import MessageList from '../ChatPage/MessageList'
import MessageInput from '../ChatPage/MessageInput'
import useMetadataChat from '@/hooks/useMetadataChat'

const MetadataChat = () => {
  const { messages, input, setInput, handleSubmit, status, handlePromptSelect } = useMetadataChat()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])



  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto max-h-[300px] space-y-2 mb-3">
        {messages.length === 0 ? (
          <DefaultPrompts onPromptSelect={handlePromptSelect} />
        ) : (
          <MessageList messages={messages} status={status} />
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          status={status}
        />
    </div>
  )
}

export default MetadataChat