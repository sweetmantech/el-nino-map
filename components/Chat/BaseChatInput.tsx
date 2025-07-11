'use client'

import React from 'react'

interface BaseChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (event?: { preventDefault?: () => void }) => void
  status: string
  placeholder?: string
  variant?: 'default' | 'compact'
  disabled?: boolean
}

const BaseChatInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  status,
  placeholder = 'Type a message...',
  variant = 'default',
  disabled 
}: BaseChatInputProps) => {
  const isLoading = status === "submitted" || status === "streaming"
  const isCompact = variant === 'compact'
  const isDisabled = disabled || isLoading

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={isCompact ? 'flex space-x-2' : 'flex space-x-4'}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isDisabled}
        className={`flex-1 border border-gray-300 rounded focus:outline-none focus:border-black disabled:opacity-50 ${
          isCompact 
            ? 'px-2 py-1 text-sm font-titilliumweb' 
            : 'px-4 py-3 text-base'
        } ${
          isCompact ? 'rounded' : 'rounded-lg'
        }`}
      />
      <button
        type="submit"
        disabled={!value.trim() || isDisabled}
        className={`bg-black text-white hover:bg-gray-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
          isCompact 
            ? 'px-3 py-1 text-xs font-titilliumweb rounded' 
            : 'px-6 py-3 font-medium rounded-lg'
        }`}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}

export default BaseChatInput