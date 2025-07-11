import SpinnerIcon from '../Icon/SpinnerIcon'

interface BaseChatThinkingProps {
  variant?: 'default' | 'compact'
  text?: string
}

const BaseChatThinking = ({ 
  variant = 'default', 
  text = 'Hmm...' 
}: BaseChatThinkingProps) => {
  const isCompact = variant === 'compact'
  
  return (
    <div className="text-left">
      <div className={`text-zinc-500 w-full flex items-center gap-2 ${
        isCompact ? 'text-xs font-titilliumweb text-grey' : ''
      }`}>
        {isCompact ? 'Thinking...' : text}
        {!isCompact && (
          <div className="inline-block animate-spin">
            <SpinnerIcon />
          </div>
        )}
      </div>
    </div>
  )
}

export default BaseChatThinking