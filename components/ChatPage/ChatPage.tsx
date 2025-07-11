'use client'

import useChatLogic from '@/hooks/useChatLogic'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
import DefaultPrompts from './DefaultPrompts'

const ChatPage = () => {
  const { messages, input, setInput, handleSubmit, status, handlePromptSelect } = useChatLogic()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ChatHeader />
      <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col">
        {messages.length === 0 ? (
          <DefaultPrompts onPromptSelect={handlePromptSelect} />
        ) : (
          <MessageList messages={messages} status={status} />
        )}
        <MessageInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          status={status}
        />
      </div>
    </div>
  )
}

export default ChatPage
