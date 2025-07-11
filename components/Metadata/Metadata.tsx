import { X } from 'lucide-react'
import Modal from '../Modal'
import Chat from '../ChatPage/Chat'

const Metadata = ({ onClose }: { onClose: () => void }) => {

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
        <Chat messagesContainerClassName="max-h-[300px]" />
      </div>
    </Modal>
  )
}

export default Metadata
