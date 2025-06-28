'use client'

import { useChat } from '@ai-sdk/react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import DefaultPrompts from './DefaultPrompts'

interface ChatProps {
  className?: string
  showHeader?: boolean
  headerComponent?: React.ReactNode
}

const Chat = ({ className = '', showHeader = false, headerComponent }: ChatProps) => {
  const { messages, input, setInput, handleSubmit, status, append } = useChat({
    api: 'https://chat.recoupable.com/api/chat',
    body: {
      artistId: 'eaa2fb07-5a4b-4710-9c0d-4a74db3612d2',
      accountId: '46cd41de-88a8-4839-b03b-264a8566cccf',
    },
  })

  const handlePromptSelect = (prompt: string) => {
    append({
      role: 'user',
      content: prompt,
    })
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {showHeader && headerComponent}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <DefaultPrompts onPromptSelect={handlePromptSelect} />
        ) : (
          <MessageList messages={messages} status={status} />
        )}
        <MessageInput value={input} onChange={setInput} onSubmit={handleSubmit} status={status} />
      </div>
    </div>
  )
}

export default Chat
