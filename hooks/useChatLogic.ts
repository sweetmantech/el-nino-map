'use client'

import { useChat } from '@ai-sdk/react'

interface UseChatLogicProps {
  apiEndpoint?: string
  body?: Record<string, any>
}

const useChatLogic = ({ 
  apiEndpoint = 'https://chat.recoupable.com/api/chat',
  body = {
    artistId: 'eaa2fb07-5a4b-4710-9c0d-4a74db3612d2',
    accountId: '46cd41de-88a8-4839-b03b-264a8566cccf',
  }
}: UseChatLogicProps = {}) => {
  const chatData = useChat({
    api: apiEndpoint,
    body,
  })

  const handlePromptSelect = (prompt: string) => {
    chatData.append({
      role: 'user',
      content: prompt,
    })
  }

  return {
    ...chatData,
    handlePromptSelect,
  }
}

export default useChatLogic