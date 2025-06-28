'use client'

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (event?: { preventDefault?: () => void }) => void
  status?: string
}

const MessageInput = ({ value, onChange, onSubmit, status }: MessageInputProps) => {
  const isLoading = status === "submitted" || status === "streaming"

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
    <div className="bg-white p-4">
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isLoading}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default MessageInput