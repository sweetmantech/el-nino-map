'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface BaseChatPromptsProps {
  prompts: string[]
  onPromptSelect: (prompt: string) => void
  variant?: 'default' | 'compact'
  title?: string
  subtitle?: string
}

const BaseChatPrompts = ({ 
  prompts, 
  onPromptSelect, 
  variant = 'default',
  title,
  subtitle 
}: BaseChatPromptsProps) => {
  const isCompact = variant === 'compact'

  if (isCompact) {
    return (
      <div className="space-y-2">
        {subtitle && (
          <p className="text-sm text-grey font-titilliumweb">{subtitle}</p>
        )}
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptSelect(prompt)}
            className="block w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded font-titilliumweb"
          >
            {prompt}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
      {(title || subtitle) && (
        <div className="text-center space-y-4 mb-8">
          {title && (
            <h2 className="text-2xl font-semibold text-gray-900">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
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

export default BaseChatPrompts