'use client'

import { BaseChatPrompts } from '@/components/Chat'

interface DefaultPromptsProps {
  onPromptSelect: (prompt: string) => void
}

const DefaultPrompts = ({ onPromptSelect }: DefaultPromptsProps) => {
  const prompts = [
    'Who is La Equis?',
    'What is Maravilla City?'
  ]

  return (
    <BaseChatPrompts
      prompts={prompts}
      onPromptSelect={onPromptSelect}
      variant="default"
      title="Hey there 👋"
      subtitle="Ask me about Maravilla City"
    />
  )
}

export default DefaultPrompts