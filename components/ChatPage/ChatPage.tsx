'use client'

import { useChat } from '@/hooks/useChat'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'

const ChatPage = () => {
  const { messages, inputValue, setInputValue, handleSend } = useChat()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ChatHeader />
      <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col">
        <MessageList messages={messages} />
        <MessageInput 
          value={inputValue} 
          onChange={setInputValue} 
          onSend={handleSend} 
        />
      </div>
    </div>
  )
}

export default ChatPage