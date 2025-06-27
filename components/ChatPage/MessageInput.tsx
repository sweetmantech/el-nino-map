'use client'

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
}

const MessageInput = ({ value, onChange, onSend }: MessageInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSend()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="bg-white border-t border-gray-200 p-6">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-base"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default MessageInput