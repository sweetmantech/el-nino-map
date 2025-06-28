'use client'

import { useChat } from '@ai-sdk/react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
import DefaultPrompts from './DefaultPrompts'

const ChatPage = () => {
  const { messages, input, setInput, handleSubmit, isLoading, append } = useChat({
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ChatHeader />
      <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col">
        {messages.length === 0 ? (
          <DefaultPrompts onPromptSelect={handlePromptSelect} />
        ) : (
          <MessageList messages={messages} />
        )}
        <MessageInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default ChatPage
