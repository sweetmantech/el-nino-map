'use client'

import ChatHeader from './ChatHeader'
import Chat from './Chat'

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Chat
        className="flex-1 max-w-2xl mx-auto w-full"
        showHeader={true}
        headerComponent={<ChatHeader />}
      />
    </div>
  )
}

export default ChatPage
