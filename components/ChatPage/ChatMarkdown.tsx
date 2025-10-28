'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

interface ChatMarkdownProps {
  content: string
  className?: string
}

const ChatMarkdown = ({ content, className = '' }: ChatMarkdownProps) => {
  const components: Components = {
    h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-base font-medium mb-1">{children}</h3>,
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
    li: ({ children }) => <li className="text-sm">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children, className }) => {
      const isInline = !className
      return isInline ? (
        <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
      ) : (
        <pre className="bg-gray-100 p-2 rounded text-sm font-mono overflow-x-auto mb-2">
          <code>{children}</code>
        </pre>
      )
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-3 italic mb-2">{children}</blockquote>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-2">
        <table className="min-w-full border-collapse border border-gray-300">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-gray-300 px-2 py-1 bg-gray-100 font-semibold text-left">
        {children}
      </th>
    ),
    td: ({ children }) => <td className="border border-gray-300 px-2 py-1">{children}</td>,
  }

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default ChatMarkdown
