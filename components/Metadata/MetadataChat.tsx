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
    <div className="flex flex-col h-full metadata-chat-container">
      {messages.length === 0 ? (
        <div className="flex-1 overflow-hidden">
          <DefaultPrompts onPromptSelect={onPromptSelect} />
        </div>
      ) : (
        <div className="flex-1 max-h-[300px] overflow-hidden">
          <MessageList messages={messages} status={status} />
        </div>
      )}
      <MessageInput
        value={input}
        onChange={onInputChange}
        onSubmit={onSubmit}
        status={status}
      />
      
      <style>{`
        .metadata-chat-container .flex-1.flex.flex-col.items-center.justify-center {
          padding: 0.75rem !important;
        }
        .metadata-chat-container .max-w-2xl {
          max-width: 100% !important;
        }
        .metadata-chat-container .grid.grid-cols-1.md\\:grid-cols-2 {
          grid-template-columns: 1fr !important;
          gap: 0.5rem !important;
        }
        .metadata-chat-container .space-y-6 > * + * {
          margin-top: 0.75rem !important;
        }
        .metadata-chat-container .mb-8 {
          margin-bottom: 0.75rem !important;
        }
        .metadata-chat-container .text-2xl {
          font-size: 1.125rem !important;
        }
        .metadata-chat-container .p-4 {
          padding: 0.75rem !important;
        }
        .metadata-chat-container .p-6 {
          padding: 0.75rem !important;
        }
        .metadata-chat-container .space-x-4 > * + * {
          margin-left: 0.5rem !important;
        }
        .metadata-chat-container .px-4 {
          padding-left: 0.5rem !important;
          padding-right: 0.5rem !important;
        }
        .metadata-chat-container .py-3 {
          padding-top: 0.5rem !important;
          padding-bottom: 0.5rem !important;
        }
        .metadata-chat-container .px-6 {
          padding-left: 0.75rem !important;
          padding-right: 0.75rem !important;
        }
        .metadata-chat-container .text-base {
          font-size: 0.875rem !important;
        }
        .metadata-chat-container .max-w-xs {
          max-width: 12rem !important;
        }
        .metadata-chat-container .lg\\:max-w-md {
          max-width: 12rem !important;
        }
      `}</style>
    </div>
  )
}

export default MetadataChat