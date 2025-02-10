import { X } from 'lucide-react'
import Modal from '../Modal'

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
        <p className="font-akira text-xl pb-2">Metadata</p>
        <fieldset className="max-h-[450px] overflow-y-auto font-[600] text-lg border-grey-light border rounded-lg px-4 py-2">
          <p className="font-titilliumweb py-1">Description</p>
          <p className="font-titilliumweb text-grey text-sm pb-1">
            El Niño Maravilla is the debut album by xcelencia, showcasing a unique blend of Latin
            urban and pop sounds. This project brings together a talented team of designers,
            developers, and producers to create a groundbreaking musical experience.
          </p>
          <p className="font-titilliumweb py-1">Artist</p>
          <p className="font-titilliumweb text-grey text-sm pb-1">xcelencia</p>
          <p className="font-titilliumweb py-1">Album</p>
          <p className="font-titilliumweb text-grey text-sm pb-1">el niño maravilla</p>
          <p className="font-titilliumweb py-1">Designer</p>
          <p className="font-titilliumweb text-grey text-sm pb-1">muchozorro</p>
          <p className="font-titilliumweb py-1">Devs</p>
          <ul className="font-titilliumweb list-inside pb-1">
            <li className="text-grey text-sm list-disc">sweetman</li>
            <li className="text-grey text-sm list-disc">ziad</li>
          </ul>
          <p className="font-titilliumweb py-1">Producers</p>
          <ul className="font-titilliumweb list-inside pb-1">
            <li className="text-grey text-sm list-disc">emme</li>
            <li className="text-grey text-sm list-disc">shine</li>
          </ul>
        </fieldset>
      </div>
    </Modal>
  )
}

export default Metadata
