'use client'

import ChatHeader from './ChatHeader'
import Chat from './Chat'

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ChatHeader />
      <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col">
        <Chat />
      </div>
    </div>
  )
}

export default ChatPage
