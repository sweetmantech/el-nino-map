import React, { useEffect, useRef } from 'react'
import { type Message } from '@ai-sdk/react'
import { BaseChatMessage, BaseChatInput, BaseChatPrompts, BaseChatThinking } from '@/components/Chat'

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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const prompts = ['Who is La Equis?', 'What is Maravilla City?']

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto max-h-[300px] space-y-2 mb-3">
        {messages.length === 0 ? (
          <BaseChatPrompts
            prompts={prompts}
            onPromptSelect={onPromptSelect}
            variant="compact"
            subtitle="Ask about the album:"
          />
        ) : (
          <>
            {messages.map((message) => (
              <BaseChatMessage
                key={message.id}
                message={message}
                variant="compact"
                showTimestamp={false}
              />
            ))}
            {(status === "submitted" || status === "streaming") && (
              <BaseChatThinking variant="compact" />
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <BaseChatInput
        value={input}
        onChange={onInputChange}
        onSubmit={onSubmit}
        status={status}
        variant="compact"
        placeholder="Ask something..."
      />
    </div>
  )
}

export default MetadataChat