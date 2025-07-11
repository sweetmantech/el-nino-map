import React, { useEffect, useRef } from 'react'
import { type Message } from '@ai-sdk/react'
import ChatMarkdown from '../ChatPage/ChatMarkdown'

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
  const isLoading = status === "submitted" || status === "streaming"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const prompts = ['Who is La Equis?', 'What is Maravilla City?']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto max-h-[300px] space-y-2 mb-3">
        {messages.length === 0 ? (
          <div className="space-y-2">
            <p className="text-sm text-grey font-titilliumweb">Ask about the album:</p>
            {prompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => onPromptSelect(prompt)}
                className="block w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded font-titilliumweb"
              >
                {prompt}
              </button>
            ))}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message.id} className={`${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-[280px] text-xs ${
                  message.role === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
                } px-2 py-1 rounded`}>
                  <ChatMarkdown content={message.content} className="text-inherit" />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left">
                <div className="text-grey text-xs font-titilliumweb">Thinking...</div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
          disabled={isLoading}
          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-black disabled:opacity-50 font-titilliumweb"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-3 py-1 bg-black text-white text-xs rounded hover:bg-gray-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-titilliumweb"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default MetadataChat