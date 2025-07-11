'use client'

import { useEffect, useRef } from 'react'
import useChatLogic from '@/hooks/useChatLogic'
import { BaseChatMessage, BaseChatInput, BaseChatPrompts, BaseChatThinking } from '@/components/Chat'
import ChatHeader from './ChatHeader'

const ChatPage = () => {
  const { messages, input, setInput, handleSubmit, status, handlePromptSelect } = useChatLogic()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const prompts = ['Who is La Equis?', 'What is Maravilla City?']

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ChatHeader />
      <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col">
        {messages.length === 0 ? (
          <BaseChatPrompts
            prompts={prompts}
            onPromptSelect={handlePromptSelect}
            variant="default"
            title="Hey there 👋"
            subtitle="Ask me about Maravilla City"
          />
        ) : (
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
        )}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="max-w-2xl mx-auto">
            <BaseChatInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              status={status}
              variant="default"
              placeholder="Type a message..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
