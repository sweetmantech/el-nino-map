import { X } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import Modal from '../Modal'
import MetadataChat from './MetadataChat'

const Metadata = ({ onClose }: { onClose: () => void }) => {
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

  return (
    <Modal onClose={onClose}>
      <div className="max-w-[350px] p-3 bg-white rounded-md relative" id="metadata">
        <button
          type="button"
          onClick={onClose}
          className="text-xl absolute right-4 top-2 text-black font-akira"
        >
          <X className="size-4" />
        </button>
        <p className="font-titilliumweb text-xl pb-2">El Niño Maravilla Pt. 1</p>
        <fieldset 
          className="max-h-[450px] overflow-y-auto overscroll-contain font-[600] text-lg border-grey-light border rounded-lg px-4 py-2"
          onTouchMove={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          <MetadataChat
            messages={messages}
            status={status}
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onPromptSelect={handlePromptSelect}
          />
        </fieldset>
      </div>
    </Modal>
  )
}

export default Metadata
