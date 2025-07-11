import { X } from 'lucide-react'
import Modal from '../Modal'
import MetadataChat from './MetadataChat'

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
        <fieldset className="max-h-[450px] overflow-y-auto font-[600] text-lg border-grey-light border rounded-lg px-4 py-2">
          <MetadataChat />
        </fieldset>
      </div>
    </Modal>
  )
}

export default Metadata
