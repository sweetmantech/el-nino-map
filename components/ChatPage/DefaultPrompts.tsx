'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface DefaultPromptsProps {
  onPromptSelect: (prompt: string) => void
}

const DefaultPrompts = ({ onPromptSelect }: DefaultPromptsProps) => {
  const prompts = [
    'Who is La Equis?',
    'What is Maravilla City?'
  ]

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Hey sweetman 👋
        </h2>
        <p className="text-gray-600">
          Ask me about sweetman.eth
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {prompts.map((prompt, index) => (
          <Card
            key={index}
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-black/20 hover:scale-105',
              'border border-gray-200 bg-white'
            )}
            onClick={() => onPromptSelect(prompt)}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-900 font-medium">
                  {prompt}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DefaultPrompts