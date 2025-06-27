'use client'

import { useChat } from '@ai-sdk/react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'

const ChatPage = () => {
  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    api: 'https://recoup-chat-git-cursor-remove-cors-b-6636cd-recoupable-ad724970.vercel.app/api/chat',
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ChatHeader />
      <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col">
        <MessageList messages={messages} />
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
