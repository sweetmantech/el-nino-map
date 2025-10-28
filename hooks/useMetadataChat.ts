'use client'

import { useChat } from '@ai-sdk/react'

const useMetadataChat = () => {
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

  return {
    messages,
    input,
    setInput,
    handleSubmit,
    status,
    handlePromptSelect,
  }
}

export default useMetadataChat
