import React, { useEffect, useRef } from 'react'
import DefaultPrompts from './DefaultPrompts'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import useMetadataChat from '@/hooks/useMetadataChat'

interface ChatProps {
  containerClassName?: string
  messagesContainerClassName?: string
}

const Chat: React.FC<ChatProps> = ({
  containerClassName = '',
  messagesContainerClassName = '',
}) => {
  const { messages, input, setInput, handleSubmit, status, handlePromptSelect } = useMetadataChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className={`flex flex-col h-full ${containerClassName}`}>
      <div className={`flex-1 overflow-y-auto space-y-2 mb-3 ${messagesContainerClassName}`}>
        {messages.length === 0 ? (
          <DefaultPrompts onPromptSelect={handlePromptSelect} />
        ) : (
          <MessageList messages={messages} status={status} />
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput value={input} onChange={setInput} onSubmit={handleSubmit} status={status} />
    </div>
  )
}

export default Chat
