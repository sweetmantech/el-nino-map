import Modal from '../Modal'
import { X } from 'lucide-react'

const ComingSoon = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <div className="max-w-[430px] p-3 bg-white rounded-md relative" id="coming-soon">
        <button
          type="button"
          onClick={onClose}
          className="text-xl absolute right-4 top-2 text-black font-akira"
        >
          <X className="size-4" />
        </button>
        <p className="font-akira text-xl pb-1">Coming Soon !</p>
        <p className="font-titilliumweb text-lg py-1">
          Stay tuned for IRL and URL entertainment updates.
        </p>
        <p className="font-titilliumweb text-grey pb-1">{`We're working hard to bring you the best live entertainment experiences, both in-person (IRL) and online (URL). Get ready for an exciting lineup of shows, concerts, and interactive events!`}</p>
        <button
          className="bg-black text-white w-full py-2 mt-2 rounded-md font-titilliumweb text-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default ComingSoon
